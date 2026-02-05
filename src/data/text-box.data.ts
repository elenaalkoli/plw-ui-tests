import { faker } from "@faker-js/faker";

export interface TextBoxData {
  fullName: string;
  email: string;
  currentAddress: string;
  permanentAddress: string;
}

export function generateTextBoxData(): TextBoxData {
  return {
    fullName: `${faker.person.firstName()} ${faker.person.lastName()}`,
    email: faker.internet.email(),
    currentAddress: `${faker.location.city()}, ${faker.location.state()}`,
    permanentAddress: `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.country()}`,
  };
}
