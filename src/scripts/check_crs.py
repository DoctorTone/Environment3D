import rasterio
import geopandas as gpd

thermal = rasterio.open('../data/ST_B10.TIF')
buildings = gpd.read_file('../data/london_buildings.geojson')

print("Thermal CRS:", thermal.crs)
print("Thermal bounds:", thermal.bounds)
print()
print("Buildings CRS:", buildings.crs) 
print("Buildings bounds:", buildings.total_bounds)

thermal.close()