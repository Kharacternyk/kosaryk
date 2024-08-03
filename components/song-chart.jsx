import {BarChart, Legend} from "@tremor/react";
import {useMemo} from "react";

export const SongChart = ({ songs }) => {
  const { bars, categories, colors, names } = useMemo(() => {
    const bars = [];
    const indices = [];
    const names = [];
    const colors = [];
    const step = ({ name, color }) => {
      const index = indices.length;
      indices.push(String(index));
      names.push(name);
      colors.push(color);
      return index;
    };

    for (const {
      name,
      length,
      intro,
      outro,
      instrumental,
      segments,
    } of songs) {
      if (instrumental) {
        bars.push({ name, [step(segmentTypes.instrumental)]: length });
        continue;
      }

      const bar = { name };

      if (intro) {
        bar[step(segmentTypes.intro)] = intro;
      }

      let time = intro;

      for (const { start, end, type } of segments) {
        if (start > time) {
          bar[step(segmentTypes.default)] = start - time;
        }

        bar[step(segmentTypes[type])] = end - start;
        time = end;
      }

      if (time + outro < length) {
        bar[step(segmentTypes.default)] = length - outro - time;
      }

      if (outro) {
        bar[step(segmentTypes.outro)] = outro;
      }

      bars.push(bar);
    }

    return { bars, categories: indices, colors, names };
  }, songs);

  return (
    <>
      <Legend
        categories={["Intro/Outro", "Chorus", "Solo"]}
        colors={["amber", "sky", "fuchsia"]}
      />
      <BarChart
        layout="vertical"
        stack
        data={bars}
        categories={categories}
        colors={colors}
        index="name"
        showLegend={false}
        valueFormatter={getTimestamp}
        yAxisWidth={100}
      />
    </>
  );
};

const getTimestamp = (seconds) => {
  const formattedSeconds = `${seconds % 60}s`;

  if (seconds < 60) {
    return formattedSeconds;
  }

  return `${Math.floor(seconds / 60)}m ${formattedSeconds}`;
};

const segmentTypes = {
  default: {
    name: "",
    color: "emerald",
  },
  instrumental: {
    name: "",
    color: "amber",
  },
  intro: {
    name: "Intro",
    color: "amber",
  },
  outro: {
    name: "Outro",
    color: "amber",
  },
  0: {
    name: "Chorus",
    color: "indigo",
  },
  1: {
    name: "Solo",
    color: "fuchsia",
  },
};
