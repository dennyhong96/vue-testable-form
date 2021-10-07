import {
  required,
  isBetween,
  validateMeasurement,
  constraints,
  isFormValid,
  Status,
  Form,
} from "@/validations";

describe("required", () => {
  it("is valid", () => {
    const actual = required("denny");
    expect(actual).toEqual({ valid: true });
  });

  const negetiveResult = { valid: false, message: "Field is required." };
  const cases = [
    ["", negetiveResult],
    [0, negetiveResult],
    [undefined, negetiveResult],
    [null, negetiveResult],
  ];

  test.each(cases)(
    "returns invalid",
    // @ts-ignore
    (input: "" | 0 | undefined | null, output: Status) => {
      expect(required(input)).toEqual(output);
    }
  );
});

describe("isBetween", () => {
  it("is valid", () => {
    const actual = isBetween(5, { min: 3, max: 7 });
    expect(actual).toEqual({ valid: true });
  });

  it("is same as min", () => {
    const actual = isBetween(3, { min: 3, max: 7 });
    expect(actual).toEqual({
      valid: true,
    });
  });

  it("is same as max", () => {
    const actual = isBetween(7, { min: 3, max: 7 });
    expect(actual).toEqual({
      valid: true,
    });
  });

  it("is smaller than min", () => {
    const actual = isBetween(1, { min: 3, max: 7 });
    expect(actual).toEqual({
      valid: false,
      message: "Must be between 3 and 7.",
    });
  });

  it("is greater than max", () => {
    const actual = isBetween(9, { min: 3, max: 7 });
    expect(actual).toEqual({
      valid: false,
      message: "Must be between 3 and 7.",
    });
  });

  it("is invalid input", () => {
    // @ts-ignore
    const actual = isBetween("abcdef", { min: 3, max: 7 });
    expect(actual).toEqual({
      valid: false,
      message: "Must be a valid number.",
    });
  });
});

describe("validateMeasurement", () => {
  it("returns valid is true", () => {
    const actual = validateMeasurement(100, constraints.kg);
    expect(actual).toEqual({ valid: true });
  });

  it("is outside the kg constraints", () => {
    const actual = validateMeasurement(500, constraints.kg);
    expect(actual).toEqual({
      valid: false,
      message: "Must be between 30 and 200.",
    });
  });

  it("is outside the lbs constraints", () => {
    const actual = validateMeasurement(700, constraints.lb);
    expect(actual).toEqual({
      valid: false,
      message: "Must be between 66 and 440.",
    });
  });
});

describe("isFormValid", () => {
  it("is valid", () => {
    const validatedForm: Form = {
      name: { valid: true },
      weight: { valid: true },
    };

    const actual = isFormValid(validatedForm);
    expect(actual).toBe(true);
  });

  it("is invalid", () => {
    const validatedForm: Form = {
      name: { valid: false, message: "Required" },
      weight: { valid: true },
    };

    const actual = isFormValid(validatedForm);
    expect(actual).toBe(false);
  });
});
