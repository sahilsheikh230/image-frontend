import { CircularIndeterminate } from "../spinner"
export default function Crop({
  transform,

  setTransform,

  previewImage,

  stage,
aspectratio,setaspectratio}){
  return(
    <div className="container  ">
                <h1>Crop Image</h1>
                      <div>
                     <label className="fs-3">
        Aspect Ratio
        <br></br>
         <select
      value={aspectratio}
    
      onChange={(e) =>
        setaspectratio(e.target.value)
      }
    
      className="fs-2"
    
      style={{
        background: "black",
        color: "white"
      }}
    >
    
      <option value="">
        Select aspect ratio
      </option>
    
      <option value={9/16}>
        Portrait (9:16)
      </option>
    
      <option value={4/3}>
        Landscape (4:3)
      </option>
    
      <option value={1/1}>
        Square (1:1)
      </option>
    
    </select>
        </label>
        </div>
          <div>
            <label htmlFor="zoomrange" className="form-label mt-5 fs-1">Zoom Image</label>
    <input type="range" id="zoomrange" className="form-range" min={1} max={3} step={0.1} value={transform.zoom} onChange={(e) =>
          setTransform((prev) => ({
            ...prev,
            zoom: Number(e.target.value)
          }))
    }></input>
     <br>
     </br>
       {stage==="generating" && (<CircularIndeterminate></CircularIndeterminate>)}
    <button  className="fs-3 mt-3  previewbtn"  onClick={previewImage}>Crop and Preview</button>
    
              </div>
    
    
    
               
                 
            </div>
  )
}