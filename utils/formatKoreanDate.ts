export const formatKoreanDate = (isoDate: Date) => {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const weekday = days[date.getDay()];

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  return `${year}년 ${month}월 ${day}일 (${weekday}) ${hours}:${minutes}${ampm}`;
};

// 날짜 비교나 key용: YYYY-MM-DD
export const toKSTDateString = (isoDate: Date | string): string => {
  const date = new Date(isoDate);
  const kst = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  return kst.toISOString().split("T")[0];
};
