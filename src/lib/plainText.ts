import { glossary, isGlossaryKey } from "@/data/glossary";

/** `[[glossary-key]]` or `[[glossary-key|label]]` inside copy. */
export const GLOSSARY_MARKUP = /\[\[([a-z0-9-]+)(?:\|([^\]]+))?\]\]/g;

/** Copy with the `[[key|label]]` markup resolved to plain words, for places a popover cannot go. */
export function plainText(text: string): string {
  return text.replace(GLOSSARY_MARKUP, (_match, key: string, label?: string) => {
    if (label) return label;

    return isGlossaryKey(key) ? glossary[key].term : key;
  });
}
