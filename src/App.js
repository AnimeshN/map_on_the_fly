import { feature } from 'topojson';
import Map from './Components/Map/Map';
import Steps from './Components/Steps/Steps';
import './App.css';
import useResizeObserver from './Components/useResizeObserver';
import React, { useState,useRef,useEffect } from "react";
import { select,min,max,extent } from 'd3';

const width = window.screen.width;
const height = window.screen.height;


function App() {
  const [data, setData] = useState();
  const [minMax, setMinMax] = useState(0);
  const [title, setTitle] = useState("Maharashtra districts");
  const [checked, setChecked] = useState(false);


  const svgRef = useRef();
  const legendRef = useRef();
  const wrapperRef = useRef();

  const dimensions = useResizeObserver(wrapperRef);

  const newStateTopology = require('./data/boundries/India.json'); // NFHS5 state vector layer
  const newStateObject = newStateTopology.objects['india-state_26may'];

  const mhDist = require('./data/boundries/maharashtra/mh_dist.json');  // Maharashtra district topojson
  const districtObject = mhDist.objects.mh_dist;

  const mhTaluka = require('./data/boundries/maharashtra/mh_sub.json'); // Maharashra taluka topojson
  const talukaObject = mhTaluka.objects.mh_sub;

  // let boundary = feature(newStateTopology, newStateObject)
  let initialboundary = feature(mhDist, districtObject) // real
  // console.log(initialboundary,"intial")
  const [boundary,setBoundary] = useState(initialboundary);
  // let boundary = initialboundary;
  
  let areaChangeDropdownOpt = []
  initialboundary.features.map( d =>{
    let temp = {"value":d.properties.area_name,"title":d.properties.area_name}
    areaChangeDropdownOpt.push(temp);
  })
 
  const [selArea, setSelArea] = useState("Maharashtra");

  const areaChange = (e) =>{
      let val = e.target.value;
      setSelArea(val);
      let allTaluka = feature(mhTaluka,talukaObject);
      // console.log(allTaluka,"allTaluka")

      let features = [];
      allTaluka.features.map(d =>{
        if(d.properties.area_parent === val){
        features.push(d)
      }
   
      })
      let selectedTalukaBoundary = {
        "type": "FeatureCollection",
        "features": features
      } 
      if(val === "MaharashtraDist")
        setBoundary(initialboundary)
      else if(val === "MaharashtraTal")
        setBoundary(allTaluka)
      else
      setBoundary(selectedTalukaBoundary)


  }

      let template = boundary.features.map(x => ({ "area_name": x.properties.area_name }))

    useEffect(() =>{
        if(data){
          let mapData = JSON.parse(JSON.stringify(boundary));
            data.forEach(d => {
              mapData.features.forEach(b =>{
                    if(b.properties.area_name === d[0]){
                        b.properties.values = +d[1];
                    }
                })
                setBoundary(mapData)
            })

        }
    },[data])


    
    let c1Value  = d => d.properties.values
    const mymin = min(boundary.features,c1Value);
    const mymax = max(boundary.features,c1Value);
    const myextent = extent(boundary.features,c1Value);
    console.log(myextent,boundary.features)
  console.log("APP")

  return (
    <div className="App">
     <Steps setData = {setData} mapRef = {svgRef}  setMinMax = {setMinMax} areaChangeDropdownOpt={areaChangeDropdownOpt} selArea={selArea}  areaChange={areaChange} data={data} template={template} myextent={myextent} setTitle={setTitle} width={width} height={height} checked={checked} setChecked={setChecked}></Steps>


      <div className="Map" id='map' ref={wrapperRef}>
      <h1 style={{textAlign: "center"}}>{title}</h1>

        <Map boundary={boundary} data={data} width={width} height={height} svgRef={svgRef} dimensions={dimensions} legendRef = {legendRef} checked={checked}></Map>
      </div>
    </div>
  );
}

export default App;
