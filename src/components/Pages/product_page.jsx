import { useParams } from "react-router-dom";
import { assets } from "../data/assets/frontend_assets/assets";
import { useContext, useState } from "react";
import Context from "../../Config/Config";

const Product_page = () => {
  const { id } = useParams();
  const { data, adding_cart, sizes, setsizes, user } = useContext(Context);


  const adding_size = (size) => {
    setsizes((prev) =>
      prev.includes(size)
        ? prev.filter((s) => s !== size)   // Remove if already selected
        : [...prev, size]                  // Add if not selected
    );
  };

  const product = data.find((p) => p._id.toString() === id);



  if (!product) {
    return <div className="p-10 text-center text-red-500"> Product Not Found</div>;
  }

  const { name, price, description, size, image, _id, quantity } = product;

  const handleAddToCart = () => {
    
    if (!user) {
      return alert('please login')
    }

    if (sizes.length > 0) {
      adding_cart(name, price, image, _id, quantity);


    } else {

      alert("Please select a size.");
      return;
    }

  };

  return (
    <div className="w-full px-5 pb-5 sm:pt-[8%] md:pt-[7%]">
      <div className="flex flex-col md:flex-row md:p-10">
        <div className="h-[600px] md:w-1/2 sm:p-5">
          <img src={image} alt={name} className="h-full w-full object-contain" />
        </div>

        <div className="h-[600px] md:w-1/2 p-5 lg:p-0">
          <h1 className="mt-4 text-xl font-bold">{name}</h1>

          <div className="mt-2 flex gap-1">
            <img src={assets.star_icon} alt="star" />
            <img src={assets.star_icon} alt="star" />
            <img src={assets.star_icon} alt="star" />
          </div>

          <p className="mt-4 text-lg">$ {price}</p>
          <p className="mt-4">{description}</p>

          <div className="h-[40px] w-[180px] flex gap-1 p-[2px]">
            {size.map((e, index) => {
              const isActive = sizes.includes(e);
              return (
                <button
                  key={index}
                  onClick={() => adding_size(e)}
                  className={`h-full w-full border-2 rounded duration-200 font-semibold ${isActive
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-gray-400"
                    }`}
                >
                  {e}
                </button>
              );
            })}
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-6 h-10 w-40 bg-black text-white active:bg-slate-800"
          >
            ADD TO CART
          </button>

          <div className="mt-6 space-y-1 text-sm">
            <p>100% Original Product</p>
            <p>Cash on delivery available</p>
            <p>Easy return & exchange policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product_page;
