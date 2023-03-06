const wrapper = document.querySelector('.wrapper');
const parent = document.querySelector('.parent');
const one = document.querySelector('.one');
const two = document.querySelector('.two');
const three = document.querySelector('.three');

let dragged;

const children = [one, two, three];

children.forEach((child) => {
  child.draggable = true;
  child.addEventListener('dragstart', function (e) {
    // store a reference on the dragged element
    dragged = e.target;
    console.log(`dragging...${e.target.textContent}`);
  });
});

parent.addEventListener(
  'dragover',
  function (e) {
    // prevent default to allow drop event
    e.preventDefault();
  },
  false,
);
parent.addEventListener('dragenter', function (e) {
  console.log('some child is getting in...');
});

parent.addEventListener('dragleave', function (e) {
  for (let child of parent.children) {
    if (child === e.target) {
      parent.removeChild(dragged);
      wrapper.appendChild(dragged);
    }
  }
  console.log(`removed ${e.target.textContent}`);
});

//console.log(three.getBoundingClientRect());

parent.addEventListener('drop', function (e) {
  e.preventDefault();
  parent.appendChild(dragged);
  console.log('dropped...');
  checkResult();
});

function checkResult() {
  const results = [1, 2, 3];
  let out = false;
  for (let i = 0; i < results.length; i++) {
    if (results[i] == parent.children[i].dataset.key) {
      out = true;
    } else {
      out = false;
    }
  }
  if (out) {
    parent.style.border = '2px solid green';
  } else {
    parent.style.border = '2px solid red';
  }
  //parent.
}
