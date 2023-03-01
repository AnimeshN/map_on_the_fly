import Papa from "papaparse";

const Steps = ({setData}) =>{
    
  
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
        </div>
    );
}

export default Steps;