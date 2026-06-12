import { useContext, useEffect, useState } from "react";
import Context from "../../Config/Config";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


const Cart = () => {
  const { cart_data, price, handle_delete, set_cartdata } = useContext(Context);
  const Total_products = cart_data.length;


  const fee = 65;
  const sub_total = fee + price;

  const handle_increment = async (_id) => {
    try {
      const res = await axios.post(
        "https://backend-production-929c7.up.railway.app/api/cart/update",
        { _id }
      );

      const updatedItem = res.data.item;

      set_cartdata((prev) =>
        prev.map((item) =>
          item._id === _id ? updatedItem : item
        )
      );

    } catch (error) {
      console.log(error.message);
    }
  };

  const handle_decrement = async (_id) => {
    try {
      const res = await axios.post("https://backend-production-929c7.up.railway.app/api/cart/decrease", { _id })

      const updatedItem = res.data.item;

      set_cartdata((prev) =>
        prev.map((item) =>
          item._id === _id ? updatedItem : item
        )
      );

    } catch (error) {
      console.log(error.message)

    };
  }

  return (
    <>{Total_products === 0 ? <div className="h-[88vh] w-full gap-1 flex justify-center items-center">
      <h1 className="text-[25px]">THE CART IS</h1>
      <h1 className="text-[25px] text-red-500">EMPTY...!</h1>
    </div> :
      <div className="h-[100vh] w-full  sm:p-1 md:p-5 sm:pt-[16%] md:pt-[14%] lg:pt-[8%] xl:pt-[6%] ">
        <div className="h-full w-full  md:p-4 sm:grid sm:grid-cols-1 lg:flex ">
          <div className="h-full sm:w-full lg:w-[50%]  md:p-3 overflow-auto">
            {cart_data.map((item, index) => {
              const { nam, price, image, _id, quantity } = item;

              return (
                <div
                  key={index}
                  className="w-full min-h-[80px] border-b border-gray-300 grid grid-cols-5 items-center gap-4 px-4 py-2"
                >
                  {/* Image */}
                  <div className="flex justify-center">
                    <img
                      src={image}
                      className="h-[55px] w-[55px] object-cover rounded-md"
                    />
                  </div>

                  {/* Name */}
                  <div className="text-center font-medium">
                    {nam}
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center justify-center gap-3">
                    <button
                      className="text-xl font-bold"
                      onClick={() => handle_decrement(_id)}
                    >
                      -
                    </button>

                    <span className="border border-black px-3 py-1 rounded">
                      {quantity}
                    </span>

                    <button
                      className="text-xl font-bold"
                      onClick={() => handle_increment(_id)}
                    >
                      +
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-center font-semibold">
                    $ {price}
                  </div>

                  {/* Delete */}
                  <div className="flex justify-center">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                      onClick={() => handle_delete(_id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="h-full sm:w-full lg:w-[50%] flex sm:justify-end lg:justify-center p-2    ">
            <div className="h-full w-full p-20">
              <h1 className="text-center text-[20px]">CART-TOTAL__</h1>
              <div className="h-[40px] w-full border-b-2 border-black flex justify-between">
                <h1>Sub Total</h1>
                <h1>{price}</h1>
              </div>

              <div className="h-[40px] w-full border-b-2 border-black flex justify-between mt-2">
                <h1>Deivery-Fee</h1>
                <h1>{fee}</h1>
              </div>

              <div className="h-[40px] w-full border-b-2 border-black flex justify-between mt-2">
                <h1>Total</h1>
                <h1>{sub_total}</h1>
              </div>

              <div className="h-[40px] w-full border-b-2 border-black flex justify-between mt-2">
                <h1>PRODUCTS</h1>
                <h1>{Total_products}</h1>
              </div>

              <Link to='/delivery'><button className="mt-2 h-[35px] w-[120px] rounded-full bg-black text-white">Deliver Now</button></Link>
            </div>
          </div>

        </div>

      </div>
    }

    </>
  )
};

export default Cart;