import bedroomImg from "@Assets/bedroom/b1.jpg";
import commercialImg from "@Assets/CommercialInterior/ci1.jpg";
import planningImg from "@Assets/2Dplanning/2d1.jpg";

/* Site navigation data: shared by the Navbar (mega-menu + mobile overlay)
   and the Footer columns. Paths must match the routes declared in App.tsx. */

export interface NavItem {
  label: string;
  path: string;
}

export interface ServiceGroup {
  id: string;
  title: string;
  /** Short line shown under the group title in the mega-menu. */
  blurb: string;
  image: string;
  imageAlt: string;
  links: NavItem[];
}

export const serviceGroups: ServiceGroup[] = [
  {
    id: "residential",
    title: "Residential Interiors",
    blurb: "Rooms shaped around the way you live.",
    image: bedroomImg,
    imageAlt: "A finished bedroom interior by Dizaino World",
    links: [
      { label: "Bedroom", path: "/Bedroom" },
      { label: "Kitchen", path: "/Kitchen" },
      { label: "Living Areas", path: "/Living-area" },
      { label: "Dining", path: "/Dining" },
      { label: "Washroom", path: "/Washroom" },
      { label: "Pooja Room", path: "/Pooja-Room" },
      { label: "Home Theater", path: "/Theater" },
      { label: "False Ceiling", path: "/Down-Ceiling" },
    ],
  },
  {
    id: "commercial-exteriors",
    title: "Commercial & Exteriors",
    blurb: "Workspaces, facades and outdoor rooms.",
    image: commercialImg,
    imageAlt: "A commercial interior designed by Dizaino World",
    links: [
      { label: "Commercial Interiors", path: "/CommercialInterior" },
      { label: "Residential Exterior", path: "/Residential-Exterior" },
      { label: "Commercial Exterior", path: "/Commercial-Exterior" },
      { label: "Classical Exterior", path: "/Classical-Exterior" },
      { label: "Terrace Garden", path: "/TerraceGarden" },
    ],
  },
  {
    id: "planning",
    title: "Planning",
    blurb: "Drawings and renders before the first brick.",
    image: planningImg,
    imageAlt: "A 2D floor plan drawing",
    links: [
      { label: "2D Planning", path: "/2d-Planning" },
      { label: "3D Planning", path: "/3D-Planning" },
    ],
  },
];

/** Top-level links that sit beside the Services menu. */
export const primaryLinks: NavItem[] = [
  { label: "Projects", path: "/Projects" },
  { label: "About", path: "/#about" },
  { label: "Contact", path: "/Contact" },
];

export const allServicePaths: string[] = serviceGroups.flatMap((g) =>
  g.links.map((l) => l.path.toLowerCase())
);

export const contactDetails = {
  phones: ["9781905936", "9814747478"],
  email: "hardeep.creation@gmail.com",
};
