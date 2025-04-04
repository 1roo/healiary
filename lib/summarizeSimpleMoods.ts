import { hexToHSL, getMoodFromHSL } from "@/lib/colorUtils";

const simpleMoodMap: { [key: string]: "good" | "normal" | "sad" } = {
  행복: "good",
  편안: "good",
  밝음: "good",
  차분: "normal",
  사색: "normal",
  중립: "normal",
  우울: "sad",
  분노: "sad",
};

export function summarizeSimpleMoods(entries: { color: string }[]) {
  const summary: Record<"good" | "normal" | "sad", number> = {
    good: 0,
    normal: 0,
    sad: 0,
  };

  for (const entry of entries) {
    const { hue, lightness } = hexToHSL(entry.color);
    const mood = getMoodFromHSL(hue, lightness);
    const simple = simpleMoodMap[mood] || "normal";
    summary[simple]++;
  }

  return summary;
}
