import Papa from "papaparse";
import Slider from './Slider/Slider';
import Download from './Download/Download';

const Steps = ({setData,mapRef}) =>{
    
  
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
   
    return (
        <div style={{ textAlign: "center" }}>
            <form>
                <input
                    type={"file"}
                    id={"csvFileInput"}
                    accept={".csv"}
                    onChange={handleOnChange}
                />

            </form>
            <Slider mapRef={mapRef}></Slider>
            <Download mapRef={mapRef}></Download>
        </div>
    );
}

export default Steps;