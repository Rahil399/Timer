let timers = [];
const audio = new Audio('33728__jobro__1-alarm-short-a.wav');

document.getElementById('set-btn').addEventListener('click', () => {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;

    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;

    if (totalSeconds > 0) {
        addTimer(totalSeconds, hours, minutes, seconds);
        resetInputFields();
    } else {
        alert("Please enter a valid time.");
    }
});

function addTimer(duration, hours, minutes, seconds) {
    const timerId = timers.length;
    const timerDiv = document.createElement('div');
    timerDiv.classList.add('timer-item');
    timerDiv.setAttribute('data-id', timerId);

    const setTimeSpan = document.createElement('span');
    setTimeSpan.textContent = `Set Time: ${formatTime((hours * 3600) + (minutes * 60) + seconds)}`;

    const timeLeftSpan = document.createElement('span');
    timeLeftSpan.textContent = `Time Left: ${formatTime(duration)}`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    
    const stopButton = document.createElement('button');
    stopButton.textContent = 'Stop';
    stopButton.style.display = 'none';

    deleteButton.addEventListener('click', () => {
        clearInterval(timers[timerId].interval);
        document.getElementById('timers-list').removeChild(timerDiv);
        timers = timers.filter(t => t.id !== timerId);
    });

    stopButton.addEventListener('click', () => {
        audio.pause();
        stopButton.style.display = 'none';
    });

    timerDiv.appendChild(setTimeSpan);
    timerDiv.appendChild(timeLeftSpan);
    timerDiv.appendChild(deleteButton);
    timerDiv.appendChild(stopButton);

    document.getElementById('timers-list').appendChild(timerDiv);

    let remainingTime = duration;
    const interval = setInterval(() => {
        if (remainingTime > 0) {
            remainingTime--;
            timeLeftSpan.textContent = `Time Left: ${formatTime(remainingTime)}`;
        } else {
            clearInterval(interval);
            audio.play();
            deleteButton.style.display = 'none';
            stopButton.style.display = 'block';
        }
    }, 1000);

    timers.push({
        id: timerId,
        duration,
        interval
    });
}

function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function resetInputFields() {
    document.getElementById('hours').value = '';
    document.getElementById('minutes').value = '';
    document.getElementById('seconds').value = '';
}
