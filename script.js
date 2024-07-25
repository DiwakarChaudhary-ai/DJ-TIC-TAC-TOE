document.addEventListener("DOMContentLoaded", () => {

    let board = ["", "", "", "", "", "", "", "", ""];

    let currentPlayer = "D";

    let isGameOver = false;

    let isSinglePlayer = true;

    const winSound = document.getElementById("winSound");

    const drawSound = document.getElementById("drawSound");

    const moveSound = document.getElementById("moveSound");

    window.startSinglePlayer = function() {

        isSinglePlayer = true;

        resetGame();

    }

    window.startTwoPlayer = function() {

        isSinglePlayer = false;

        resetGame();

    }

    window.makeMove = function(index) {

        if (board[index] === "" && !isGameOver) {

            board[index] = currentPlayer;

            document.getElementById(`cell-${index}`).textContent = currentPlayer;

            moveSound.play();

            checkWinner();

            if (!isGameOver) {

                currentPlayer = currentPlayer === "D" ? "J" : "D";

                if (isSinglePlayer && currentPlayer === "J") {

                    setTimeout(makeAIMove, 500); // AI move with delay

                }

            }

        }

    }

    function makeAIMove() {

        let bestMove = findBestMove(board);

        makeMove(bestMove);

    }

    function findBestMove(board) {

        let bestVal = -1000;

        let bestMove = -1;

        for (let i = 0; i < 9; i++) {

            if (board[i] === "") {

                board[i] = "J";

                let moveVal = minimax(board, 0, false);

                board[i] = "";

                if (moveVal > bestVal) {

                    bestMove = i;

                    bestVal = moveVal;

                }

            }

        }

        return bestMove;

    }

    function minimax(board, depth, isMaximizing) {

        let score = evaluate(board);

        if (score === 10) return score - depth;

        if (score === -10) return score + depth;

        if (!board.includes("")) return 0;

        if (isMaximizing) {

            let best = -1000;

            for (let i = 0; i < 9; i++) {

                if (board[i] === "") {

                    board[i] = "J";

                    best = Math.max(best, minimax(board, depth + 1, !isMaximizing));

                    board[i] = "";

                }

            }

            return best;

        } else {

            let best = 1000;

            for (let i = 0; i < 9; i++) {

                if (board[i] === "") {

                    board[i] = "D";

                    best = Math.min(best, minimax(board, depth + 1, !isMaximizing));

                    board[i] = "";

                }

            }

            return best;

        }

    }

    function evaluate(board) {

        const winningCombinations = [

            [0, 1, 2],

            [3, 4, 5],

            [6, 7, 8],

            [0, 3, 6],

            [1, 4, 7],

            [2, 5, 8],

            [0, 4, 8],

            [2, 4, 6]

        ];

        for (const combination of winningCombinations) {

            const [a, b, c] = combination;

            if (board[a] === board[b] && board[b] === board[c]) {

                if (board[a] === "J") return 10;

                else if (board[a] === "D") return -10;

            }

        }

        return 0;

    }

    function checkWinner() {

        const winningCombinations = [

            [0, 1, 2],

            [3, 4, 5],

            [6, 7, 8],

            [0, 3, 6],

            [1, 4, 7],

            [2, 5, 8],

            [0, 4, 8],

            [2, 4, 6]

        ];

        for (const combination of winningCombinations) {

            const [a, b, c] = combination;

            if (board[a] && board[a] === board[b] && board[a] === board[c]) {

                showPopup(`${board[a]} wins!`);

                winSound.play();

                isGameOver = true;

                return;

            }

        }

        if (!board.includes("")) {

            showPopup("It's a draw!");

            drawSound.play();

            isGameOver = true;

        }

    }

    function showPopup(message) {

        document.getElementById("winnerMessage").textContent = message;

        document.getElementById("popup").classList.remove("hidden");

    }

    window.retry = function() {

        resetGame();

    }

    function resetGame() {

        board = ["", "", "", "", "", "", "", "", ""];

        currentPlayer = "D";

        isGameOver = false;

        document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');

        document.getElementById("popup").classList.add("hidden");

    }

});