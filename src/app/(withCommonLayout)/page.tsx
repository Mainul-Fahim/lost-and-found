import About from "@/components/Ui/HomePage/About/About";
import HeroSection from "@/components/Ui/HomePage/HeroSection/HeroSection";
import LostItems from "@/components/Ui/HomePage/LostItems/LostItems";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <HeroSection />
      <About />
      <LostItems />
    </main>
  )
}
