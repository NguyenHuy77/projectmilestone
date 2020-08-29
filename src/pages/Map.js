import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import GoogleMapReact from "google-map-react";

const Map = (props) => {
  const [center, setCenter] = useState({
    lat: 59.59,
    lng: 30.33,
  });

  const [zoom, setZoom] = useState(11);
  return <div style={{ height: "100vh", width: "100%" }}></div>;
};

export default Map;
