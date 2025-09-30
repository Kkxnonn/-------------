// global variable
let screen = "0";
let state = "S0";
let operator = "?";
let firstOperand = "0"; //ตัวดำเนินการตัวแรก
let secondOperand = "0";
let lastOperator = "?";

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
  } 
  else if (lastOperator === "-") {
    document.getElementById("minus").classList.remove("cal-btn-green");
    document.getElementById("minus").classList.add("cal-btn-orange");
  }
}

// function operatorClicked(operator) {
//   console.log(operator);
//   if (state === "S2") {
//     lastOperator = operator;
//     state = "S2";
//   } else if (state === "S2") {
//     lastOperator = operator;
//   }

//   updateScreen();
// }
function operatorClicked(operator) {
  console.log(operator);

  if (state === "S1") {
    firstOperand = Number(screen);  // เก็บค่าก่อนกด operator
    lastOperand = firstOperand; //เก็บค่าของตัวแรกไว้ในlastOperand
    lastOperator = operator;
    state = "S2";
  } 
  else if (state === "S2") { //แค่เปลี่ยน operator ยังไม่ได้ใส่เลขใหม่
    lastOperator = operator;//ใช้เครื่องหมายตัวล่าสุดเป็นตัวดำเนินการ
  }
  updateScreen();//เรียกมาอัปเดต
}

// function equalClicked() {
//   // console.log("=");
//   if (state === "S2" || state === "S1") {
//     secondOperand = screen;

//     let result = 0;
//     const a = parseFloat(firstOperand);
//     const b = parseFloat(secondOperand);

//     if (lastOperator === "+") {
//       result = a + b;
//     } else if (lastOperator === "-") {
//       result = a - b;
//     } else {
//       return; // ยังไม่ได้เลือก operator
//     }

//     screen = result.toString().slice(0, 9); // ตัดไม่เกิน 9 หลัก
//     state = "S3"; // แสดงผลลัพธ์
//     updateScreen();
//   }
// }
// = btn
function equalClicked() {
  console.log("=");

  let result = 0;

  if (state === "S1") {
    secondOperand = Number(screen); // ใช้เลขที่พิมพ์ล่าสุด
    lastOperand = secondOperand; // จำไว้ใช้ในครั้งต่อไป

    if (lastOperator === "+") {
      result = firstOperand + secondOperand;
    } else if (lastOperator === "-") {
      result = firstOperand - secondOperand;
    } else {
      result = Number(screen); // ถ้าไม่มี operator ก็แสดงเลขเดิม
    }

    screen = result.toString();
    firstOperand = result;
    state = "S2";
  } else if (state === "S2") {
    // ไม่ได้พิมพ์เลขใหม่ แต่กด = ต่อ
    if (lastOperator === "+") {
      result = firstOperand + lastOperand;
    } else if (lastOperator === "-") {
      result = firstOperand - lastOperand;
    } else {
      result = Number(screen);
    }

    screen = result.toString();
    firstOperand = result;
  }
  updateScreen();
}

function numberClicked(number) {
  console.log(number);
  if (state === "S0" && number != "0") {
    screen = number.toString();
    state = "S1";
  } else if (state === "S1") {
    if (screen.length < 9) {
      screen = screen += number.toString(); //อัปเดตค่า แสดงค่าเดิมรวมกับค่าใหม่(เพิ่มค่าใหม่แล้วเอาไปแสดง โดยที่ค่าเดิมยังอยู่)
    }
    // state = 'S1'
  } else if (state === "S2") {
    screen = number.toString();
    state = "S1";
  }

  updateScreen(); //เรียกฟังก์ชันupdateScreenให้มาทำงาน
}

// CE btn
// function ceClicked() {
// console.log("CE");
//   screen = "0";
//   if (state === "S3") {
//     firstOperand = "0";
//     secondOperand = "0";
//     lastOperator = "?";
//     state = "S0";
//   } else if (state === "S2") {
//     screen = "0"; // เคลียร์ตัวเลขใหม่
//     state = "S2";
//   } else {
//     state = "S0";
//   }

//   updateScreen();
// }

function ceClicked() {
  console.log("CE");
  screen = "0";
  state = "S0";
  firstOperand = 0;
  secondOperand = 0;
  lastOperand = 0;
  lastOperator = "?";
  updateScreen();
}

function checkKeyboard(event) {
  //ที่ใช้(event) คือใส่อีเว้นท์(เหตุการณ์)ที่จะเกิดขึ้น
  // console.log(event.key) คือคำสั่งกดคีย์บอร์ด   ถ้าใส่แค่(event)มันจะกดแล้วไม่ส่งเลขเข้าไป มันจะตรวจจับเป็นการทำงานอื่น (ลองกดดูได้ มันจะเป็นการกระทำ)
  if (event.key >= "0" && event.key <= "9") {
    //ตรวจจับเลข1-9จากคีย์บอร์ด
    numberClicked(Number(event.key)); 
    //เอา(Number)ครอบตัวevent.key แบบนี้(Number(event.key)) เพราะมันตรวจจับการกดจากคีย์บอร์ด มันจะจับเป็นรูปแบบข้อความเข้ามา แล้วเราอยากแปลงให้มันกลายเป็นtype number
  } 
  else if (event.key === "+" || event.key === "=") { 
    //ที่เราใส่ปุ่ม=ไว้ คือในคีย์บอร์ดมันจะมีปุ่ม+อยู่บน= เลยเผื่อไว้ เผื่อเขาลืมกดshift แต่จริงๆถึงจะใส่แค่'+'อย่างเดียว มันก็ตรวจจับหมดทั้งคีย์บอร์โนั่นแหละ ใส่+ตัวเดียว แต่บนคีย์บอร์ดมี2ที่ มันก็จับ2ที่ โดยไม่ต้องใส่เพิ่ม
    operatorClicked("+");
  } 
  else if (event.key === "-") {
    // === หมายถึง ตัวถูก ค่าถูก typeถูก
    operatorClicked("-");
    //ที่ใส่ตรวจจับค่าจากคีย์บอร์ด(เวลากดปุ่ม - )ได้เลย เพราะเราจะกด'-'แค่ตัวเดียว ไม่เหมือนตัว+ที่มันไปอยู่บน= และเวลากดปุ่ม-ไม่ว่าจะที่ไหน มันก็จะจับเป็น-ให้เองเลยออโต้
  } 
  else if (event.key === "Enter") {
    equalClicked();
  } 
  else if (event.key === "Escape") {
    ceClicked();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  //กดเลขผ่านคีย์บอร์ดได้
  // create keyboard events
  document.addEventListener("keydown", checkKeyboard);
  //เวลากดอะไรไปมันจะตรวจจับแล้วโยนไปที่ฟังก์ชันหมด
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
