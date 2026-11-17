export type City = { name: string; lon: number; lat: number; weight: number; hub?: boolean; label?: boolean };

// Weight is a rough share of traffic, used only for the height of each city's light.
export const cities: City[] = [
  { name: "Cairo", lon: 31.24, lat: 30.04, weight: 1, hub: true, label: true },
  { name: "Giza", lon: 31.0, lat: 29.9, weight: 0.55 },
  { name: "Alexandria", lon: 29.92, lat: 31.2, weight: 0.7, label: true },
  { name: "Marsa Matruh", lon: 27.24, lat: 31.35, weight: 0.15 },
  { name: "Damanhur", lon: 30.47, lat: 31.03, weight: 0.2 },
  { name: "Kafr El Sheikh", lon: 30.94, lat: 31.11, weight: 0.2 },
  { name: "Tanta", lon: 31.0, lat: 30.79, weight: 0.3 },
  { name: "Mansoura", lon: 31.38, lat: 31.04, weight: 0.35 },
  { name: "Damietta", lon: 31.81, lat: 31.42, weight: 0.2 },
  { name: "Port Said", lon: 32.3, lat: 31.26, weight: 0.3, label: true },
  { name: "Ismailia", lon: 32.27, lat: 30.6, weight: 0.25 },
  { name: "Zagazig", lon: 31.5, lat: 30.59, weight: 0.3 },
  { name: "Suez", lon: 32.55, lat: 29.97, weight: 0.25 },
  { name: "Faiyum", lon: 30.84, lat: 29.31, weight: 0.2 },
  { name: "Beni Suef", lon: 31.1, lat: 29.07, weight: 0.2 },
  { name: "Minya", lon: 30.75, lat: 28.1, weight: 0.25 },
  { name: "Asyut", lon: 31.18, lat: 27.18, weight: 0.3 },
  { name: "Sohag", lon: 31.69, lat: 26.56, weight: 0.25 },
  { name: "Qena", lon: 32.72, lat: 26.16, weight: 0.2 },
  { name: "Luxor", lon: 32.64, lat: 25.69, weight: 0.3, label: true },
  { name: "Aswan", lon: 32.9, lat: 24.09, weight: 0.3, label: true },
  { name: "Hurghada", lon: 33.81, lat: 27.26, weight: 0.3, label: true },
  { name: "Sharm El Sheikh", lon: 34.33, lat: 27.92, weight: 0.2 },
];

export const routes: [string, string][] = [
  ["Aswan", "Luxor"], ["Luxor", "Qena"], ["Qena", "Sohag"], ["Sohag", "Asyut"], ["Asyut", "Minya"],
  ["Minya", "Beni Suef"], ["Beni Suef", "Giza"], ["Faiyum", "Giza"], ["Giza", "Cairo"],
  ["Cairo", "Tanta"], ["Tanta", "Damanhur"], ["Damanhur", "Alexandria"], ["Alexandria", "Marsa Matruh"],
  ["Tanta", "Kafr El Sheikh"], ["Cairo", "Zagazig"], ["Zagazig", "Mansoura"], ["Mansoura", "Damietta"],
  ["Zagazig", "Ismailia"], ["Ismailia", "Port Said"], ["Cairo", "Suez"], ["Suez", "Hurghada"],
  ["Hurghada", "Qena"], ["Suez", "Sharm El Sheikh"], ["Cairo", "Alexandria"], ["Cairo", "Ismailia"],
  ["Cairo", "Asyut"], ["Cairo", "Luxor"], ["Cairo", "Hurghada"], ["Cairo", "Mansoura"],
];

export const cityIndex = (n: string) => cities.findIndex((c) => c.name === n);
