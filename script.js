const synth = window.speechSynthesis;
const voiceSelect = document.querySelector("#voice-select");
let voices;

function addVoices() {
  voices = synth.getVoices();
  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement("option");
    // option.textContent = `${voices[i].name} - ${voices[i].lang}`;
    option.textContent = `${voices[i].name}`;

    if (voices[i].default) {
      option.textContent += " - DEFAULT";
    }
    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);

    voiceSelect.appendChild(option);
  }
}

function onSub(e) {
  e.preventDefault();

  const textInput = document.querySelector("#text-input");
  const shoutOut = new SpeechSynthesisUtterance(textInput.value);

  const speak = voiceSelect.selectedOptions[0].getAttribute("data-name");

  for (let i = 0; i < voices.length; i++) {
    if (voices[i].name === speak) {
      shoutOut.voice = voices[i];
    }
  }

  synth.speak(shoutOut);

  textInput.value = " "; // Clear input field after speaking

  //   shoutOut.onend = function() {
  //     console.log("SpeechSynthesisUtterance.onend");
  //   };
}

addVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = addVoices;
}
const form = document.querySelector("#form").addEventListener("submit", onSub);
