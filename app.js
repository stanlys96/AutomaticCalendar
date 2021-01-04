const day = document.querySelectorAll('.day');
const dayBlock = document.querySelectorAll('.day-block');
const dayLeft = document.querySelectorAll('.day-left');
const dayNum = document.querySelectorAll('.day-num');
const dayYear = document.querySelector('.day-year');
const content = document.querySelector('.content');
const hourSelector = document.querySelector('.hour');
const minuteSelector = document.querySelector('.minute');
const secondSelector = document.querySelector('.second');
const indicatorSelector = document.querySelector('.indicator');

const d = new Date();

const month = d.getMonth();
const date = d.getDate();
let hour = d.getHours();
const hour2 = d.getHours();
const minute = d.getMinutes();
const seconds = d.getSeconds();

function getTime() {

  if (hour >= 12) {
    hour -= 12;
  }

  if (hour < 10) {
    hourSelector.innerHTML = `0${hour}`;
  } else {
    hourSelector.innerHTML = hour;
  }

  if (hour2 < 12) {
    indicatorSelector.innerHTML = ' AM';
  } else {
    indicatorSelector.innerHTML = ' PM';
  }

  if (minute < 10) {
    minuteSelector.innerHTML = `0${minute}`;
  } else {
    minuteSelector.innerHTML = minute;
  }

  if (seconds < 10) {
    secondSelector.innerHTML = `0${seconds}`;
  } else {
    secondSelector.innerHTML = seconds;
  }

  setTimeout(getTime, 1000);

}

getTime();

function applyDayYear() {
  let count = 0;
  for (let i = 0; dayBlock.length; i++) {
    if (dayBlock[i] === undefined) {
      break;
    }
    let theChildren = dayBlock[i].children;
    let sum = dayBlock[i].childElementCount;
    for (let j = 0; j < theChildren.length; j++) {
      if (theChildren[j].classList.contains('crossed')) {
        sum--;
      }
    }
    count += sum;
  }
  dayYear.textContent = count;
}

function applyDayNum() {
  for (let i = 0; dayBlock.length; i++) {
    if (dayBlock[i] === undefined) {
      break;
    }
    let theChildren = dayBlock[i].children;
    let count = dayBlock[i].childElementCount;
    for (let j = 0; j < theChildren.length; j++) {
      if (theChildren[j].classList.contains('crossed')) {
        count--;
      }
    }

    if (count === 1) {
      dayNum[i].textContent = `${count} Day Left`;
    } else if (count === 0) {
      dayNum[i].textContent = 'Move on!';
    } else {
      dayNum[i].textContent = `${count} Days Left`;
    }

  }
}

for (let i = 0; i < content.children.length; i++) {
  for (let k = 0; k <= month; k++) {

    if ('month-' + k !== content.children[i].id) {

      if (content.children[k - 1] === undefined) {
        continue;
      }

      let count = content.children[k - 1].children[1].childElementCount;
      for (let w = 0; w < count; w++) {
        content.children[k - 1].children[1].children[w].classList.add('crossed');
        applyDayNum();
        applyDayYear();
      }
    }

    if ('month-' + k === content.children[i].id) {
      let contentChildren = content.children[i].children;
      for (let z = 0; z < contentChildren.length; z++) {
        if (contentChildren[z].classList.contains('day-block')) {
          let contentDays = contentChildren[z].children;
          for (let p = 0; p < contentDays.length; p++) {
            for (let m = 1; m <= date; m++) {
              if (contentDays[p].textContent === (m - 1).toString()) {
                contentDays[p].classList.add('crossed');
                applyDayNum();
                applyDayYear();
              }
            }
          }
        }
      }
    }

  }
}