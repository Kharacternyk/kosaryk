import {Button, Input} from "@cloudscape-design/components";
import "@cloudscape-design/global-styles";
import {Turnstile} from "@marsidev/react-turnstile";
import {StrictMode, useState} from "react";
import {createRoot} from "react-dom/client";

const App = () => {
  const [token, setToken] = useState(null);
  const [name, setName] = useState("");

  const onSubmit = async () => {
    const url = new URL("/api/hello", document.location);

    url.searchParams.append("name", name);

    if (token !== null) {
      url.searchParams.append("token", token);
    }

    const response = await fetch(url);
    const data = await response.json();

    alert(data.message);
  };

  const onInput = ({ detail }) => setName(detail.value);

  return (
    <StrictMode>
      <Turnstile
        onSuccess={setToken}
        onError={() => setToken(null)}
        siteKey="3x00000000000000000000FF"
      />
      <Input value={name} onChange={onInput} />
      <Button onClick={onSubmit}>Submit</Button>
    </StrictMode>
  );
};

createRoot(document.getElementById("root")).render(<App />);
