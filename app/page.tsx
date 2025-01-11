import HeroSection from "./hero-section"
import AboutSection from "./about-section"
import TransformExpertiseSection from "./transform-expertise-section"

export default function Page() {
  return (
    <div className="bg-v0-background">
      <HeroSection />
      <AboutSection />
      <TransformExpertiseSection />
    </div>
  )
}
