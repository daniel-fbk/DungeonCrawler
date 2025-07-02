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
Skeleton, option to attempt to flee or fight, lose "Health", chance to avoid losing "Health" if flee is effective

Find "Exit" to win

*/

let room = 0;
let health = 50;
let fleeChance = 45;
let eventRoll = 0;

function switchHub() {
  document.getElementById("character-creation").style.display = "none";
  document.getElementById("dungeon").style.display = "flex";
  document.getElementById("forward").style.display = "inline-block";
  let userName = document.getElementById("name-input").value;
}

function nextRoom() {
  if (room == 0) {
    room++;
    document.getElementById("left").style.display = "inline-block";
    document.getElementById("right").style.display = "inline-block";
    document.getElementById("room-image").src =
      "./assets/images/dungeon-hallway.jpg";
    document.getElementById("room-prompt").textContent =
      "You step into a damp stone chamber. The air is thick, and the walls echo with distant dripping water. There are three narrow passageways: one to the left, one straight ahead, and one to the right. Which way do you go?";
    document.getElementById("room").textContent = "Room 1";
  } else if (room == 1) {
    room++;
    treasureChest();
  }
}

function showControls() {
  document.querySelector("controls").style.display = "grid";
}

function hideControls() {
  document.querySelector("controls").style.display = "none";
}

function treasureChest() {
  document.getElementById("room-image").src = "./assets/images/chest.jpg";
  document.getElementById("room-prompt").textContent =
    "You see a chest in front of you. It looks old, but untouched.";
  document.querySelector(".controls").style.display = "none";
}

function openChest() {
  eventRoll = randomizeNum(7);
  console.log(eventRoll);
  if (eventRoll <= 3) {
    document.getElementById("room-prompt").textContent = "The chest was empty";
  } else if (eventRoll == 4) {
    fleeChance += 10;
    document.getElementById("room-prompt").textContent =
      "You find an old pair of leather boots. This might be useful when fleeing.";
  } else if (eventRoll == 5) {
    skipRoomPotion++;
    document.getElementById("room-prompt").textContent =
      "You found a Skip Potion! Use this to skip a room";
  } else if (eventRoll == 6) {
    health -= 10;
    document.getElementById("room-prompt").textContent = "A mimic!";
    document.getElementById("room-image").src = "./assets/images/mimic.jpg";
  }
}

function randomizeNum(num1) {
  return Math.floor(Math.random() * num1);
}
