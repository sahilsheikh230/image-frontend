import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useResolvedPath } from "react-router-dom";
export default function Gallery({images}) {
  let [msg, setmsg] = useState("");

  let [pass, setpass] = useState(false);
let[preview,setPreview]=useState(null)
let[openedImage,setopenedImage]=useState(null)
let[width,setwidth]=useState(null)
let[height,setheight]=useState(null)

  // useEffect(() => {
  //   async function fetchImages() {
  //     try {
  //       const res = await axios.get(
  //         "http://localhost:3000/users/getImages",
  //         { withCredentials: true }
  //       );

  //       setImages(res.data.images);
  //       setImageSize(res.data.totalSize)
  //     } catch (err) {
  //       setmsg(err.response?.data?.message);
  //       setpass(true);
  //     }
  //   }

  //   fetchImages();
  // }, []);
async function  deleteImage(key){
  console.log("called delete",key)
 const confirmDelete = window.confirm("Are you sure you want to delete this image?");

  if (!confirmDelete) return;
  try{
    const res= await axios.post("http://localhost:3000/users/deleteImage",{key},{withCredentials:true})
setmsg(res.data.message);

setpass(true)
 

  }
  catch(err){
    setpass(true)
setmsg(err.response?.data?.message);
  }
}

function openImage(key,url,width,height){
  setPreview(url)
  setopenedImage(key)
  setwidth(width)
  setheight(height)
}
  return (
    <div className="gallery">
      <h1 className="mt-3">Your Images</h1>
      <h3 className="mt-5">Recently uploaded</h3>

      {pass && <p  className="fs-4"    style={{ color: "red" }}>{msg}</p>}

     <div className="img-container  mt-5 d-flex flex-wrap gap-3">
  {images.map((image, index) => (
    <div key={index} style={{ textAlign: "center" }} className="img-card">
      
      <img    onClick={()=>openImage(image.key,image.url,image.dimensions.width,image.dimensions.height)}
        src={image.url}   
        style={{
          width: "200px",
          height: "200px",
          objectFit: "cover",
          borderRadius: "10px"
        }}
      />
      <button  className=" btn btn-danger deletebtn"     onClick={()=>deleteImage(image.key)}>Delete</button>

      <p style={{ marginTop: "5px", fontSize: "14px" }}>
        {image.size
          ? `${(image.size / 1024).toFixed(2)} KB`
          : "No Size"}
      </p>

    </div>
  ))}
</div>
{preview && <div className="modal" onClick={()=>setPreview(null)}>
  <div>
  <img src={preview} alt="image"></img>
  </div>
  <div>
  <button className="transform mt-4 fs-3"><Link to={`/transform/${openedImage}?w=${width}&h=${height}`} style={{textDecoration:"none",color:"#181a18"}} ><i className="fa-solid fa-plus"></i> Transform With Pixel</Link></button>
  </div></div>}
    </div>
  );
}