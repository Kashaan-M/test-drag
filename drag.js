const ab1 = document.querySelector('#ab1');
const wb1 = document.querySelector('#wb1');
const ab2 = document.querySelector('#ab2');
const wb2 = document.querySelector('#wb2');
const ab3 = document.querySelector('#ab3');
const wb3 = document.querySelector('#wb3');

// first question
dragula([
  ab1,
  wb1
]).on('dragend', function (e) {
  const results = [[4,3,5]];
  checkResult(results,ab1);
});
// second question
dragula([
  ab2,
  wb2
]).on('dragend', function (e) {
  const results = [[1,3,2]];
  checkResult(results,ab2);
});
// third question
dragula([
  ab3,
  wb3
]).on('dragend', function (e) {
  const results = [[2,3,6]];
  checkResult(results,ab3);
});



function checkResult(results,answerbox) {
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
    // check if the answerbox contains correct number of words i.e. no extra words
    // we do this by taking the first result from results assuming that ...
    // ... length of all items within results will be identical to each other

    if(childrens.length === results[0].length) {
      answerbox.classList.remove('unsolved');
      answerbox.classList.add('correct');
    }
    else if (childrens.length !== results[0].length) {
      answerbox.classList.remove('correct');
      answerbox.classList.add('unsolved');
    }
  } else {
    answerbox.classList.remove('correct');
    answerbox.classList.add('unsolved');
  }
}
