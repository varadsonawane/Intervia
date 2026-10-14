import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import Features from "../../components/Features/Features";
import Footer from "../../components/Footer/Footer";

function Home() {
  return (
    <div className="min-h-screen bg-[#f5f3ff]">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
       <Features />
        {/* <Features /> */}
        {/* <Pricing /> */}
      </main>

      <Footer />
    </div>
  );
}

export default Home;