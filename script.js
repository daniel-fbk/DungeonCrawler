// i = 0;
// function font() {
//   if (i == 0) {
//     i++;
//     document.querySelector("#text").style.fontSize = "35px";
//   } else {
//     i--;
//     document.querySelector("#text").style.fontSize = "16px";
//   }
// }

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
Fountain, heals an amount of "Health"
Skeleton, option to attempt to flee or fight, lose "Health", chance to avoid losing "Health" if flee is effective

Find "Exit" to win

*/

let room = 0;
let health = 50;

function switchHub() {
  document.getElementById("character-creation").style.display = "none";
  document.getElementById("dungeon").style.display = "flex";
  document.getElementById("forward").style.display = "inline-block";
  let userName = document.getElementById("name-input").value;
  console.log(userName);
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
  }
}
