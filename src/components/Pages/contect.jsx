
import { assets } from "../data/assets/frontend_assets/assets";


const Contect=()=>{
    return(
        <>
        <div className="h-fit w-full  p-5 pt-28">
            <div className="h-fit w-full  sm:grid sm:grid-cols-1 md:flex p-4 lg:pr-10 lg:pl-10 ">
                <div className="h-[400px] w-full">
                    <img src={assets.contact_img} alt="" className="h-full w-full" />
                </div>
                <div className="h-[400px] w-full p-10">
                    <h1>OUR STORE</h1>
                    <br />
                   <p>567099 WILLIMS STATION</p>
                   <p>SUITE 350 WASHINGTON USA</p>
                   <br />
                   <p>Tel : (425)-5555-9876-1</p>
                   <p>Email : forever@gmail.com</p>
                   <br />
                   <h1>CAREERES AT FOREVER</h1>
                   <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae facere nulla neque, expedita illum </p>
                   <button className="h-[50px] w-[150px] border-2 border-black mt-3">EXPLORE JOBS</button>
                </div>

            </div>
         </div>


         

    
        
        
        </>
    )
};

export default Contect;