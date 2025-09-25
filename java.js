// let scoreX = 0;
// let scoreO = 0;
// let gamehistory = [];
// let boxes = document.querySelectorAll(".box");
// let reset = document.querySelector("#reset");
// let reSet = document.querySelector("#reSet");
// let newGameBt = document.querySelector("#restart");
// let msg = document.querySelector(".msg");
// let msgContainer = document.querySelector(".msgContainer");
// let Oturn = document.querySelector(".turnO");
// let Xturn = document.querySelector(".turnX");
// let countX = document.querySelector("#scoreX");
// let countO = document.querySelector("#scoreO");
// let start = document.querySelector(".start");
// let turnO = true;
// let gameOver = false;

// const win = [
//     [0, 1, 2],
//     [0, 3, 6],
//     [0, 4, 8],
//     [1, 4, 7],
//     [2, 5, 8],
//     [2, 4, 6],
//     [3, 4, 5],
//     [6, 7, 8],
// ];
// reSet.classList.remove("hide");

// const resetGame = () => {
//     turnO = true;
//     gameOver = false;
//     enableBoxes();
//     start.classList.add("hide");
//     Xturn.classList.add("turnX");
//     Oturn.classList.remove("turnO");
//     msg.classList.add("hide");
//     start.classList.add("hide");
//     reSet.classList.remove("hide");
// }
// const newGame = () => {
//     turnO = true;
//     gameOver = false;
//     enableBoxes();
//     msg.classList.add("hide");
//     start.classList.add("hide");
//     reSet.classList.remove("hide")
//     Oturn.classList.remove("turnO");
//     scoreO = 0;
//     scoreX = 0;
//     countO.innerText = scoreO;
//     countX.innerText = scoreX;
// }
// Oturn.classList.remove("turnO");

// boxes.forEach((box) => {
//     box.addEventListener("click", () => {
//         if (turnO) {
//             box.innerText = "O";
//             Xturn.classList.remove("turnX");
//             Oturn.classList.add("turnO");
//             turnO = false;
//         } else {
//             box.innerText = "X";
//             Oturn.classList.remove("turnO");
//             Xturn.classList.add("turnX");
//             turnO = true;
//         }
//         box.disabled = true;
//         checkWinner();
//     });
// });

// const disableBoxes = () => {
//     for (let box of boxes) {
//         box.disabled = true;
//     }
// }

// const enableBoxes = () => {
//     for (let box of boxes) {
//         box.disabled = false;
//         box.innerText = "";
//     }
// }

// const shoWinner = (winner) => {
//     msg.innerText = `Congratulations, Winner is ${winner}`;
//     msg.classList.remove("hide");
//     Oturn.classList.add("turnO");
//     Xturn.classList.add("turnX");
//     reSet.classList.add("hide");
//     start.classList.remove("hide");
//     disableBoxes();
//     gameOver = true;
//     if(winner == "O"){
//         scoreO++;
//     }else{
//         scoreX++;
//     }
//     countO.innerText = scoreO;
//     countX.innerText = scoreX;
// };

// const checkWinner = () => {
//     for (let pattern of win) {
//         let pos1Value = boxes[pattern[0]].innerText;
//         let pos2Value = boxes[pattern[1]].innerText;
//         let pos3Value = boxes[pattern[2]].innerText;

//         if (pos1Value !== "" && pos2Value !== "" && pos3Value !== "") {
//             if (pos1Value === pos2Value && pos2Value === pos3Value) {
//                 shoWinner(pos1Value);
//                 return;
//             }
//         }
//     }
//     if (!gameOver && Array.from(boxes).every(box => box.innerText !== "")) {
//         msg.innerText = "It's a Draw!";
//         msg.classList.remove("hide");   // 👈 show message
//         gameOver = true;
//         disableBoxes();

//         setTimeout(() => {
//             enableBoxes();            // clear board
//             msg.classList.add("hide"); 
//             gameOver = false;         // allow next round
//             turnO = true;             // reset starting player
//             Xturn.classList.add("turnX");
//             Oturn.classList.remove("turnO");
//             reSet.classList.remove("hide");
//         }, 3000); // 2 seconds
//     }
// };
// newGameBt.addEventListener("click", newGame);
// reset.addEventListener("click", resetGame);
// reSet.addEventListener("click", resetGame);

