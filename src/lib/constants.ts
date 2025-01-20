import { Locale } from "./types/misc";
export const SITE_URL = 'https://www.maxvario.com';
export const MAPS_KEY = 'AIzaSyBS-TWoQTH2OM6TSmV8QIj95NB01nre-Y0';
export const MAP_ID = '80c93426ec151eba';
export const GOOGLE_ANALYTICS_ID = 'G-08V64FJB6L';
export const LOCALES = ['de', 'en', 'es', 'fr', 'it'] as const;
export const languages: Record<Locale, {label: string; flag: string}> = {
    de: {
        label: 'Deutsch',
        flag: 'de',
    },
    en: {
        label: 'English',
        flag: 'us',
    },
    es: {
        label: 'Español',
        flag: 'es',
    },
    fr: {
        label: 'Français',
        flag: 'fr',
    },
    it: {
        label: 'Italiano',
        flag: 'it',
    },
}
export const DEFAULT_LOCALE = 'en';

export const INSTAGRAM = 'https://www.instagram.com/maxvariohq/';
