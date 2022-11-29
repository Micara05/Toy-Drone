const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
var tileCount = 40;
var tileSize = 40;
var headX;
var headY;

var direction;
var state = false;

// document.body.addEventListener("keydown", keyDown);

function place() {
  var placeX = document.getElementById("placeX").value;
  var placeY = document.getElementById("placeY").value;
  const radioButtons = document.querySelectorAll('input[name="direction"]');
  var radioBtnChecked = false;

  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      radioBtnChecked = true;
      break;
    }
  }

  if (placeY != "" && placeY != "" && radioBtnChecked == true) {
    if (placeX >= 0 && placeX <= 9) {
      headX = placeX;
    } else {
      alert("Invalid X value! Please specify a value between 0 and 9. ");
    }

    if (placeY >= 0 && placeY <= 9) {
      headY = Math.abs(placeY - 9);
    } else {
      alert("Invalid Y value! Please specify a value between 0 and 9. ");
    }

    for (const radioButton of radioButtons) {
      if (radioButton.checked) {
        direction = radioButton.value;
        break;
      }
    }

    console.log(placeX);
    console.log(placeY);
    console.log(direction);
    state = true;
    console.log(state);
    drawGame();
  } else {
    alert("Coordinate X, Coordinate Y & Direction may not be empty.");
  }
}

// function keyDown(event) {
//   //up - move
//   if (event.keyCode == 38) {
//     switch (direction) {
//       case "NORTH":
//         if (headY > 0) {
//           headY = headY - 1;
//           console.log(headY);
//         }
//         break;
//       case "SOUTH":
//         if (headY < 9) {
//           headY++;
//           console.log(headY);
//         }
//         break;
//       case "EAST":
//         if (headX < 9) {
//           headX++;
//           console.log(headX);
//         }
//         break;

//       case "WEST":
//         if (headX > 0) {
//           headX = headX - 1;
//           console.log(headX);
//         }

//         break;
//     }
//   }
//   //down
//   //   if (event.keyCode == 40) {
//   //
//   //   }

//   //left
//   if (event.keyCode == 37) {
//     switch (direction) {
//       case "NORTH":
//         direction = "WEST";
//         break;
//       case "SOUTH":
//         direction = "EAST";
//         break;
//       case "EAST":
//         direction = "NORTH";
//         break;
//       case "WEST":
//         direction = "SOUTH";
//         break;
//     }
//   }
//   //right
//   if (event.keyCode == 39) {
//     switch (direction) {
//       case "NORTH":
//         direction = "EAST";
//         break;
//       case "SOUTH":
//         direction = "WEST";
//         break;
//       case "EAST":
//         direction = "SOUTH";
//         break;
//       case "WEST":
//         direction = "NORTH";
//         break;
//     }
//   }
// }

function move() {
  if (state == true) {
    switch (direction) {
      case "NORTH":
        if (headY > 0) {
          headY = headY - 1;
          console.log(headY);
        }
        break;
      case "SOUTH":
        if (headY < 9) {
          headY++;
          console.log(headY);
        }
        break;
      case "EAST":
        if (headX < 9) {
          headX++;
          console.log(headX);
        }
        break;

      case "WEST":
        if (headX > 0) {
          headX = headX - 1;
          console.log(headX);
        }

        break;
    }
  } else {
    alert("Please enter input values before proceeding to move.");
  }
}

function right() {
  if (state == true) {
    switch (direction) {
      case "NORTH":
        direction = "EAST";
        break;
      case "SOUTH":
        direction = "WEST";
        break;
      case "EAST":
        direction = "SOUTH";
        break;
      case "WEST":
        direction = "NORTH";
        break;
    }
  } else {
    alert("Please enter input values before proceeding to change direction.");
  }
}

function left() {
  if (state == true) {
    switch (direction) {
      case "NORTH":
        direction = "WEST";
        break;
      case "SOUTH":
        direction = "EAST";
        break;
      case "EAST":
        direction = "NORTH";
        break;
      case "WEST":
        direction = "SOUTH";
        break;
    }
  } else {
    alert("Please enter input values before proceeding to change direction.");
  }
}

function report() {
  if (state == true) {
    alert(
      `Coordinate X: ${headX}\nCoordinate Y: ${Math.abs(
        headY - 9
      )}\nDirection: ${direction}`
    );
  } else {
    alert("Please enter input values before proceeding to get a report.");
  }
}

function animate() {
  let speed = 7; //The interval will be seven times a second.

  setTimeout(drawGame, 1000 / speed); //update screen 7 times a second
  console.log(direction);
}

function attack() {
  if (state == true) {
    drawProjectile();
    drawDrone();
  } else {
    alert("Please enter input values before proceeding to attack.");
  }
}

function drawGame() {
  clearScreen();
  drawDrone();
  //  drawDrone();
  animate();
}

// function drawDrone() {
//   ctx.fillStyle = "orange";
//   ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
// }

function drawDrone() {
  var img = document.getElementById("drone");
  ctx.drawImage(img, headX * tileCount, headY * tileCount, 55, 55);
}

function drawProjectile() {
  ctx.fillStyle = "orange";
  let projectileX = headX;
  let projectileY = headY;

  switch (direction) {
    case "NORTH":
      headY >= 2 ? (projectileY = headY - 2) : alert("Projectile was not fired. There is no free space ahead!");
      break;
    case "SOUTH":
      headY <= 7 ? (projectileY = headY + 2) : alert("Projectile was not fired. There is no free space ahead!");
      break;
    case "EAST":
      headX <= 7 ? (projectileX = headX + 2) : alert("Projectile was not fired. There is no free space ahead!");
      break;
    case "WEST":
      headX >= 2 ? (projectileX = headX - 2) : alert("Projectile was not fired. There is no free space ahead!");
      break;
  }

  ctx.fillRect(
    projectileX * tileCount,
    projectileY * tileCount,
    tileSize,
    tileSize
  );

  console.log(projectileX);
  console.log(projectileY);
}

function clearScreen() {
  ctx.fillStyle = "black"; // make screen black
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight); // black color start from 0px left, right to canvas width and canvas height
}

clearScreen();
