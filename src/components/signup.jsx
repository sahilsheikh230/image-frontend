
import {useForm} from "react-hook-form";
import axios from "axios";


import { zodResolver } from '@hookform/resolvers/zod';
import {z} from "zod";
import { useEffect } from "react";
import { useState } from "react";
const RegistrationSchema = z.object({
  name: z.string().min(3, 'Username must be at least 3 characters long'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long').max(10,"Password cannot be greater than 10 characters" ),
 phone: z
.string()
.regex(/^\d{10}$/, { message: "Phone number must be 10 digits" }),
});


export default function Signup(){
    
    let[error,seterror]=useState(false);
    let [pass,setpass]=useState(false);
    let[message,setmessage]=useState("");

    const {register,handleSubmit,reset, formState: { errors }}=useForm({
         resolver:zodResolver(RegistrationSchema)
    })
    function submitForm(data){
    axios.post("http://localhost:3000/users/registeruser",data,{withCredentials:true}).then((res)=>{
        setmessage(res.data.message)
    setpass(true);
        setTimeout(() => {
             setpass(false)
        }, 1500);

       }).catch((err)=>{
        setmessage(err.response?.data?.message)
        seterror(true)
        reset()
    setTimeout(() => {
             seterror(false)
        }, 1500);
        
       
    })

}










    return (
<div>
 {pass && <p  className="fs-2 text-center" style={{ color: "#a8e6cf" }}>{message}</p>}

        <div className=" signupcard container  ">


 {error && <p className="fs-3" style={{ color: "red" }}>{message}</p>}


            <form onSubmit={handleSubmit(submitForm)}>
                <h1 style={{color:"#fecd45"}}>SignUp to Get Started</h1>
        
<div className="col-8   mt-5">
    <div >
    <label htmlFor="name" className="fs-4 inputlabel ">Enter Username</label>
    <input {...register("name")} id="name" className="mb-3 inputform"></input>
    {errors.name && <p className="error">{errors.name.message}</p>}
    </div>
    <div>
     <label htmlFor="email" className="fs-4 inputlabel">Enter Email</label>
    <input {...register("email")} id="email" className="mb-3 inputform"></input>
    {errors.email && <p className="error">{errors.email.message}</p>}
    </div>
    <div>
     <label htmlFor="password" className="fs-4 inputlabel">Enter Password</label>
    <input {...register("password")} id="password" className="mb-3 inputform"></input>
    {errors.password && <p className="error">{errors.password.message}</p>}
    </div>
    <div>
     <label htmlFor="phone" className="fs-4 inputlabel">Enter Phone</label>
    <input {...register("phone")} id="phone" className="mb-3 inputform"></input>
    {errors.phone && <p className="error">{errors.phone.message}</p>}
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