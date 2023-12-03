import H from '@here/maps-api-for-javascript';
import { useEffect, useRef } from 'react';

export default function Home() {
  const mapRef = useRef(null);
  const map = useRef(null);
  const platform = useRef(null)
  const apikey = "L0-2LCY4n1A2kedFrMAlPVsd9bjfFL9RmaA-JTv-Sgg";

  useEffect(
    () => {
      // Check if the map object has already been created
      if (!map.current) {
        // Create a platform object with the API key
        platform.current = new H.service.Platform({ apikey });
        // Create a new Raster Tile service instance
        const rasterTileService = platform.current.getRasterTileService({
          queryParams: {
            style: "explore.night",
            size: 512,
          },
        });
        // Creates a new instance of the H.service.rasterTile.Provider class
        // The class provides raster tiles for a given tile layer ID and pixel format
        const rasterTileProvider = new H.service.rasterTile.Provider(
          rasterTileService
        );
        // Create a new Tile layer with the Raster Tile provider
        const rasterTileLayer = new H.map.layer.TileLayer(rasterTileProvider);
        // Create a new map instance with the Tile layer, center and zoom level
        const newMap = new H.Map(mapRef.current, rasterTileLayer, {
          pixelRatio: window.devicePixelRatio,
          center: {
            lat: 13.0827,
            lng: 80.2022,
          },
          zoom: 14,
        });

        // Add panning and zooming behavior to the map
        const behavior = new H.mapevents.Behavior(
          new H.mapevents.MapEvents(newMap)
        );

        // Set the map object to the reference
        map.current = newMap;
      }
    },
    // Dependencies array
    [apikey]
  );


  return <div style={ { width: "100%", height: "80vh" } } ref={mapRef} />;
}
