export type SlotType = {
  period: string;
  time: string;
  note: string;
};

export type DayType = {
  id: number;
  title: string;
  description: string;
  slots: SlotType[];
};

export type PackingItemType = {
  id: string;
  item: string;
  icon: string;
};

export const TRIP = {
  destination: "Thimphu & Paro, Bhutan",
  duration: "5 Days",
  date: "June 10, 2026",
  departure: "Phuentsholing, Bhutan",
};

export const DAYS: DayType[] = [
  {
    id: 1,
    title: "Phuentsholing to Thimphu",
    description: "The journey north through the mountains",
    slots: [
      {
        period: "Morning",
        time: "06.00 - 09.00",
        note: "Depart from Phuentsholing. Drive through Chukha past the Chhuzom confluence where three rivers meet.",
      },
      {
        period: "Afternoon",
        time: "14.00 - 17.00",
        note: "Arrive in Thimphu valley. Visit Tashichho Dzong, seat of the Bhutanese government.",
      },
    ],
  },
  {
    id: 2,
    title: "Thimphu & Buddha Dordenma",
    description: "The world's only capital without traffic lights",
    slots: [
      {
        period: "Morning",
        time: "07.00 - 10.00",
        note: "Hike to Buddha Dordenma, the giant 51-metre golden Buddha overlooking the Thimphu valley.",
      },
      {
        period: "Afternoon",
        time: "14.00 - 17.00",
        note: "Explore the weekend market by Wang Chhu river. Try ema datshi, red rice, and suja butter tea.",
      },
    ],
  },
  {
    id: 3,
    title: "Dochula Pass & Punakha",
    description: "Snow peaks and the most beautiful dzong in Bhutan",
    slots: [
      {
        period: "Morning",
        time: "07.00 - 10.00",
        note: "Drive over Dochula Pass at 3,100m. See 108 chortens and Himalayan peaks on a clear day.",
      },
      {
        period: "Afternoon",
        time: "13.00 - 16.00",
        note: "Visit Punakha Dzong, the winter palace of the Je Khenpo, at the confluence of Pho Chhu and Mo Chhu.",
      },
    ],
  },
  {
    id: 4,
    title: "Paro Valley & Rinpung Dzong",
    description: "Ancient fortress and sacred valley",
    slots: [
      {
        period: "Morning",
        time: "07.00 - 09.00",
        note: "Cross the traditional cantilever bridge and walk up to Rinpung Dzong through barley fields.",
      },
      {
        period: "Afternoon",
        time: "14.00 - 17.00",
        note: "Visit the National Museum in Ta Dzong watchtower. Browse local shops for thangkas and wooden bowls.",
      },
    ],
  },
  {
    id: 5,
    title: "Tiger's Nest — Paro Taktsang",
    description: "The most sacred hike in the Kingdom",
    slots: [
      {
        period: "Morning",
        time: "06.00 - 11.00",
        note: "4-hour hike to Paro Taktsang monastery at 3,120m. Guru Rinpoche meditated here in the 8th century.",
      },
      {
        period: "Afternoon",
        time: "14.00 - 16.00",
        note: "Return to Phuentsholing. Final dinner with momos and ara rice wine.",
      },
    ],
  },
];

export const PACKING: PackingItemType[] = [
  { id: "1", item: "Passport & Bhutan visa permit", icon: "document-outline" },
  { id: "2", item: "Warm jacket for Dochula Pass", icon: "snow-outline" },
  { id: "3", item: "Hiking boots for Tiger's Nest", icon: "walk-outline" },
  { id: "4", item: "Camera for valley views", icon: "camera-outline" },
  { id: "5", item: "Cash in Ngultrum (BTN)", icon: "cash-outline" },
  { id: "6", item: "Sunscreen and sunglasses", icon: "sunny-outline" },
  { id: "7", item: "Kira or Gho for dzong visits", icon: "shirt-outline" },
  { id: "8", item: "Reusable water bottle", icon: "water-outline" },
  { id: "9", item: "First aid kit", icon: "medkit-outline" },
  {
    id: "10",
    item: "Power bank and adaptor",
    icon: "battery-charging-outline",
  },
];
