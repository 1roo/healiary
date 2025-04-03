// lib/colorUtils.ts

// HEX → HSL 변환 함수
export function hexToHSL(hex: string) {
    hex = hex.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
  
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;
  
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h *= 60;
    }
  
    return {
      hue: Math.round(h),
      saturation: Math.round(s * 100),
      lightness: Math.round(l * 100),
    };
  }
  
  // HSL 기반 감정 분류 함수
  export function getMoodFromHSL(hue: number, lightness: number): string {
    if (lightness < 30) return "우울";
    if (lightness > 70) return "밝음";
  
    if (hue >= 0 && hue <= 30) return "분노";
    if (hue >= 31 && hue <= 90) return "행복";
    if (hue >= 91 && hue <= 150) return "편안";
    if (hue >= 151 && hue <= 210) return "차분";
    if (hue >= 211 && hue <= 270) return "우울";
    if (hue >= 271 && hue <= 330) return "사색";
    return "중립";
  }
  