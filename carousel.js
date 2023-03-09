const leftbtn = document.querySelector('#left-btn');
const rightbtn = document.querySelector('#right-btn');
const wrapper = document.querySelector('.wrapper');
const questionTrack = document.querySelector('#question-track');

// get the 'translateX([xyz]px)' and use regex match() to store the integer value in positionX
let positionX = Number(wrapper.style.transform.match(/-?\d+/));

// check if first answerbox
let isFirst = true;
function checkIsFirst() {
  return positionX === 0 ? true : false;
}
// count: a counter for keeping track of last answerbox
let count = 0;

// check if last answerbox
let isLast = false;

function checkIsLast() {
  return wrapper.children.length - 1 === count;
}

// keep track of question
let currentQuestion = 1;
const totalQuestions = wrapper.children.length;

// initiall provide inner text to questionTrack
questionTrack.innerText = `${currentQuestion}/${totalQuestions}`;

// event listeners
leftbtn.addEventListener('click', function (e) {
  if (!isLast) {
    positionX += 300;
    count += 1;
    currentQuestion++;
    questionTrack.innerText = `${currentQuestion}/${totalQuestions}`;
  }
  // re-evaluate isLast
  isLast = checkIsLast();
  wrapper.style.transform = `translateX(${positionX}px)`;
});

rightbtn.addEventListener('click', function (e) {
  if (!isFirst) {
    positionX -= 300;
    if (count > 0) {
      count -= 1;
    }
    currentQuestion--;
    questionTrack.innerText = `${currentQuestion}/${totalQuestions}`;
  }

  // re-evaluate isFirst
  isFirst = checkIsFirst();
  wrapper.style.transform = `translateX(${positionX}px)`;
});
