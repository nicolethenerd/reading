import logo from './logo.svg';
import './App.css';

import { useState } from "react";
import Button from '@mui/material/Button';

let cvcWords = [
  "cat",
  "bat",
  "rat",
  "hat",
  "mat",
  "sat",
  "fat",
  "pat",
  "dad",
  "mad",
  "sad",
  "lad",
  "bag",
  "wag",
  "tag",
  "rag",
  "sag",
  "nag",
];

Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

function Word({ word }) {
  return <h2 className="Word">{word}</h2>;
}

function NextButton({ onButtonClick }) {
  return (
    <Button onClick={onButtonClick}>
      Next
    </Button>
  );
}

function setupSpeechRecognition() {
  var recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition ||
    window.mozSpeechRecognition ||
    window.msSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 5;
  recognition.continuous = true;
  // recognition.start();

  recognition.listenFor = function(word) {
    recognition.stop();

    recognition.onresult = function (event) {
      const spokenWord = event.results[event.results.length - 1][0].transcript;
      console.log(event.results);
      console.log("You said: ", spokenWord);
      if (spokenWord === word) {
        alert("Correct");
      } else {
        alert("You said: " + spokenWord);
      }
    };

    recognition.start();
  }


  return recognition;
}

export default function App() {
  console.log("initializing");
  const [currentWord, setWord] = useState('');
  const speechRecognizer = setupSpeechRecognition();

  function updateWord() {
    const newWord = cvcWords.random();
    setWord(newWord);
    speechRecognizer.listenFor(newWord);
  }
  // updateWord();

  return (
    <div className="App">
      <h1>Hello, Melody!</h1>
      <Word word={currentWord} />
      <NextButton onButtonClick={updateWord} />
    </div>
  );
}