let scoreX = 0;
        let scoreO = 0;
        let boxes = document.querySelectorAll(".box");
        let resetBtn = document.querySelector("#reset");
        let reSetBtn = document.querySelector("#reSet");
        let newGameBtn = document.querySelector("#restart");
        let msg = document.querySelector("#msgBox");
        let turnIndicator = document.querySelector(".turn-indicator");
        let countX = document.querySelector("#scoreX");
        let countO = document.querySelector("#scoreO");
        let turnO = true;
        let gameOver = false;

        const winPatterns = [
            [0, 1, 2],
            [0, 3, 6],
            [0, 4, 8],
            [1, 4, 7],
            [2, 5, 8],
            [2, 4, 6],
            [3, 4, 5],
            [6, 7, 8],
        ];

        // Initialize the game
        function initGame() {
            boxes.forEach(box => {
                box.innerText = "";
                box.disabled = false;
                box.classList.remove("X", "O");
            });
            
            turnO = true;
            gameOver = false;
            updateTurnIndicator();
            msg.classList.add("hide");
            newGameBtn.classList.add("hide");
            resetBtn.classList.add("hide");
            reSetBtn.classList.remove("hide");
        }

        // Update turn indicator
        function updateTurnIndicator() {
            if (turnO) {
                turnIndicator.classList.remove("turn-X");
                turnIndicator.classList.add("turn-O");
                turnIndicator.querySelector(".turn-symbol").textContent = "O";
            } else {
                turnIndicator.classList.remove("turn-O");
                turnIndicator.classList.add("turn-X");
                turnIndicator.querySelector(".turn-symbol").textContent = "X";
            }
        }

        // Handle box clicks
        boxes.forEach((box) => {
            box.addEventListener("click", () => {
                if (gameOver || box.innerText !== "") return;
                
                if (turnO) {
                    box.innerText = "O";
                    box.classList.add("O");
                    turnO = false;
                } else {
                    box.innerText = "X";
                    box.classList.add("X");
                    turnO = true;
                }
                
                box.disabled = true;
                updateTurnIndicator();
                checkWinner();
            });
        });

        // Disable all boxes
        function disableBoxes() {
            boxes.forEach(box => box.disabled = true);
        }

        // Show winner
        function showWinner(winner) {
            msg.innerText = `Congratulations, Winner is ${winner}`;
            msg.classList.remove("hide");
            turnIndicator.querySelector(".turn-symbol").textContent = winner;
            reSetBtn.classList.add("hide");
            newGameBtn.classList.remove("hide");
            resetBtn.classList.remove("hide");
            disableBoxes();
            gameOver = true;
            
            if(winner === "O") {
                scoreO++;
                countO.textContent = scoreO;
            } else {
                scoreX++;
                countX.textContent = scoreX;
            }
        }

        // Check for winner or draw
        function checkWinner() {
            for (let pattern of winPatterns) {
                let pos1Value = boxes[pattern[0]].innerText;
                let pos2Value = boxes[pattern[1]].innerText;
                let pos3Value = boxes[pattern[2]].innerText;

                if (pos1Value !== "" && pos2Value !== "" && pos3Value !== "") {
                    if (pos1Value === pos2Value && pos2Value === pos3Value) {
                        showWinner(pos1Value);
                        return;
                    }
                }
            }
            
            // Check for draw
            if (Array.from(boxes).every(box => box.innerText !== "") && !gameOver) {
                msg.innerText = "It's a Draw!";
                msg.classList.remove("hide");
                reSetBtn.classList.add("hide");
                newGameBtn.classList.remove("hide");
                resetBtn.classList.remove("hide");
                gameOver = true;
                disableBoxes();
            }
        }

        // Reset game (keep scores)
        function resetGame() {
            turnO = true;
            boxes.forEach(box => {
                box.disabled = false;
                box.innerText = "";
                box.classList.remove("X", "O");
            });
            updateTurnIndicator();
            newGameBtn.classList.add("hide");
            resetBtn.classList.add("hide");
            reSetBtn.classList.remove("hide");
            msg.innerText = "Start to Playing Game";
            gameOver = false;
        }

        // New game (reset scores)
        function newGame() {
            turnO = true;
            boxes.forEach(box => {
                box.disabled = false;
                box.innerText = "";
                box.classList.remove("X", "O");
            });
            updateTurnIndicator();
            newGameBtn.classList.add("hide");
            resetBtn.classList.add("hide");
            reSetBtn.classList.remove("hide");
            msg.innerText = "Start New Game"; 
            scoreO = 0;
            scoreX = 0;
            countO.textContent = scoreO;
            countX.textContent = scoreX;
            gameOver = false;
        }

        // Event listeners
        newGameBtn.addEventListener("click", newGame);
        resetBtn.addEventListener("click", resetGame);
        reSetBtn.addEventListener("click", resetGame);

        // Initialize the game
        initGame();