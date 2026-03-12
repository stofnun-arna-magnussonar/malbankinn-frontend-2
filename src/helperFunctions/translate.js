import { useGlobalConfigStore } from "@/stores/globalConfig";
import translations from "@/data/translations.json";

export function translate(key) {
  const store = useGlobalConfigStore();
  const activeLanguage = store.activeLanguage;  
  return translations[key]?.[activeLanguage] || key;
}