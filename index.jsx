import {Alert} from "@cloudscape-design/components";
import * as React from "react";
import {createRoot} from "react-dom/client";

const body = <Alert>Hello!</Alert>;

createRoot(document.getElementById("root")).render(body);
