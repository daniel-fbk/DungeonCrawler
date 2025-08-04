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

let userName = "";
let room = 0;
let health = 50;
let fleeChance = 45;
let eventRoll = 0;
let skipRoomPotion = 0;
let bootsUpgrades = 0;

const healthDisplay = document.getElementById("health");
const roomCount = document.querySelector("#room");
const roomImage = document.querySelector("#room-image");
const roomPrompt = document.querySelector("#room-prompt");
const decisionPanel = document.getElementById("decision-panel");
const controls = document.querySelector(".controls");
const potionAmount = document.querySelector("#potion-amount");
const bootsImage = document.querySelector("#boots");

// ============ Utility ============

// Generate a random number
const randomizeNum = (num) => {
  return Math.floor(Math.random() * num);
};

// Change health
const changeHealth = (operator, healthValue) => {
  switch (operator) {
    case "+":
      health += healthValue;
      return (healthDisplay.textContent = `Health: ${health.toString()}`);
    case "-":
      health -= healthValue;

      return (healthDisplay.textContent = `Health: ${health.toString()}`);
  }
};

// Increase room
const incrementRoom = () => {
  room++;
  roomCount.textContent = `Room: ${room}`;
};

// Decrease room
const decrementRoom = () => {
  room--;
  roomCount.textContent = `Room: ${room}`;
};

// Update room message
const updatePrompt = (message) => {
  roomPrompt.textContent = message;
};

// Update room image
const updateImage = (image) => {
  roomImage.src = image;
};

// Update choices
const updateChoices = (choices) => {
  decisionPanel.innerHTML = choices;
  controls.style.display = "none";
  decisionPanel.style.display = "block";
};

// Swap from choice panel to controls
const toControls = () => {
  controls.style.display = "grid";
  decisionPanel.style.display = "none";
};

// Ignore event
const ignoreEvent = () => {
  toControls();
  updatePrompt("You ignored it and decided to move on.");
  updateImage("./assets/images/dungeon-hallway.jpg");
};

const finishRun = () => {
  updateImage("./assets/images/exit.jpeg");
  updatePrompt(`Congratulations, ${userName}. You found the exit!`);
};

// Treasure chest contents
const bootsUpgrade = () => {
  if (bootsUpgrades === 0) {
    bootsUpgrades++;
    bootsImage.style.display = "block";
    updatePrompt(
      "You find an old pair of leather boots. This might be useful when fleeing."
    );
  } else if (bootsUpgrades === 1) {
    bootsUpgrades++;
    bootsImage.src = "./assets/images/ranger-boots.webp";
    updatePrompt("You find a pair of ranger boots.");
  } else if (bootsUpgrades === 2) {
    bootsUpgrades++;
    bootsImage.src = "./assets/images/pegasian-boots.webp";
    updatePrompt("You find a brand new pair of pegasian boots.");
  } else {
    nothing();
  }
};

// Increase Potion
const addSkipRoomPotion = () => {
  skipRoomPotion++;
  updatePrompt("You found a Skip Potion! Use this to skip a room.");
  potionAmount.textContent = `${skipRoomPotion}`;
};

// Use potion
const useSkipRoomPotion = () => {
  if (skipRoomPotion > 0) {
    skipRoomPotion--;
    potionAmount.textContent = `${skipRoomPotion}`;
    incrementRoom();
    toControls();
    updatePrompt(
      "You drink the glowing potion. A strange warmth spreads through your body, and in an instant, the room blurs and fades. When your vision clears, you've skipped ahead one room deeper into the dungeon."
    );
    updateImage("./assets/images/dungeon-hallway.jpg");
  }
};

// Generate random enemy
const generateEnemy = () => {
  eventRoll = randomizeNum(5);
  console.log(eventRoll);
  if (eventRoll === 0) {
    updateImage("./assets/images/enemy1.png");
    updatePrompt("An enemy has appeared.");
  } else if (eventRoll === 1) {
    updateImage("./assets/images/enemy2.png");
    updatePrompt("An enemy has appeared.");
  } else if (eventRoll === 2) {
    updateImage("./assets/images/enemy3.png");
    updatePrompt("An enemy has appeared.");
  } else if (eventRoll === 3) {
    updateImage("./assets/images/enemy4.png");
    updatePrompt("An enemy has appeared.");
  } else if (eventRoll === 4) {
    updateImage("./assets/images/enemy5.png");
    updatePrompt("An enemy has appeared.");
  }
};

