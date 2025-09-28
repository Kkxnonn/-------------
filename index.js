// global variable
let screen = "0";
let firstOperand = "0";
let lastOperator = "?";
let secondOperand = "0";

let state = "S0";

function updateScreen() {
  // update screen
  document.getElementById("screen").innerText = screen;

  // set buttons default
  document.getElementById("plus").classList.remove("cal-btn-orange");
  document.getElementById("minus").classList.remove("cal-btn-orange");
  document.getElementById("plus").classList.add("cal-btn-green");
  document.getElementById("minus").classList.add("cal-btn-green");
  // check lastOperator
  if (lastOperator === "+") {
    document.getElementById("plus").classList.remove("cal-btn-green");
    document.getElementById("plus").classList.add("cal-btn-orange");
  } else if (lastOperator === "-") {
    document.getElementById("minus").classList.remove("cal-btn-green");
    document.getElementById("minus").classList.add("cal-btn-orange");
  }
}

function operatorClicked(operator) {
  // console.log(operator);
  // if (state === "S2") {
  //   lastOperator = operator;
  //   state = "S2";
  // } else if (state === "S2") {
  //   lastOperator = operator;
  // }

  // updateScreen();
  if (state === "S1") {
    firstOperand = screen;
    lastOperator = operator;
    state = "S2"; // พร้อมรับเลขตัวถัดไป
    screen = "0";
  } else if (state === "S2") {
    lastOperator = operator; // เปลี่ยน operator
  } else if (state === "S3") {
    // หลังจากคำนวณแล้ว เริ่มการคำนวณใหม่
    firstOperand = screen;
    lastOperator = operator;
    screen = "0";
    state = "S2";
  }

  updateScreen();
}

function equalClicked() {
  // console.log("=");
  if (state === "S2" || state === "S1") {
    secondOperand = screen;

    let result = 0;
    const a = parseFloat(firstOperand);
    const b = parseFloat(secondOperand);

    if (lastOperator === "+") {
      result = a + b;
    } else if (lastOperator === "-") {
      result = a - b;
    } else {
      return; // ยังไม่ได้เลือก operator
    }

    screen = result.toString().slice(0, 9); // ตัดไม่เกิน 9 หลัก
    state = "S3"; // แสดงผลลัพธ์
    updateScreen();
  }
}

function numberClicked(number) {
  console.log(number);
  if (state === "S0") {
    screen = number.toString();
    state = "S1";
  } else if (state === "S1") {
    if (screen.length < 9) {
      screen = screen + number.toString();
    }
    // state = 'S1'
  }

  updateScreen();
}

function ceClicked() {
  // console.log("CE");
  screen = "0";
  if (state === "S3") {
    firstOperand = "0";
    secondOperand = "0";
    lastOperator = "?";
    state = "S0";
  } else if (state === "S2") {
    screen = "0"; // เคลียร์ตัวเลขใหม่
    state = "S2";
  } else {
    state = "S0";
  }

  updateScreen();
}

function checkKeyboard(event) {
  // console.log(event.key)
  if (event.key >= "0" && event.key <= "9") {
    numberClicked(Number(event.key));
  } else if (event.key === "+" || event.key === "=") {
    operatorClicked("+");
  } else if (event.key === "-") {
    operatorClicked("-");
  } else if (event.key === "Enter") {
    equalClicked();
  } else if (event.key === "Escape") {
    ceClicked();
  } else if (event.key === "Backspace") {
    ceClicked();
  } else if (event.key === "Delete") {
    ceClicked();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // create keyboard events
  document.addEventListener("keydown", checkKeyboard);
});

// function calculate(operation, num1, num2) {
//   if (operation === 'add') {
//     return num1 + num2
//   } else if (operation === 'subtract') {
//     return num1 - num2
//   } else {
//     return 'Invaalid operation'
//   }
// }

// const num1 = parseFloat(prompt('Enter first number:'))
// const num2 = parseFloat(prompt('Enter second number:'))
// const operation = promt('Enter operation (add or subtract):')

// function calculate(operation, num1, num2) {
//   if (operation === "add") {
//     return num1 + num2;
//   } else if (operation === "subtract") {
//     return num1 - num2;
//   } else {
//     return "Invalid operation";
//   }
// }



// // function คำนวณ
// function subClick() {
//   console.log("sub clicked");
//   document.getElementById("result").value = String(
//     Number(document.getElementById("a").value) -
//       Number(document.getElementById("b").value)
//   )
// }

// const mulClick = function () {
//   console.log('mul clicked')
// }

// const divClick = () => {
//   console.log ('div clicked')
// }

// document.addEventListener('DOMContentLoaded', () => {
//   console.log('DOM is loaded')
//   // initialization
//   document.getElementById('a').value = '0'
//   document.getElementById('b').value = '0'
//   document.getElementById('result').value = '0'

//   // [obj].addEventListener('<event>', func)
//   // const addButton = document.getElementById('add')
//   // addButton.addEventListener('click', addClick)
//   document.getElementById('sub').addEventListener('click', subClick){
//     console.log('add clicked')
//     const a = document.getElementById('a').value // string
//     const b = document.getElementById('b').value // string
//     const result = Number(a) - Number(b) // string
//     document.getElementById('result').value =String(result)
//   }

// })
