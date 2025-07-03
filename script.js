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

const healthDisplay = document.getElementById("health");
const roomCount = document.querySelector("#room");
const changeImage = document.querySelector("#room-image");
const roomPrompt = document.querySelector("#room-prompt");

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
  } else if (room > 0 && room < 10) {
    incrementRoom();
    dungeonEvent();
  } else {
    finishRun();
  }
}

// ============ Event Decider ============
function dungeonEvent() {
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
  console.log(event);
  switch (event) {
    case "treasure":
      treasureChest();
  }
}

// ============ Events ============
function treasureChest() {
  changeImage.src = "./assets/images/chest.jpg";
  roomPrompt.textContent = "You find a chest. It looks old, but untouched.";
  document.querySelector(".controls").style.display = "none";
  document.getElementById("chest-options").style.display = "block";
}

// ============ Choice Events ============
function openChest() {
  eventRoll = randomizeNum(7);
  console.log(eventRoll);
  if (eventRoll <= 3) {
    roomPrompt.textContent = "The chest was empty.";
  } else if (eventRoll == 4) {
    fleeChance += 10;
    roomPrompt.textContent =
      "You find an old pair of leather boots. This might be useful when fleeing.";
  } else if (eventRoll == 5) {
    skipRoomPotion++;
    roomPrompt.textContent =
      "You found a Skip Potion! Use this to skip a room.";
  } else if (eventRoll == 6) {
    changeHealth("-", 10);
    roomPrompt.textContent = "A mimic!";
    changeImage.src = "./assets/images/mimic.jpg";
    console.log(`Current Health: ${health}`);
  }
}

// ============ Functions ============
function randomizeNum(num) {
  return Math.floor(Math.random() * num);
}

function changeHealth(operator, healthValue) {
  switch (operator) {
    case "+":
      healthDisplay.textContent = `Health: ${health.toString()}`;
      return (health += healthValue);
    case "-":
      healthDisplay.textContent = `Health: ${health.toString()}`;
      return (health -= healthValue);
  }
}

const incrementRoom = () => {
  room++;
  roomCount.textContent = `Room: ${room}`;
};
