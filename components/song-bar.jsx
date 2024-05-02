import {BarChart} from "@cloudscape-design/components";
import {
  colorChartsPaletteCategorical1,
  colorChartsPaletteCategorical2,
  colorChartsPaletteCategorical3,
  colorChartsPaletteCategorical4,
  colorChartsPaletteCategorical5,
} from "@cloudscape-design/design-tokens";

export const SongBar = ({ songs }) => {
  const series = [];
  const xDomain = [];

  for (const { name, length, segments } of songs) {
    const x = name.replace(/\s+/g, "\n");

    xDomain.push(x);

    let time = 0;

    for (const segment of segments) {
      if (segment.start > time) {
        series.push(getSeriesItem(x, { start: time, end: segment.start - 1 }));
      }

      series.push(getSeriesItem(x, segment));
      time = segment.end + 1;
    }

    if (time < length) {
      series.push(getSeriesItem(x, { start: time, end: length - 1 }));
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

const unmappedSegmentName = "—";

const getSeriesItem = (x, { name = unmappedSegmentName, start, end }) => {
  const y = end - start + 1;

  return {
    title: name,
    type: "bar",
    valueFormatter: () =>
      `${getTimestamp(start)}–${getTimestamp(end)} (${getTimestamp(y)}s)`,
    color: segmentColors[name],
    data: [{ x, y }],
  };
};

const getTimestamp = (seconds) =>
  `${Math.floor(seconds / 60)}:${getDoubleDigit(seconds % 60)}`;

const getDoubleDigit = (number) => String(number).padStart(2, "0");

const segmentColors = {
  [unmappedSegmentName]: colorChartsPaletteCategorical3,
  Intro: colorChartsPaletteCategorical1,
  Chorus: colorChartsPaletteCategorical2,
  Solo: colorChartsPaletteCategorical5,
  Outro: colorChartsPaletteCategorical4,
};
