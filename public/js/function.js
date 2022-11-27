// const express = require('express');
// const app = express();

// document
//   .querySelector('.button1')
//   .addEventListener('click', async function () {
//     const viewId = document.querySelector('.viewId').value;
//     console.log(editId);
//     axios
//       .get(`http://localhost:7000/api/v1/notes/${viewId}`)
//       .then(function (res) {
//         console.log(res);
//       })
//       .catch(function (err) {
//         console.log(err);
//       });
//   });

const btnValue = document.querySelectorAll('.button1').value;
console.log(btnValue);

btnValue.forEach((btn) => {
  btn.addEventListener('click', async function () {
    const viewId = document.querySelector('.viewId').value;
    console.log(viewId);
    axios
      .get(`http://localhost:7000/api/v1/notes/${viewId}`)
      .then(function (res) {
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });
  });
});
