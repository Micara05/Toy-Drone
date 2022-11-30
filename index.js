const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
var tileCount = 40;
var tileSize = 40;
var headX; // X Coordinate
var headY; // Y Coordinate
var direction; // North, East, South, West
var state = false; // Has the drone been placed

function place() {
  var placeX = document.getElementById("placeX").value; // Get the value of input x
  var placeY = document.getElementById("placeY").value; // Get the value of input y
  const radioButtons = document.querySelectorAll('input[name="direction"]');
  var radioBtnChecked = false;

  //Check if a radio button is selected
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      radioBtnChecked = true;
      break;
    }
  }

  // Check that none of the input fields are empty
  if (placeY != "" && placeY != "" && radioBtnChecked == true) {
    // Check that input X's value is in the range (0-9) as there is a boundary of 10 units
    if (placeX >= 0 && placeX <= 9) {
      headX = placeX;
    } else {
      alert("Invalid X value! Please specify a value between 0 and 9. ");
    }

    // Check that input Y's value is in the range (0-9) as there is a boundary of 10 units
    if (placeY >= 0 && placeY <= 9) {
      headY = Math.abs(placeY - 9);
    } else {
      alert("Invalid Y value! Please specify a value between 0 and 9. ");
    }

    // Set direction to radio button that was selected
    for (const radioButton of radioButtons) {
      if (radioButton.checked) {
        direction = radioButton.value;
        break;
      }
    }

    // Set the state of the drone to be "Placed"
    state = true;
    drawGame();
  } else {
    alert("Coordinate X, Coordinate Y & Direction may not be empty.");
  }
}

function move() {
  // If the drone has been placed
  if (state == true) {
    document.getElementById("actionLabel").innerHTML = "MOVE";
    // Move drone by 1 unit depending on its direction
    switch (direction) {
      case "NORTH":
        if (headY > 0) {
          headY = headY - 1;
        }
        break;
      case "SOUTH":
        if (headY < 9) {
          headY++;
        }
        break;
      case "EAST":
        if (headX < 9) {
          headX++;
        }
        break;

      case "WEST":
        if (headX > 0) {
          headX = headX - 1;
        }

        break;
    }
  } else {
    alert(
      "Please enter values for placing the drone before proceeding to move."
    );
  }
}

function right() {
  // If the drone has been placed
  if (state == true) {
    // Rotate the drone 90 degrees to the right based on current selected direction
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
    document.getElementById("directionLabel").innerHTML = direction;
  } else {
    alert(
      "Please enter values for placing the drone before proceeding to change direction."
    );
  }
}

function left() {
  // Check if the drone has been placed
  if (state == true) {
    // Rotate the drone 90 degrees to the left based on current selected direction
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
    document.getElementById("directionLabel").innerHTML = direction;
  } else {
    alert(
      "Please enter values for placing the drone before proceeding to change direction."
    );
  }
}

function report() {
  // If drone has been placed , output the drones current coordinates and direction 
  if (state == true) {
    alert(
      `Coordinate X: ${headX}\nCoordinate Y: ${Math.abs(
        headY - 9
      )}\nDirection: ${direction}`
    );
  } else {
    alert(
      "Please enter values for placing the drone before proceeding to get a report."
    );
  }
}

function animate() {
  let speed = 7; //The interval will be seven times a second.
  setTimeout(drawGame, 1000 / speed); //update screen 7 times a second
}

function attack() {
  // If the drone has been placed
  if (state == true) {
    drawProjectile(); // Draw projectile explosion 2 units ahead in current direction
    drawDrone(); // Re draw drone
    document.getElementById("actionLabel").innerHTML = "ATTACK";
    var audio = document.getElementById("audio");
    audio.play(); // Execute explosion effect
  } else {
    alert(
      "Please enter values for placing the drone before proceeding to attack."
    );
  }
}

function drawGame() {
  clearScreen();
  drawDrone();
  animate();
}

function drawDrone() {
  var img = document.getElementById("drone");
  ctx.drawImage(img, headX * tileCount, headY * tileCount, 55, 55);
}

function drawProjectile() {
  ctx.fillStyle = "orange";
  let projectileX = headX;
  let projectileY = headY;

  // Draw projectile - Check if there is sufficient space - Projectile should not be sent if it will cross the boundary
  switch (direction) {
    case "NORTH":
      headY >= 2
        ? (projectileY = headY - 2)
        : alert("Projectile was not fired. There is no free space ahead!");
      break;
    case "SOUTH":
      headY <= 7
        ? (projectileY = headY + 2)
        : alert("Projectile was not fired. There is no free space ahead!");
      break;
    case "EAST":
      headX <= 7
        ? (projectileX = headX + 2)
        : alert("Projectile was not fired. There is no free space ahead!");
      break;
    case "WEST":
      headX >= 2
        ? (projectileX = headX - 2)
        : alert("Projectile was not fired. There is no free space ahead!");
      break;
  }

  ctx.fillRect(
    projectileX * tileCount,
    projectileY * tileCount,
    tileSize,
    tileSize
  );
}

function clearScreen() {
  ctx.fillStyle = "black"; // make screen black
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight); // black color start from 0px left, right to canvas width and canvas height
}

clearScreen();
