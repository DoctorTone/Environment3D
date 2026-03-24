import rasterio
from rasterio.mask import mask
import geopandas as gpd
from shapely.geometry import mapping, Point
import json
import numpy as np
from pyproj import Transformer
import math

# ============================================
# CONFIGURATION
# ============================================

THERMAL_PATH = '../data/ST_B10.TIF'
BUILDINGS_PATH = '../data/london_buildings.geojson'
OUTPUT_PATH = '../../public/london_heat_data.json'

# Origin point (center of London: Trafalgar Square)
ORIGIN_LAT = 51.5074
ORIGIN_LON = -0.1278

# Height estimation for buildings without data
DEFAULT_HEIGHT = 12  # meters (typical 4-story building)
HEIGHT_PER_LEVEL = 3  # meters per floor

# ============================================
# HELPER FUNCTIONS
# ============================================

def latlon_to_meters(lat, lon, origin_lat, origin_lon):
    """Convert lat/lon to meters from origin point"""
    # Approximate conversion (good enough for small areas like London)
    lat_meters_per_degree = 110540  # meters per degree latitude
    lon_meters_per_degree = 111320 * math.cos(math.radians(origin_lat))
    
    x = (lon - origin_lon) * lon_meters_per_degree
    z = -(lat - origin_lat) * lat_meters_per_degree  # Negative because +Z is south in typical 3D coords
    
    return x, z

def get_building_height(building):
    """Extract or estimate building height"""
    # Try direct height tag
    if 'height' in building and building['height']:
        try:
            # Remove 'm' suffix if present
            height_str = str(building['height']).replace('m', '').strip()
            return float(height_str)
        except:
            pass
    
    # Try building:levels tag
    if 'building:levels' in building and building['building:levels']:
        try:
            levels = float(building['building:levels'])
            return levels * HEIGHT_PER_LEVEL
        except:
            pass
    
    # Estimate based on building type
    building_type = building.get('building', 'yes')
    if building_type in ['cathedral', 'church']:
        return 25
    elif building_type in ['commercial', 'office', 'retail']:
        return 18
    elif building_type in ['industrial', 'warehouse']:
        return 8
    else:  # residential, yes, or unknown
        return DEFAULT_HEIGHT

def sample_temperature(thermal_dataset, geometry):
    """Sample thermal raster within building footprint"""
    try:
        # Mask the raster to building geometry
        out_image, out_transform = mask(thermal_dataset, [mapping(geometry)], crop=True, all_touched=True)
        
        # Get valid (non-nodata) pixels
        nodata = thermal_dataset.nodata if thermal_dataset.nodata is not None else 0
        valid_pixels = out_image[(out_image != nodata) & (out_image > 0)]
        
        if len(valid_pixels) > 0:
            # Apply Landsat C2 L2 conversion
            SCALE = 0.00341802
            OFFSET = 149.0
            temp_kelvin = (np.mean(valid_pixels) * SCALE) + OFFSET
            temp_celsius = temp_kelvin - 273.15
            
            # Clip to realistic range for London summer (filter outliers)
            if 10 <= temp_celsius <= 45:
                return float(temp_celsius)
            else:
                return None  # Skip this building
        else:
            return None
            
    except Exception as e:
        return None

def get_footprint_size(geometry):
    """Get approximate width/depth of building footprint"""
    bounds = geometry.bounds  # (minx, miny, maxx, maxy)
    
    # Calculate width and depth in meters
    width = latlon_distance(bounds[1], bounds[0], bounds[1], bounds[2])
    depth = latlon_distance(bounds[1], bounds[0], bounds[3], bounds[0])
    
    return width, depth

