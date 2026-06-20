import Select from "@mui/material/Select";
import { useState } from "react"
import axios from 'axios'
import {LinearIndeterminate } from "../spinner";
export default function PDFTOWORD(){
let[file,setfile]=useState(null)
let[preview,setpreview]=useState(null);
let [open,setopen]=useState(false)
let[err,seterr]=useState(false);
let[msg,setmsg]=useState("");
let[url,seturl]=useState(null);
let[pass,setpass]=useState("")
let[enabledownload,setenabledownload]=useState(false)
let[stage ,setstage]=useState("");


async function download(){
  const link=document.createElement("a");
  link.href=url;
  link.download="convertedpdf";
  document.body.appendChild(link);
  link.click();
  link.remove();

}
async function handlesubmit(){
    setstage("generating")
const formData=new FormData();
formData.append("file", file);
formData.append("type","docx")
console.log(file)
    if(!file){
        alert("please select file");
return;
    }


try{
    const res=await axios.post("http://localhost:3000/users/pdftoword",formData,{
  withCredentials: true,
  responseType: "blob"
},{
         headers:{
      "Content-Type": "multipart/form-data",
        
    
    }})
seturl(URL.createObjectURL(res.data));
setpass("PDF converted Successfully")
seterr(true)
setenabledownload(true);
setstage("")

}
catch(e){
    setstage("")
    seterr(true)
setmsg("Internal server error");
}
}

    return(
      
        <div>
  {err && <p   className="fs-3 text-center"  style={{color:"red"}}>{msg}</p>}
       {err && <p className="fs-3 text-center" style={{color:"#3b82f6"}}>{pass}</p>}
        <div className=" input-group    d-flex flex-row justify-content-around">
 
      {open ?<iframe
  src={URL.createObjectURL(file)}
  width="400"
  height="500"
  title="PDF Preview"
/> :<div  className="d-flex justify-content-center  flex-column align-content-center">
             
            <h1  className="fs-1"   style={{color:"#c5e976"}}>PDF TO WORD</h1>
           <label className="fs-3 form-label">Convert PDF To docx in seconds. 
</label>
          <input
            className="form-control imageform form-control-lg"
            name="image"
            type="file"
           accept=".pdf,application/pdf"
            onChange={(e)=>{
               const selected = e.target.files[0];
  setfile(selected);

  setopen(true);

            }}
          />
       
        </div>}

        {open && 

<div className="d-flex flex-column gap-3">
  {enabledownload &&
        <button className="convertdbtn   fs-2" type="submit"   onClick={download} >
      Download file <i className="fa-solid fa-right-arrow"></i> 
        </button> }




<div>
    {stage==="generating" && <LinearIndeterminate></LinearIndeterminate>}
    <br></br>
{!enabledownload &&
      <button className="convertbtn   fs-2" type="submit"   onClick={handlesubmit} >
      Convert to docx  <i className="fa-solid fa-right-arrow"></i> 
        </button>}
      
        </div>
        </div>}
        
        
             </div>
             </div>
    )
}