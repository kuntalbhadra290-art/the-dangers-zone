let currentScore = 0;

function showPage(pageId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

function nextPage(pageId) {
    showPage(pageId);
}

function checkIdentity() {
    const name = document.getElementById('agentName').value;
    if (name.trim() !== "") {
        document.getElementById('welcomeMsg').innerText = "Welcome, Detective " + name;
        showPage('page2-5');
    } else {
        alert("Identify yourself!");
    }
}

function checkAnswer(btn, isCorrect, hint) {
    if (isCorrect) {
        currentScore++;
        alert(`Correct! Points: ${currentScore}/5`);
        let currentPage = btn.closest('.screen').id;
        let nextMap = {
            'page3': 'page4',
            'page4': 'page5',
            'page5': 'page6',
            'page6': 'page7'
        };
        showPage(nextMap[currentPage]);
    } else {
        alert("Sherlock Hint: " + hint);
    }
}

function checkFinal() {
    const ans = document.getElementById('finalAnswer').value.toLowerCase();
    if (ans.includes('echo')) {
        startCountdown();
    } else {
        alert("Hint: It repeats what you say.");
    }
}

function startCountdown() {
    showPage('countdownPage');
    let time = 10;
    const timerElement = document.getElementById('timer');
    const texts = ["Analyzing data...", "Decoding memories...", "Preparing surprise...", "Almost there..."];
    
    let interval = setInterval(() => {
        time--;
        timerElement.innerText = time;
        if(time % 2 == 0) {
            document.getElementById('loadingText').innerText = texts[time % 4] || "Loading...";
        }
        
        if (time <= 0) {
            clearInterval(interval);
            showPage('page8');
        }
    }, 1000);
}

function revealSurprise() {
    showPage('page9');
    var end = Date.now() + (2 * 1000);
    var colors = ['#bb0000', '#ffffff', '#d4af37'];

    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

function blowCandle(element) {
    element.classList.add('blown');
    const totalBlown = document.querySelectorAll('.candle-position.blown').length;
    // We have 5 candles now in your HTML
    if (totalBlown === 5) {
        alert("Make a wish, Dibbo! All candles are out. ✨");
    }
}

function saveWish() {
    const wish = document.getElementById('wishBox').value;
    if(wish.trim() !== "") {
        console.log("Dibbo's Wish: " + wish);
        showPage('page10');
    } else {
        alert("Please write a wish for me to fulfill! ✨");
    }
}