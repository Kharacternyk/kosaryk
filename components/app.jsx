import {AppLayout, Button, Input} from "@cloudscape-design/components";
import {Turnstile} from "@marsidev/react-turnstile";
import {StrictMode, useRef, useState} from "react";

export const App = () => {
  const turnstileRef = useRef();
  const [name, setName] = useState("");

  const onGet = async () => {
    const response = await fetch("/api/bands");
    console.log(await response.json());
  };

  const onPost = async () => {
    const url = new URL("/api/bands", document.location);

    url.searchParams.append("name", name);
    url.searchParams.append(
      "token",
      await turnstileRef.current.getResponsePromise()
    );

    turnstileRef.current.reset();

    const response = await fetch(url, { method: "post" });

    console.log({ ok: response.ok });
  };

  const onInput = ({ detail }) => setName(detail.value);

  const content = (
    <>
      <Turnstile
        ref={turnstileRef}
        siteKey={import.meta.env.viteTurnstileSiteKey}
      />
      <Input value={name} onChange={onInput} />
      <Button onClick={onPost}>Post</Button>
      <Button onClick={onGet}>Get</Button>
    </>
  );

  return (
    <StrictMode>
      <AppLayout content={content} />
    </StrictMode>
  );
};
