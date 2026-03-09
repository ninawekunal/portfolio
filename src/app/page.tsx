import { Box } from "@mui/material";

import { EducationCertificationSection } from "@/components/EducationCertificationSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { SiteFooter } from "@/components/SiteFooter";
import { TopBar } from "@/components/TopBar";
import { WhatIOfferSection } from "@/components/WhatIOfferSection";
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
        <WhatIOfferSection />
        <ExperienceSection />
        <ProjectShowcase />
        <EducationCertificationSection />
        <SiteFooter />
      </Box>
    </>
  );
}
