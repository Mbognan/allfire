export type TeamMember = {
  name: string;
  role: string;
  photo: string;
};

export const team: TeamMember[] = [
  {
    name: "Peter",
    role: ", former NSW Fire Brigades Senior Officer",
    photo: "/images/our-team/pete_img.jpeg",
  },
  {
    name: "Kyriakos",
    role: "Technician, next-generation",
    photo: "/images/stock/team-1.webp",
  },
  {
    name: "Orlando",
    role: "Technician, next-generation",
    photo: "/images/stock/team-3.webp",
  },
];

export const widerCrewNote =
  "Backed by a wider crew of serving and retired firefighters across Greater Sydney.";
