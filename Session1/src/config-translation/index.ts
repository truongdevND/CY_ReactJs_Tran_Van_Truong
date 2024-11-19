import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "../locales/en/translation.json";
import translationVI from "../locales/vi/translation.json";
import translationKR from "../locales/kr/translation.json"
const resources = {
    en: { translation: translationEN },
    kr: { translation: translationKR },
    vi: { translation: translationVI }
};

i18next.use(initReactI18next).init({
    lng: " vi",
    debug: true,
    resources
});
