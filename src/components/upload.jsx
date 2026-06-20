import { useState,useEffect} from "react";
import axios from "axios";
import {CircularProgressWithLabel} from "./spinner";
import Gallery from "./Gallery";

export default function Upload() {
  const [file, setfile] = useState(null);
  const [fileerr, setfileerr] = useState(false);
const[imageSize,setimageSize]=useState(null);
const[images,setimages]=useState([])
  const [message, setMessage] = useState("");
  const [stage, setStage] = useState(""); 
  const [value, setvalue] = useState(0);
const[btnStatus,setbtnStatus]=useState("upload")
let [controller,setController]=useState(null)

async function cancelUpload(){
if(controller){
  controller.abort();
}
 setStage("");
  setMessage("Upload cancelled");
  setvalue(0);
  setbtnStatus("upload");
  setController(null)

}
   async function fetchImages() {
      try {
        const res = await axios.get(
          "http://localhost:3000/users/getImages",
          { withCredentials: true }
        );

    
        setimageSize(res.data.totalSize)
        
        setimages(res.data.images)
     
      } catch (err) {
        setMessage(err.response?.data?.message);
      
      }
    }
  useEffect(() => {
    fetchImages(); 
  }, []);


const getImageDimensions = (file) => {
  return new Promise((resolve, reject) => {

    const imageURL = URL.createObjectURL(file);

    const img = new Image();

    img.src = imageURL;

    img.onload = () => {

      resolve({
        width: img.width,
        height: img.height,
      });

      URL.revokeObjectURL(imageURL);
    };

    img.onerror = () => {
      reject("Invalid image");
setMessage("Invalid image");
      URL.revokeObjectURL(imageURL);
      return;
    };
  });
};




  async function handleSubmit(e) {
    e.preventDefault();

    if (!file) {
      setfileerr(true);
      return;
    }




const dimensions=await getImageDimensions(file)

console.log(dimensions)






setbtnStatus("cancel")
    try {
      const abortController = new AbortController();
setController(abortController);
    
      setStage("generating");
      setMessage("Generating upload URL...");

      const res = await axios.post(
        "http://localhost:3000/users/uploadfile",
        {
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
         
        },
        { withCredentials: true }
      );

     
      setStage("uploading");
      setMessage("Uploading image...");

      try {
        await axios.put(res.data.url, file, {
          headers: {
            "Content-Type": file.type
          },
          signal:abortController.signal,
          onUploadProgress: (e) => {
            const percent = Math.round((e.loaded * 100) / e.total);
            setvalue(percent);
          }
        });
      } catch (err) {

       if (err.name === "CanceledError") {
    setStage("cancelled");
    setMessage("Upload cancelled");
       }
       else if (err.response) {
          setMessage("Upload failed (server error)");
        } else if (err.request) {
          setMessage("Network issue during upload");
        } else {
          setMessage("Upload failed");
        }

        return; 
      }

      setStage("saving");
      setMessage("Saving image...");

      try {
        const res3 = await axios.post(
          "http://localhost:3000/users/saveImage",
          { key: res.data.key,size:file.size,dimensions:dimensions},
          { withCredentials: true }
        );

        setStage("done");
        setMessage(res3.data.message);
        setvalue(100);
           setfile(null)
           setbtnStatus("upload")
      } catch (err) {
        setStage("save-error");
        setMessage("Uploaded to S3 but failed to save in database");
      }

    } catch (err) {
      setStage("url-error");
      setMessage(err.response?.data?.message || "Failed to generate upload URL");
    }

    
    setTimeout(() => {
      setStage("");
      setvalue(0);
    }, 2000);
 
  }

  return (
    <div className=" d-flex gap-5">
      <div className=" col-4 d-flex  gap-5 mt-5 mx-5  fileuploadcontainer flex-column">

        <div className="">
      <form onSubmit={handleSubmit} encType="multipart/form-data">

        {fileerr && (
          <p className="fs-3" style={{ color: "red" }}>
            Please Select image
          </p>
        )}

        {message && (
          <p className="fs-3 text-center">{message}</p>
        )}
         {stage && (
          <p className="fs-5 text-center">{stage}</p>
        )}
        

        {stage === "uploading" && (
          <CircularProgressWithLabel value={value} />
        )}

        <div className="mb-3 mt-5 mx-5 uploadimage">
          <label className="fs-3 form-label">Upload Your image</label>
          <input
            className="form-control imageform form-control-lg"
            type="file"
            onChange={(e) => {setfile(e.target.files[0]);
              setfileerr(false)}}
          />
        </div>
<div className="text-center fs-4">
     {btnStatus==="upload" &&   <button className="uploadbtn  mx-5" type="submit"  >
      <i className="fa-solid fa-upload"></i>    Upload
        </button>}
   {btnStatus==="cancel"  &&   <button className="btn btn-danger cancelbtn  mx-5"  type="button" onClick={cancelUpload}>
     <i className="fa-regular fa-ban"></i>   Cancel
        </button>}
        </div>
      </form>
      </div>
      <div className="mt-5 mx-4 stats">
<h2 className="status-text"> <i className="fa-regular   fa-chart-bar"></i> Your stats</h2>
<div className=" mt-5 d-flex gap-5">
<div>
  <h4>Total Images</h4>
  <p>{images.length}</p>
</div>
<div>
  <h4>Total Size</h4>
  <p> {imageSize
    ? `${(imageSize / (1024 * 1024)).toFixed(2)} MB`
    : "0 MB"}</p>
  </div>
</div>
      </div>
      </div>
      <div className="col-8 mt-5">
      <Gallery images={images}></Gallery>
      </div>
    </div>
  );
}