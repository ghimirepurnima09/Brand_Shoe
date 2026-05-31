import Navbar from "./Navbar";
import Hero from "./Hero";
import Trending from "./Trending";
import Collections from "./Collections";
import Guarantee from "./Guarantee";
import Footer from "./Footer";

export default function MainHome() {
  return (
    <div className="bg-white overflow-hidden scroll-smooth">
      <Navbar />
      <Hero />
      <Trending />
      <Collections />
      <Guarantee />
      <Footer />
    </div>
  );
}