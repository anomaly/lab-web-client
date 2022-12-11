import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import enAUSysAdmin from './en-AU/sys-admin.json';
import enUSSysAdmin from './en-US/sys-admin.json';

export const defaultNS = 'enAUSysAdmin';

export const resources = {
  "en-AU": {
    enAUSysAdmin
  },
  "en-US": {
    enUSSysAdmin
  }
};

i18next.use(initReactI18next).init({
  lng: 'en-AU',
  debug: true,
  resources,
  defaultNS,
});