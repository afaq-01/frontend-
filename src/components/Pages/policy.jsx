import {assets} from "../data/assets/frontend_assets/assets";


const Policy=()=>{
    return(
        <>
      <div className="w-full mt-12 px-4 sm:px-6 md:px-10 lg:px-24 py-6">

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

    {/* ITEM 1 */}
    <div className="flex flex-col items-center text-center space-y-2">
      <img src={assets.exchange_icon} alt="" className="w-12 h-12" />
      <h1 className="font-bold text-base md:text-lg">Easy Exchange Policy</h1>
      <p className="text-sm text-gray-600">
        Hassle-free exchange policy
      </p>
    </div>

    {/* ITEM 2 */}
    <div className="flex flex-col items-center text-center space-y-2">
      <img src={assets.quality_icon} alt="" className="w-12 h-12" />
      <h1 className="font-bold text-base md:text-lg">7 Days Return Policy</h1>
      <p className="text-sm text-gray-600">
        We provide 7 days free return policy
      </p>
    </div>

    {/* ITEM 3 */}
    <div className="flex flex-col items-center text-center space-y-2">
      <img src={assets.support_img} alt="" className="w-12 h-12" />
      <h1 className="font-bold text-base md:text-lg">Best Customer Support</h1>
      <p className="text-sm text-gray-600">
        We provide 24/7 customer support
      </p>
    </div>

  </div>

</div>
        
        </>
    )
};

export default Policy;