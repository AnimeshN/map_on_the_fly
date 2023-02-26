import Papa from "papaparse";

const Steps = ({setData}) =>{
    
    // const createDict = array =>{
    //     array.map(a =>{
    //         console.log(a[0],a[1])
    //     })
    // }
    const handleOnChange = (e) => {
        const files = e.target.files;
        if (files) {
            console.log(files)
          Papa.parse(files[0], {
            header: true,
            complete: function(results) {
                // const formatedData = createDict(results.data);
                setData(results.data)

                console.log(results.data)
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