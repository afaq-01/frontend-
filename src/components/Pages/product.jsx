import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Product = () => {
  const [data, setData] = useState([]);

  const getting_data = async () => {
    try {
      const response = await axios.get(
        "https://backend-production-929c7.up.railway.app/api/product/list"
      );

      // Always set an array
      setData(response.data?.product || []);
    } catch (error) {
      console.error(error);
      setData([]);
    }
  };

  useEffect(() => {
    getting_data();
  }, []);

  const latest_collection = data.filter(
    item => item.latestCollection === true || item.latestCollection === "true"
  );

  return (
    <div className="w-full px-4 sm:px-6 md:px-16 lg:px-24 py-6">

  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

    {latest_collection.map((e) => {
      const { name, price, image, _id } = e;

      return (
        <div
          key={_id}
          className="cursor-pointer flex flex-col items-center"
        >

          {/* IMAGE */}
          <Link to={`/productpage/${_id}`} className="w-full">
            <img
              src={image}
              alt={name}
              className="w-full h-[180px] sm:h-[200px] md:h-[220px] object-cover rounded-md"
            />
          </Link>

          {/* TEXT */}
          <h1 className="mt-2 text-center text-sm md:text-base text-black line-clamp-1">
            {name}
          </h1>

          <h1 className="text-black text-sm md:text-lg">
            $ {price}
          </h1>

        </div>
      );
    })}

  </div>

  {/* EMPTY STATE */}
  {latest_collection.length === 0 && (
    <p className="text-center mt-6 text-gray-500">
      No latest collection products found.
    </p>
  )}

</div>
  );
};

export default Product;
