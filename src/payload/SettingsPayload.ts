type Locale = "en" | "es";
type Theme = "dark" | "light";

export interface SettingsPayload {
  locale: Locale;
  theme: Theme;
}
