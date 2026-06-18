import img12 from "@/assets/wdrop_12.jpg";
import img11 from "@/assets/wdrop_11.jpg";
import img10 from "@/assets/wdrop10.jpg";
import img7 from "@/assets/wdrop_7.jpg";
import img6 from "@/assets/wdrop_6.jpg";
import img5 from "@/assets/wdrop_5.jpg";
import img4 from "@/assets/wdrop_4.jpg";
import img3 from "@/assets/wdrop_3.jpg";

import aboutUs1 from "@/assets/wdrop_about_us_1.jpg";
import aboutUs2 from "@/assets/wdrop_about_us_2.jpg";

import logo from "@/assets/logo_waldrop.png";

import people1 from "@/assets/waldrop_people.jpg";
import people2 from "@/assets/waldrop_people_2.jpg";
import people3 from "@/assets/waldrop_people_3.jpg";
import people4 from "@/assets/waldrop_people_4.jpg";

export const IMG = {
  pavilion: img12,
  construction: img11,
  campus: img10,
  chapel: img7,
  interior: img6,
  cardinal: img5,
  middleSchool: img4,
  cafeteria: img3,
  family: aboutUs1,
  team: aboutUs2,
  logo: logo,
  teamGroup: people1,
  fieldCrew: people2,
  office: people3,
  planReview: people4,
};

export const TAGLINES = {
  primary: "Building relationships with folks all over Texas since 1946.",
  performance: "Confidence built on performance.",
};

export type IndustrySlug =
  | "education"
  | "industrial"
  | "churches"
  | "commercial"
  | "tenant-build-out"
  | "hotels";
  
export const INDUSTRIES: Array<{
  slug: IndustrySlug;
  name: string;
  short: string;
  description: string;
  image: string;
}> = [
  { slug: "education", name: "Public & Private Education", short: "Education",
    description: "Schools, libraries, athletics and campus facilities built to district standards.",
    image: IMG.middleSchool },
  { slug: "industrial", name: "Industrial", short: "Industrial",
    description: "Manufacturing, warehouse, and processing facilities engineered for production.",
    image: IMG.construction },
  { slug: "churches", name: "Churches", short: "Church",
    description: "Worship centers, fellowship halls, and historic restorations.",
    image: IMG.chapel },
  { slug: "commercial", name: "Commercial & Retail", short: "Commercial",
    description: "Retail, office, and mixed-use developments designed for daily operations.",
    image: IMG.pavilion },
  { slug: "tenant-build-out", name: "Tenant Build-Out", short: "Tenant",
    description: "Interior fit-outs delivered on accelerated timelines.",
    image: IMG.interior },
  { slug: "hotels", name: "Hotels", short: "Hotel",
    description: "Hospitality projects from new ground-up builds to full renovations.",
    image: IMG.campus },
];

export type ServiceSlug =
  | "preconstruction"
  | "construction-management"
  | "design-build"
  | "concrete"
  | "earthwork"
  | "asphalt-paving"
  | "metal-buildings";

