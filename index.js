let display = "0";
let firstNumber = null;
let lastOperation = "?";
let state = "S0";
document.addEventListener("DOMContentLoaded", () => {
   //รับค่าจากคีย์บอร์ด เก็บค่าไว้ที่e 
  document.addEventListener("keydown", (e) => {
    if (e.key >= 0 && e.key <= 9) {
      numberClick(Number(e.key));
    } else if (e.key == "Backspace") {
      Clear();
    } else if (e.key == "+" || e.key == "=") {
      Operation("+");
    } else if (e.key == "-") {
      Operation("-");
    } else if (e.key === "Enter") {
      Equal();
    } else if (e.key == "*") {
      Operation("*");
    } else if (e.key == "/") {
      Operation("/");
    }
  });
});

const numberClick = (number) => {

  if (state == "S0") {
    display = number.toString();
    state = "S1";
    
  } else if (state == "S1") {
    display += number.toString();
  } else if (state == "S2") {
    display = number.toString();
    state = "S1";
  }
  UpdateDisplay();
  console.log(display);
};

const UpdateDisplay = () => {
  // Update screen
  document.getElementById("display").innerHTML = display;
  //   update color operation
  document.getElementById("plus").classList.remove("bg-red-500");
  document.getElementById("minus").classList.remove("bg-red-500");
  document.getElementById("plus").classList.add("bg-green-500");
  document.getElementById("minus").classList.add("bg-green-500");

  //   update button
  if (lastOperation === "+") {
    document.getElementById("plus").classList.remove("bg-green-500");
    document.getElementById("plus").classList.add("bg-red-500");
  } else if (lastOperation === "-") {
    document.getElementById("minus").classList.remove("bg-green-500");
    document.getElementById("minus").classList.add("bg-red-500");
  }
};

const Clear = () => {
  display = "0";
  state = "S0";
  lastOperation = "?";
  UpdateDisplay();
};

const Operation = (operator) => {
  if (state == "S1") {
    firstNumber = Number(display);
    lastOperation = operator;
    state = "S2";
  }
  UpdateDisplay();ห
};

const Equal = () => {
  if (state == "S1") {
    let secondNumber = Number(display);
    if (lastOperation == "+") {
      display = firstNumber + secondNumber;
    }
    if (lastOperation == "-") {
      display = firstNumber - secondNumber;
    }
  }
  if (state == "S2") {
    if (lastOperation == "+") {
      display = firstNumber + Number(display);
    }
    if (lastOperation == "-") {
      display = firstNumber - Number(display);
    }
  }
  UpdateDisplay();
};



// // global variable
// let screen = '0';
// let state = 'S0';
 

// function updateScreen() {
//     document.getElementById("screen").innerText = screen;
// }

// function numberClicked(number) {
//   console.log(number);
//   if (state === 'S0'){
//     screen = number.toString;
//     state = 'S0';
//   } else if (state === 'S1') {
//     if (screen.length < 9) 
//     screen = screen + number.toString();
//     // state = 'S1';
//     }

//   updateScreen();
// }

// function operatorClicked(operator) {
//   console.log(operator);
// }

// function equalClicked() {
//   console.log("=");
// }

// function ceClicked() {
//   console.log("ce");
// }

// function checkKeyboard(event) {
//   // console.log(Number(event.key));
//   if (event.key >= "0" && event.key <= "9") 
//   {
//     numberClicked(Number(event.key));
//   } 
//   else if (event.key == ".") {
//     operatorClicked(".");
//   } 
//   else if (event.key == "+" || event.key == "=") {
//     operatorClicked("+");
//   } 
//   else if (event.key == "-") {
//     operatorClicked("-");
//   } 
//   else if (event.key == "*") {
//     operatorClicked("*");
//   } 
//   else if (event.key == "/") {
//     operatorClicked("/");
//   }
//   else if (event.key == "Enter") {
//     equalClicked();
//   } 
//   else if (event.key == "Escape") {
//     ceClicked();
//   }
// }

// document.addEventListener("DOMContentLoaded", () => {
//   // create keyboard event
//   document.addEventListener("keydown", checkKeyboard);
// });
