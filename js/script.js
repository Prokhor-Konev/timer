const timeText = document.getElementById("timeText");
const pauseIconElement = document.getElementById("pauseIcon");

let endingTime = new Date(Date.now());
let startTime = new Date(Date.now());
let pauseTime = 0;
const resetTime = () => {
    endingTime = new Date(new Date(Date.now()) - pauseTime);
    endingTime = timeFunc.addHours(endingTime, initialHours);
    endingTime = timeFunc.addMinutes(endingTime, initialMinutes);
    endingTime = timeFunc.addSeconds(endingTime, initialSeconds);
}

resetTime();

if (isGreenBackground) {
    document.body.style.backgroundColor = '#00ff00';
}

let countdownEnded = false;
let users = [];
let time;

let isPause = true;

let prevPauseDate = new Date(Date.now());

const getNextTime = () => {
    const now = new Date(Date.now());
    if (isPause && prevPauseDate) {
        const cur = now;
        pauseTime += now - prevPauseDate;
        prevPauseDate = cur;
    }

    let currentTime = now - pauseTime;
    let differenceTime = endingTime - currentTime;

    time = `${timeFunc.getHours(differenceTime)}:${timeFunc.getMinutes(differenceTime)}:${timeFunc.getSeconds(differenceTime)}`;
    if (differenceTime <= 0) {
        if (canIncreaseTimeAfterStop) {
            endingTime = new Date(currentTime);
        } else {
            clearInterval(countdownUpdater);
            countdownEnded = true;
        }
        time = "00:00:00";
    }
    timeText.innerText = time;

    requestAnimationFrame(getNextTime);
};

requestAnimationFrame(getNextTime);

const addTime = async (time, s) => {
    endingTime = timeFunc.addSeconds(time, s);
    let addedTime = document.createElement("p");
    addedTime.classList = "addedTime";
    addedTime.innerText = `${s > 0 ? '+' : ''}${s}s`;
    document.body.appendChild(addedTime);
    addedTime.style.display = "block";
    await sleep(50);
    addedTime.style.left = `${randomInRange(35, 65)}%`;
    addedTime.style.top = `${randomInRange(15, 40)}%`;
    addedTime.style.opacity = "1";
    await sleep(2500);
    addedTime.style.opacity = "0";
    await sleep(500);
    addedTime.remove();
};



const testAddTime = (times, delay) => {
    let addTimeInterval = setInterval(async () => {
        if (times > 0) {
            await sleep(randomInRange(50, delay-50));
            addTime(endingTime, 30);
            --times;
        }
        else {
            clearInterval(addTimeInterval);
        }
    }, delay);
};

console.log('log');

document.addEventListener("keydown", (e) => {
    // console.log(e);
    switch (e.code) {
        case "ArrowUp":
            addTime(endingTime, timeIncrease);
            console.log('key up');
            return;
        case "ArrowDown":
            addTime(endingTime, -timeDecrease);
            return;
        case "KeyR":
            resetTime();
            return;
        case "Space":
            prevPauseDate = isPause ? null : new Date(Date.now());
            pauseIconElement.style.display = isPause ? "none" : "block";
            isPause = !isPause;

            return;
    }
})