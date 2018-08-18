/**
 * Interface to describe a language
 */
interface Lang {
  /**
   * Two letters described language
   */
  id: string;

  /**
   * I18n key described language
   */
  name: string;

  /**
   * True if it is the default language
   */
  default?: boolean;
}

/**
 * List of availables languages in application
 */
export const appAvailableLangs: Lang[] = [
  { id: "en", name: "ENGLISH", default: true },
  { id: "fr", name: "FRENCH" }
];
