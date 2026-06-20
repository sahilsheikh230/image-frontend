
import axios from "axios"
import { useState } from "react"
export default function Download({transform,imageId,setMsg,setsaveState}){



  let[downloadformat,setDownloadFormat]=useState("")


  async function handleDownload(){
try{
  const res=await axios.post("http://localhost:3000/users/downloadImage",{transform:transform,format:downloadformat,key:imageId},
    {

      responseType:"blob",

      withCredentials:true
    }
  )
   const url =
  URL.createObjectURL(
    res.data
  )

  const link =
  document.createElement("a")

  link.href = url

  link.download =
  `edited-image.${downloadformat}`

  link.click()
  setsaveState(true);
  setMsg("Downloaded succesfully")
  setTimeout(()=>{
    setsaveState(false)
  },2000)
}
catch(e){
setsaveState(true);
setMsg(` from download err ${e} internal server error`)
}
  }
    return (
        <div className="download-panel">
            <h3>Download image</h3>
            <p className="fs-4 mt-2 " style={{color:"#fecd45"}} >Select format to download</p>
            <select

  value={downloadformat}

  onChange={(e)=>

     setDownloadFormat(
       e.target.value
     )
   }
>

  <option value="jpeg">

    JPEG

  </option>

  <option value="png">

    PNG

  </option>

  <option value="webp">

    WEBP

  </option>

</select>
<br></br>
<button className="mt-2 mb-3"   onClick={handleDownload}>Download</button>
        </div>
    )
}