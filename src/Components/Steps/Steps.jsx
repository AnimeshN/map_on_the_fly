import Papa from "papaparse";
import Slider from './Slider/Slider';
import Download from './Download/Download';
// import { useState } from "react";

const Steps = ({setData,mapRef, areaChangeDropdownOpt, selArea,areaChange}) =>{

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

    const downloadFormat = () =>{
        console.log("download format")
    }
   
    return (
        // <div style={{ textAlign: "center" }}>
 
        //     
        //     
        // </div>

        <div className="Steps">
        <div className="Common Title">MAPS ON THE FLY!</div>
        <div className="Common Step Step1">
          <div className="Heading">Step1: Select Map</div>
          <div className="Function">
          <select
                className='select-category'
                value={selArea}
                onChange={areaChange}
                >
                <option key={"0Maharashtra"} value={"Maharashtra"}>{"Maharashtra"}</option>
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
            <div className="Heading">Step2: Download Format</div>
            <div className="Function">
                <button onClick={downloadFormat}>Download</button>
            </div>
          </div>
          <div className="Step SecondStep">
            <div className="Heading">Step3: Upload Data</div>
            <div className="Function">
            <form>
                <input
                    type={"file"}
                    id={"csvFileInput"}
                    accept={".csv"}
                    onChange={handleOnChange}
                />

            </form>
            </div>
          </div>
        </div>
        <div className="Common Step Step4">
          <div className="Heading">Step4: Style</div>
          <div className="Function"><Slider mapRef={mapRef} ></Slider></div>
        </div>
        <div className="Common Step">
          <div className="Heading">Step5: Add Labels</div>
          <div className="Function">Functions</div>
        </div>
        <div className="Common TwoSteps">
          <div className="Step FirstStep">
            <div className="Heading">Step6: Export</div>
            <div className="Function"><Download mapRef={mapRef}></Download></div>
          </div>
          <div className="Step SecondStep">
            <div className="Heading">Done!</div>
            <div className="Function">Functions</div>
          </div>
        </div>
      </div>
    );
}

export default Steps;