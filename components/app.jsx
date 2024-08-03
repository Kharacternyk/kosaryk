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
        start: 160,
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
