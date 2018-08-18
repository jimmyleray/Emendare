/**
 * Interface to describe a language
 */
interface Lang {
  id: string;
  name: string;
  default?: boolean;
}

/**
 * List of availables languages in application
 */
export const appAvailableLangs: Lang[] = [
  { id: "en", name: "ENGLISH", default: true },
  { id: "fr", name: "FRENCH" }
];
