// all answerboxes
const answerboxes = document.querySelectorAll('div[id^=ab]');
// all wordboxes
const wordboxes = document.querySelectorAll('div[id^=wb]');

// allResults is a dict containing all possible correct results for individual answerboxes.
// In allResults, the keys correspond to each answerbox's index in answerboxes
// and the values correspond to all possible correct result for that particular answerbox
const allResults = { 0: [[4, 3, 5]], 1: [[1, 3, 2]], 2: [[2, 3, 6]] };

// use answerboxes and wordboxes and add dragula to each pair
answerboxes.forEach((answerbox, index) => {
  dragula([answerbox, wordboxes[index]]).on('dragend', function (e) {
    const singleResult = allResults[index];
    checkResult(singleResult, answerbox);
  });
});

function checkResult(results, answerbox) {
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

    if (childrens.length === results[0].length) {
      answerbox.classList.remove('unsolved');
      answerbox.classList.add('correct');
    } else if (childrens.length !== results[0].length) {
      answerbox.classList.remove('correct');
      answerbox.classList.add('unsolved');
    }
  } else {
    answerbox.classList.remove('correct');
    answerbox.classList.add('unsolved');
  }
}
