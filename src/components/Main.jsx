
import { Link } from "react-router-dom"
import axios from "axios"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Main(){
let[err,seterr]=useState(false)
let[message,setmessage]=useState("");
let[pass,setpass]=useState(false)
const navigate=useNavigate();
function verify(){
  axios.get("http://localhost:3000/users/isLogged", {
    withCredentials: true
  })
  .then((res)=>{
    setpass(true)
    setmessage(res.data.message)
    console.log("login")
    setTimeout(()=>{
 navigate("/dashboard");
    },1000)
   
  })
  .catch((err)=>{
    setpass(false);
    seterr(true);
    console.log(err.response?.data?.message)
    setmessage(err.response?.data?.message);
    setTimeout(() => {
      navigate("/login")
    },1000);
  })
}



    return (
  <div className=" d-flex input-group   offset-2" style={{
    
  }}>
    
   <div className="  d-flex flex-column ">
      {err && <p className="fs-3" style={{ color: "red" }}>{message}</p>}
      {pass && <p className="fs-3" style={{ color: "green" }}>{message}</p>}
    <div>
    <h1 className="custom">Customise your images</h1>
    <h2 className="custom2">Upload. Transform. Deliver.</h2>
   < p style={{ color: "#94A3B8", marginTop: "20px", fontSize: "18px" }}>
    Powerful Image Processing in the Cloud — Upload, Transform, and Deliver images instantly.
  </p>
  </div>
   <div >
  <button className=" getbtn" onClick={verify} >Get Started</button>
  </div>
   </div>
   
</div>
    )
}