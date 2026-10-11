import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";

function Home() {
  return (
    <div className="min-h-screen bg-[#f5f3ff]">
      <Navbar />
      <main>
        <Hero />

        {/* We'll add more sections here */}
        {/* <HowItWorks /> */}
        {/* <Features /> */}
        {/* <Pricing /> */}
      </main>
    </div>
  );
}

export default Home;