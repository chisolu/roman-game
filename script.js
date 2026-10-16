function launchFireworks() {
    const colors = ["red", "yellow", "blue", "lime", "orange", "magenta"];

    const container = document.querySelector(".container");
    if (!container) return;

    const rect = container.getBoundingClientRect();

    for (let burst = 0; burst < 3; burst ++) {
        setTimeout(() => {
           const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            for (let i = 0; i < 36; i++) {
                const particle = document.createElement("div");

                particle.className = "firework-particle";

                particle.style.left = centerX + "px";
                particle.style.top = centerY + "px";

                const color = colors[Math.floor(Math.random() * colors.length)];
                particle.style.backgroundColor = color;
                particle.style.color = color;
                const angle = (Math.PI * 2 * i) / 36;
                const distance = 30 + Math.random() * 50;

                particle.style.setProperty(
                    "--x", Math.cos(angle) * distance + "px"
                    );

                particle.style.setProperty(
                    "--y", Math.sin(angle) * distance + "px"
                );
                    document.body.appendChild(particle);
                    setTimeout(() => particle.remove(), 1100);                
            }
        }, burst * 300);
    }
}
// END AMIMATION


let currentNumber;
let score = 0;
let questionCount = 0;
let maxQuestions = 10;
let timeleft = 60;
let timer;
let gameStarted = false;
let currentType;

// NUMBER TO ENGLISH WORD 

    const  igboNumbers = {
        1: "i",
        2: "ii",
        3: "iii",
        4: "iv",
        5: "v",
        6: "vi",
        7: "vii",
        8: "viii",
        9: "ix",
        10: "X",
        11: "xi",
        12: "xii",
        13: "xiii",
        14: "xiv",
        15: "xv",
        16: "xvi",
        17: "xvii",
        18: "xviii",
        19: "xix",
        20: "XX",
        21: "xxi",
        22: "xxii",
        23: "xxiii",
        24: "xxiv",
        25: "xxv",
        26: "xxvi",
        27: "xxvii",
        28: "xxviii",
        29: "xxix",
        30: "XXX",
        31: "xxxi",
        32: "xxxii",
        33: "xxxiii",
        34: "xxxiv",
        35: "xxxv",
        36: "xxxvi",
        37: "xxxvii",
        38: "xxxviii",
        39: "xxxix",
        40: "XL",
        41: "xli",
        42: "xlii",
        43: "xliii",
        44: "xliv",
        45: "xlv",
        46: "xlvi",
        47: "xlvii",
        48: "xlviii",
        49: "xlix",
        50: "L",
        51: "li",
        52: "lii",
        53: "liii",
        54: "liv",
        55: "lv",
        56: "lvi",
        57: "lvii",
        58: "lviii",
        59: "lix",
        60: "lx",
        61: "lxi",
        62: "lxii",
        63: "lxiii",
        64: "lxiv",
        65: "lxv",
        66: "lxvi",
        67: "lxvii",
        68: "lxviii",
        69: "lxix",
        70: "LXX",
        71: "lxxi",
        72: "lxxii",
        73: "lxx111",
        74: "lxxiv",
        75: "lxxv",
        76: "lxxvi",
        77: "lxxvii",
        78: "lxxviii",
        79: "lxxix",
        80: "LXXX",
        81: "lxxxi",
        82: "lxxxii",
        83: "lxxxiii",
        84: "lxxxiv",
        85: "lxxxv",
        86: "lxxxvi",
        87: "lxxxvii",
        88: "lxxxviii",
        89: "lxxxix",
        90: "XC",
        91: "xci",
        92: "xcii",
        93: "xciii",
        94: "xciv",
        95: "xcv",
        96: "xcvi",
        97: "xcvii",
        98: "xcviii",
        99: "xcix",
        100: "C",
    };

    // start game

function startGame () {
    score = 0;
    questionCount = 0;
    timeleft = 60;
    gameStarted  = true;
    clearInterval(timer);

    document.getElementById("score").innerText = score;
    document.getElementById("count").innerText = questionCount;
    document.getElementById("timer").innerText = timeleft;
    document.getElementById("message").innerText = "";
    document.getElementById("answer").value = "";

    // start timer
    timer = setInterval( function () {
        timeleft--;
        document.getElementById("timer").innerText = timeleft;
        if (timeleft <= 0) {
            clearInterval(timer);
            gameStarted =false
            document.getElementById("question").innerText = "Time's up!";

            document.getElementById("message").innerText = 
            "Final Score:" + score + "/" + maxQuestions;
        } 
    }, 1000);
    nextQuestion();
}
// Generate next question
function nextQuestion () {
    if (questionCount >= maxQuestions) {
        clearInterval(timer);
        gameStarted = false;

         document.getElementById("question").innerText = "Game Over!";

         document.getElementById("message").innerText = 
         "Final Score:" + score + "/" + maxQuestions;
         return;
    }

    let level = Number(document.getElementById("level").value);
    // generate random number
    currentNumber = Math.floor(Math.random() * level) + 1;

    // RANDOMLY CHOOSE QUESTION TYPE
    currentType = Math.random() < 0.5
    ? "word"
    : "number";

    if (currentType === "word") {
        // example:
        // deus -> 2
        // cinq -> 5
    document.getElementById("question").innerText =
    igboNumbers[currentNumber];
    document.getElementById("answer").type = "number";
    document.getElementById("answer").placeholder = "enter number";
    }
    else {
         // example:
        // 10 -> dix
        // 7 -> sept
    document.getElementById("question").innerText = currentNumber
    document.getElementById("answer").type = "text";
    document.getElementById("answer").placeholder = "enter igbo number";
    }

    // display english word
    // document.getElementById("question").innerText = numberTowords(currentNumber);
    // clear anser 
    document.getElementById("answer").value = "";
    //  increase question count
    questionCount++;
    document.getElementById("count").innerText = questionCount;
    // focus count
    document.getElementById("answer").focus();
}

// check answer
function checkAnswer () {
    if (!gameStarted) {
        return;
    }

  let answer = document.getElementById("answer")
  .value
  .trim()
  .toLowerCase();

//   dont accept emty answr
if (answer ==="") {
    return;
}
let correct = false;

// word number
if (currentType === "word"){
    if (Number(answer) === currentNumber){
        correct = true;
    }
}

else{
    let correcword = igboNumbers[currentNumber].toLowerCase();
    if (answer === correcword) {
        correct = true;
    }
}

//   correct answer
  if (correct){
    score++;
    document.getElementById("score").innerText = score;
    document.getElementById("message").innerText = "correct! ✔ 👍 🎉";
    message.style.color = "green"
    launchFireworks();
    
  } else{
    document.getElementById("message").innerText = 
    "wrong! ❌ 😜 Correct Answer: " + (currentType === "word" ? currentNumber
    : igboNumbers[currentNumber]);
    message.style.color = "red"
  }
        nextQuestion();

} 
// press enter to submit answer
    document.getElementById("answer").addEventListener(
        "keydown",
        function(event) {
            if (event.key ==="Enter") {
                checkAnswer();
            }
        }
    );


