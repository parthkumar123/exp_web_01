/**
 * Leadership team — single source of truth for the About page section and the
 * Person JSON-LD emitted with it. Photos live in public/team/ (640×800).
 * Ordered by hierarchy; bios mirror each person's LinkedIn profile.
 */
export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin: string;
}

export const LEADERSHIP: TeamMember[] = [
  {
    name: "Hardik Shiyani",
    role: "Founder & Managing Director",
    image: "/team/hardik-shiyani.jpg",
    bio: "Founded Senso Agrotech in 2018 and leads the company's strategy, manufacturing investments and global export partnerships — with a focus on quality systems, innovation and sustainable growth across domestic and international markets.",
    linkedin: "https://www.linkedin.com/in/hardikshiyani/",
  },
  {
    name: "Jayesh Shiyani",
    role: "Production Manager",
    image: "/team/jayesh-shiyani.jpg",
    bio: "Heads manufacturing operations at our Ankleshwar facility since 2019 — production planning, process optimisation and QA/QC — ensuring every batch meets industry standards and regulatory compliance.",
    linkedin: "https://www.linkedin.com/in/jayesh-shiyani/",
  },
  {
    name: "Darshan Shiyani",
    role: "Senior Sales Executive",
    image: "/team/darshan-shiyani.jpg",
    bio: "Drives B2B sales and business development — working with distributors, dealers and export buyers, and handling domestic and international enquiries from first quotation through to delivery.",
    linkedin: "https://www.linkedin.com/in/darshan-shiyani/",
  },
];