// ============ Title Screen ============
const switchHub = () => {
  userName = document.getElementById("name-input").value;
  document.getElementById("character-creation").style.display = "none";
  document.getElementById("dungeon").style.display = "flex";
  document.getElementById("forward").style.display = "block";
};

// ============ Choice Events ============
const openChest = () => {
  eventRoll = randomizeNum(5);
  console.log(eventRoll);
  if (eventRoll <= 1) {
    updatePrompt("The chest was empty.");
    toControls();
  } else if (eventRoll == 2) {
    bootsUpgrade();
    fleeChance += 10;
    toControls();
  } else if (eventRoll == 3) {
    addSkipRoomPotion();
    toControls();
  } else if (eventRoll == 4) {
    changeHealth("-", 10);
    updatePrompt("A mimic!");
    updateImage("./assets/images/mimic.jpg");
    toControls();
  }
};

const fountainDrink = () => {
  eventRoll = randomizeNum(5);
  if (eventRoll > 1) {
    changeHealth("+", 10);
    updatePrompt("You feel refereshed. Restored 10 health");
    toControls();
    updateImage("./assets/images/dungeon-hallway.jpg");
  } else {
    changeHealth("-", 5);
    updatePrompt("The fountain was poisoned. You lose 5 health.");
    toControls();
    updateImage("./assets/images/dungeon-hallway.jpg");
  }
};

const engageEnemy = () => {
  eventRoll = randomizeNum(2);
  if (eventRoll === 1) {
    changeHealth("-", 20);
    updatePrompt(
      "You win the battle. Pain remains. The price of survival is clear. -20 Health"
    );
    updateImage("./assets/images/dungeon-hallway.jpg");
    toControls();
  } else {
    updatePrompt("The enemy falls before you. You remain unharmed.");
    updateImage("./assets/images/dungeon-hallway.jpg");
    toControls();
  }
};

const fleeEnemy = () => {
  eventRoll = randomizeNum(101);
  if (eventRoll <= fleeChance) {
    updatePrompt("You slip away unnoticed.");
  } else {
    updatePrompt(
      "You try to flee, but fail. You fall back one room instead. -5 Health"
    );
    changeHealth("-", 5);
    decrementRoom();
  }
  updateImage("./assets/images/dungeon-hallway.jpg");
  toControls();
};

// ============ Events ============
const treasureChest = () => {
  updateImage("./assets/images/chest.jpg");
  updatePrompt("You find a chest. It looks old, but untouched.");
  updateChoices(`<button onclick="openChest()" id="choice1">Open the chest</button>
              <button onclick="ignoreEvent()" id="choice2">Ignore</button>`);
};

const fountain = () => {
  updateImage("./assets/images/fountain.jpg");
  updatePrompt("You find a fountain.");
  updateChoices(`<button onclick="fountainDrink()" id="choice1">Drink from it</button>
              <button onclick="ignoreEvent()" id="choice2">Ignore</button>`);
};

const enemy = () => {
  generateEnemy();
  updateChoices(`<button onclick="engageEnemy()" id="choice1">Engage enemy</button>
              <button onclick="fleeEnemy()" id="choice2">Attempt to flee</button>`);
};

// ============ Event Decider ============
const dungeonEvent = () => {
  let eventTypes = [
    "treasure",
    "fountain",
    "enemy",
    "enemy",
    "nothing",
    "nothing",
  ];

  const event = eventTypes[randomizeNum(eventTypes.length)];
  switch (event) {
    case "treasure":
      treasureChest();
      break;
    case "fountain":
      fountain();
      break;
    case "enemy":
      enemy();
      break;
  }
};

// ============ Next Room ============
const nextRoom = () => {
  if (room == 0) {
    incrementRoom();
    document.getElementById("left").style.display = "block";
    document.getElementById("right").style.display = "block";
    updateImage("./assets/images/dungeon-hallway.jpg");
    updatePrompt(
      "You step into a damp stone chamber. The air is thick, and the walls echo with distant dripping water. There are three narrow passageways: one to the left, one straight ahead, and one to the right. Which way do you go?"
    );
  } else if (room > 0 && room < 15) {
    incrementRoom();
    dungeonEvent();
  } else {
    finishRun();
  }
};
