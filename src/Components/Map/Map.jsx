import { geoMercator ,geoPath,select,min,max,extent,scaleLinear,geoBounds } from 'd3';
import {useEffect, useState} from 'react'

import './Map.css';
const Map = ( {boundary, width,height,data,svgRef,dimensions} ) => {
    let [mapData, setMapData] = useState(boundary);
    const aspect = width / height;
    const adjustedHeight = Math.ceil(width / aspect);
   

    // useEffect(() =>{
    //     if(data){
    //         data.forEach(d => {
    //             boundary.features.forEach(b =>{
    //                 if(b.properties.NAME2_ === d[0]){
    //                     b.properties.data = d[1];
    //                 }
    //             })
    //             setMapData(boundary)
    //         })
    //     }
    // },[data,boundary])

  
    useEffect(()=>{
        console.log(boundary,geoBounds(boundary),mapData)
        const projection = geoMercator().fitSize([width, height], boundary);
        const pathGenerator = geoPath(projection);
        

        const svg = select(svgRef.current);
        svg.select("*").remove();
        svg.attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox",  `0 0 ${width} ${adjustedHeight}`)
        const g = svg.append('g');
        let c1Value  = d => d.properties.data
        const mymin = min(boundary.features,c1Value);
        const mymax = max(boundary.features,c1Value);
        const areaExtent = extent(boundary.features,d => d.properties.AREA_)
        const comp = (mymax - mymin)/3;
    
        let myColor = v =>{
            if(v){
                if(v>=mymin && v < mymin + comp)
                return 'red';
              else if(v >= mymin+comp && v<mymax-comp)
                return 'yellow';
              else if(v >= mymax-comp)
                return 'green';
            }else{
                return "white";
            }
          
          }
        let fontScale = scaleLinear().domain(areaExtent).range([16,10])

        g
        .selectAll(".polygon")
        .data(boundary.features)
        .join("path").attr("class", "polygon") 
        .attr("d" ,feature => pathGenerator(feature))
        .style("fill", d =>{
            var value = d.properties.data;
            return myColor(value);
        })

        g.selectAll("text").data(boundary.features)
        .enter().append("text")
        .text(d => d.properties.NAME2_)
        .attr("x", function(d){
            return pathGenerator.centroid(d)[0];
        })
        .attr("y", function(d){
            return  pathGenerator.centroid(d)[1];
        })
        .attr("text-anchor","middle")
        // .attr('font-size',d => fontScale(d.properties.AREA_)+"px")
        .attr('font-size',"12px")
        .attr("font-family", "sans-serif");
    },[boundary])

    return (
        // <div className='relative  w-full pb-3 pt-1 pr-3' id="svgMap" ref={componentRef}>
        <div id="svgMap">
            <svg className = "svg-map" ref={svgRef} ></svg>

        </div>
        // <div>
    )
}

export default Map;
