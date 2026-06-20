import Select from "@mui/material/Select";
import { useState } from "react"
import axios from 'axios'

export default function JPGTOPDF(){
let[file,setfile]=useState(null)
let[preview,setpreview]=useState(null);
let [open,setopen]=useState(false)
let[oreintation,setorientation]=useState(null);
let[size,setsize]=useState("")
let[err,seterr]=useState(false);
let[msg,setmsg]=useState("");
let[url,seturl]=useState(null);
let[pass,setpass]=useState("")
let[enabledownload,setenabledownload]=useState(false)



async function download(){
  const link=document.createElement("a");
  link.href=url;
  link.download="convertedpdf";
  document.body.appendChild(link);
  link.click();
  link.remove();

}
async function handlesubmit(){
const formData=new FormData();
formData.append("file", file);
formData.append("oreintation", oreintation);
formData.append("size", size);

    if(!file){
        alert("please select file");
return;
    }
if(!oreintation){
    alert("please select orientation");
return;
}

try{
    const res=await axios.post("http://localhost:3000/users/jpgtopdf",formData,{
  withCredentials: true,
  responseType: "blob"
},{
         headers:{
      "Content-Type": "multipart/form-data",
        
    
    }})
seturl(URL.createObjectURL(res.data));
setpass("Image converted Successfully")
seterr(true)
setenabledownload(true);


}
catch(e){
    seterr(true)
setmsg(e.response?.data?.message);
}
}

    return(
      
        <div>
  {err && <p   className="fs-3 text-center"  style={{color:"red"}}>{msg}</p>}
       {err && <p className="fs-3 text-center" style={{color:"#3b82f6"}}>{pass}</p>}
        <div className=" input-group    d-flex flex-row justify-content-around">
 
      {open ?<img src={preview} style={{width:"600px", height:"600px"}}></img>  :<div  className="d-flex justify-content-center  flex-column align-content-center">
             
            <h1  className="fs-1"   style={{color:"#c5e976"}}>JPG TO PDF</h1>
           <label className="fs-3 form-label">Convert JPG images to PDF in seconds. Easily adjust orientation and margins.
</label>
          <input
            className="form-control imageform form-control-lg"
            name="image"
            type="file"
            accept=".jpg, .jpeg, image/jpeg" 
            onChange={(e)=>{
               const selected = e.target.files[0];
  setfile(selected);
  setpreview(URL.createObjectURL(selected));
  setopen(true);

            }}
          />
       
        </div>}

        {open && 

<div className="d-flex flex-column gap-3">
  {enabledownload &&
        <button className="convertdbtn   fs-2" type="submit"   onClick={download} >
      Download PDF <i className="fa-solid fa-right-arrow"></i> 
        </button> }

<h1>Image to PDF options</h1>

<hr></hr>
<h4>Page Orientation</h4>
<div className="d-flex gap-3">
    <div>
<button     onClick={()=>setorientation("portrait")}className={oreintation==="portrait" ? "poreintation" : "oreintationbtn"} ><img width="32" height="80" src="https://img.icons8.com/parakeet-line/48/rectangle.png" alt="rectangle"/></button>
<p>Portrait</p>
</div>
<div>
<button    onClick={()=>setorientation("landscape")} className={oreintation=="landscape" ? "loreintation" : "oreintationbtn"}><img width="48" height="48" src="https://img.icons8.com/parakeet-line/48/rectangle.png" alt="rectangle"/></button>
<p>Landscape</p>
</div>

</div>
 <label  className="fs-2"    htmlFor="size">Page Size</label>
<div>
 
<select  value={size} onChange={(e)=>setsize(e.target.value)}
name="size" id="size" className="fs-2">
 <option value="">Same as image</option>
 <option value="A4">A4</option>
 <option value="US Letter">US Letter(215*297 mm)</option>
 
</select>
    </div>
<div>
{!enabledownload &&
      <button className="convertbtn   fs-2" type="submit"   onClick={handlesubmit} >
      Convert to PDF  <i className="fa-solid fa-right-arrow"></i> 
        </button>}
      
        </div>
        </div>}
        
        
             </div></div>
    )
}