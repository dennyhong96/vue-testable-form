export interface Status {
  valid: boolean;
  message?: string;
}

export const required = (value: unknown): Status => {
  if (!value) return { valid: false, message: "Field is required." };
  return { valid: true };
};

export const isBetween = (
  value: number,
  { min, max }: { min: number; max: number }
): Status => {
  if (!Number.isFinite(Number(value))) {
    return { valid: false, message: `Must be a valid number.` };
  }

  if (value < min || value > max) {
    return { valid: false, message: `Must be between ${min} and ${max}.` };
  }

  return { valid: true };
};

export const constraints = {
  kg: {
    min: 30,
    max: 200,
  },
  lb: {
    min: 66,
    max: 440,
  },
};

export const validateMeasurement = (
  value: number,
  { min, max }: { min: number; max: number }
): Status => {
  const requiredResult = required(value);
  if (!requiredResult.valid) return requiredResult;

  return isBetween(value, { min, max });
};

export interface Patient {
  name: string;
  weight: {
    value: number;
    units: "kg" | "lb";
  };
}

export interface Form {
  name: Status;
  weight: Status;
}

export function validatePatient(patient: Patient): Form {
  const form: Partial<Form> = {};
  form.name = required(patient.name);
  form.weight = validateMeasurement(
    Number(patient.weight.value),
    constraints[patient.weight.units]
  );
  return form as Form;
}

export function patientForm(patient: Patient): Form {
  return validatePatient(patient);
}

export function isFormValid(form: Form): boolean {
  return Object.values(form).reduce((acc, status: Status) => {
    if (!acc) return acc;
    return status.valid;
  }, true);
}
