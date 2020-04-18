const startBtn = document.querySelector('.start');
const stopBtn = document.querySelector('.stop');
const resetBtn = document.querySelector('.reset');
const timeEle = document.querySelector('.time');

startBtn.addEventListener('click', startFunc);
stopBtn.addEventListener('click', stopFunc);
resetBtn.addEventListener('click', resetFunc);

stopBtn.disabled = true;
let h = 0, m = 0, s = 0;
let startTime, getID;
let counted = 0, temp = 0, eslaped = 0;

function startFunc() {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    startTime = Date.now();
    getID = setInterval(function () {
        counted = Date.now() - startTime;
        temp = counted;
        h = Math.floor((eslaped + counted) / 1000 / 3600);
        m = Math.floor((eslaped + counted) / 1000 % 3600 / 60);
        s = ((eslaped + counted) / 1000 % 3600 % 60);
        showTime();
    }, 100);
}
function stopFunc() {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    clearInterval(getID);
    eslaped += temp;
}
function resetFunc() {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    clearInterval(getID);
    eslaped = 0;
    temp = 0;
    h = 0;
    m = 0;
    s = 0;
    showTime();
}
function showTime() {
    h = Math.floor(h);
    m = Math.floor(m);
    s = s.toFixed(1);
    if (h < 10) h = '0' + h;
    if (m < 10) m = '0' + m;
    if (s < 10) s = '0' + s;
    timeEle.textContent = `${h}:${m}:${s}`;
}