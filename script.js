/* 
---Dungeon Crawler---

"Health" start at "50"
Start at "Character Creation"
Change to "Dungeon" when button is clicked and name has input
Start in room one, Default background-image
Choose between left, right or forward room
Randomize event upon entering room, change background-image depending on triggered event

Events:
Nothing
Treasure Chest - Skip a Room Potion - Higher flee chance - Nothing - Mimic(Take damage)
Fountain, heals an amount of "Health"
Enemy, option to attempt to flee or fight, lose "Health", chance to avoid losing "Health" if flee is effective

Find "Exit" to win

*/

// const controls = document.querySelector("controls");

// function showControls() {
//   document.querySelector(".controls").style.display = "grid";
// }

// function hideControls() {
//   document.querySelector(".controls").style.display = "none";
// }

let room = 0;
let health = 50;
let fleeChance = 45;
let eventRoll = 0;
let skipRoomPotion = 0;
let bootsUpgrades = 0;

const healthDisplay = document.getElementById("health");
const roomCount = document.querySelector("#room");
const changeImage = document.querySelector("#room-image");
const roomPrompt = document.querySelector("#room-prompt");
const decisionPanel = document.getElementById("decision-panel");
const controls = document.querySelector(".controls");
const potionAmount = document.querySelector("#potion-amount");
const bootsImage = document.querySelector("#boots");

// ============ Title Screen ============
function switchHub() {
  document.getElementById("character-creation").style.display = "none";
  document.getElementById("dungeon").style.display = "flex";
  document.getElementById("forward").style.display = "block";
  const userName = document.getElementById("name-input").value;
}

// ============ Next Room ============
function nextRoom() {
  if (room == 0) {
    incrementRoom();
    document.getElementById("left").style.display = "block";
    document.getElementById("right").style.display = "block";
    changeImage.src = "./assets/images/dungeon-hallway.jpg";
    roomPrompt.textContent =
      "You step into a damp stone chamber. The air is thick, and the walls echo with distant dripping water. There are three narrow passageways: one to the left, one straight ahead, and one to the right. Which way do you go?";
  } else if (room > 0 && room < 55) {
    incrementRoom();
    dungeonEvent();
  } else {
    finishRun();
  }
}

// ============ Event Decider ============
function dungeonEvent() {
  let choices;
  let eventTypes = [
    "treasure",
    "fountain",
    "enemy",
    "enemy",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
  ];

  const event = eventTypes[randomizeNum(eventTypes.length)];
  switch (event) {
    case "treasure":
      treasureChest();
    case "fountain":
      fountain();
  }
}

// ============ Events ============
function treasureChest() {
  changeImage.src = "./assets/images/chest.jpg";
  roomPrompt.textContent = "You find a chest. It looks old, but untouched.";
  controls.style.display = "none";
  decisionPanel.style.display = "block";
  decisionPanel.innerHTML = `<button onclick="openChest()" id="choice1">Open the chest</button>
              <button onclick="ignoreEvent()" id="choice2">Ignore</button>`;
}

function fountain() {
  changeImage.src = "./assets/images/fountain.jpg";
  roomPrompt.textContent = "You find a fountain.";
  controls.style.display = "none";
  decisionPanel.style.display = "block";
  decisionPanel.innerHTML = `<button onclick="fountainDrink()" id="choice1">Drink from it</button>
              <button onclick="ignoreEvent()" id="choice2">Ignore</button>`;
}

// ============ Choice Events ============
function openChest() {
  eventRoll = randomizeNum(7);
  console.log(eventRoll);
  if (eventRoll <= 3) {
    roomPrompt.textContent = "The chest was empty.";
  } else if (eventRoll == 4) {
    bootsUpgrade();
    fleeChance += 10;
  } else if (eventRoll == 5) {
    addSkipRoomPotion();
  } else if (eventRoll == 6) {
    changeHealth("-", 10);
    roomPrompt.textContent = "A mimic!";
    changeImage.src = "./assets/images/mimic.jpg";
    console.log(`Current Health: ${health}`);
  }
}

function fountainDrink() {
  eventRoll = randomizeNum(5);
  if (eventRoll > 1) {
    changeHealth("+", 10);
    roomPrompt.textContent = "You feel refereshed. Restored 10 health";
    controls.style.display = "grid";
    decisionPanel.style.display = "none";
    changeImage.src = "./assets/images/dungeon-hallway.jpg";
  } else {
    changeHealth("-", 5);
    roomPrompt.textContent = "The fountain was poisoned. You lose 5 health.";
    controls.style.display = "grid";
    decisionPanel.style.display = "none";
    changeImage.src = "./assets/images/dungeon-hallway.jpg";
  }
}

// ============ Functions ============
function randomizeNum(num) {
  return Math.floor(Math.random() * num);
}

function changeHealth(operator, healthValue) {
  switch (operator) {
    case "+":
      health += healthValue;
      return (healthDisplay.textContent = `Health: ${health.toString()}`);
    case "-":
      health -= healthValue;

      return (healthDisplay.textContent = `Health: ${health.toString()}`);
  }
}

// Treasure chest contents
const bootsUpgrade = () => {
  if (bootsUpgrades === 0) {
    bootsUpgrades++;
    bootsImage.style.display = "block";
    roomPrompt.textContent =
      "You find an old pair of leather boots. This might be useful when fleeing.";
  } else if (bootsUpgrades === 1) {
    bootsUpgrades++;
    bootsImage.src = "./assets/images/ranger-boots.webp";
    roomPrompt.textContent = "You find a pair of ranger boots.";
  } else if (bootsUpgrades === 2) {
    bootsUpgrades++;
    bootsImage.src = "./assets/images/pegasian-boots.webp";
    roomPrompt.textContent = "You find a brand new pair of pegasian boots.";
  } else {
    nothing();
  }
};

// Increase Potion
const addSkipRoomPotion = () => {
  skipRoomPotion++;
  roomPrompt.textContent = "You found a Skip Potion! Use this to skip a room.";
  potionAmount.textContent = `${skipRoomPotion}`;
};

const useSkipRoomPotion = () => {
  if (skipRoomPotion > 0) {
    skipRoomPotion--;
    potionAmount.textContent = `${skipRoomPotion}`;
    incrementRoom();
    decisionPanel.style.display = "none";
    controls.style.display = "grid";
    roomPrompt.textContent =
      "You drink the glowing potion. A strange warmth spreads through your body, and in an instant, the room blurs and fades. When your vision clears, you've skipped ahead one room deeper into the dungeon.";
    changeImage.src = "./assets/images/dungeon-hallway.jpg";
  }
};

// Increase room
const incrementRoom = () => {
  room++;
  roomCount.textContent = `Room: ${room}`;
};

// Ignore event
const ignoreEvent = () => {
  decisionPanel.style.display = "none";
  controls.style.display = "grid";
  roomPrompt.textContent = "You ignored it and decided to move on.";
  changeImage.src = "./assets/images/dungeon-hallway.jpg";
};