export const SERVICES: Array<{
  slug: ServiceSlug;
  name: string;
  summary: string;
  primary?: boolean;
  benefits: string[];
  process: string[];
}> = [
  { slug: "preconstruction", name: "Preconstruction", primary: true,
    summary: "Budgeting, scheduling, value engineering and constructability reviews before ground breaks.",
    benefits: ["Accurate early-stage budgets", "Risk identification", "Schedule certainty", "Value engineering"],
    process: ["Discovery", "Estimating", "Scheduling", "Permitting", "Handoff"] },
  { slug: "construction-management", name: "Construction Management", primary: true,
    summary: "On-site leadership coordinating trades, schedule and quality through closeout.",
    benefits: ["Single point of accountability", "Trade coordination", "Quality control", "Cost transparency"],
    process: ["Mobilize", "Trade buyout", "Build", "QC & inspections", "Closeout"] },
  { slug: "design-build", name: "Design-Build", primary: true,
    summary: "One integrated team — design and construction — delivering speed and single-source accountability.",
    benefits: ["Faster delivery", "Single contract", "Aligned incentives", "Fewer changes"],
    process: ["Visioning", "Design", "GMP", "Build", "Turnover"] },
  { slug: "concrete", name: "Concrete", summary: "Foundations, slabs, tilt-wall and structural concrete.",
    benefits: ["Self-perform crews", "Schedule control", "Cost savings"], process: ["Layout", "Form", "Pour", "Finish"] },
  { slug: "earthwork", name: "Earthwork", summary: "Site preparation, grading, and excavation.",
    benefits: ["Site readiness", "Drainage management", "Cost control"], process: ["Survey", "Clear", "Grade", "Compact"] },
  { slug: "asphalt-paving", name: "Asphalt Paving", summary: "Parking lots, drives and access roads.",
    benefits: ["Durable surfaces", "Striping & markings", "Maintenance plans"], process: ["Prep", "Base", "Pave", "Stripe"] },
  { slug: "metal-buildings", name: "Metal Buildings", summary: "Pre-engineered metal structures for industrial and agricultural use.",
    benefits: ["Fast erection", "Wide spans", "Cost effective"], process: ["Design", "Foundation", "Erect", "Finish"] },
];

export type Project = {
  slug: string;
  name: string;
  location: string;
  industry: IndustrySlug;
  year: number;
  image: string;
  gallery: string[];
  summary: string;
  scope: string;
  challenge: string;
  solution: string;
  results: string;
  /** lat/lng pair on a normalized Texas map [0..100] coordinates */
  map: { x: number; y: number };
};

