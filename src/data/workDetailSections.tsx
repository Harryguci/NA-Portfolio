import type { ReactNode } from "react";
import type { WorkSectionFrameTone } from "../components/WorkSectionFrame";
import nuukVn1 from "../assets/nuuk.png";
import lamyVn1 from "../assets/lamy.png";
import catarinaDiamondLysStore from '../assets/caterina.png';
import dantonVietnam from '../assets/danton.png';

import landingPage1 from "../assets/landing_main1.png";
import kbrand from "../assets/kbrands.png";
import vietis from '../assets/vietis.png';
import workLandingLg from "../assets/work_landingpage_lg.png";
import tickideng from '../assets/tickideng.png';
import labei from '../assets/labei.png';
import fandb from '../assets/f&b.png';

export type FramedWorkId = "ecommerce" | "socialads" | "landing";

export type WorkDetailSectionSpec = {
  title: string;
  tone: WorkSectionFrameTone;
  body: ReactNode;
};

const ecommerceSections: WorkDetailSectionSpec[] = [
  {
    title: "NUUK VIETNAM",
    tone: "ecom",
    body: (
      <div className="work-section-frame__grid">
        <img
          src={nuukVn1}
          alt="Nuuk Vietnam official store — campaign hero, offers, and featured hair care"
          loading="lazy"
        />
      </div>
    ),
  },
  {
    title: "LAMY Watches & Accessories",
    tone: "ecom",
    body: (
      <div className="work-section-frame__grid">
        <img
          src={lamyVn1}
          alt="Nuuk Vietnam official store — campaign hero, offers, and featured hair care"
          loading="lazy"
        />
      </div>
    ),
  },
  {
    title: 'CATERINA DIAMOND & lys store',
    tone: 'ecom',
    body: (
      <div className="work-section-frame__grid">
        <img
          src={catarinaDiamondLysStore}
          alt="Caterina Diamond & Lys store — campaign hero, offers, and featured hair care"
          loading="lazy"
        />
      </div>),
  },
  {
    title: 'danton vietnam',
    tone: 'ecom',
    body: (
      <div className="work-section-frame__grid">
        <img
          src={dantonVietnam}
          alt="Danton Vietnam — campaign hero, offers, and featured hair care"
          loading="lazy"
        />
      </div>),
  }
];

const landingSections: WorkDetailSectionSpec[] = [
  {
    title: "Overview",
    tone: "landing",
    body: (
      <picture>
        <source media="(min-width: 1000px)" srcSet={workLandingLg} />
        <img
          src={landingPage1}
          alt="Landing page design samples"
          loading="eager"
        />
      </picture>
    ),
  },
];

const socialadsSections: WorkDetailSectionSpec[] = [
  {
    title: "K-BRANDS",
    tone: "social",
    body: (
      <picture>
        <source media="(min-width: 1000px)" srcSet={kbrand} />
        <img
          src={kbrand}
          alt="KBRANDS — Vietnam market campaign visuals"
          loading="eager"
        />
      </picture>
    ),
  },
  {
    title: "VIETIS EDUCATION",
    tone: "social",
    body: (
      <picture>
        <source media="(min-width: 1000px)" srcSet={vietis} />
        <img
          src={vietis}
          alt="VIETIS — Vietnam market campaign visuals"
          loading="eager"
        />
      </picture>
    ),
  },
  {
    title: "TICKID ENGLISH",
    tone: "social",
    body: (
      <picture>
        <source media="(min-width: 1000px)" srcSet={tickideng} />
        <img
          src={tickideng}
          alt="TICKIDENG — Vietnam market campaign visuals"
          loading="eager"
        />
      </picture>
    ),
  },
  {
    title: "L'ABEILLE GLOBAL & DANTON",
    tone: "social",
    body: (
      <picture>
        <source media="(min-width: 1000px)" srcSet={labei} />
        <img
          src={labei}
          alt="LABEI — Vietnam market campaign visuals"
          loading="eager"
        />
      </picture>
    ),
  },
  {
    title: "F&B",
    tone: "social",
    body: (
      <picture>
        <source media="(min-width: 1000px)" srcSet={fandb} />
        <img
          src={fandb}
          alt="F&B — Vietnam market campaign visuals"
          loading="eager"
        />
      </picture>
    ),
  },
];

const FRAMED_SECTIONS: Record<FramedWorkId, WorkDetailSectionSpec[]> = {
  ecommerce: ecommerceSections,
  socialads: socialadsSections,
  landing: landingSections,
};

export function getFramedWorkDetailSections(
  id: string | undefined,
): WorkDetailSectionSpec[] | null {
  if (id === "ecommerce" || id === "socialads" || id === "landing") {
    return FRAMED_SECTIONS[id];
  }
  return null;
}
