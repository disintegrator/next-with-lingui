import en from "@lingui/loader!./en/messages.json";
import fr from "@lingui/loader!./fr/messages.json";
import es from "@lingui/loader!./es/messages.json";

const catalogs = { en, fr, es };

export default function getCatalog(locale) {
  return catalogs[locale] || catalogs.en;
}
