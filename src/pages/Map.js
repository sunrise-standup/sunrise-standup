import React, { useEffect } from "react";
import * as atlas from "azure-maps-control";
import "./Map.css";
import appApi from "../api/appApi";

const Map = ({ map_key }) => {
  console.log(map_key);

  // this function is called when this component is mounted/ready
  useEffect(() => {
    // initialize a map instance.
    const map = new atlas.Map("map", {
      view: "Auto",
      zoom: 2,
      center: [-50, 30],
      authOptions: {
        authType: "subscriptionKey",
        subscriptionKey: map_key,
      },
    });

    // this event handler is called when the Azure Maps object is ready
    map.events.add("ready", async function () {
      // gets the user map locations from the API
      const data = await appApi.getLocations();

      await map.imageSprite.add("my-custom-icon", "sunrise-marker.png");

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
              avatar: location.avatar,
            }
          )
        );
      });

      //Create a symbol layer to render icons and/or text at points on the map.
      const symbolLayer = new atlas.layer.SymbolLayer(dataSource, null, {
        iconOptions: {
          //Pass in the id of the custom icon that was loaded into the map resources.
          image: "my-custom-icon",
          //Optionally scale the size of the icon.
          size: 1,
        },
      });

      //Create a popup but leave it closed so we can update it and display it later.
      let popup = new atlas.Popup({
        closeButton: false,
        pixelOffset: [0, -50],
      });

      //Add the layer to the map.
      map.layers.add(symbolLayer);

      map.events.add("click", symbolLayer, function (e) {
        setPopup(popup, e);
        //Open the popup.
        popup.open(map);
      });

      //Add a hover event to the symbol layer.
      map.events.add("mouseover", symbolLayer, function (e) {
        setPopup(popup, e);
        //Open the popup.
        popup.open(map);
      });

      map.events.add("mouseleave", symbolLayer, function () {
        popup.close();
      });
    });
  }, [map_key]);

  function setPopup(popup, e) {
    //Make sure that the point exists.
    if (e.shapes && e.shapes.length > 0) {
      let coordinate;
      const properties = e.shapes[0].getProperties();

      const content = `
      <div id="popup" class="card">
        <div class="card-image">
          <figure class="image">
            <img src="${properties.avatar}" alt="Placeholder image">
          </figure>
        </div>
        <div id="name" class="card-content has-text-centered">
              <p class="is-size-4">${properties.name}</p>
          </div>

          <div class="content">
        </div>
      </div>`;

      coordinate = e.shapes[0].getCoordinates();

      popup.setOptions({
        //Update the content of the popup.
        content: content,
        //Update the popup's position with the symbol's coordinate.
        position: coordinate,
      });
    }
  }

  return <div id="map"></div>;
};

export default Map;
