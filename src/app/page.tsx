import dynamic from "next/dynamic";
import { Box } from "@mui/material";

import { SiteFooter } from "@/components/SiteFooter";
import { TopBar } from "@/components/TopBar";
import { WhatIOfferSection } from "@/components/WhatIOfferSection";
import { WinsSection } from "@/components/WinsSection";
import { WritingSection } from "@/components/WritingSection";
import { profile } from "@/data/portfolio";
import { publications } from "@/data/writing";

// Below-the-fold interactive sections ship as their own chunks so the
// first screen hydrates before their code arrives.
const ExperienceSection = dynamic(() =>
  import("@/components/ExperienceSection").then((module) => module.ExperienceSection),
);
const ProjectShowcase = dynamic(() =>
  import("@/components/ProjectShowcase").then((module) => module.ProjectShowcase),
);
const EducationCertificationSection = dynamic(() =>
  import("@/components/EducationCertificationSection").then(
    (module) => module.EducationCertificationSection,
  ),
);

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: profile.githubUrl,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Seattle", addressRegion: "WA" },
  sameAs: [profile.githubUrl, profile.linkedInUrl],
  knowsAbout: profile.knowledgeAreas,
  worksFor: { "@type": "Organization", name: "OpenCFO", url: "https://opencfo.ai" },
  subjectOf: publications.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    url: post.url,
    datePublished: "2026-09-11",
    author: { "@type": "Person", name: profile.name },
  })),
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
        <WinsSection />
        <WhatIOfferSection />
        <ExperienceSection />
        <ProjectShowcase />
        <WritingSection />
        <EducationCertificationSection />
        <SiteFooter />
      </Box>
    </>
  );
}
