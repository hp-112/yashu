const questionElement = document.getElementById("question");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const container = document.querySelector(".container");

const noPhrases = [
  "I'm sorry... I know I messed up 😞",
  "Please don’t give up on us 💔",
  "I just want to make things right 🛠️",
  "Can we try again, just one more time? 🙏",
  "You mean the world to me 🌍",
  "I’m not perfect, but I’m trying... for you 💗",
  "Let’s fix what we have, not throw it away 🧩",
  "You still matter to me — more than anything 🥺",
  "I want this to work... I want *us* to work 💞",
  "Give me one more chance to show I care 💌"
];

let remainingPhrases = [...noPhrases];
let noEscapeMode = false;
let yesSize = 1;

 function showCustomAlert() {
    document.getElementById("customAlert").style.display = "block";
  }

  function closeCustomAlert() {
    document.getElementById("customAlert").style.display = "none";
  }


function handleYes() {
  questionElement.textContent = "Yay! ❤️ That means the world to me!";
  noBtn.style.display = "none";
    showCustomAlert();
}

function handleNo() {
  if (remainingPhrases.length === 0) {
    if (!noEscapeMode) {
      questionElement.textContent = "I’ve said all I can... please say yes 🥹";
      enableNoDodge();
      noEscapeMode = true;
    }
    return;
  }

  const index = Math.floor(Math.random() * remainingPhrases.length);
  const phrase = remainingPhrases.splice(index, 1)[0];
  questionElement.textContent = phrase;
}

function enableNoDodge() {
  function dodgeNoButton(e) {
    const rect = container.getBoundingClientRect();
    const offset = noBtn.offsetWidth + 20;

    let newX;
    if (e.clientX - rect.left < rect.width / 2) {
      // Move right
      newX = Math.min(rect.width - offset, e.clientX - rect.left + offset);
    } else {
      // Move left
      newX = Math.max(0, e.clientX - rect.left - offset);
    }

    const newY = noBtn.offsetTop; // keep Y stable

    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;

    // Gradually increase the size of yes button
    yesSize += 0.05;
    yesBtn.style.transform = `scale(${yesSize})`;
  }

  // Trigger dodge on mousemove
  noBtn.addEventListener("mousemove", dodgeNoButton);

  // Trigger dodge on click as well
  noBtn.addEventListener("click", dodgeNoButton);
}


yesBtn.addEventListener("click", handleYes);
noBtn.addEventListener("click", handleNo);
