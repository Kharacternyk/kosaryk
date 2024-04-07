import {AppLayout, Button, Input, Table} from "@cloudscape-design/components";
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
    </>
  );

  return (
    <StrictMode>
      <AppLayout content={content} />
    </StrictMode>
  );
};
