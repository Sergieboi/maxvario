import { LOCALES } from "../constants";

export type Locale = (typeof LOCALES)[number];

export type PageName =
  | "home"
  | "about"
  | "contact"
  | "404"
  | "races"
  | "events"
  | "news"
  | "blog"
  | "signin"
  | "account"
  | "privacy"
  | "terms";
