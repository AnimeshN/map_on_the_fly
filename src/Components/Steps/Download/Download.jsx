import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';

import React from "react";

const Download = ({AiOutlineExport}) =>{
    
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
        <button class="custom-button" onClick={savePng} id="btn"><AiOutlineExport/></button>
    );
}

export default Download;