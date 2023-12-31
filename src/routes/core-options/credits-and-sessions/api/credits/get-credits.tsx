import { useQuery } from "@tanstack/react-query";

import { CreditType } from "../../types";

async function getCredits(eventId: number): Promise<CreditType[]> {
  return creditsData;
}

export function useCredits(eventId: number) {
  return useQuery({
    queryKey: ["credits", eventId],
    queryFn: () => getCredits(eventId),
  });
}

const creditsData: CreditType[] = [
  { creditTypeId: 1, name: "AMA PRA Category 1 Credits™" },
  { creditTypeId: 3, name: "Non-Physician Attendance" },
  { creditTypeId: 5, name: "AAFP - American Academy of Family Physicians" },
  {
    creditTypeId: 6,
    name: "AANA - American Association of Nurse Anesthetists",
  },
  {
    creditTypeId: 7,
    name: "AANP - American Association of Nurse Practitioners",
  },
  { creditTypeId: 8, name: "AAP - American Academy of Pediatrics" },
  {
    creditTypeId: 9,
    name: "AAPA - American Academy of Physician Assistants",
  },
  {
    creditTypeId: 10,
    name: "ACPE - Accreditation Council for Pharmacy Education",
  },
  { creditTypeId: 11, name: "ADA - American Dental Association" },
  { creditTypeId: 12, name: "AMA PRA Category 2™" },
  { creditTypeId: 13, name: "ANCC - American Nurses Credentialing Center" },
  { creditTypeId: 14, name: "APA - American Psychological Association" },
  { creditTypeId: 15, name: "AART - Category A" },
  {
    creditTypeId: 16,
    name: "ARRT - American Registry of Radiologic Technologists: Category A",
  },
  {
    creditTypeId: 17,
    name: "ASRT - American Society of Radiologic Technologists: Category A",
  },
  {
    creditTypeId: 18,
    name: "CEPTC - Continuing Education Points for Transplant Coordinators: Category 1",
  },
  { creditTypeId: 19, name: "CEU - Continuing Education Unit" },
  {
    creditTypeId: 20,
    name: "CRNA - Certified Registered Nurse Anesthetists",
  },
  { creditTypeId: 43, name: "General Attendance" },
  { creditTypeId: 45, name: "ABIM MOC Part 2" },
  { creditTypeId: 46, name: "ABP MOC Part 2" },
  { creditTypeId: 47, name: "ABA MOCA Part 2" },
  {
    creditTypeId: 48,
    name: "AOA Category 1-A - American Osteopathic Association",
  },
  { creditTypeId: 53, name: "Faculty Speaker Credit" },
  { creditTypeId: 54, name: "TEST" },
  { creditTypeId: 55, name: "TEST2" },
  { creditTypeId: 56, name: "test3" },
  { creditTypeId: 59, name: "Test Credit Type" },
  { creditTypeId: 62, name: "ABPath MOC Part II" },
  { creditTypeId: 63, name: "ASWB" },
  { creditTypeId: 64, name: "APA" },
  { creditTypeId: 65, name: "COPE" },
  { creditTypeId: 66, name: "TomCreditType" },
  { creditTypeId: 68, name: "Jenn Credit 2" },
  { creditTypeId: 69, name: "Wren Credit" },
  { creditTypeId: 70, name: "ABOHNS MOC Part II" },
  { creditTypeId: 71, name: "ABOHNS MOC Part IV" },
  { creditTypeId: 72, name: "ABOHNS MOC Patient Safety" },
  { creditTypeId: 75, name: "IPCE" },
  { creditTypeId: 76, name: "ABA MOCA Patient Safety" },
  { creditTypeId: 77, name: "ABIM MOC Patient Safety" },
  { creditTypeId: 78, name: "ABIM MOC Patient Safety 2?" },
  { creditTypeId: 79, name: "ABPath MOC Part IV" },
  { creditTypeId: 80, name: "ABPath MOC SAM" },
  { creditTypeId: 81, name: "ABO MOC Part II" },
  { creditTypeId: 82, name: "ABO MOC Part IV" },
  { creditTypeId: 83, name: "ABO MOC SAM" },
  { creditTypeId: 84, name: "ABO MOC Patient Safety" },
  { creditTypeId: 85, name: "ABIM MOC Part IV" },
  { creditTypeId: 86, name: "Dance & Vibrate & Undulate" },
  { creditTypeId: 87, name: "Brian Test Credit Type 2" },
  { creditTypeId: 88, name: "Koala Credit Type" },
  { creditTypeId: 92, name: "Quinn Test" },
  { creditTypeId: 95, name: "Testing Brianer" },
  { creditTypeId: 101, name: "Non-CME" },
  { creditTypeId: 102, name: "Testing" },
  { creditTypeId: 104, name: "James Test Credit" },
  { creditTypeId: 105, name: "James Test2" },
  { creditTypeId: 106, name: "CreditType_Testing" },
  { creditTypeId: 107, name: "Social Work" },
  { creditTypeId: 110, name: "Test Credit Type" },
  { creditTypeId: 111, name: "ABS CC SAM" },
  { creditTypeId: 112, name: "ABS CC" },
  { creditTypeId: 113, name: "AAPA Enduring" },
  { creditTypeId: 114, name: "Dietetic CPEUs" },
  { creditTypeId: 115, name: "CAPCE Basic" },
  { creditTypeId: 116, name: "CAPCE Advanced" },
  { creditTypeId: 117, name: "OSBLSW Contact Hours" },
  { creditTypeId: 118, name: "Brian Test Cred 1" },
  { creditTypeId: 119, name: "Brian Test Cred 2" },
  { creditTypeId: 120, name: "CTDPH Infectious Disease" },
  { creditTypeId: 121, name: "CTDPH Cultural Competency" },
  { creditTypeId: 122, name: "CTDPH Cognitive Disorders" },
  { creditTypeId: 123, name: "CTDPH Domestic Violence" },
  { creditTypeId: 124, name: "CTDPH Opioids" },
  { creditTypeId: 125, name: "CTDPH Risk Management" },
  { creditTypeId: 126, name: "CTDPH Sexual Assault" },
  { creditTypeId: 127, name: "CTDPH Veterans Behavioral Health" },
  { creditTypeId: 128, name: "Cardiovascular Education" },
  { creditTypeId: 129, name: "Stroke Education" },
  { creditTypeId: 130, name: "Trauma Education" },
  { creditTypeId: 131, name: "Oncology Education" },
  { creditTypeId: 132, name: "Pharmacology Education" },
  { creditTypeId: 133, name: "AOTA Contact Hours" },
  { creditTypeId: 134, name: "AOTA CEUs" },
  { creditTypeId: 135, name: "Nursing Facility Administration" },
  { creditTypeId: 136, name: "Athletic Trainers" },
  { creditTypeId: 137, name: "CMFT" },
  { creditTypeId: 138, name: "AOTA" },
  { creditTypeId: 139, name: "ASHA Introductory" },
  { creditTypeId: 140, name: "ASHA Intermediate" },
  { creditTypeId: 141, name: "ASHA Advanced" },
  { creditTypeId: 142, name: "ASHA Various" },
  { creditTypeId: 143, name: "AOTA Introductory, Foundational Knowledge" },
  { creditTypeId: 144, name: "CDR" },
  { creditTypeId: 145, name: "AOTA Introductory, Professional Issues" },
  { creditTypeId: 146, name: "AOTA Intro, OTSD" },
  { creditTypeId: 147, name: "AOTA Intermediate, FK" },
  { creditTypeId: 148, name: "AOTA Inter, PI" },
  { creditTypeId: 149, name: "AOTA Inter, OTSD" },
  { creditTypeId: 150, name: "AOTA Advanced, FK" },
  { creditTypeId: 151, name: "AOTA Adv, PI" },
  { creditTypeId: 152, name: "AOTA Adv, OTSD" },
  { creditTypeId: 153, name: "Physical Therapy" },
  { creditTypeId: 154, name: "BOC" },
  { creditTypeId: 155, name: "EJ new Credit" },
  { creditTypeId: 156, name: "ANCC" },
  { creditTypeId: 157, name: "Non-CME Thing" },
  { creditTypeId: 158, name: "ABOS MOC Part II" },
  { creditTypeId: 159, name: "ABOS SAE" },
];
