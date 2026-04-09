export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Using Unsplash for beautiful free images — no API key needed
export const MONTH_IMAGES: Record<number, string> = {
  0: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&q=80", // Jan - snowy mountain
  1: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", // Feb - winter forest
  2: "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=800&q=80", // Mar - spring bloom
  3: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80", // Apr - flowers
  4: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80", // May - green forest
  5: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", // Jun - beach
  6: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80", // Jul - mountain lake
  7: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80", // Aug - sunset
  8: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", // Sep - autumn
  9: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80", // Oct - fall leaves
  10: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800&q=80", // Nov - foggy forest
  11: "https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=800&q=80", // Dec - snowy
};

export const HOLIDAYS: Record<string, string> = {
  "2026-01-01": "New Year's Day",
  "2026-01-26": "Republic Day",
  "2026-03-04": "Holi",
  "2026-04-03": "Good Friday",
  "2026-04-14": "Ambedkar Jayanti",
  "2026-08-15": "Independence Day",
  "2026-10-02": "Gandhi Jayanti",
  "2026-10-25": "Diwali",
  "2026-11-05": "Guru Nanak Jayanti",
  "2026-12-25": "Christmas",
};
