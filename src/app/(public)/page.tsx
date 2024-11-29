import { FeaturesSection } from "@/features/public/components/features-section";
import { Footer } from "@/features/public/components/footer";
import { HeroSection } from "@/features/public/components/hero-section";
import { InviteSection } from "@/features/public/components/invite-section";

export default async function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <InviteSection />
      <Footer />
    </div>
  );
}
