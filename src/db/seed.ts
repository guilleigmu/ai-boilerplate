import "dotenv/config";

import { faker } from "@faker-js/faker/locale/es";
import { db, pg } from "@/db/index";
import { invitations, registrations } from "@/db/schema";

// Spanish provinces and their cities
const PROVINCES_CITIES: Record<string, string[]> = {
  Madrid: ["Madrid", "Alcalá de Henares", "Móstoles", "Getafe", "Leganés"],
  Barcelona: ["Barcelona", "L'Hospitalet", "Badalona", "Terrassa", "Sabadell"],
  Valencia: ["Valencia", "Gandía", "Torrent", "Paterna", "Sagunto"],
  Sevilla: ["Sevilla", "Dos Hermanas", "Alcalá de Guadaíra", "Utrera"],
  Málaga: ["Málaga", "Marbella", "Vélez-Málaga", "Fuengirola", "Torremolinos"],
  Alicante: ["Alicante", "Elche", "Torrevieja", "Benidorm", "Alcoy"],
  Zaragoza: ["Zaragoza", "Calatayud", "Utebo", "Ejea de los Caballeros"],
  Bilbao: ["Bilbao", "Barakaldo", "Getxo", "Portugalete", "Santurtzi"],
};

// Generate a valid Spanish DNI
function generateDNI(): string {
  const letters = "TRWAGMYFPDXBNJZSQVHLCKE";
  const number = faker.number.int({ min: 10000000, max: 99999999 });
  const letter = letters[number % 23];
  return `${number}${letter}`;
}

// Generate a valid Spanish IBAN
function generateIBAN(): string {
  const bankCode = faker.string.numeric(4);
  const branchCode = faker.string.numeric(4);
  const checkDigits = faker.string.numeric(2);
  const accountNumber = faker.string.numeric(10);
  return `ES${faker.string.numeric(2)}${bankCode}${branchCode}${checkDigits}${accountNumber}`;
}

// Generate a Spanish phone number
function generatePhone(): string {
  const prefixes = ["6", "7"]; // Mobile prefixes in Spain
  const prefix = faker.helpers.arrayElement(prefixes);
  return `+34${prefix}${faker.string.numeric(8)}`;
}

// Generate a Spanish postal code for a province
function generatePostalCode(province: string): string {
  const provinceCodes: Record<string, string> = {
    Madrid: "28",
    Barcelona: "08",
    Valencia: "46",
    Sevilla: "41",
    Málaga: "29",
    Alicante: "03",
    Zaragoza: "50",
    Bilbao: "48",
  };
  const code = provinceCodes[province] || "28";
  return `${code}${faker.string.numeric(3)}`;
}

// Check if someone is a minor (under 18)
function isMinor(birthDate: Date): boolean {
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    return age - 1 < 18;
  }
  return age < 18;
}

async function main() {
  console.log("🌱 Starting database seed...\n");

  // Create invitations with different states
  console.log("📨 Creating invitations...");

  const invitationData = [
    // Valid invitations (default expiry 1 month from now)
    ...Array.from({ length: 4 }, () => ({
      isValid: true,
    })),
    // Expired invitations (created in the past)
    ...Array.from({ length: 3 }, () => ({
      isValid: true,
      expiresAt: faker.date.past({ years: 1 }),
    })),
    // Invalidated invitations
    ...Array.from({ length: 2 }, () => ({
      isValid: false,
    })),
  ];

  const createdInvitations = await db
    .insert(invitations)
    .values(invitationData)
    .returning();

  console.log(`   ✓ Created ${createdInvitations.length} invitations\n`);

  // Create registrations
  console.log("📝 Creating registrations...");

  const validInvitations = createdInvitations.filter((inv) => inv.isValid);

  const registrationData = Array.from({ length: 17 }, (_, i) => {
    // Cycle through valid invitations
    const invitation = validInvitations[i % validInvitations.length];
    const province = faker.helpers.arrayElement(Object.keys(PROVINCES_CITIES));
    const cities = PROVINCES_CITIES[province];
    const city = faker.helpers.arrayElement(cities);

    // Mix of adults and minors
    const isMinorRegistration = i < 2; // First 2 are minors
    const birthDate = isMinorRegistration
      ? faker.date.birthdate({ min: 10, max: 17, mode: "age" })
      : faker.date.birthdate({ min: 18, max: 65, mode: "age" });

    const hasIBAN = faker.datatype.boolean();
    const acceptsImageRights = faker.datatype.boolean();
    const acceptsAdvertisements = faker.datatype.boolean();

    const registration = {
      invitationId: invitation.id,
      name: faker.person.firstName(),
      surnames: faker.person.lastName(),
      dni: generateDNI(),
      phone: generatePhone(),
      address: `${faker.location.streetAddress()}, ${faker.number.int({ min: 1, max: 10 })}`,
      city,
      province,
      postalCode: generatePostalCode(province),
      email: faker.internet.email().toLowerCase(),
      birthDate,

      // Parent data for minors
      ...(isMinor(birthDate) && {
        parentName: `${faker.person.firstName()} ${faker.person.lastName()} ${faker.person.lastName()}`,
        parentPhone: generatePhone(),
        parentBirthDate: faker.date.birthdate({
          min: 35,
          max: 55,
          mode: "age",
        }),
        parentDni: generateDNI(),
      }),

      // Optional IBAN
      ...(hasIBAN && { iban: generateIBAN() }),

      // Terms
      acceptTerms: true,
      acceptServices: true,
      acceptAdvertisements: acceptsAdvertisements,
      acceptImageRights: acceptsImageRights,
    };

    return registration;
  });

  const createdRegistrations = await db
    .insert(registrations)
    .values(registrationData)
    .returning();

  console.log(`   ✓ Created ${createdRegistrations.length} registrations\n`);

  // Summary
  console.log("📊 Seed Summary:");
  console.log(`   • Invitations: ${createdInvitations.length}`);
  console.log(
    `     - Valid: ${createdInvitations.filter((i) => i.isValid).length}`,
  );
  console.log(
    `     - Expired: ${createdInvitations.filter((i) => i.expiresAt < new Date()).length}`,
  );
  console.log(
    `     - Invalidated: ${createdInvitations.filter((i) => !i.isValid).length}`,
  );
  console.log(`   • Registrations: ${createdRegistrations.length}`);
  console.log(
    `     - Adults: ${createdRegistrations.filter((r) => !r.parentName).length}`,
  );
  console.log(
    `     - Minors: ${createdRegistrations.filter((r) => r.parentName).length}`,
  );
  console.log(
    `     - With IBAN: ${createdRegistrations.filter((r) => r.iban).length}`,
  );

  console.log("\n✅ Seed completed successfully!");

  await pg.end();
}

main();
