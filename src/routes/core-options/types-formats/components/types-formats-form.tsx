import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Check } from "lucide-react";
import { useForm } from "react-hook-form";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form as FormProvider,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";
import { Switch } from "~/components/ui/switch";
import { ConfirmNavigationAlert } from "~/components/confirm-navigation-alert";
import { FormSection } from "~/components/form-section";

export function TypesFormatsForm() {
  const form = useForm<any>({
    // resolver: zodResolver(BasicInformationRequestSchema),
    defaultValues: {},
  });

  function onSubmit(values: Record<string, string>) {
    console.log(values);
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        <ConfirmNavigationAlert />

        <FormSection
          heading="Activity Name"
          description="What do you want to call your activity?"
        >
          <div className="flex flex-col gap-y-4">
            {mocBoardsList.map((board) => (
              <>
                <Board key={board.id} board={board} />
              </>
            ))}
          </div>
        </FormSection>

        <Separator />

        <Button type="submit">Save Changes</Button>
      </form>
    </FormProvider>
  );
}

function Board({ board }) {
  const [checked, setChecked] = useState<boolean | "indeterminate">(false);

  return (
    <div className="flex flex-col">
      <div
        className={cn(
          "flex items-center space-x-2 border p-4",
          checked
            ? "rounded-t-md border-primary bg-muted"
            : "rounded-md border-border bg-background",
        )}
      >
        <Checkbox
          id={`board_${board.mocBoardId}`}
          checked={checked}
          onCheckedChange={(checked) => setChecked(checked)}
        />
        <label
          htmlFor={`board_${board.mocBoardId}`}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {board.mocBoardName}
        </label>
      </div>

      {checked && (
        <div className="-mt-px rounded-b-md border border-primary p-4 pt-[calc(theme(spacing.4)+1px)]">
          <div className="space-y-1.5">
            <Label htmlFor="email">Points</Label>
            <Input type="email" id="email" className="w-80" />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Specialties</Label>
              <div className="rounded-md border">
                <SpecialtySelect specialties={board.mocSpecialties} />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Types</Label>
              <div className="rounded-md border">
                <TypeSelect types={board.mocTypes} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TypeSelect({ types }) {
  const [selectedTypes, setSelectedTypes] = useState([]);

  function handleCommandChange(value) {
    if (selectedTypes.includes(value)) {
      setSelectedTypes(types.filter((t) => t !== value));
      return;
    }

    setSelectedTypes([...selectedTypes, value]);
  }

  return (
    <Command>
      <CommandInput placeholder="Search types..." />
      <CommandList className="h-80 max-h-none">
        <CommandEmpty>No framework found.</CommandEmpty>
        {types.map((type) => (
          <CommandItem
            key={type}
            value={type}
            onSelect={(currentValue) => {
              handleCommandChange(currentValue);
            }}
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4",
                selectedTypes.includes(type.toLowerCase())
                  ? "opacity-100"
                  : "opacity-0",
              )}
            />
            {type}
          </CommandItem>
        ))}
      </CommandList>
    </Command>
  );
}

function SpecialtySelect({ specialties }) {
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);

  function handleCommandChange(value) {
    console.log(selectedSpecialties, value);
    if (selectedSpecialties.includes(value)) {
      console.log("yep");
      setSelectedSpecialties(selectedSpecialties.filter((s) => s !== value));
      return;
    }

    setSelectedSpecialties([...selectedSpecialties, value]);
  }

  return (
    <Command>
      <CommandInput placeholder="Search types..." />
      <CommandList className="h-80 max-h-none">
        <CommandEmpty>No framework found.</CommandEmpty>
        {specialties.map((specialty) => (
          <CommandItem
            key={specialty}
            value={specialty}
            onSelect={(currentValue) => {
              handleCommandChange(currentValue);
            }}
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4",
                selectedSpecialties.includes(specialty.toLowerCase())
                  ? "opacity-100"
                  : "opacity-0",
              )}
            />
            {specialty}
          </CommandItem>
        ))}
      </CommandList>
    </Command>
  );
}

