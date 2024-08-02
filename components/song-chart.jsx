import {BarChart, Legend} from "@tremor/react";

export const SongChart = () => {
  return (
    <>
      <Legend
        categories={["Intro/Outro", "Chorus", "Solo"]}
        colors={["amber", "sky", "fuchsia"]}
      />
      <BarChart
        layout="vertical"
        stack
        data={songs}
        categories={categories}
        colors={colors}
        index="name"
        showLegend={false}
      />
    </>
  );
};

const songs = [
  {
    name: "For Whom The Bell Tolls",
    Intro: 123,
    "Main 1": 30,
    "Chorus 1": 20,
    "Main 2": 38,
    "Chorus 2": 21,
    "Solo 1": 30,
    Outro: 10,
  },
  {
    name: "Fuel",
    "Main 1": 40,
    "Chorus 1": 30,
    "Main 2": 48,
    "Chorus 2": 31,
    "Main 3": 50,
  },
];

const categories = [
  "Intro",
  "Main 1",
  "Chorus 1",
  "Main 2",
  "Chorus 2",
  "Solo 1",
  "Main 3",
  "Outro",
];

const colors = [
  "amber",
  "emerald",
  "sky",
  "emerald",
  "sky",
  "fuchsia",
  "emerald",
  "amber",
];
