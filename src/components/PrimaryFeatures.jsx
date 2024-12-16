"use client";

import { Container } from "@/components/base/Container";
import { CarouselMobile } from "./display-manager/CarouselMobile";
import { ContentTabsDesktop } from "./display-manager/ContentTabsDesktop";

export function PrimaryFeatures() {
  return (
    <section
      id="features"
      aria-label="Features for investing all your money"
      className="bg-gray-900 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl">
          <h2 className="text-3xl font-medium tracking-tight text-white">
            Every tool you need for your bioinformatics research
          </h2>
          <p className="mt-2 text-lg text-gray-400">
            Cytoscape Home will guide you through the process of transforming
            your raw data into interactive networks. Use our tools to analyze
            the results, share them with collaborators and finally publish them.
          </p>
        </div>
      </Container>
      <div className="mt-16 md:hidden">
        <CarouselMobile />
      </div>
      <Container className="hidden md:mt-20 md:block">
        <ContentTabsDesktop />
      </Container>
    </section>
  );
}
