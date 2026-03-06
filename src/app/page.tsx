import { Box } from "@mui/material";

import { CapabilitySection } from "@/components/CapabilitySection";
import { DeliverySection } from "@/components/DeliverySection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { HeroSection } from "@/components/HeroSection";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { SiteFooter } from "@/components/SiteFooter";
import { TopBar } from "@/components/TopBar";
import { profile } from "@/data/portfolio";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: profile.githubUrl,
  sameAs: [profile.githubUrl],
  knowsAbout: profile.knowledgeAreas,
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <TopBar />
      <Box component="main">
        <HeroSection />
        <CapabilitySection />
        <ProjectShowcase />
        <ExperienceSection />
        <DeliverySection />
        <SiteFooter />
      </Box>
    </>
  );
}
