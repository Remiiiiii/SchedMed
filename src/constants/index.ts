export const GenderOptions = ["male", "female"];

export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
];

export const Specialty = {
  cardiology: "Cardiology",
  neurology: "Neurology",
  oncology: "Oncology",
  psychiatry: "Psychiatry",
  gastroenterology: "Gastroenterology",
  generalist: "Generalist",
  dermatology: "Dermatology",
  ophthalmology: "Ophthalmology",
  gynecology: "Gynecology",
  psychology: "Psychology",
};
export const Doctors = [
  {
    image: "/assets/images/dr-green.png",
    name: "Patricia Green",
    specialty: Specialty.generalist,
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "Leila Cameron",
    specialty: Specialty.neurology,
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "David Livingston",
    specialty: Specialty.oncology,
  },
  {
    image: "/assets/images/dr-wu.png",
    name: "Evan Wu",
    specialty: Specialty.psychiatry,
  },
  {
    image: "/assets/images/dr-powell.png",
    name: "Johnathan Powell",
    specialty: Specialty.gastroenterology,
  },
  {
    image: "/assets/images/dr-ramirez.png",
    name: "Alex Ramirez",
    specialty: Specialty.generalist,
  },
  {
    image: "/assets/images/dr-lee.png",
    name: "Jasmine Lee",
    specialty: Specialty.dermatology,
  },
  {
    image: "/assets/images/dr-cruz.png",
    name: "Alyana Cruz",
    specialty: Specialty.ophthalmology,
  },
  {
    image: "/assets/images/dr-sharma.png",
    name: "Jiya Sharma",
    specialty: Specialty.gynecology,
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};
