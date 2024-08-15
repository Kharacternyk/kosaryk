import {
  Badge,
  BarChart,
  Card,
  Legend,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import {useMemo} from "react";

export const SongChart = ({ songs }) => {
  const { bars, categories, colors, Tooltip } = useMemo(() => {
    const bars = [];
    const indices = [];
    const colors = [];
    const names = [];
    const step = ([name, color]) => {
      const index = indices.length;
      indices.push(String(index));
      colors.push(color);
      names.push(name);
      return index;
    };

    for (const { name, segments } of songs) {
      const bar = { name };
      let time = 0;

      for (const [index, { end, type }] of segments.entries()) {
        bar[step(segmentTypes[type](index, segments.length))] = end - time;
        time = end;
      }

      bars.push(bar);
    }

    const Tooltip = ({ payload, active }) => {
      if (!active || !payload) {
        return null;
      }

      let time = 0;
      const rows = [];

      for (const { value, dataKey, color } of payload) {
        const row = (
          <TableRow key={dataKey}>
            <TableCell>
              <Badge color={color}>{names[dataKey]}</Badge>
            </TableCell>
            <TableCell>{getTimestamp(time)}</TableCell>
            <TableCell>{getTimestamp(time + value)}</TableCell>
          </TableRow>
        );
        rows.push(row);
        time += value;
      }

      return (
        <Card>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Segment</TableHeaderCell>
                <TableHeaderCell>From</TableHeaderCell>
                <TableHeaderCell>Until</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>{rows}</TableBody>
          </Table>
        </Card>
      );
    };

    return { bars, categories: indices, colors, Tooltip };
  }, songs);

  return (
    <>
      {legend}
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
        customTooltip={Tooltip}
      />
    </>
  );
};

const legend = (
  <Legend
    categories={["Instrumental", "Lyrics", "Chorus", "Solo"]}
    colors={["amber", "emerald", "blue", "pink"]}
  />
);

const getTimestamp = (time) => {
  const seconds = time % 60;
  const minutes = Math.floor(time / 60);

  if (!minutes) {
    return `${seconds}s`;
  }
  if (!seconds) {
    return `${minutes}m`;
  }

  return `${minutes}m ${seconds}s`;
};

const segmentTypes = [
  () => ["Lyrics", "emerald"],
  (index, length) =>
    length === 1
      ? ["Instrumental", "amber"]
      : !index
      ? ["Intro", "amber"]
      : index + 1 === length
      ? ["Outro", "amber"]
      : ["Solo", "pink"],
  () => ["Chorus", "blue"],
];
