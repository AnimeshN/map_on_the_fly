import { geoMercator ,geoPath,select,min,max,scaleQuantize,format } from 'd3';
import { Legend } from "./Legend/Legend";
import { legendColor } from 'd3-svg-legend'

import {useEffect} from 'react'

import './Map.css';
const Map = ( {boundary, width,height,svgRef,legendRef} ) => {
    // console.log(boundary)
    // let [mapData, setMapData] = useState(boundary);
    const aspect = (width / height) ;
    const adjustedHeight = Math.ceil(width / aspect);
   
    let c1Value  = d => d.properties.values

    const mymin = min(boundary.features,c1Value);
    const mymax = max(boundary.features,c1Value);
    const comp = (mymax - mymin)/3;
    let low = mymin + comp;
    let high = mymax - comp;
  
    useEffect(()=>{
        const projection = geoMercator().fitSize([width, height-50], boundary);
        const pathGenerator = geoPath(projection);
        

        const svg = select(svgRef.current);
        const legend = select(legendRef.current);
        svg.select("*").remove();
        svg.attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox",  `0 0 ${width} ${adjustedHeight}`)
        const g = svg.append('g');
   
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
        // let fontScale = scaleLinear().domain(areaExtent).range([16,10])

        g
        .selectAll(".polygon")
        .data(boundary.features)
        .join("path").attr("class", "polygon") 
        .attr("d" ,feature => pathGenerator(feature))
        .style("fill", d =>{
            var value = d.properties.values;
            return myColor(value);
        })

        // let fx = g.selectAll("text").data(boundary.features)
        // .enter().append("text")
        // .text(d => d.properties.area_name)
        // .attr("x", function(d){
        //     return pathGenerator.centroid(d)[0];
        // })
        // .attr("y", function(d){
        //     return  pathGenerator.centroid(d)[1];
        // })
        // .attr("text-anchor","middle")
        // // .attr('font-size',d => fontScale(d.properties.AREA_)+"px")
        // .attr('font-size',"20px")
        // .attr("font-family", "sans-serif")



        g.selectAll('text')
        .data(boundary.features).enter()
        .append('text')
        .attr("x", function(d){
            return pathGenerator.centroid(d)[0];
        })
        .attr("y", function(d){
            return  pathGenerator.centroid(d)[1];
        })
        .call(
          text => text.append('tspan')
            .attr('font-size',"20px")
            .attr("text-anchor","middle")
            // .attr('dy', -1)
            .text(d => d.properties.area_name)
        ).call(
            text => text.append('tspan')
              .attr('dy', 30)
              .attr('dx', -35)
              .attr("text-anchor","middle")

              .attr('font-size',"30px")
            .style('font-weight', 'bold')

              .text(d => d.properties.values)
          )

        //   let colourScale = scaleQuantize().domain([low, high]).range(["#FF0000", "#FFFF00", "#006400"])
          

        //   let formatter = format(".1f");
        //   let myLegend;
        //   myLegend = legendColor()
        //   .labelFormat(formatter)
        //   .title('Percent')
        //   .titleWidth(180)
        //   .scale(colourScale);
          
        //   legend.select(".legendQuant")
        //   .call(myLegend)
        //   .style("font-size", "14px");



    },[boundary])

 

    return (
        // <div className='relative  w-full pb-3 pt-1 pr-3' id="svgMap" ref={componentRef}>
        <div id="svgMap" >
            <svg className = "svg-map" ref={svgRef} ></svg>
            <div style={{ position:"relative", marginTop:"-15rem", float:"right", marginRight:"5rem"}}>
                <h4>Legend</h4>
                <div style={{display:"flex"}}><svg width="25" height="25" transform="translate(0,0)"><circle cx="12" cy="12" r="10" fill="red" stroke="black" stroke-width=".5" ></circle></svg><div  style={{ marginLeft:"5px", display:"inline"}}>{mymin}-<span id="low">{low-1}</span></div></div>
                <div style={{display:"flex"}}><svg width="25" height="25" transform="translate(0,0)"><circle cx="12" cy="12" r="10" fill="yellow" stroke="black" stroke-width=".5"></circle></svg><span style={{ marginLeft:"5px"}}><span id="mlow">{low}</span>-<span id="mhigh">{high-1}</span></span></div>
                <div style={{display:"flex"}}><svg width="25" height="25" transform="translate(0,0)"><circle cx="12" cy="12" r="10" fill="green" stroke="black" stroke-width=".5"></circle></svg><span style={{ marginLeft:"5px"}}><span id="high">{high}</span>-{mymax}</span></div>
            </div>


        </div>
        // <div>
    )
}

export default Map;
