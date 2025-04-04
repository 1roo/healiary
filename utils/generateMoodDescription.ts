// utils/generateMoodDescription.ts

export function getHueColorName(hue: number): string {
  if (hue < 20) return "붉은색";
  if (hue < 60) return "주황색";
  if (hue < 90) return "노란색";
  if (hue < 150) return "초록색";
  if (hue < 200) return "청록색";
  if (hue < 250) return "파란색";
  if (hue < 290) return "보라색";
  return "분홍색";
}

export function getToneDescription(
  saturation: number,
  lightness: number
): string {
  let tone = "";

  if (saturation < 30) tone += "탁하고 ";
  else if (saturation > 70) tone += "선명하고 ";

  if (lightness < 30) tone += "어두운 ";
  else if (lightness > 70) tone += "밝은 ";

  return tone;
}

export function generateMoodDescription({
  hue,
  saturation,
  lightness,
  interpretedMood,
}: {
  hue: number;
  saturation: number;
  lightness: number;
  interpretedMood: string;
}): string {
  const color = getHueColorName(hue);
  const tone = getToneDescription(saturation, lightness);

  return `${tone}${color} 빛이 감도는, ${interpretedMood}이 묻어나는 하루였어요.`;
}
