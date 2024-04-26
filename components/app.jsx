import {
  AppLayout,
  BarChart,
  Button,
  Input,
  Table,
} from "@cloudscape-design/components";
import {I18nProvider} from "@cloudscape-design/components/i18n";
import messages from "@cloudscape-design/components/i18n/messages/all.en";
import {
  colorChartsPaletteCategorical1,
  colorChartsPaletteCategorical2,
  colorChartsPaletteCategorical3,
} from "@cloudscape-design/design-tokens";
import {Turnstile} from "@marsidev/react-turnstile";
import {StrictMode, useEffect, useRef, useState} from "react";

export const App = () => {
  const turnstileRef = useRef();
  const [name, setName] = useState("");
  const [bands, setBands] = useState([]);

  const loadBands = async () => {
    const response = await fetch("/api/bands");
    setBands(await response.json());
  };

  useEffect(() => {
    loadBands();
  }, []);

  const addBand = async () => {
    const url = new URL("/api/bands", document.location);

    url.searchParams.append("name", name);
    url.searchParams.append(
      "token",
      await turnstileRef.current.getResponsePromise()
    );

    turnstileRef.current.reset();

    const response = await fetch(url, { method: "post" });

    if (response.ok) {
      loadBands();
    }
  };

  const onInput = ({ detail }) => setName(detail.value);

  const deleteBand = async (identity) => {
    const url = new URL("/api/bands", document.location);

    url.searchParams.append("identity", identity);
    url.searchParams.append(
      "token",
      await turnstileRef.current.getResponsePromise()
    );

    turnstileRef.current.reset();

    const response = await fetch(url, { method: "delete" });

    if (response.ok) {
      loadBands();
    }
  };

  const columnDefinitions = [
    {
      id: "name",
      header: "Name",
      cell: (band) => band.name,
      isRowHeader: true,
    },
    {
      id: "delete",
      header: "Actions",
      cell: (band) => (
        <Button onClick={() => deleteBand(band.identity)}>Delete</Button>
      ),
    },
  ];

  const series = [
    {
      title: "Intro",
      type: "bar",
      valueFormatter: (seconds) => `${seconds}s`,
      color: colorChartsPaletteCategorical1,
      data: [{ x: "For Whom The Bell Tolls", y: 121 }],
    },
    {
      title: "Unmapped 1",
      type: "bar",
      valueFormatter: (seconds) => `${seconds}s`,
      color: colorChartsPaletteCategorical2,
      data: [
        { x: "Fuel", y: 89 },
        { x: "For Whom The Bell Tolls", y: 30 },
      ],
    },
    {
      title: "Chorus 1",
      type: "bar",
      valueFormatter: (seconds) => `${seconds}s`,
      color: colorChartsPaletteCategorical3,
      data: [
        { x: "Fuel", y: 50 },
        { x: "For Whom The Bell Tolls", y: 41 },
      ],
    },
    {
      title: "Unmapped 2",
      type: "bar",
      valueFormatter: (seconds) => `${seconds}s`,
      color: colorChartsPaletteCategorical2,
      data: [
        { x: "Fuel", y: 89 },
        { x: "For Whom The Bell Tolls", y: 50 },
      ],
    },
    {
      title: "Chorus 2",
      type: "bar",
      valueFormatter: (seconds) => `${seconds}s`,
      color: colorChartsPaletteCategorical3,
      data: [
        { x: "Fuel", y: 50 },
        { x: "For Whom The Bell Tolls", y: 30 },
      ],
    },
  ];

  const content = (
    <>
      <Table
        items={bands}
        loading={!bands}
        columnDefinitions={columnDefinitions}
      ></Table>
      <Turnstile
        ref={turnstileRef}
        siteKey={import.meta.env.viteTurnstileSiteKey}
      />
      <Input value={name} onChange={onInput} />
      <Button onClick={addBand}>Add</Button>
      <BarChart
        xDomain={["Fuel", "For Whom The Bell Tolls"]}
        series={series}
        horizontalBars
        stackedBars
        hideFilter
        yTitle="Seconds"
        xTitle="Songs"
      />
    </>
  );

  return (
    <StrictMode>
      <I18nProvider messages={[messages]}>
        <AppLayout content={content} />
      </I18nProvider>
    </StrictMode>
  );
};
