import {assets} from "../data/assets/frontend_assets/assets";

const Footer=()=>{
    return(
        <>
       <div className="w-full mt-10 py-10 px-4 sm:px-6 md:px-10 lg:px-24">

  {/* SUBSCRIBE SECTION */}
  <div className="text-center">

    <h1 className="text-2xl sm:text-3xl font-semibold">
      Subscribe now & get 20% off
    </h1>

    <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo facilis iusto nam quibusdam dolor ex sint molestia
    </p>

    {/* INPUT BOX */}
    <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2">

      <input
        type="text"
        placeholder="Search here..."
        className="w-full sm:w-[60%] md:w-[40%] h-10 px-3 border border-gray-300 outline-none"
      />

      <button className="w-full sm:w-auto px-6 h-10 bg-black text-white">
        SUBSCRIBE
      </button>

    </div>
  </div>

  {/* FOOTER SECTION */}
  <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">

    {/* LOGO + DESCRIPTION */}
    <div className="space-y-3">
      <img src={assets.logo} alt="" className="h-10 sm:h-12 md:h-14" />

      <p className="text-sm text-gray-600">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum iusto maiores eius architecto rem quas impedit animi dolorum nam quasi odio hic et.
      </p>
    </div>

    {/* COMPANY */}
    <div className="space-y-2">
      <h1 className="font-bold text-lg">COMPANY</h1>
      <p>Home</p>
      <p>About us</p>
      <p>Delivery</p>
      <p>Privacy Policy</p>
    </div>

    {/* CONTACT */}
    <div className="space-y-2">
      <h1 className="font-bold text-lg">GET IN TOUCH</h1>
      <p>+1-212-456-7890</p>
      <p>contact@forever.com</p>
    </div>

  </div>

</div>
        
        
        </>
    )
};

export default Footer;