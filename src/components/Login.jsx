
import {useForm} from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from "zod";
import { useEffect, useState } from "react";
import axios from "axios";
const loginSchema = z.object({

  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),

});


export default function Login(){



    let[status,setstatus]=useState(null);
    let [message,setmessage]=useState("");

    const {register,handleSubmit, reset,formState: { errors }}=useForm({
        resolver:zodResolver(loginSchema)
    })
    
    function submitForm(data){
axios.post("http://localhost:3000/users/loginuser",data,{withCredentials:true})
.then((res)=>{
    console.log("fired",res)
    setmessage(res.data.message);
    setstatus("success");
    reset()
    setTimeout(()=>{
setstatus(null)
    },1500)

})
.catch((err)=>{
     console.log("fired",err)
    setmessage(err.response?.data?.message);
    setstatus("error")
        setTimeout(()=>{
setstatus(null)
    },1500)
})
}
 return (
<div>

     {status=="success" && <p  className="fs-2 text-center" style={{ color: "#a8e6cf" }}>{message}</p>}
        <div className=" signupcard container  mt-5">

     {status=="error" && <p  className="fs-3 text-center" style={{ color: "red" }}>{message}</p>}
            <form onSubmit={handleSubmit(submitForm)}>
                <h2  style={{color:"#fecd45"}} className=" mb-4">Welcome Back to PIXEL</h2>
                <p className="text-center" style={{ color: "#ffffff" }}>
  Please enter your credentials to continue
</p>
<div className="col-6  mt-5">
    <div>
     <label htmlFor="email" className="fs-4 inputlabel">Enter Email</label>
    <input {...register("email")} id="email" className="mb-3 inputform" ></input>
    {errors.email && <p className="error">{errors.email.message}</p>}
    </div>
    <div>
     <label htmlFor="password" className="fs-4 inputlabel">Enter Password</label>
    <input {...register("password")} id="password" className="mb-3 inputform"></input>
    {errors.password && <p className="error">{errors.password.message}</p>}
    </div>
   
    <div className="">
    <button type="submit" className="inputbtn">Submit</button>
</div>
</div>

  </form>

</div>
</div>

    )
}