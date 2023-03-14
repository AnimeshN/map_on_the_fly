// import {
//   exportComponentAsJPEG,
//   exportComponentAsPDF,
//   exportComponentAsPNG
// } from "react-component-export-image";

import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';

import React from "react";

const Download = ({mapRef}) =>{
    
   const savePng = ()=>{
    htmlToImage.toPng(document.getElementById("svgMap"),{backgroundColor:'white'})
    .then(function (dataUrl) {
        download(dataUrl, "Map.png");
    });
}

const saveSvg =()=>{
    htmlToImage.toJpeg(document.getElementById("svgMap"),{backgroundColor:'white'})
    .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = "Map.svg";
        link.href = dataUrl;
        link.click();
    });
}
    return (
        <React.Fragment>
        {/* <button onClick={() => exportComponentAsJPEG(mapRef)}>
          Export As JPEG
        </button>
        <button onClick={() => exportComponentAsPDF(mapRef)}>
          Export As PDF
        </button>
        <button onClick={() => exportComponentAsPNG(mapRef)}>
          Export As PNG
        </button> */}

        <button onClick={savePng} id="btn">Download</button>
        {/* <button onClick={saveSvg} id="btn">svg</button> */}


      </React.Fragment>
    );
}

export default Download;