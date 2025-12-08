// Validation Constants
export const VALIDATION = {
  DNI_REGEX: /^[A-Za-z0-9]{5,20}$/,
  POSTAL_CODE_REGEX: /^[0-9]{5}$/,
  IBAN_REGEX: /^[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}$/i,

  MIN_AGE_ADULT: 18,
  MIN_DATE: new Date("1900-01-01"),
  MAX_DATE: new Date(),

  MAX_LENGTHS: {
    NAME: 50,
    SURNAMES: 100,
    ADDRESS: 200,
    CITY: 50,
    PROVINCE: 50,
  },
} as const;

export const CONTACT_INFO = {
  PHONE: "681351345",
  EMAIL: "magnetic.gijon@gmail.com",
  MAPS: "https://maps.app.goo.gl/Ax5EHciVr3K9F7ps5",
} as const;
