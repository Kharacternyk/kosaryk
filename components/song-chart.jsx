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
    const step = ({ color, name }) => {
      const index = indices.length;
      indices.push(String(index));
      colors.push(color);
      names.push(name);
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
      <Legend
        categories={["Intro/Outro", "Chorus", "Solo"]}
        colors={["amber", "blue", "fuchsia"]}
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
        customTooltip={Tooltip}
      />
    </>
  );
};

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

const segmentTypes = {
  default: {
    name: "Verses",
    color: "emerald",
  },
  instrumental: {
    name: "Instrumental",
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
    color: "blue",
  },
  1: {
    name: "Solo",
    color: "pink",
  },
};
