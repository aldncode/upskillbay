import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.careerTrack.createMany({
    data: [
      {
        title: "Salesforce Admin",
        description: "Manage CRM systems",
        outcome: "Get a Salesforce Admin job",
        duration: "30-45 days",
        earningPotential: "₹20K–₹60K/month",
      },
      {
        title: "Data Analyst",
        description: "Excel + SQL + dashboards",
        outcome: "Get your first data job",
        duration: "30 days",
        earningPotential: "₹25K–₹80K/month",
      },
      {
        title: "Digital Marketing",
        description: "Run ads & grow brands",
        outcome: "Get freelance clients",
        duration: "14 days",
        earningPotential: "₹10K–₹50K/month",
      },
      {
        title: "UI/UX Designer",
        description: "Design apps in Figma",
        outcome: "Get design projects",
        duration: "30 days",
        earningPotential: "₹15K–₹70K/month",
      },
      {
        title: "Frontend Developer",
        description: "React + Next.js",
        outcome: "Get dev job/freelance",
        duration: "45 days",
        earningPotential: "₹30K–₹1L/month",
      }
    ],
  });
}

main();