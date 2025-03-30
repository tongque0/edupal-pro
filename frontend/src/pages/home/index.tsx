// Home.tsx
import HeroSection from "@/pages/home/components/HeroSection";
import CoreFeatures from "@/pages/home/components/CoreFeatures";
import TargetAudience from "@/pages/home/components/TargetSection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <HeroSection />
        <CoreFeatures />
        <TargetAudience />
      </main>
    </div>
  );
}
