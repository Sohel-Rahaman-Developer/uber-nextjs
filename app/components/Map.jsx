import tw from "tailwind-styled-components";
import { useEffect } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = "pk.eyJ1Ijoic29oZWxyYWhhbWFuIiwiYSI6ImNsdHZqYjVxbjEyOWgyanBqdjN5emVsZ2MifQ.HAijfwVXhSaGFAkGvuj5Cw";

function Map(props) {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: props.pickupCoordinates ?? [88.3639, 22.5726],
      zoom: 12,
    });

    if (props.pickupCoordinates && props.dropoffCoordinates) {
      const directionsRequest = `https://api.mapbox.com/directions/v5/mapbox/driving/${props.pickupCoordinates[0]},${props.pickupCoordinates[1]};${props.dropoffCoordinates[0]},${props.dropoffCoordinates[1]}?geometries=geojson&steps=true&access_token=${mapboxgl.accessToken}`;

      fetch(directionsRequest)
        .then(response => response.json())
        .then(data => {
          const route = data.routes[0].geometry;
          map.addLayer({
            id: "route",
            type: "line",
            source: {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: route
              }
            },
            layout: {
              "line-join": "round",
              "line-cap": "round"
            },
            paint: {
              "line-color": "#007bff",
              "line-width": 5
            }
          });

          // Add marker for pickup location
          new mapboxgl.Marker()
            .setLngLat(props.pickupCoordinates)
            .addTo(map);

          // Add marker for dropoff location
          new mapboxgl.Marker()
            .setLngLat(props.dropoffCoordinates)
            .addTo(map);

          // Fit map to the route and markers
          const bounds = new mapboxgl.LngLatBounds();
          route.coordinates.forEach(coord => bounds.extend(coord));
          bounds.extend(props.pickupCoordinates);
          bounds.extend(props.dropoffCoordinates);
          map.fitBounds(bounds, { padding: 60 });
        })
        .catch(error => {
          console.error("Error fetching directions:", error);
        });
    }
  }, [props.pickupCoordinates, props.dropoffCoordinates]);

  return (
    <>
      <Wrapper id="map"></Wrapper>
    </>
  );
}

export default Map;

const Wrapper = tw.div`bg-green-400 flex-1 h-1/2`;
