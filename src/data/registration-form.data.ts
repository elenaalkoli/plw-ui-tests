import { faker } from "@faker-js/faker";

export interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  age: string; // string for input
  salary: number;
  department: string;
}

export function generateRegistrationFormData(): RegistrationFormData {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    age: faker.number.int({ min: 18, max: 65 }).toString(),
    salary: faker.number.int({ min: 30000, max: 150000 }),
    department: faker.commerce.department(),
  };
}
