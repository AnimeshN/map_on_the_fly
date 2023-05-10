import { select,format,symbol,symbolCircle } from 'd3';
import { sliderBottom } from 'd3-simple-slider';
import { useEffect } from 'react';
import {useRef,useState} from 'react'

const Slider = ({mapRef,myextent,width,setMinMax,checked}) =>{
    let [mMin,setMMin] = useState(0)
    const previousValueRef = useRef(null);

    const sliderRef = useRef();
    
    useEffect(()=>{
        let mymin, mymax;
        
        console.log(previousValueRef,'previous')
        if(myextent[0]){
            mymin = myextent[0];
            mymax = myextent[1];
        }
        // if(previousValueRef.current){
        //     mymin = previousValueRef.current[0];
        //     mymax = previousValueRef.current[1];
        // }
        else{
            mymin = 0;
            mymax = 100;
        }
        const slider = select(sliderRef.current);
        slider.select("*").remove();
        let sliderRange;
        console.log(sliderRange,'ll')
        sliderRange =
        sliderBottom()
        .min(mymin)
        .max(mymax)
        .width(width*.13)
        .tickFormat(format('.2f'))
        .ticks(5)
        .default([(mymax-mymin)*.25,(mymax-mymin)*.75])
        .fill('yellow')
        .handle(symbol().type(symbolCircle).size(550)());
    
        // var gRange = select('div#slider-range')
        // .append('svg')
        // .attr('width', 500)
        // .attr('height', 100)
        // .append('g')
        // .attr('transform', 'translate(30,30)');
        let g = slider.append("g").attr('transform', 'translate(50,30)')
    
        // gRange.call(sliderRange);
        g.call(sliderRange)

        //******** */
        select('p#value-range').text(
            sliderRange
              .value()
              .map(format('.2f'))
              .join('-')
          );
    
        let fillSlider;
        if(select('line.track-inset')._groups[0][0]){
            let leftX1 = select('line.track-inset').attr("x1");
            let leftX2 = select('line.track-fill').attr("x1")-15;
            fillSlider = () =>{
                leftX2 = select('line.track-fill').attr("x1")-15;
                select('line.leftcolor').attr('x2',leftX2);
                if(leftX2<0)
                    select('line.leftcolor').attr('stroke','rbg(0,0,0,0)')
                else
                    if(checked)
                        select('line.leftcolor').attr('stroke','green')
                    else
                        select('line.leftcolor').attr('stroke','red')

                }
    
            select('g.slider').append('line').attr('class','leftcolor')
            .attr('x1',leftX1).attr('x2',leftX2)
            .attr('stroke-width',4).attr('stroke-linecap','round');
    
        select('line.track-fill').attr('stroke','yellow')
        
        if(checked){
            select('line.leftcolor').attr('stroke','green')
            select('line.track-inset').attr('stroke','red')
        }
            
        else{
            select('line.leftcolor').attr('stroke','red')
            select('line.track-inset').attr('stroke','green')
        }
        }
        const svgMap = select(mapRef.current);
      
        const c1Value = d => d.properties.values;
    
        var myColor = (v,low,high) =>{
            if(v<=low)
              return 'red';
            else if(v >= low && v <= high)
              return 'yellow';
            else if(v>high)
              return 'green';
          }
          var myColorFlip = (v,low,high) =>{
            if(v<=low)
              return 'green';
            else if(v >= low && v <= high)
              return 'yellow';
            else if(v>high)
              return 'red';
          }        
      sliderRange.on('onchange', val => {
            fillSlider();
            const tansitionDuration = 1000;
            let low = (val[0]).toFixed(2);
            let high = (val[1]).toFixed(2);
            select('p#value-range').text(val.map(format('.2f')).join('-'));
            select('#low').text((val[0]-.1).toFixed(2));
            select('#mlow').text(val[0].toFixed(2));
            select('#mhigh').text((val[1]-.1).toFixed(2));
            select('#high').text(val[1].toFixed(2));
            
            svgMap.select('g').selectAll(".polygon").transition().duration(tansitionDuration).style("fill",d=>{
                if(checked)
                    return myColorFlip(c1Value(d),low,high)
                else
                    return myColor(c1Value(d),low,high)

            })
    
        })
        sliderRange.on('drag',()=>{
            console.log(sliderRange.value(),'out')
        })
        previousValueRef.current = sliderRange.value();
    },[checked,myextent])

   
    return (
          <div>
            <svg className = "svg-slider" width={width*.2} height={100}  ref={sliderRef} ></svg>
            {/* Min:<input value='5'></input> */}
            <div className="col-sm-2"><p id="value-range"></p></div>
            {/* <div className="col-sm"><div id="slider-range"></div></div> */}
        </div>
    );
}

export default Slider;