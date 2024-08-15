import {StrictMode} from "react";
import Logo from "../images/logo.svg?react";
import {SongChart} from "./song-chart";

export const App = () => {
  return (
    <StrictMode>
      <Logo className="w-24 h-24" />
      <SongChart songs={songs} />
    </StrictMode>
  );
};

const songs = [
  {
    name: "Fuel",
    segments: [
      {
        type: 0,
        end: 60,
      },
      {
        type: 2,
        end: 75,
      },
      {
        type: 1,
        end: 90,
      },
      {
        type: 0,
        end: 105,
      },
      {
        type: 2,
        end: 230,
      },
      {
        type: 1,
        end: 300,
      },
    ],
  },
  {
    name: "For Whom The Bell Tolls",
    segments: [
      {
        type: 1,
        end: 123,
      },
      {
        type: 0,
        end: 160,
      },
      {
        type: 1,
        end: 200,
      },
      {
        type: 2,
        end: 240,
      },
      {
        type: 1,
        end: 270,
      },
    ],
  },
  {
    name: "Master Of Puppets",
    segments: [
      {
        type: 1,
        end: 61,
      },
      {
        type: 0,
        end: 120,
      },
      {
        type: 2,
        end: 170,
      },
      {
        type: 0,
        end: 211,
      },
      {
        type: 2,
        end: 253,
      },
      {
        type: 1,
        end: 303,
      },
      {
        type: 0,
        end: 321,
      },
      {
        type: 1,
        end: 341,
      },
      {
        type: 0,
        end: 368,
      },
      {
        type: 2,
        end: 400,
      },
      {
        type: 1,
        end: 476,
      },
    ],
  },
  {
    name: "Orion",
    segments: [
      {
        type: 1,
        end: 462,
      },
    ],
  },
];
