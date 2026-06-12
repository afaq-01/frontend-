import { useContext, useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { FaCartShopping } from "react-icons/fa6";
import { IoPersonOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";


import {assets} from "../data/assets/frontend_assets/assets";
import Context from "../../Config/Config";

const Nav2 = () => {

    const { setinput, cart_lenght, removing_token } = useContext(Context);
    const [state, setstate] = useState(true);
    const [state2, setstate2] = useState(true);


    const show = () => {
        const box = document.getElementById('box');
        box.style.marginLeft = '0px';
        setstate(false);
    }

    const hide = () => {
        const box = document.getElementById('box');
        box.style.marginLeft = '-200px';
        setstate(true);
    }

    const search_show = () => {
        const box = document.getElementById('search-box');
        box.style.marginTop = '85px';
        setstate2(false)
    }

    const search_hide = () => {
        const box = document.getElementById('search-box');
        box.style.marginTop = '-10px';
        setstate2(true)
    }


    return (
        <>
            <div className="sm:h-[80px] md:h-[100px] w-full p-2  flex justify-between items-center absolute bg-white   ">
                <span className="">
                    <img src={assets.logo} className="h-10 sm:h-8 md:h-10 lg:h-14"></img>
                </span>
                <span className="flex gap-2 sm:hidden lg:flex ">
                    <h1 className="cursor-pointer hover:text-pink-400 duration-150  "><Link to='/home'>HOME</Link></h1>
                    <h1 className="cursor-pointer hover:text-pink-400 duration-150  "><Link to='/about'>ABOUT</Link></h1>
                    <h1 className="cursor-pointer hover:text-pink-400 duration-150  "><Link to='/contact'>CONTECT</Link></h1>
                    <h1 className="cursor-pointer hover:text-pink-400 duration-150  "><Link to='/collections'>COLLECTON</Link></h1>
                </span>


                <div className="flex sm:gap-2 lg:gap-3 ">
                    <span className="sm:hidden lg:block">
                        {state2 === true ? <CiSearch size={22} onClick={search_show} className="cursor-pointer " /> : <CiSearch size={22} onClick={search_hide} className="cursor-pointer" />}
                    </span>
                    
                    <span className="flex">
                        <Link to='/cart'><FaCartShopping size={22} className="cursor-pointer" /></Link>
                        {cart_lenght > 0 ?
                            <h1 className="bg-red-500 text-white h-[20px] w-[20px] text-center rounded-full  ">{cart_lenght}</h1> : ''
                        }
                    </span>

                    <span className="sm:block lg:hidden">
                        {state === true ? <TiThMenu onClick={show} size={20} /> : <ImCross onClick={hide} size={18} />}

                    </span>

                    <span className="sm:hidden lg:block ">
                         <h1 className="text-[15px] text-red-500 cursor-pointer " onClick={removing_token}>Logout</h1> 
                    </span>

                </div>
            </div>

            <div className="h-[350px] w-[200px] border-[1px] border-black    ml-[-200px] duration-200 absolute mt-[85px] p-4  bg-white " id="box">
                <div className="h-full w-full overflow-hidden  ">
                    <input type="text" placeholder="Search here..." className="border-b-2 border-black" onChange={(e) => setinput(e.target.value)} />
                    <h1 className="cursor-pointer hover:text-pink-400 duration-150 text-center mt-2 border-b-[1px] border-black"><Link to='/home'>HOME</Link></h1>
                    <h1 className="cursor-pointer hover:text-pink-400 duration-150 text-center mt-2  border-b-[1px] border-black"><Link to='/about'>ABOUT</Link></h1>
                    <h1 className="cursor-pointer hover:text-pink-400 duration-150 text-center mt-2  border-b-[1px] border-black"><Link to='/contect'>CONTECT</Link></h1>
                    <h1 className="cursor-pointer hover:text-pink-400 duration-150 text-center mt-2 border-b-[1px] border-black"><Link to='/collections'>COLLECTION</Link></h1>

                </div>

            </div>
            <div className="h-[40px] w-[180px] flex items-end border-b-[1px] border-black float-end mt-[40px] duration-200 mb-2 sm:hidden md:flex " id="search-box">
                <input type="text" placeholder="Search here..." className="text-center outline-none  " onChange={(e) => setinput(e.target.value)} />
            </div>

        </>
    )
};

export default Nav2;