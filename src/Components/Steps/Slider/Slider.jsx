import { select,format,symbol,symbolCircle } from 'd3';
import { sliderBottom } from 'd3-simple-slider';

const Slider = () =>{
 

    var sliderRange =
    sliderBottom()
    .min(0)
    .max(.999)
    .width(300)
    .tickFormat(format('.1%'))
    .ticks(5)
    .default([.25, .50])
    .fill('yellow')
    .handle(symbol().type(symbolCircle).size(550)());

    var gRange = select('div#slider-range')
    .append('svg')
    .attr('width', 500)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)');

    gRange.call(sliderRange);

    select('p#value-range').text(
        sliderRange
          .value()
          .map(format('.1%'))
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
                select('line.leftcolor').attr('stroke','red')
            }

        select('g.slider').append('line').attr('class','leftcolor')
        .attr('x1',leftX1).attr('x2',leftX2)
        .attr('stroke-width',4).attr('stroke-linecap','round');

    select('line.track-fill').attr('stroke','yellow')
    select('line.leftcolor').attr('stroke','red')
    select('line.track-inset').attr('stroke','green')
    }
  
  



    sliderRange .on('onchange', val => {
        fillSlider();
        select('p#value-range').text(val.map(format('.1%')).join('-'));
        // const tansitionDuration = 1000;
        //   let low = (val[0]*100).toFixed(2);
        //   let high = (val[1]*100).toFixed(2);
            //     pathEnter.transition().duration(tansitionDuration).style("fill", function(d) {
            //   return myColor(c1Value(d),low,high);
            //         })
        })
    
    return (
          <div className="row align-items-center">
            <div className="col-sm-2"><p id="value-range"></p></div>
            <div className="col-sm"><div id="slider-range"></div></div>
        </div>
    );
}

export default Slider;