const mocBoardsList = [
  {
    mocBoardId: 1,
    mocBoardName:
      "American Board of Otolaryngology – Head and Neck Surgery (ABOHNS)",
    points: 0,
    mocTypes: [
      "Patient Safety",
      "Improvement in Medical Practice (Part IV)",
      "Lifelong Learning (CME)",
      "Self-Assessment Module (Part II)",
    ],
    mocSpecialties: [
      "Allergy",
      "Facial Plastic & Reconstructive Surgery",
      "Head & Neck",
      "Laryngology",
      "Otology",
      "Neurotology",
      "Pediatric Otolaryngology",
      "Rhinology",
      "Sleep Medicine",
      "General Otolaryngology",
    ],
  },
  {
    mocBoardId: 2,
    mocBoardName: "American Board of Orthopaedic Surgery (ABOS)",
    points: 0,
    mocTypes: ["Accredited CME", "Self-Assessment Examination (SAE)"],
    mocSpecialties: [
      "Adult Reconstruction",
      "Foot and Ankle",
      "General Orthopaedics",
      "Musculoskeletal Oncology",
      "Orthopaedic Sports Medicine",
      "Orthopaedic Trauma",
      "Pediatric Orthopaedic Surgery",
      "Shoulder and Elbow",
      "Surgery of the Hand",
      "Surgery of the Spine",
    ],
  },
  {
    mocBoardId: 3,
    mocBoardName: "American Board of Pediatrics (ABP)",
    points: 0,
    mocTypes: ["Lifelong Learning and Self-Assessment (Part II)"],
    mocSpecialties: [
      "Adolescent Medicine",
      "Child Abuse Pediatrics",
      "Developmental-Behavioral Pediatrics",
      "General Pediatrics",
      "Hospice & Palliative Medicine",
      "Hospital Medicine",
      "Medical Toxicology",
      "Neonatal-Perinatal Medicine",
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
      "Sleep Medicine",
      "Sports Medicine",
      "Professionalism/Patient Safety/Other Skills",
    ],
  },
  {
    mocBoardId: 4,
    mocBoardName: "American Board of Internal Medicine (ABIM)",
    points: 0,
    mocTypes: [
      "Medical Knowledge (Part II)",
      "Patient Safety",
      "Practice Assessment (Part IV)",
    ],
    mocSpecialties: [
      "Adolescent Medicine",
      "Adult Congenital Heart Disease",
      "Advanced Heart Failure and Transplant Cardiology",
      "Cardiovascular Disease",
      "Clinical Cardiac Electrophysiology",
      "Critical Care Medicine",
      "Endocrinology, Diabetes, and Metabolism",
      "Gastroenterology",
      "Geriatric Medicine",
      "Hematology",
      "Hospice and Palliative Medicine",
      "Hospital Medicine",
      "Infectious Disease",
      "Internal Medicine",
      "Interventional Cardiology",
      "Medical Oncology",
      "Nephrology",
      "Neurocritical Care",
      "Pulmonary Disease",
      "Rheumatology",
      "Sleep Medicine",
      "Sports Medicine",
      "Transplant Hepatology",
    ],
  },
  {
    mocBoardId: 5,
    mocBoardName: "American Board of Pathology (ABPath)",
    points: 0,
    mocTypes: [
      "Improvement in Medical Practice (Part IV)",
      "Self-Assessment (Part II)",
      "Lifelong Learning (CME)",
    ],
    mocSpecialties: [
      "All Practice Areas (e.g. ethics)",
      "Surgical Pathology",
      "Clinical Pathology",
      "Blood Bank Transfusion Medicine",
      "Breast",
      "Cardiovascular",
      "Chemical Pathology",
      "Clinical Informatics",
      "Cytopathology",
      "Dermatopathology",
      "Endocrine",
      "Female Reproductive",
      "Forensic Pathology",
      "GI (Incl. Liver, Pancreas, Bilary)",
      "Head & Neck/Oral",
      "Hematology (Blood, BM)",
      "Hematopathology (LN, Spleen)",
      "Hemostasis & Thrombosis/Coagulation",
      "Infectious Diseases/Medical Microbiology",
      "Lab Management",
      "Male Genital",
      "Medical Director",
      "Molecular Genetic Pathology",
      "Neuropathology (incl. Neuromuscular)",
      "Patient Safety",
      "Pediatric Pathology",
      "Placenta",
      "Pulmonary, Mediastinum",
      "Renal/Medical Renal",
      "Soft Tissue & Bone",
      "Transplant Pathology",
      "Urinary Tract",
    ],
  },
  {
    mocBoardId: 6,
    mocBoardName: "American Board of Surgery (ABS)",
    points: 0,
    mocTypes: ["Self-Assessment (Part II)", "Accredited CME"],
    mocSpecialties: [
      "Complex General Surgical Oncology",
      "Hand Surgery",
      "Hospice & Palliative Medicine",
      "Neurocritical Care",
      "Pediatric Surgery",
      "Surgical Critical Care",
      "Vascular Surgery",
      "General Surgery",
      "Bariatric Surgery",
    ],
  },
  {
    mocBoardId: 7,
    mocBoardName: "American Board of Anesthesiology (ABA)",
    points: 0,
    mocTypes: ["Lifelong Learning (CME)", "Patient Safety"],
    mocSpecialties: [
      "Ambulatory/Outpatient",
      "Cardiac Anesthesia",
      "Critical Care Medicine",
      "General Operative Anesthesia",
      "Hospice and Palliative Medicine",
      "Neuro Anesthesia",
      "Neurocritical Care",
      "Obstetric Anesthesia",
      "Pain Medicine",
      "Pediatric Anesthesia",
      "Regional Anesthesia/Acute Pain",
      "Sleep Medicine",
      "Thoracic Anesthesia",
      "Trauma",
    ],
  },
];
