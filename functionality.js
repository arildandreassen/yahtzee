let rollCount = 0;
const maxRollCount = 3;
const numberOfDices = 5;
let diceResults = [];
let players = [];
let playerCount = 0;

const diceSides = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
};

const modalSaveButton = document.getElementById('savePlayer');
$('#newPlayerModal').on('keypress', function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
      $('#savePlayer').click();   
    }
  });

$(".modal").on("shown.bs.modal", function () {
  $(this).find("input:first").focus();
});

const startGame = () => {
    console.log('starting new game')
    const row = document.createElement('row');
    const table = document.querySelector("#scorecard table")
    table.appendChild(row);
}

const savePlayerName = () => {
  let name =
    document.getElementById("playerName").value || `Player ${playerCount + 1}`;
  playerCount++;
  players.push(name)

    const newHeader = document.createElement('th');
    newHeader.innerHTML = name;
    document.querySelector('.tableHeader').appendChild(newHeader);

  const rows = document.querySelectorAll('.gameboard table tr:not(.tableHeader)')
  rows.forEach(row => {
    const newColumn = document.createElement('td');
      row.appendChild(newColumn);
      console.log(row)
  })
};

const focusPlayerName = () => {
  document.getElementById("playerName").focus();
};

const countOccurrences = (arr, val) =>
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

const rollOneDice = () => {
  min = Math.ceil(1);
  max = Math.floor(7);
  const number = Math.floor(Math.random() * (max - min) + min);
  return number;
};

const rollAllDices = () => {
  if (rollCount < maxRollCount) {
    for (let i = 0; i < numberOfDices; i++) {
      const classes = document.getElementById(`dice${i + 1}`).classList;
      if (!classes.contains("hold")) {
        const number = rollOneDice();
        diceResults[i] = number;
        document.getElementById(`dice${i + 1}`).classList = "";
        document
          .getElementById(`dice${i + 1}`)
          .classList.add(
            "fas",
            `fa-dice-${diceSides[number]}`,
            "fa-7x",
            "dice"
          );
      }
    }
    rollCount++;
    if (rollCount === maxRollCount) {
      document.getElementById("rolldice").classList.add("hidden");
    }
  }
};

const holdDice = (dice) => {
  const classes = document.getElementById(dice).classList;
  if (classes.contains("hold")) {
    document.getElementById(dice).classList.remove("hold");
  } else {
    document.getElementById(dice).classList.add("hold");
  }
};

const updateOnes = () => {
  let calcNumber = 0;
  diceResults.forEach((number) => {
    if (number == 1) {
      calcNumber++;
    }
  });
  document.querySelector(".one").innerHTML = calcNumber;
};

const updateTwos = () => {
  let calcNumber = 0;
  diceResults.forEach((number) => {
    if (number == 2) {
      calcNumber += 2;
    }
  });
  document.querySelector(".two").innerHTML = calcNumber;
};

const updateThrees = () => {
  let calcNumber = 0;
  diceResults.forEach((number) => {
    if (number == 3) {
      calcNumber += 3;
    }
  });
  document.querySelector(".three").innerHTML = calcNumber;
};
const updateFours = () => {
  let calcNumber = 0;
  diceResults.forEach((number) => {
    if (number == 4) {
      calcNumber += 4;
    }
  });
  document.querySelector(".four").innerHTML = calcNumber;
};

const updateFives = () => {
  let calcNumber = 0;
  diceResults.forEach((number) => {
    if (number == 5) {
      calcNumber += 5;
    }
  });
  document.querySelector(".five").innerHTML = calcNumber;
};

const updateSixes = () => {
  let calcNumber = 0;
  diceResults.forEach((number) => {
    if (number == 6) {
      calcNumber += 6;
    }
  });
  document.querySelector(".six").innerHTML = calcNumber;
};

const updateToak = () => {
  let toak;
  const countArray = [];
  for (let i = 1; i <= 6; i++) {
    countArray.push(countOccurrences(diceResults, i));
  }
  countArray.forEach((count, index) => {
    if (count >= 3) {
      toak = (index + 1) * 3;
    }
  });
  document.querySelector(".toak").innerHTML = toak;
};

const updateFoak = () => {
  let foak;
  const countArray = [];
  for (let i = 1; i <= 6; i++) {
    countArray.push(countOccurrences(diceResults, i));
  }
  countArray.forEach((count, index) => {
    if (count === 4) {
      foak = (index + 1) * 4;
    }
  });
  document.querySelector(".foak").innerHTML = foak;
};

const updateFullHouse = () => {
  let twos = 0;
  let threes = 0;

  const countArray = [];
  for (let i = 1; i <= 6; i++) {
    countArray.push(countOccurrences(diceResults, i));
  }
  console.log(countArray);
  countArray.forEach((count, index) => {
    if (count === 2) {
      twos = (index + 1) * 2;
    } else if (count === 3) {
      threes = (index + 1) * 3;
    }
  });
  const sum = twos + threes;
  document.querySelector(".house").innerHTML = sum;
};

const updateSmallStraight = () => {
  let isSmlStraight = true;
  const countArray = [];
  for (let i = 1; i <= 6; i++) {
    countArray.push(countOccurrences(diceResults, i));
  }
  console.log(countArray);
  for (let i = 0; i < 5; i++) {
    if (countArray[i] === 0) {
      isSmlStraight = false;
    }
  }
  if (isSmlStraight) {
    document.querySelector(".sml_straight").innerHTML = 15;
  }
};

const updateLargeStraight = () => {
  let isLargeStraight = true;
  const countArray = [];
  for (let i = 1; i <= 6; i++) {
    countArray.push(countOccurrences(diceResults, i));
  }
  console.log(countArray);
  for (let i = 1; i < 6; i++) {
    if (countArray[i] === 0) {
      isLargeStraight = false;
    }
  }
  if (isLargeStraight) {
    document.querySelector(".lg_straight").innerHTML = 20;
  }
};

const updateChance = () => {
  const sum = diceResults.reduce((acc, val) => {
    return acc + val;
  }, 0);
  document.querySelector(".chance").innerHTML = sum;
};

const updateYahtzee = () => {
  let yahtzee;
  const countArray = [];
  for (let i = 1; i <= 6; i++) {
    countArray.push(countOccurrences(diceResults, i));
  }
  countArray.forEach((count, index) => {
    if (count === 5) {
      yahtzee = (index + 1) * 5;
    }
  });
  document.querySelector(".yahtzee").innerHTML = 50;
};
