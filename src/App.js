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

  const mhDist = require('./data/boundries/maharashtra/mh_dt_geojson_141121.json');  // Maharashtra district topojson
  const districtObject = mhDist.objects.mh_dt_geojson_141121;

  const mhTaluka = require('./data/boundries/maharashtra/mh_sub_dt_equi2hmis071221.json'); // Maharashra taluka topojson
  const talukaObject = mhTaluka.objects.mh_sub_dt_equi2hmis071221;

  // let boundary = feature(newStateTopology, newStateObject)
  let initialboundary = feature(mhDist, districtObject) // real
  const [boundary,setBoundary] = useState(initialboundary);
  // let boundary = initialboundary;
  
  let areaChangeDropdownOpt = []
  initialboundary.features.map( d =>{
    let temp = {"value":d.properties.ogc_fid,"title":d.properties.district_n}
    areaChangeDropdownOpt.push(temp);
  })
 
  const [selArea, setSelArea] = useState("Maharashtra");

  const areaChange = (e) =>{
      let val = e.target.value;
      setSelArea(val);
      let allTaluka = feature(mhTaluka,talukaObject);

      let features = [];
      allTaluka.features.map(d =>{
        if(d.properties.district === val){
        features.push(d)
      }
   
      })
      let selectedTalukaBoundary = {
        "type": "FeatureCollection",
        "features": features
      } 
      if(val !== "Maharashtra")
        setBoundary(selectedTalukaBoundary)
      else
        setBoundary(initialboundary)


  }


  console.log("APP")
  return (
    <div className="App">
     <Steps setData = {setData} mapRef = {svgRef} areaChangeDropdownOpt={areaChangeDropdownOpt} selArea={selArea}  areaChange={areaChange}></Steps>


      <div className="Map" ref={wrapperRef}>
        <Map boundary={boundary} data={data} width={width} height={height} svgRef={svgRef} dimensions={dimensions}></Map>
      </div>
    </div>
  );
}

export default App;
