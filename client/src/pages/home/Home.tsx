import FeturedPosts from "./FeturedPosts";
import Hero from "./Hero";

const Home = () => {
  return (
    <div className="container">
      <Hero />

      <FeturedPosts />
    </div>
  );
};

export default Home;
