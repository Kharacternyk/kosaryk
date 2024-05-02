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
    segments: [
      {
        name: "Chorus",
        start: 60,
        end: 75,
      },
      {
        name: "Chorus",
        start: 90,
        end: 105,
      },
      {
        name: "Chorus",
        start: 200,
        end: 230,
      },
      {
        name: "Outro",
        start: 260,
        end: 299,
      },
    ],
  },
  {
    name: "For Whom The Bell Tolls",
    length: 270,
    segments: [
      {
        name: "Intro",
        start: 0,
        end: 123,
      },
      {
        name: "Chorus",
        start: 150,
        end: 160,
      },
      {
        name: "Solo",
        start: 161,
        end: 200,
      },
      {
        name: "Chorus",
        start: 220,
        end: 240,
      },
      {
        name: "Outro",
        start: 260,
        end: 269,
      },
    ],
  },
  {
    name: "Master Of Puppets",
    length: 476,
    segments: [
      {
        name: "Intro",
        start: 0,
        end: 61,
      },
      {
        name: "Chorus",
        start: 100,
        end: 120,
      },
      {
        name: "Chorus",
        start: 150,
        end: 170,
      },
      {
        name: "Solo",
        start: 200,
        end: 220,
      },
      {
        name: "Solo",
        start: 250,
        end: 280,
      },
      {
        name: "Chorus",
        start: 330,
        end: 380,
      },
      {
        name: "Outro",
        start: 450,
        end: 476,
      },
    ],
  },
];
