import { Link } from "react-router-dom"

import axios from "axios";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
export default function Navbar(){
let[isLogged,setIsLogged]=useState(false);

const navigate=useNavigate()
useEffect(()=>{

  axios.get(

    "http://localhost:3000/users/isLogged",

    {

      withCredentials:true
    }
  )

  .then((res)=>{

    setIsLogged(true)

  })

  .catch(()=>{

    setIsLogged(false)

  })

},[])
  async function logoutUser(){
    try{

    const res =
    await axios.post(

      "http://localhost:3000/users/logoutUser",

      {},

      {

        withCredentials:true
      }
    )

    console.log(
      res.data.message
    )

  setIsLogged(false);
navigate("/login")
  }
  catch(err){

    console.log(err)
  }
  }
    return ( 
      
        <div className="container  sm d-flex justify-content-around  align-items-center gap-5  navbar mt-5 mb-5  ">
            
        <div className="text-center">
        <h1  style={{
         fontFamily: "Poppins, sans-serif",
          fontWeight: "700",
   fontSize: "28px"
}}>
<a href="/" style={{textDecoration:"none" }} className=""><h1 style={{ color: "#a7bc5b",textDecoration:"none" }}>PIXEL<sup>*</sup></h1>
 
  </a>  
</h1>
       </div> 
       
       <div className=" d-flex gap-5 navlink">


       <Link to="/" className="fs-3"><button>Home</button></Link>
    <Link to="/about" className="fs-3"><button>About</button></Link>
       {!isLogged &&  <Link to="/login" className="fs-3"><button>Login</button></Link>}
     <Link to="/signup" className="fs-3"><button>Signup</button></Link>
    { isLogged && <Link to="/logout" className="fs-3"> <button onClick={logoutUser}>Logout</button></Link>}
</div>
<div className="convert-container"   >
     <span className="convertpdf fs-4 ">CONVERT PDF  <i className="fa-solid mt-1 fa-chevron-down"></i></span>
     
<div className="pdfconversionlist  d-flex  justify-content-around gap-5" style={{background:"#47474F" ,padding:"10px 10px"}}>
  <div className="">
    <p className="fs-5" style={{color:"#fecd54"}}>CONVERT TO PDF</p>
<ul className="d-flex flex-column gap-3">
  <li>
<img width="25" height="25" src="https://img.icons8.com/papercut/60/jpg.png" alt="jpg"/><a href="/jpgtopdf">JPG to PDF</a>
  </li>
  <li>
  <img width="25" height="25" src="https://img.icons8.com/color/48/ms-word.png" alt="ms-word"/>  <a href="/wordtopdf">WORD to PDF</a>
  </li>
  <li>
  <img width="25" height="25" src="https://img.icons8.com/doodle/48/microsoft-powerpoint-2019.png" alt="microsoft-powerpoint-2019"/>  <a href="ppttopdf">PPT to PDF</a>
  </li>
<li>
  <img width="25" height="25" src="https://img.icons8.com/color/48/html-5--v1.png" alt="html-5--v1"/><a href="htmltopdf">HTML to PDF</a>
</li>
</ul>
  </div>
  <div>
<p className="fs-5" style={{color:"#fecd54"}}>CONVERT FROM PDF</p>
<ul className="d-flex flex-column gap-3">
 
    <li>
<img width="30" height="30" src="https://img.icons8.com/fluency/48/long-arrow-right.png" alt="long-arrow-right"/><img width="25" height="25" src="https://img.icons8.com/papercut/60/jpg.png" alt="jpg"/><a href="/pdftojpg">PDF to JPG</a>
  </li>
  <li>
  <img width="30" height="30" src="https://img.icons8.com/fluency/48/long-arrow-right.png" alt="long-arrow-right"/><img width="25" height="25" src="https://img.icons8.com/color/48/ms-word.png" alt="ms-word"/>  <a href="/pdftoword">PDF to WORD</a>
  </li>
  <li>
  <img width="30" height="30" src="https://img.icons8.com/fluency/48/long-arrow-right.png" alt="long-arrow-right"/><img width="25" height="25" src="https://img.icons8.com/doodle/48/microsoft-powerpoint-2019.png" alt="microsoft-powerpoint-2019"/>  <a href="pdftoppt">PDF to PPT</a>
  </li>

</ul>
  </div>
</div>
</div>
        </div>
    )
}