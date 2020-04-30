import React, { useEffect } from "react";
import * as atlas from "azure-maps-control";
import "./VideoMap.css";

const VideoMap = (props) => {
  useEffect(() => {
    //Initialize a map instance.
    const map = new atlas.Map("map", {
      view: "Auto",
      zoom: 2,
      center: [-50, 30],
      //Add your Azure Maps subscription key to the map SDK. Get an Azure Maps key at https://azure.com/maps
      authOptions: {
        authType: "subscriptionKey",
        subscriptionKey: "s-OwOWEAAVQH3rqkAAi4An6Np-wBaIXG_84u-7CTFdM",
      },
    });
    //Wait until the map resources are ready.
    map.events.add("ready", async function () {
      const data = await (await fetch("/api/GetLocations")).json();

      //Create a data source and add it to the map.
      var dataSource = new atlas.source.DataSource();
      map.sources.add(dataSource);

      data.locations.forEach((location) => {
        //Create a point and add it to the data source.
        dataSource.add(
          new atlas.data.Feature(
            new atlas.data.Point([location.longitude, location.latitude]),
            {
              name: location.name,
            }
          )
        );
      });

      //Create a symbol layer to render icons and/or text at points on the map.
      var symbolLayer = new atlas.layer.SymbolLayer(dataSource);

      //Add the layer to the map.
      map.layers.add(symbolLayer);

      var popupTemplate =
        '<div class="customInfobox"><div class="name">{name}</div></div>';

      //Create a popup but leave it closed so we can update it and display it later.
      let popup = new atlas.Popup({
        closeButton: false,
        pixelOffset: [0, -18],
      });

      //Add a hover event to the symbol layer.
      map.events.add("mouseover", symbolLayer, function (e) {
        //Make sure that the point exists.
        if (e.shapes && e.shapes.length > 0) {
          var content, coordinate;
          var properties = e.shapes[0].getProperties();
          content = popupTemplate.replace(/{name}/g, properties.name);
          coordinate = e.shapes[0].getCoordinates();

          popup.setOptions({
            //Update the content of the popup.
            content: content,
            //Update the popup's position with the symbol's coordinate.
            position: coordinate,
          });
          //Open the popup.
          popup.open(map);
        }
      });

      map.events.add("mouseleave", symbolLayer, function () {
        popup.close();
      });
    });
  }, []);
  return <div id="map"></div>;
};

export default VideoMap;
