import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import Features from "../../components/Features/Features";

function Home() {
  return (
    <div className="min-h-screen bg-[#f5f3ff]">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        {/* <Pricing /> */}
      </main>
    </div>
  );
}

export default Home;