import { feature } from 'topojson';
import Map from './Components/Map/Map';
import Steps from './Components/Steps/Steps';
import './App.css';
import useResizeObserver from './Components/useResizeObserver';
import React, { useState,useRef } from "react";

const width = window.screen.width + 500;
const height = window.screen.height + 500;


function App() {
  const [data, setData] = useState();
  const svgRef = useRef();
  const wrapperRef = useRef();

  const dimensions = useResizeObserver(wrapperRef);

  const newStateTopology = require('./data/boundries/India.json'); // NFHS5 state vector layer
  const newStateObject = newStateTopology.objects['india-state_26may'];
  let boundary = feature(newStateTopology, newStateObject)
  console.log("APP")
  return (
    <div className="App">
     <Steps setData = {setData} mapRef = {svgRef}></Steps>


      <div className="Map" ref={wrapperRef}>
        <Map boundary={boundary} data={data} width={width} height={height} svgRef={svgRef} dimensions={dimensions}></Map>
      </div>
    </div>
  );
}

export default App;
