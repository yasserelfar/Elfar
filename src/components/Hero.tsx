import hero from "../assets/hero.jpg";

const Hero = () => {
  return (
    <div
    id="hero"
      className="
      flex flex-col items-center justify-end
      text-center h-96 w-full py-12 bg-gradient-to-r from-blue-600 to-purple-600"
      style={{
        backgroundImage: `url(${hero})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h2 className="text-3xl font-bold mb-4">Welcome to Elfar Store </h2>
      <p className="text-gray-200">
        Discover the best products at amazing prices
      </p>
    </div>
  );
};

export default Hero;
