import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import EnJson from './translations/en.json';
import RuJson from './translations/ru.json';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: [
      "ru",
      "en", "de", "es"
    ],
    lng: "ru",
    debug: false,
    resources: {
      en: { ...EnJson },
      ru: { ...RuJson },
      de: { },
      es: { },
    },
  });

  // key2: "test {{ one }} test {{ two }}",
// const res = i18next.t('key', { one: 'tets', two: "test" })
