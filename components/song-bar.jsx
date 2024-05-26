import {BarChart} from "@cloudscape-design/components";
import {
  colorChartsPaletteCategorical1,
  colorChartsPaletteCategorical2,
  colorChartsPaletteCategorical3,
  colorChartsPaletteCategorical5,
} from "@cloudscape-design/design-tokens";

export const SongBar = ({ songs }) => {
  const series = [];
  const xDomain = [];

  for (const { name, length, instrumental, intro, outro, segments } of songs) {
    const x = name.replace(/\s+/g, "\n");

    xDomain.push(x);

    if (instrumental) {
      series.push(
        getSeriesItem(x, {
          color: colorChartsPaletteCategorical1,
          start: 0,
          end: length - 1,
        })
      );

      continue;
    }

    if (intro) {
      series.push(
        getSeriesItem(x, {
          title: "Intro",
          color: colorChartsPaletteCategorical1,
          start: 0,
          end: intro,
        })
      );
    }

    let time = intro;

    for (const segment of segments) {
      if (segment.start > time) {
        series.push(getSeriesItem(x, { start: time, end: segment.start - 1 }));
      }

      series.push(
        getSeriesItem(x, { ...segmentTypes[segment.type], ...segment })
      );

      time = segment.end + 1;
    }

    if (time + outro < length) {
      series.push(getSeriesItem(x, { start: time, end: length - outro - 1 }));
    }

    if (outro) {
      series.push(
        getSeriesItem(x, {
          title: "Outro",
          color: colorChartsPaletteCategorical1,
          start: length - outro,
          end: length - 1,
        })
      );
    }
  }

  return (
    <BarChart
      xDomain={xDomain}
      series={series}
      horizontalBars
      stackedBars
      hideFilter
      hideLegend
      yTitle="Seconds"
      xTitle="Songs"
    />
  );
};

const segmentTypes = [
  {
    title: "Chorus",
    color: colorChartsPaletteCategorical5,
  },
  {
    title: "Solo",
    color: colorChartsPaletteCategorical2,
  },
];

const getSeriesItem = (
  x,
  { title = "", color = colorChartsPaletteCategorical3, start, end }
) => {
  const y = end - start + 1;

  return {
    title,
    color,
    type: "bar",
    valueFormatter: () =>
      `${getTimestamp(start)}–${getTimestamp(end)} (${getTimestamp(y)}s)`,
    data: [{ x, y }],
  };
};

const getTimestamp = (seconds) =>
  `${Math.floor(seconds / 60)}:${getDoubleDigit(seconds % 60)}`;

const getDoubleDigit = (number) => String(number).padStart(2, "0");
