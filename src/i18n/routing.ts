import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
import { DEFAULT_LOCALE, LOCALES } from '@/lib/constants';
 
export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE
});
 
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);