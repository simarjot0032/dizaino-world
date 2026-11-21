import { cldUrl } from "src/lib/cloudinary";
import svcBedroom from "@Assets/bedroom/b1.jpg";
import svcKitchen from "@Assets/kitchen/k1.jpg";
import svcLiving from "@Assets/livingarea/l1.jpg";
import svcDining from "@Assets/Dining/d1.jpg";
import svcWashroom from "@Assets/Washroom/b1.jpg";
import svcPooja from "@Assets/PoojaRoom/p1.jpg";
import svcTheater from "@Assets/Theater/t1.jpg";
import svcCeiling from "@Assets/DownCelling/d1.jpg";
import svcCommercialInterior from "@Assets/CommercialInterior/ci1.jpg";
import svcResidentialExterior from "@Assets/ResidentialExterior/re1.jpg";
import svcCommercialExterior from "@Assets/CommercialExterior/ce1.jpg";
import svcClassicalExterior from "@Assets/ClassicalExterior/cle1.jpg";
import svcTerrace from "@Assets/TerraceGarden/t1.jpg";
import svc2d from "@Assets/2Dplanning/2d1.jpg";
import svc3d from "@Assets/3Dplanning/3d1.jpg";

import exteriorPic from "@Assets/exterior-pic.jpeg";
import { ResidentialExteriorFeaturesData } from "@Data/ResidentialExterior";
import { FeaturesKitchenData } from "@Data/Kitchen";
import { CommercialInteriorFeaturesData } from "@Data/CommercialInterior";

/* ---------------------------------------------------------------------- */
/* Services index                                                          */
/* ---------------------------------------------------------------------- */
export interface HomeService {
  title: string;
  group: "Interior" | "Exterior" | "Commercial" | "Planning";
  link: string;
  image: string;
}

export const homeServices: HomeService[] = [
  { title: "Bedroom", group: "Interior", link: "/Bedroom", image: svcBedroom },
  { title: "Kitchen", group: "Interior", link: "/Kitchen", image: svcKitchen },
  { title: "Living Areas", group: "Interior", link: "/Living-area", image: svcLiving },
  { title: "Dining", group: "Interior", link: "/Dining", image: svcDining },
  { title: "Washroom", group: "Interior", link: "/Washroom", image: svcWashroom },
  { title: "Pooja Room", group: "Interior", link: "/Pooja-Room", image: svcPooja },
  { title: "Home Theater", group: "Interior", link: "/Theater", image: svcTheater },
  { title: "Down Ceiling", group: "Interior", link: "/Down-Ceiling", image: svcCeiling },
  { title: "Commercial Interior", group: "Commercial", link: "/CommercialInterior", image: svcCommercialInterior },
  { title: "Residential Exterior", group: "Exterior", link: "/Residential-Exterior", image: svcResidentialExterior },
  { title: "Commercial Exterior", group: "Exterior", link: "/Commercial-Exterior", image: svcCommercialExterior },
  { title: "Classical Exterior", group: "Exterior", link: "/Classical-Exterior", image: svcClassicalExterior },
  { title: "Terrace Garden", group: "Exterior", link: "/TerraceGarden", image: svcTerrace },
  { title: "2D Planning", group: "Planning", link: "/2d-Planning", image: svc2d },
  { title: "3D Planning", group: "Planning", link: "/3D-Planning", image: svc3d },
];

/* ---------------------------------------------------------------------- */
/* Featured work: copy comes from each service's own feature data          */
/* ---------------------------------------------------------------------- */
export interface FeaturedProject {
  image: string;
  alt: string;
  category: string;
  discipline: string;
  heading: string;
  content: string;
  link: string;
  linkLabel: string;
}

export const featuredProjects: FeaturedProject[] = [
  {
    image: exteriorPic,
    alt: "Two-storey residential facade with warm cove lighting at dusk",
    category: "Residential",
    discipline: "Exterior design",
    heading: ResidentialExteriorFeaturesData[1].heading,
    content: ResidentialExteriorFeaturesData[1].content,
    link: "/Residential-Exterior",
    linkLabel: "Residential exteriors",
  },
  {
    image: cldUrl("dizaino/projects/our-work/ziktuhjcrky0kxlyigbm", 2000),
    alt: "L-shaped modular kitchen with marble-look walls and back-lit wall units",
    category: "Residential",
    discipline: "Kitchen design",
    heading: FeaturesKitchenData[0].heading,
    content: FeaturesKitchenData[0].content,
    link: "/Kitchen",
    linkLabel: "Kitchens",
  },
  {
    image: cldUrl("dizaino/projects/our-work/tyktbhtany7gubjiioix", 2000),
    alt: "Glass-partitioned commercial office interior",
    category: "Commercial",
    discipline: "Interior design",
    heading: CommercialInteriorFeaturesData[0].heading,
    content: CommercialInteriorFeaturesData[0].content,
    link: "/CommercialInterior",
    linkLabel: "Commercial interiors",
  },
];

/* ---------------------------------------------------------------------- */
/* Why choose us                                                           */
/* ---------------------------------------------------------------------- */
export interface WhyItem {
  heading: string;
  content: string;
}

export const whyChooseUs: WhyItem[] = [
  {
    heading: "Innovative Design Solutions",
    content:
      "We pride ourselves on pushing the boundaries of design. Our team thrives on creativity and brings fresh, innovative ideas to the table, from modern living spaces to the latest design trends, so every project is a showcase of original, forward-thinking design.",
  },
  {
    heading: "Experienced Design Team",
    content:
      "Our team is the backbone of our success. Designers, architects and craftsmen with a wealth of industry experience bring diverse skills and insight to every project, so each design meets and exceeds industry standards.",
  },
  {
    heading: "Tailored to Your Lifestyle",
    content:
      "Your home or commercial space is an extension of your lifestyle. We translate your personality and preferences into tangible, functional spaces, so every project feels like a true reflection of you.",
  },
  {
    heading: "Attention to Detail",
    content:
      "Detail is our design language. From the choice of materials to the placement of furniture, we pay meticulous attention to the little things, so spaces look stunning and function seamlessly.",
  },
  {
    heading: "Versatility in Design Styles",
    content:
      "One size doesn't fit all. Whether you're drawn to the clean lines of modern aesthetics, the timeless elegance of classical design or the boldness of contemporary styles, our versatile team can bring your vision to life.",
  },
  {
    heading: "Client-Centric Approach",
    content:
      "Your satisfaction is our priority. We keep communication open, actively seek your input and adjust our designs to your evolving vision, so the result is not just a design but a personalised masterpiece.",
  },
];
