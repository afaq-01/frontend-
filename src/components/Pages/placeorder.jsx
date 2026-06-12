import { useContext, useEffect, useState } from "react";
import axios from "axios";


const Placeorder = () => {

    const [cart_data, set_cartdata] = useState([]);

    const fetching_data = async () => {
        const res = await axios.get("https://backend-production-929c7.up.railway.app/api/placeOrder/placeOrder_get");
        set_cartdata(res.data);

    }

  useEffect(() => {

        fetching_data()

    }, [])


    return (
        <>
            <div className="h-fit w-full  p-4">
                <div className="h-fit w-full  lg:mt-[6%] md:mt-[11%] sm:mt-[16%] md:p-6">
                    <div className="h-full w-full ">
                        <h1 className="text-[35px]">MY ORDERS___</h1>
                        {cart_data.map((item,index) => {
                            const { name, price, image, _id, date } = item;
                            return <div className="h-fit w-full border-b-2 pb-2 mt-2 border-black  sm:grid sm:grid-cols-1 sm:gap-2 md:flex md:justify-between" key={index}>
                                <div className="h-full w-[450px] gap-1 flex">
                                    <span className="h-fit w-[30%] ">
                                        <img src={image} className="h-[97px] w-full bg-cover" />
                                    </span>
                                    <span className="h-fit w-[60%]">
                                        <h1>{name}</h1>
                                        <h1>PRICE : {price}</h1>
                                        <h1>DATE : {date}</h1>
                                        <h1>PAYMENT : COD</h1>
                                    </span>
                                </div>
                                <div className="h-full w-[140px]  flex gap-1  items-center ">
                                    <h1 className="h-[15px] w-[15px] rounded-full bg-green-500"></h1>
                                    <h1>PLACE-ORDER</h1>
                                </div>
                                <div className="h-full w-[140px] flex gap-1  items-center">
                                    <button className="h-[30px] w-[100px] border-2 border-black">Track-order</button>
                                </div>

                            </div>
                        })}

                    </div>
                </div>
            </div>


        </>
    )
};

export default Placeorder;