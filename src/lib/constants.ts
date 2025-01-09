import { Locale } from "./types/misc";

export const MAPS_KEY = 'AIzaSyBS-TWoQTH2OM6TSmV8QIj95NB01nre-Y0';
export const MAP_ID = '80c93426ec151eba';

export const LOCALES = ['de', 'en', 'es', 'fr', 'it'] as const;
export const languages: Record<Locale, {label: string; flag: string}> = {
    de: {
        label: 'Deutsch',
        flag: '🇩🇪',
    },
    en: {
        label: 'English',
        flag: '🇺🇸',
    },
    es: {
        label: 'Español',
        flag: '🇪🇸',
    },
    fr: {
        label: 'Français',
        flag: '🇫🇷',
    },
    it: {
        label: 'Italiano',
        flag: '🇮🇹',
    },
}
export const DEFAULT_LOCALE = 'en';
export const REVALIDATE: Record<string, number> = {
    home: 1,
}


export const INSTAGRAM = 'https://www.instagram.com/maxvariohq/';
