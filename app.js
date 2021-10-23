//diplaying current time
const currentTime = document.querySelector(".current-time");
const currentTimeEachSecond = setInterval(() => {
  var today = new Date();
  const hour = formatTime(today.getHours());
  const minutes = formatTime(today.getMinutes());
  const seconds = formatTime(today.getSeconds());
  const now = `${hour}:${minutes}:${seconds}`;

  currentTime.innerText = `${hour}:${minutes}:${seconds}`;

  if (alarmList.includes(now)) {
    ringing(now);
  }
}, 1000);
//Taking user input
let alarmList = [];
const userInput = document.querySelector(".user-input");
userInput.addEventListener("submit", (e) => {
  e.preventDefault();
  const hour = userInput.hour.value;
  const min = userInput.min.value;
  const sec = userInput.sec.value;
  let new_h = formatTime(hour);
  if (new_h === "0") {
    new_h = "00";
  }
  let new_m = formatTime(min);
  if (new_m === "0") {
    new_m = "00";
  }
  let new_s = formatTime(sec);
  if (new_s === "0") {
    new_s = "00";
  }

  const newAlarm = `${new_h}:${new_m}:${new_s}`;
  if (isNaN(newAlarm)) {
    if (!alarmList.includes(newAlarm)) {
      alarmList.push(newAlarm);
      showNewAlarm(newAlarm);
      addAlarm.reset();
    } else {
      alert(`Alarm for ${newAlarm} already set.`);
    }
  } else {
    alert("Invalid Time Entered");
  }
});

function formatTime(time) {
  if (time < 10 && time.length != 2) {
    return "0" + time;
  }
  return time;
}
const myList = document.querySelector(".set-alarms-list");

function showNewAlarm(newAlarm) {
  const html = `
    <li class = "time-list">        
        <span class="time">${newAlarm}</span>
        <button class="deleteAlarm time-control" id="delete-button" onclick = "remove(this.value)" value=${newAlarm}>Delete Alarm</button>       
    </li>`;
  myList.innerHTML += html;
}

//handling audio
const audio = new Audio(
  "https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3"
);
audio.loop = true;

// Plays the alarm audio at correct time
function ringing(now) {
  audio.play();
  alert(`Hey! it is ${now}`);
}

//handle stop alarm
const clearAlarm = () => {
  audio.pause();
  clearTimeout(alarmTimeout);
  alert("Alarm cleared");
};

//deleting alarms
const mylist = document.querySelector(".set-alarms-list");
myList.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteAlarm")) {
    e.target.parentElement.remove();
  }
});

// removes an alarm from the array when "Delete Alarm" is clicked
const remove = (value) => {
  let newList = alarmList.filter((time) => time != value);
  alarmList.length = 0; // Clear contents
  alarmList.push.apply(alarmList, newList);
};
