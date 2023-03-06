const wrapper = document.querySelector('.wrapper');
const answerbox = document.querySelector('.answerbox');
const one = document.querySelector('.one');
const two = document.querySelector('.two');
const three = document.querySelector('.three');

dragula([
  document.querySelector('.answerbox'),
  document.querySelector('#wordsbox'),
]).on('dragend', function (e) {
  checkResult();
});

function checkResult() {
  const results = [
    [1, 2, 3],
    [1, 3, 2],
  ];
  let out = false;

  let childrens = Array.from(answerbox.children);

  try {
    for (let possible of results) {
      // check if answerbox has all children in one of possible arrangements (as described by the `results`)
      out = possible.every(
        (result, index) => result === Number(childrens[index].dataset.key),
      );
      // if out becomes true then break out of this loop
      if (out) break;
    }
  } catch (error) {}

  // assign classes based on state of out

  if (out) {
    answerbox.classList.remove('unsolved');
    answerbox.classList.add('correct');
  } else {
    answerbox.classList.remove('correct');
    answerbox.classList.add('unsolved');
  }
}
