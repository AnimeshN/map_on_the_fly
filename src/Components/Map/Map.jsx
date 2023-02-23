import { geoMercator ,geoPath,select,min,max } from 'd3';
import {useRef,useEffect} from 'react'
import './Map.css';
const Map = ( {boundary, width,height} ) => {
    const svgRef = useRef();

    const projection = geoMercator().fitSize([width, height], boundary);
	const pathGenerator = geoPath(projection);

 


  

    useEffect(()=>{
        const svg = select(svgRef.current);
        const g = svg.append('g');
        console.log(boundary)
        let c1Value  = d => d.properties.AREA_
        const mymin = min(boundary.features,c1Value);
        const mymax = max(boundary.features,c1Value);
        const comp = (mymax - mymin)/3;
        
    
        var myColor = v =>{
            if(v>=mymin && v < mymin + comp)
              return 'red';
            else if(v >= mymin+comp && v<mymax-comp)
              return 'yellow';
            else if(v >= mymax-comp)
              return 'green';
          }

        g
        .selectAll(".polygon")
        .data(boundary.features)
        .join("path").attr("class", "polygon") 
        .attr("d" ,feature => pathGenerator(feature))
        .style("fill", d =>{
            var value = d.properties.AREA_;
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
        .attr('font-size','6pt')
        .attr("font-family", "sans-serif");
    })

    return (
        <svg className = "svg-map" width={width} height={height} ref={svgRef} ></svg>
    )
}

export default Map;
