import { assets } from "../data/assets/frontend_assets/assets";

const Hero = () => {
  return (
    <div className="w-full px-5 py-10 lg:px-24">

      <div className="w-full flex flex-col md:flex-row items-center sm:border-[1px] md:border-[1px] border-black">

        {/* TEXT */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center py-10">
          <h1>____OUR BEST SELLER</h1>
          <h1 className="text-[30px] md:text-[40px] font-semibold">
            LATEST ARRIVALS
          </h1>
          <h1>SHOP NOW___</h1>
        </div>

        {/* IMAGE */}
        <div className="w-full md:w-1/2">
          <img
            src={assets.hero_img}
            alt="hero"
            className="w-full h-auto md:h-full object-cover"
          />
        </div>

      </div>

    </div>
  );
};

export default Hero;