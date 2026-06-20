
import { CircularIndeterminate } from "../spinner"

export default function Resize({handleChange,previewImage,stage,err,msg}){
    return(
        
         <div className="crop d-flex flex-column  gap-5 mt-5">
                
                        <div>
                        <label htmlFor="width" className="fs-3">Width:</label> 
                        <br></br>
                        <input id="width" name="width"  className="fs-4" onChange={handleChange}></input>
                        </div>
                        <div>
                        <label htmlFor="height" className="fs-3">Height:</label> 
                        <br></br>
                        <input id="height" name="height" className="fs-4"  onChange={handleChange}></input>
                    </div>
                     {stage==="generating" && (<CircularIndeterminate></CircularIndeterminate>)}
            
               {err && <p className="fs-3" style={{color:"red"}}>{msg}</p>}
                  
            <button className="fs-3 mt-1 previewbtn"      onClick={previewImage}>Preview image</button>
                    
                    </div>
    )
}