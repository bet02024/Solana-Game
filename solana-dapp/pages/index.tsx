import type { NextPage } from "next";
import Footer from "../components/components/Footer";
import Header from "../components/Header";
import Play from "../components/Play";

const Home: NextPage = () => {
  return (
    <div className="">
      <Header />
      <Play />
      <Footer />
    </div>
  );
};

export default Home;
