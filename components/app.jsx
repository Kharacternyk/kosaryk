import {AppLayout, Button, Input, Table} from "@cloudscape-design/components";
import {I18nProvider} from "@cloudscape-design/components/i18n";
import messages from "@cloudscape-design/components/i18n/messages/all.en";
import {Turnstile} from "@marsidev/react-turnstile";
import {StrictMode, useEffect, useRef, useState} from "react";
import {SongBar} from "./song-bar";

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
      <SongBar songs={songs} />
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

const songs = [
  {
    name: "Fuel",
    length: 300,
    intro: 0,
    outro: 39,
    instrumental: false,
    segments: [
      {
        type: 0,
        start: 60,
        end: 75,
      },
      {
        type: 0,
        start: 90,
        end: 105,
      },
      {
        type: 0,
        start: 200,
        end: 230,
      },
    ],
  },
  {
    name: "For Whom The Bell Tolls",
    length: 270,
    intro: 123,
    outro: 9,
    instrumental: false,
    segments: [
      {
        type: 0,
        start: 150,
        end: 160,
      },
      {
        type: 1,
        start: 161,
        end: 200,
      },
      {
        type: 0,
        start: 220,
        end: 240,
      },
    ],
  },
  {
    name: "Master Of Puppets",
    length: 476,
    intro: 61,
    outro: 26,
    instrumental: false,
    segments: [
      {
        type: 0,
        start: 100,
        end: 120,
      },
      {
        type: 0,
        start: 150,
        end: 170,
      },
      {
        type: 1,
        start: 200,
        end: 220,
      },
      {
        type: 1,
        start: 250,
        end: 280,
      },
      {
        type: 0,
        start: 330,
        end: 380,
      },
    ],
  },
  {
    name: "Orion",
    length: 462,
    instrumental: true,
  },
];
