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
}
