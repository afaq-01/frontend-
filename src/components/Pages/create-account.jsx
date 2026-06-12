import { useState } from "react";
import axios from "axios";
import {toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Create_account=()=>{
    const[name,setname]=useState('');
    const[email,setemail]=useState('');
    const[password,setpassword]=useState('');
    const[token,settoken]=useState();

    const navigate=useNavigate();

    const handle_register=async()=>{
        try {

              const sending_data= await axios.post("http://localhost:4000/api/user/register", {name,email,password});
              if (sending_data.sucess) {
                settoken(sending_data.data.token);
                localStorage.setItem('token',token); 
              }
              else{
                alert('THE USER ALREADY EXISTS...!')
              }
            
        } catch (error) {
            
        }
      

        


    }

    return(
        <>
        <div className="h-fit  w-full  p-5 pt-28">
            <div className="h-fit w-full  p-5 flex justify-center">
                <center className="h-[300px] w-[400px] p-2">
                    <h1 className="text-[20px] text-center">CREATE ACCOUNT___</h1>
                    <input type="text" className=" w-[350px] h-[40px] border-2 border-black mt-2 pl-2"  value={name}  placeholder="Enter Name..."  onChange={(e)=>setname(e.target.value)}/>
                    <input type="text" className=" w-[350px] h-[40px] border-2 border-black mt-2 pl-2"  value={email}    placeholder="Enter Email..." onChange={(e)=>setemail(e.target.value)}/>
                    <input type="text" className=" w-[350px] h-[40px] border-2 border-black mt-2 pl-2"  value={password}  placeholder="Enter Password..." onChange={(e)=>setpassword(e.target.value)}/>
                    <div className="h-fit w-[350px] mt-2 flex justify-between">
                        <p>Forget Password</p>
                    </div>
                    <button className="h-[40px] w-[120px] border-2 border-black mt-2 bg-black text-white" onClick={handle_register}>Sign in</button>

                </center>
            </div>

        </div>
        
        
        </>
    )
};

export default Create_account;