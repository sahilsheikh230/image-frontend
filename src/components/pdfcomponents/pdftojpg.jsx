import Select from "@mui/material/Select";
import { useState } from "react"
import axios from 'axios'
import {LinearIndeterminate } from "../spinner";
export default function PDFTOJPG(){
let[file,setfile]=useState(null)
let[preview,setpreview]=useState(null);
let [open,setopen]=useState(false)
let[err,seterr]=useState(false);
let[msg,setmsg]=useState("");
let[url,seturl]=useState(null);
let[pass,setpass]=useState("")
let[enabledownload,setenabledownload]=useState(false)
let[stage ,setstage]=useState("");
let[selected,setselected]=useState("page");

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
formData.append("selected",selected)
console.log(file)
    if(!file){
        alert("please select file");
return;
    }


try{
    const res=await axios.post("http://localhost:3000/users/pdftojpg",formData,{
  withCredentials: true,
  responseType: "blob"
},{
         headers:{
      "Content-Type": "multipart/form-data",
        
    
    }})
seturl(URL.createObjectURL(res.data));
setpass("PPT converted Successfully")
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
             
            <h1  className="fs-1"   style={{color:"#c5e976"}}>PDF to JPG</h1>
           <label className="fs-3 form-label"> Convert each PDF page into a JPG or extract all images contained in a PDF. 
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
      Download PDF <i className="fa-solid fa-right-arrow"></i> 
        </button> }
<h1> SELECT PDF TO JPG OPTIONS</h1>


<div className={selected==="page"?"pdfsimple":""} style={{width:"400px",height:"100px",padding:""}}>
    <div>
<button onClick={()=>setselected("page")}>
<p className="fs-2" style={{color:"red"}}>PAGE TO PDF</p>
<p>Every page of this PDF will be converted into a JPG file.</p>
</button>
</div>
 {selected==="page"  &&
<div>
    <img width="48" height="48" src="https://img.icons8.com/fluency/48/checked.png" alt="checked"/>
    </div>
}
</div>
<br></br>
<div className={selected==="extract"?"pdfsimple":""} style={{width:"400px",height:"100px",padding:""}}>
<div>
<button  onClick={()=>setselected("extract")}>
<p className="fs-2" style={{color:"red"}}>EXTRACT IMAGES</p>
<p>All embedded images inside the PDF will be extracted as JPG images.</p>
</button>
</div>
 {selected==="extract"  &&
<div>
   <img width="48" height="48" src="https://img.icons8.com/fluency/48/checked.png" alt="checked"/>
    </div>}
</div>



<div>

    </div>

<div>
    {stage==="generating" && <LinearIndeterminate></LinearIndeterminate>}
    <br></br>
{!enabledownload &&
      <button className="convertbtn   fs-2" type="submit"   onClick={handlesubmit} >
      Convert to PDF  <i className="fa-solid fa-right-arrow"></i> 
        </button>}
      
        </div>

        </div>}
        
        
             </div></div>
    )
}