
import { useEffect, useState } from "react";
import { Link,useParams,useSearchParams } from "react-router-dom"
import Crop from "./editComponents/Crop";
import Adjust from "./editComponents/Adjust";
import Cropper from "react-easy-crop"
import axios from "axios";
import {CircularIndeterminate }from "./spinner";
import Resize from "./editComponents/Resize";
import Rotate from "./editComponents/Rotate";
import Compress from "./editComponents/Compress";
import Download from "./editComponents/Download";
export default function Transform(){
    const {imageId}=useParams();
     const[searchParams,setsearchParams]=useSearchParams()
      const width = searchParams.get("w");
    const height = searchParams.get("h");
    let[editType,setEditType]=useState(null)  
    let[err,seterr]=useState(false);
    let[msg,setMsg]=useState("");
    let[aspectratio,setaspectratio]=useState()
    let[previewurl,setpreviewurl]=useState(null)
    let[previewactive,setpreviewactive]=useState(false)
    let[stage,setStage]=useState("");
let[compressSize,setCompressSize]=useState(null);
let[opendownloadpanel,setdownloadpanel]=useState(false)
const [transform, setTransform] = useState({

  width:"",
  height:"",

  rotation: 0,

  
  cropPosition:{
    x:0,
    y:0
  },

  cropArea:null,
brightness:1,
saturation:1,
contrast: 1,

blur: 0,
quality:80,

  zoom: 1
});
let[saveState,setsaveState]=useState(false)
let[existingtransform,setexistingtransform]=useState(transform)
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
     setTransform(prev => ({

    ...prev,

    cropArea: croppedAreaPixels

  }))
    console.log("cropped area",croppedArea,"pixels", croppedAreaPixels)
  }
 async  function  handleSubmit(){
try{
const res= await axios.post("http://localhost:3000/users/savetransformedimage",{transform:transform,key:imageId},{withCredentials:true})
setsaveState(true);
setMsg(res.data.message)
}
catch(e){
setsaveState(true);
setMsg(e.response?.data?.message || "Something went wrong due to server Error")
}












  }
  const handleChange = (e) => {
  const { name, value } = e.target;

const showError = (message) => {
  seterr(true);
  setMsg(message);
  // setTimeout(() => {
  //   seterr(false);
  // }, 2000);
};

if (isNaN(value) || value === "") {
  showError("Please enter a number only");
  return;
}
else if (Number(value) === 0) {
  showError("Please enter the dimension");
  return;
}
else if (Number(value) > 4000) {
  showError("Cannot exceed 4000px");
  return;
}
else if(Number(value)<100){
  showError("Cannot be less than 100px")
  return;
}
else{

const updatedTransform = {
  ...transform,
  [name]: value
};

setpreviewactive(true);
setTransform(updatedTransform);

}

};

 async function previewImage(){

setStage("generating")

  await axios.post("http://localhost:3000/users/previewImage",{transform:transform,key:imageId},{
    responseType: "blob",
    withCredentials:true
  })
  .then((res)=>{
  
  if(previewurl){

  URL.revokeObjectURL(previewurl)

}

const imageUrl =
URL.createObjectURL(res.data)

setpreviewurl(imageUrl)
setMsg(res.data.message)
setCompressSize(res.data.size)
setStage("")
setpreviewactive(true)

  }).catch((err)=>{
  
    seterr(true)
  const status =
    err.response?.status;

  if(status === 401){

    setMsg("Dimensions cannot be empty or less than 100px");

  }

  else{
    setMsg("Internal server error!Please try again later")
  }
    setStage("")
setpreviewurl(null)
  })
}


 

    return (

        <div className="editor-section">
            <h1 className="mt-5 mb-5 fs-1 text-center">Transform Your Image</h1>

        {saveState &&    <p className="fs-2" style={{color:"#1a73e8"}}>{msg}</p>}
            <div className="tool-section mt-3 d-flex justify-content-around  ">
     
           <div className="btnforedit  d-flex gap-4">
             
            <button onClick={()=>setEditType("resize")} className={editType === "resize"? "active-tool" : ""} data-bs-toggle="tooltip" data-bs-placement="top" title="Resize"           ><i className="fa-solid fa-image"></i></button>  
                        <button onClick={()=>setEditType("crop")} className={editType === "crop" ? "active-tool" : ""}><i className="fa-solid fa-crop" data-bs-toggle="tooltip" data-bs-placement="top" title="Crop"></i> </button>
            <button onClick={()=>setEditType("adjust")} className={editType === "adjust" ? "active-tool" : ""}><i className="fa-solid fa-sliders" data-bs-toggle="tooltip" data-bs-placement="top" title="Adjust"></i> </button>
            <button onClick={()=>setEditType("rotate")} className={editType === "rotate" ? "active-tool" : ""}><i className="fa-solid fa-rotate"  data-bs-toggle="tooltip" data-bs-placement="top" title="Rotate"></i></button>
            <button onClick={()=>setEditType("compress")} className={editType==="compress"?"active-tool":""}><i className="fa-solid fa-file-zipper" data-bs-toggle="tooltip" data-bs-placement="top" title="Compress"></i></button>
            
           

</div>
<div className="d-flex gap-5">
     {previewactive &&     <button type="submit" className="savebtn  float-right " onClick={handleSubmit}>Save changes</button> } 

<     button className="downloadbtn mb-5"  onClick={()=>setdownloadpanel(!opendownloadpanel)}><i className="fa-solid fa-download"> </i>Download Image</button>
  {opendownloadpanel && <Download transform={transform} imageId={imageId} setMsg={setMsg} setsaveState={setsaveState}></Download>}
</div>
</div>


<div className="editor-layout d-flex gap-4 justify-content-around">



<div className="image-section  ">
       <div 
  className="transform-image mt-2 col-6"
style={{
 position: "relative",

  width: "900px",

  height: "700px",

  background: "#1f242e",

  borderRadius: "12px",

  overflow: "hidden",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  

  boxShadow:
    "0 0 25px rgba(0,0,0,0.5)"
 



}}
>
 
     {  editType==="crop" && aspectratio ? (
<Cropper
      image={
    previewurl
      ? previewurl
      : `https://pixelproject1045.s3.eu-north-1.amazonaws.com/${imageId}`
  }
      crop={transform.cropPosition}
      zoom={transform.zoom}
     aspect={Number(aspectratio)}
      onCropChange={(newCrop) =>
    setTransform((prev) => ({
      ...prev,
      cropPosition: newCrop
    }))
  }

  onZoomChange={(newZoom) =>
    setTransform((prev) => ({
      ...prev,
      zoom: newZoom
    }))
  }
      onCropComplete={onCropComplete}
     
    
    />
     )
     :(
   <img
  src={
    previewurl
      ? previewurl
      : `https://pixelproject1045.s3.eu-north-1.amazonaws.com/${imageId}`
  }

  alt="image"

  style={{

   
maxWidth:"90%",
maxHeight:"90%",
objectFit:"contain"

    


  }}
/>
     )}     
</div>

      </div>
               <div className="tool-panel">
                {
  editType==="crop"  &&
    <Crop 
  transform={transform}

  setTransform={setTransform}

  previewImage={previewImage}

  stage={stage}
  aspectratio={aspectratio}
  setaspectratio={setaspectratio}
  
  ></Crop>
  
}




{editType==="resize" &&
<Resize   handleChange={handleChange}
previewImage={previewImage}
stage={stage} err={err} msg={msg}></Resize>
}

{
  editType==="adjust" &&
  <Adjust   transform={transform}

  setTransform={setTransform}

  previewImage={previewImage}

  stage={stage}
></Adjust>

}




            

{editType==="rotate" &&
<Rotate setTransform={setTransform} previewImage={previewImage}
transform={transform} stage={stage}></Rotate>


}
{editType=="compress"   && 
<Compress previewImage={previewImage} compressSize={compressSize} stage={stage}
transform={transform} setTransform={setTransform}></Compress>



}
</div>    
</div>

            
              

        </div>
    )
}