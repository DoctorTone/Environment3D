import rasterio
import geopandas as gpd
import matplotlib.pyplot as plt
import numpy as np

# === INSPECT THERMAL DATA ===
print("=== THERMAL DATA ===")
with rasterio.open('../data/ST_B10.TIF') as src:
    print(f"CRS: {src.crs}")
    print(f"Shape: {src.shape}")
    print(f"NoData value: {src.nodata}")
    
    # Read raw data
    thermal_raw = src.read(1)
    print(f"\nRaw pixel range (all): {thermal_raw.min()} to {thermal_raw.max()}")
    
    # Create mask for valid pixels
    # Landsat uses 0 for nodata in ST band even if not explicitly set
    valid_mask = (thermal_raw > 0) & (thermal_raw < 65535)
    thermal_raw_valid = thermal_raw[valid_mask]
    
    print(f"Valid pixels: {valid_mask.sum()} / {thermal_raw.size} ({valid_mask.sum()/thermal_raw.size*100:.1f}%)")
    print(f"Raw pixel range (valid only): {thermal_raw_valid.min()} to {thermal_raw_valid.max()}")
    
    # Apply Landsat C2 L2 conversion formula from metadata
    SCALE = 0.00341802
    OFFSET = 149.0
    
    thermal_kelvin_valid = (thermal_raw_valid * SCALE) + OFFSET
    thermal_celsius_valid = thermal_kelvin_valid - 273.15
    
    print(f"\n=== CONVERTED TEMPERATURE ===")
    print(f"Range: {thermal_celsius_valid.min():.1f}°C to {thermal_celsius_valid.max():.1f}°C")
    print(f"Mean: {thermal_celsius_valid.mean():.1f}°C")
    print(f"Median: {np.median(thermal_celsius_valid):.1f}°C")
    
    # Show distribution
    print(f"\nTemperature distribution:")
    print(f"  10th percentile: {np.percentile(thermal_celsius_valid, 10):.1f}°C")
    print(f"  25th percentile: {np.percentile(thermal_celsius_valid, 25):.1f}°C")
    print(f"  50th percentile: {np.percentile(thermal_celsius_valid, 50):.1f}°C")
    print(f"  75th percentile: {np.percentile(thermal_celsius_valid, 75):.1f}°C")
    print(f"  90th percentile: {np.percentile(thermal_celsius_valid, 90):.1f}°C")
    
    # Convert full array for visualization (NaN for invalid)
    thermal_celsius_full = np.where(
        valid_mask,
        ((thermal_raw * SCALE) + OFFSET) - 273.15,
        np.nan
    )
    
    # Visualization
    plt.figure(figsize=(12, 10))
    im = plt.imshow(thermal_celsius_full, cmap='RdYlBu_r', vmin=15, vmax=35)
    plt.colorbar(im, label='Temperature (°C)')
    plt.title('London Surface Temperature - 30 July 2024')
    plt.axis('off')
    plt.tight_layout()
    plt.savefig('thermal_preview.png', dpi=150, bbox_inches='tight')
    print("\nSaved thermal_preview.png")

# === INSPECT BUILDINGS ===
print("\n=== BUILDING DATA ===")
buildings = gpd.read_file('../data/london_buildings.geojson')
print(f"Total buildings: {len(buildings)}")
print(f"CRS: {buildings.crs}")
print(f"Columns: {buildings.columns.tolist()}")

# Check height data availability
if 'height' in buildings.columns:
    with_height = buildings['height'].notna().sum()
    print(f"Buildings with height data: {with_height} ({with_height/len(buildings)*100:.1f}%)")

if 'building:levels' in buildings.columns:
    with_levels = buildings['building:levels'].notna().sum()
    print(f"Buildings with level data: {with_levels} ({with_levels/len(buildings)*100:.1f}%)")

# Preview first few
print("\nFirst 3 buildings:")
print(buildings.head(3)[['geometry', 'height', 'building:levels', 'building']])