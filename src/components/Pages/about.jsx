import { assets } from "../data/assets/frontend_assets/assets";

const About = () => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 pt-20 md:pt-24 lg:pt-28">
      
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
          ABOUT US
        </h1>
      </div>

      {/* Main Section */}
      <div className="flex flex-col lg:flex-row items-center gap-8">
        
        {/* Image */}
        <div className="w-full lg:w-1/2">
          <img
            src={assets.about_img}
            alt="About"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        {/* Text */}
        <div className="w-full lg:w-1/2 text-sm sm:text-base leading-relaxed">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            quibusdam tempore vel nostrum, dolore ut distinctio id quo explicabo
            eveniet.
          </p>

          <p className="mt-4">
            Aspernatur, tempora. Nam incidunt accusamus, aspernatur id fuga omnis
            ratione eligendi temporibus recusandae illo accusantium iure tenetur.
          </p>

          <h2 className="mt-6 font-bold text-lg">OUR MISSION</h2>

          <p className="mt-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed voluptas
            fugiat eius asperiores error modi id maiores.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        
        <div className="p-6 border rounded-lg text-center">
          <h3 className="font-semibold text-lg">Quality</h3>
          <p className="mt-2 text-sm">
            Crafted with attention to detail to ensure reliability and excellence.
          </p>
        </div>

        <div className="p-6 border rounded-lg text-center">
          <h3 className="font-semibold text-lg">
            Exceptional Customer Service
          </h3>
          <p className="mt-2 text-sm">
            Dedicated support focused on meeting your needs quickly and effectively.
          </p>
        </div>

        <div className="p-6 border rounded-lg text-center">
          <h3 className="font-semibold text-lg">Convenience</h3>
          <p className="mt-2 text-sm">
            Designed to save your time with easy, hassle-free experiences.
          </p>
        </div>

      </div>
    </div>
  );
};

export default About;