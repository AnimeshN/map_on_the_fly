import Papa from "papaparse";
import Slider from './Slider/Slider';
import Download from './Download/Download';
import { CSVLink } from "react-csv";
import { AiOutlineDownload ,AiOutlineUpload ,AiOutlineExport ,AiOutlineGithub} from "react-icons/ai";
import "./Steps.css"
import {useState} from 'react'
import Switch from '@mui/material/Switch';


const Steps = ({setData,mapRef,areaChangeDropdownOpt,selArea,areaChange,template,setMinMax,myextent,setTitle,width,height,checked, setChecked}) =>{
    const handleFlip = (e) =>{
      console.log(e.target.checked)
      setChecked(e.target.checked)
    }
    const handleOnChange = (e) => {
        const files = e.target.files;
        if (files) {
          Papa.parse(files[0], {
            // header: true,
            complete: function(results) {
                setData(results.data)
            }}
          )
        }

    };

    let headers = [
        { label: "area_name", key: "area_name" },
        { label: "value", key: "value" },
    ];

    

    const downloadFormat = () =>{
        console.log("download format")
    }
   const updateTitle = (e) =>{
    setTitle(e.target.value);
   }
   const redirect = () => {
    window.location.replace("https://github.com/AnimeshN/map_on_the_fly")
   }
    return (
        // <div style={{ textAlign: "center" }}>
 
        //     
        //     
        // </div>

        <div className="Steps">
        <div className="Common Title">MAPS ON THE FLY!</div>
        <div className="Common Step Step1">
          <div className="Heading">Step 1: Select Map</div>
          <div className="Function">
          <select
                className='select-category'
                value={selArea}
                onChange={areaChange}
                >
                <option key={"0MaharashtraD"} value={"MaharashtraDist"}>{"Maharashtra (District)"}</option>
                <option key={"0MaharashtraT"} value={"MaharashtraTal"}>{"Maharashtra (Taluka)"}</option>
                {areaChangeDropdownOpt.map((opt) => (
                    <option key={opt.value + opt.title} value={opt.title}>
                    {opt.title}
                    </option>
                ))}
            </select>
          </div>
        </div>
        <div className="Common TwoSteps">
          <div className="Step FirstStep">
            <div className="Heading">Step 2: Download Format</div>
            <div className="Function">

            <CSVLink headers={headers} data={template} filename={selArea + ".csv"}>
                <button className="custom-button" onClick={downloadFormat}><AiOutlineDownload/></button>
            </CSVLink>

                {/* <button onClick={downloadFormat}>Download</button> */}
            </div>
          </div>
          <div className="Step SecondStep">
            <div className="Heading">Step 3: Upload Data</div>
            <div className="Function">
            <form>

                <label className="custom-button">
                    {/* <input type="file"/> */}
                    <input
                        type={"file"}
                        id={"csvFileInput"}
                        accept={".csv"}
                        onChange={handleOnChange}
                    />
                    <AiOutlineUpload/>
                </label>

            </form>
            </div>
          </div>
        </div>
        <div className="Common Step Step4">
          <div className="Heading">Step 4: Style the Map</div>
           <div> Flip Colors : <Switch checked={checked} onChange={handleFlip} color="secondary" /></div>
          <div className="Function"><Slider mapRef={mapRef} myextent={myextent} width={width} height={height} setMinMax={setMinMax} checked={checked}></Slider></div>
        </div>
        <div className="Common Step">
          <div className="Heading">Step 5: Add Labels</div>
          <div className="Function">
          <form>
            <label>Title: <input type="text" name="name" onChange={updateTitle} /></label>
            </form>
          </div>
        </div>
        <div className="Common TwoSteps">
          <div className="Step FirstStep">
            <div className="Heading">Step 6: Export Image</div>
            <div className="Function"><Download AiOutlineExport={AiOutlineExport}></Download></div>
          </div>
          <div className="Step SecondStep">
            <div className="Heading">Fork the repo 🙏</div>
            <div className="Function">
                <button className="custom-button">  <a style={{display: "table-cell"}} href="https://github.com/AnimeshN/map_on_the_fly" target="_blank"><AiOutlineGithub/></a></button>

            </div>
          </div>
        </div>
      </div>
    );
}

export default Steps;