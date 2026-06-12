import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Context from "../../Config/Config";





const Best_seller = () => {
    const { data } = useContext(Context);

    const filter = data.filter((e) => e.bestseller === true);
    const final = filter.slice(0, 4);


    return (
        <>
            <div className="w-full mt-6 px-4 sm:px-6 md:px-10 lg:px-24 py-4">

                {/* HEADER */}
                <div className="w-full text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
                        BEST SELLER PRODUCTS___
                    </h1>

                    <p className="mt-2 text-sm sm:text-base text-gray-600 font-light max-w-2xl mx-auto">
                        Customer favorites, all in one place
                        Shop the most popular products right now
                    </p>
                </div>

                {/* PRODUCTS GRID */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                    {final.map((e, index) => {
                        const { name, price, image, _id } = e;

                        return (
                            <div
                                key={index}
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
                                <h1 className="mt-2 text-center text-sm md:text-base line-clamp-1">
                                    {name}
                                </h1>

                                <h1 className="text-sm md:text-lg font-medium">
                                    $ {price}
                                </h1>

                            </div>
                        );
                    })}

                </div>

            </div>

        </>
    )
};

export default Best_seller;