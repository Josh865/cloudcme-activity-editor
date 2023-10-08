import { useQuery } from "@tanstack/react-query";
import ky from "ky";

import { ActivityMocInformation } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

const exampleMocInformation = {
  enableMoc: true,
  claimByDate: new Date("1/1/2024"),
  boards: [
    {
      id: 38,
      name: "American Board of Anesthesiology (ABA)",
      points: 10,
      types: ["Lifelong Learning (CME)", "Patient Safety"],
      // abaContentOutline: [
      //   { id: "123", name: "hello world", otherDescription: "" },
      //   { id: "1234", name: "baseball", otherDescription: "" },
      // ],
      specialties: [
        "Ambulatory/Outpatient",
        "Neuro Anesthesia",
        "Sleep Medicine",
        "Trauma",
      ],
    },
    {
      id: 36,
      name: "American Board of Surgery (ABS)",
      points: 54,
      types: ["Self-Assessment (Part II)", "Accredited CME"],
      abaContentOutline: [],
      specialties: ["Complex General Surgical Oncology", "General Surgery"],
    },
    {
      id: 30,
      name: "American Board of Pediatrics (ABP)",
      points: 36,
      types: ["Lifelong Learning and Self-Assessment (Part II)"],
      abaContentOutline: [],
      specialties: [
        "Adolescent Medicine",
        "Neurodevelopmental Disabilities",
        "Pediatric Cardiology",
        "Pediatric Critical Care Medicine",
        "Pediatric Emergency Medicine",
        "Pediatric Endocrinology",
        "Pediatric Gastroenterology",
        "Pediatric Hematology-Oncology",
        "Pediatric Infectious Diseases",
        "Pediatric Nephrology",
        "Pediatric Neurology",
        "Pediatric Pulmonology",
        "Pediatric Rheumatology",
        "Pediatric Transplant Hepatology",
      ],
    },
  ],
};

//TODO: Replace with API
async function getMocInformation(
  activityId: number,
): Promise<ActivityMocInformation> {
  return exampleMocInformation;
}

export function useMocInformation(activityId: number) {
  return useQuery({
    queryKey: ["mocInfo", activityId],
    queryFn: () => getMocInformation(activityId),
  });
}
