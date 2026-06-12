import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import axios from "axios";
import Context from "../../Config/Config";

const Login = () => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const { settoken } = useContext(Context)
    const navigate = useNavigate();



    const handle_login = async () => {
        try {

            const sending_data = await axios.post("http://localhost:4000/api/user/login", { email, password });

            if (sending_data.data.sucess) {

                toast.success('login successfully...')
                await settoken(sending_data.data.token);
                localStorage.setItem('token', sending_data.data.token);
                navigate('/home');

            } else {

                toast.error('User does not exists')
                navigate('/create-account');

            }

        } catch (error) {
            alert(error.message)

        }
    };


   






    return (
        <>
            <div className="h-fit  w-full  p-5 pt-28">
                <div className="h-fit w-full  p-5 flex justify-center">
                    <center className="h-[400px] w-[400px] p-2 border-2  rounded-lg shadow-md shadow-gray-400">
                        <h1 className="text-[20px] text-center">LOGIN___</h1>
                        <input type="text" className=" w-[350px] h-[40px] border-2 border-black mt-2 pl-2" placeholder="Enter Email..." onChange={(e) => setemail(e.target.value)} />
                        <input type="text" className=" w-[350px] h-[40px] border-2 border-black mt-2 pl-2" placeholder="Enter Password..." onChange={(e) => setpassword(e.target.value)} />
                        <div className="h-fit w-[350px] mt-2 flex justify-between">
                            <p>Forget Password</p>
                            <Link to='/create-account'> <p>Create Account</p> </Link>
                        </div>
                        <button className="h-[40px] w-[120px] border-2 border-black mt-2 bg-black text-white" onClick={handle_login}>Login</button>

                    </center>
                </div>

            </div>


        </>
    )
};

export default Login;