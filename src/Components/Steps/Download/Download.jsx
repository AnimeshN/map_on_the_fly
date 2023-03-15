import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';

import React from "react";

const Download = () =>{
    
   const savePng = ()=>{
    htmlToImage.toPng(document.getElementById("map"),{backgroundColor:'white'})
    .then(function (dataUrl) {
        download(dataUrl, "Map.png");
    });
}

// const saveSvg =()=>{
//     htmlToImage.toJpeg(document.getElementById("map"),{backgroundColor:'white'})
//     .then(function (dataUrl) {
//         var link = document.createElement('a');
//         link.download = "Map.svg";
//         link.href = dataUrl;
//         link.click();
//     });
// }
    return (
        <button onClick={savePng} id="btn">Download</button>
    );
}

export default Download;