def latlon_distance(lat1, lon1, lat2, lon2):
    """Calculate distance in meters between two lat/lon points"""
    # Haversine formula (simplified for small distances)
    R = 6371000  # Earth radius in meters
    
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    
    a = math.sin(dlat/2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon/2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    
    return R * c

# ============================================
# MAIN PROCESSING
# ============================================

print("Loading data...")
thermal = rasterio.open(THERMAL_PATH)
buildings_gdf = gpd.read_file(BUILDINGS_PATH)

# CHECK AND FIX COORDINATE SYSTEMS
print(f"Thermal CRS: {thermal.crs}")
print(f"Buildings CRS: {buildings_gdf.crs}")

# Reproject buildings to match thermal data
if buildings_gdf.crs != thermal.crs:
    print(f"Reprojecting buildings from {buildings_gdf.crs} to {thermal.crs}...")
    buildings_gdf = buildings_gdf.to_crs(thermal.crs)
    print("Reprojection complete!")

print(f"Processing {len(buildings_gdf)} buildings...")

from pyproj import Transformer
transformer = Transformer.from_crs("EPSG:4326", thermal.crs, always_xy=True)
origin_x_utm, origin_y_utm = transformer.transform(ORIGIN_LON, ORIGIN_LAT)

output_buildings = []
skipped = 0
temp_debug = []

for idx, building in buildings_gdf.iterrows():
    if idx % 1000 == 0:
        print(f"  Processed {idx}/{len(buildings_gdf)}...")
    
    try:
        geom = building.geometry
        
        if geom.geom_type not in ['Polygon', 'MultiPolygon']:
            skipped += 1
            continue
        
        temp = sample_temperature(thermal, geom)
        
        # Collect temps for debugging
        if temp is not None:
            temp_debug.append(temp)
        
        if temp is None or temp < -50 or temp > 100:
            skipped += 1
            continue
        
        # Calculate building properties
        centroid = geom.centroid
        height = get_building_height(building)
        x = centroid.x - origin_x_utm
        z = -(centroid.y - origin_y_utm)
        
        # Debug first 20 buildings
        if idx < 20:
            print(f"Building {idx}: UTM=({centroid.x:.2f}, {centroid.y:.2f}), scene=({x:.2f}, {z:.2f})")
        
        # Get footprint dimensions
        bounds = geom.bounds
        width = bounds[2] - bounds[0]
        depth = bounds[3] - bounds[1]
        
        if width < 3 or depth < 3:
            skipped += 1
            continue
        
        output_buildings.append({
            'x': round(x, 2),
            'z': round(z, 2),
            'width': round(width, 2),
            'depth': round(depth, 2),
            'height': round(height, 2),
            'temp': round(temp, 1)
        })
    
    except Exception as e:
        if idx < 5:
            print(f"Building {idx} ERROR: {e}")
        skipped += 1
        continue

thermal.close()

print(f"\nProcessed {len(output_buildings)} buildings")
print(f"Skipped {skipped} buildings")
print(f"\nDEBUG: Got temperatures for {len(temp_debug)} buildings")
if len(temp_debug) > 0:
    print(f"DEBUG: Temp range: {min(temp_debug):.1f}°C to {max(temp_debug):.1f}°C")

# Extract temperatures for metadata
temps = [b['temp'] for b in output_buildings]

if len(temps) > 0:
    print(f"\nFinal temperature range: {min(temps):.1f}°C to {max(temps):.1f}°C")
    print(f"Mean temperature: {sum(temps)/len(temps):.1f}°C")
else:
    print("ERROR: No buildings processed!")
    exit(1)

# Create output JSON
output = {
    'buildings': output_buildings,
    'metadata': {
        'origin': {
            'lat': ORIGIN_LAT,
            'lon': ORIGIN_LON
        },
        'count': len(output_buildings),
        'tempRange': [round(min(temps), 1), round(max(temps), 1)],
        'bounds': {
            'x': [min(b['x'] for b in output_buildings), max(b['x'] for b in output_buildings)],
            'z': [min(b['z'] for b in output_buildings), max(b['z'] for b in output_buildings)]
        }
    }
}

# Save
print(f"\nSaving to {OUTPUT_PATH}...")
with open(OUTPUT_PATH, 'w') as f:
    json.dump(output, f)

file_size_mb = len(json.dumps(output)) / 1024 / 1024
print(f"Done! Output file size: {file_size_mb:.1f} MB")
