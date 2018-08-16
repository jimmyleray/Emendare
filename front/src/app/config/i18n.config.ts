interface Lang {
  id: string;
  name: string;
  default?: boolean;
}

export const appAvailableLangs: Lang[] = [
  { id: "en", name: "ENGLISH", default: true },
  { id: "fr", name: "FRENCH" }
];
