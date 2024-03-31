import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/clerk-react";
import {Alert} from "@cloudscape-design/components";
import {StrictMode} from "react";
import {createRoot} from "react-dom/client";

const key = "pk_test_c3RhYmxlLWNhdGZpc2gtMTMuY2xlcmsuYWNjb3VudHMuZGV2JA";

const body = (
  <StrictMode>
    <ClerkProvider publishableKey={key}>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <Alert>Hello!</Alert>
    </ClerkProvider>
  </StrictMode>
);

createRoot(document.getElementById("root")).render(body);

fetch("/api/auth")
  .then((response) => response.json())
  .then(console.log);
