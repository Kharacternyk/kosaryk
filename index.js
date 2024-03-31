import {ClerkProvider, useUser} from "@clerk/clerk-react";
import {TopNavigation} from "@cloudscape-design/components";
import "@cloudscape-design/global-styles";
import {StrictMode} from "react";
import {createRoot} from "react-dom/client";

const key = "pk_test_c3RhYmxlLWNhdGZpc2gtMTMuY2xlcmsuYWNjb3VudHMuZGV2JA";

const App = () => {
  const { isSignedIn, user } = useUser();
  const utilities = isSignedIn
    ? [
        {
          type: "button",
          text: `Signed in as ${user.emailAddresses[0]}`,
          href: "https://stable-catfish-13.accounts.dev/user",
        },
      ]
    : [
        {
          type: "button",
          text: "Sign in",
          href: "https://stable-catfish-13.accounts.dev/sign-in",
        },
        {
          type: "button",
          text: "Sign up",
          href: "https://stable-catfish-13.accounts.dev/sign-up",
        },
      ];
  const identity = {
    title: "Kosaryk",
    href: "/",
  };

  return <TopNavigation utilities={utilities} identity={identity} />;
};

const body = (
  <StrictMode>
    <ClerkProvider publishableKey={key}>
      <App />
    </ClerkProvider>
  </StrictMode>
);

createRoot(document.getElementById("root")).render(body);

fetch("/api/auth")
  .then((response) => response.json())
  .then(console.log);