export const PROJECTS: Project[] = [
  {
    slug: "lingleville-isd-commons",
    name: "Lingleville ISD Commons",
    location: "Lingleville, TX",
    industry: "education",
    year: 2023,
    image: IMG.cardinal,
    gallery: [IMG.cardinal, IMG.cafeteria, IMG.middleSchool],
    summary: "New dining commons and athletics entry for the Cardinals.",
    scope: "32,000 SF commons, kitchen, glass entry vestibule.",
    challenge: "Construction adjacent to active classrooms during the school year.",
    solution: "Phased work with weekend pours and after-hours steel erection.",
    results: "Delivered three weeks ahead of the spring semester start.",
    map: { x: 38, y: 48 },
  },
  {
    slug: "ozona-elementary",
    name: "Ozona Elementary Cafeteria",
    location: "Ozona, TX",
    industry: "education",
    year: 2022,
    image: IMG.cafeteria,
    gallery: [IMG.cafeteria, IMG.middleSchool, IMG.campus],
    summary: "Renovated cafeteria and stage for Ozona Lions.",
    scope: "Cafeteria refurbishment, acoustic ceiling, finishes, stage.",
    challenge: "Summer-only window between school years.",
    solution: "Compressed 14-week schedule with double-shift drywall and finishes.",
    results: "Open for first day of school.",
    map: { x: 22, y: 65 },
  },
  {
    slug: "early-middle-school",
    name: "Early Middle School",
    location: "Early, TX",
    industry: "education",
    year: 2019,
    image: IMG.middleSchool,
    gallery: [IMG.middleSchool, IMG.cafeteria, IMG.campus],
    summary: "Two-story middle school with iconic clock tower.",
    scope: "Ground-up 110,000 SF campus, classrooms, gym, admin.",
    challenge: "Rural site logistics and brick masonry detailing.",
    solution: "On-site batch plant and dedicated masonry crew.",
    results: "Award-winning campus on budget.",
    map: { x: 48, y: 42 },
  },
  {
    slug: "douglas-macarthur-academy",
    name: "Douglas MacArthur Academy of Freedom",
    location: "Brownwood, TX",
    industry: "education",
    year: 2024,
    image: IMG.chapel,
    gallery: [IMG.chapel, IMG.campus, IMG.middleSchool],
    summary: "Historic restoration and glass addition for Howard Payne University.",
    scope: "Restoration of historic stone tower, new gothic-arched gallery.",
    challenge: "Matching 19th-century stonework with new construction.",
    solution: "Custom stone sourcing and craft mason partnership.",
    results: "National Trust preservation honoree.",
    map: { x: 53, y: 45 },
  },
  {
    slug: "texas-tenant-buildout",
    name: "Corporate Tenant Build-Out",
    location: "Abilene, TX",
    industry: "tenant-build-out",
    year: 2024,
    image: IMG.interior,
    gallery: [IMG.interior, IMG.pavilion],
    summary: "Class-A interior fit-out for regional headquarters.",
    scope: "18,000 SF Class-A interior, MEP, finishes.",
    challenge: "Occupied building, after-hours coordination.",
    solution: "Night shifts and noise-controlled demolition.",
    results: "Zero tenant complaints, on time.",
    map: { x: 44, y: 50 },
  },
  {
    slug: "industrial-warehouse",
    name: "Industrial Distribution Center",
    location: "Stephenville, TX",
    industry: "industrial",
    year: 2023,
    image: IMG.construction,
    gallery: [IMG.construction, IMG.pavilion],
    summary: "Distribution facility with high-bay storage and dock access.",
    scope: "65,000 SF tilt-wall, racking, dock equipment.",
    challenge: "Compressed delivery for tenant operations.",
    solution: "Tilt-wall self-perform and parallel MEP rough-in.",
    results: "Delivered in 9 months.",
    map: { x: 50, y: 46 },
  },
  {
    slug: "civic-pavilion",
    name: "Civic Welcome Pavilion",
    location: "Bangs, TX",
    industry: "commercial",
    year: 2021,
    image: IMG.pavilion,
    gallery: [IMG.pavilion, IMG.interior],
    summary: "Public-facing visitor pavilion with covered drive.",
    scope: "Stone and brick civic pavilion, mass timber pergola.",
    challenge: "Architectural detailing on tight budget.",
    solution: "Locally-sourced stone and prefabricated steel.",
    results: "Community landmark and award winner.",
    map: { x: 52, y: 47 },
  },
  {
    slug: "hill-country-hotel",
    name: "Hill Country Hotel & Conference",
    location: "Kerrville, TX",
    industry: "hotels",
    year: 2022,
    image: IMG.campus,
    gallery: [IMG.campus, IMG.pavilion],
    summary: "Boutique hospitality and conference center.",
    scope: "112 keys, conference center, restaurant.",
    challenge: "Brand standards and lender milestones.",
    solution: "Weekly milestone reporting to lender and brand.",
    results: "Opened in time for peak season.",
    map: { x: 56, y: 60 },
  },
];

export const TESTIMONIALS = [
  { quote: "Waldrop ran our renovation through a live school year without missing a beat. They communicated weekly and finished early.",
    author: "Dr. M. Reyes", role: "Superintendent, Independent School District" },
  { quote: "Single point of accountability. The Waldrop team owned the schedule and the budget from day one.",
    author: "K. Patterson", role: "Director of Facilities, Industrial Client" },
  { quote: "From the historic stonework to the modern addition, the craftsmanship is exceptional.",
    author: "Pastor J. Hill", role: "Senior Pastor" },
  { quote: "They treated our tenants like their own. After-hours work, zero complaints.",
    author: "S. Alvarez", role: "Commercial Property Owner" },
];

export const TEXAS_CITIES = ["Stephenville", "Abilene", "Brownwood", "Lubbock", "San Angelo", "Fort Worth"];

export const STATS = [
  { value: "75+", label: "Years in business" },
  { value: "1,200+", label: "Projects delivered" },
  { value: "0", label: "OSHA recordables YTD" },
  { value: "100%", label: "Texas-based teams" },
];
