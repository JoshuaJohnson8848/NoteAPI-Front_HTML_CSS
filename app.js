const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// axios
//   .get(`http://localhost:7000/api/v1/notes`)
//   .then((res) => {
//     return res.data.notes;
//   })
//   .then((result) => {
//     app.use('', (req, res, next) => {
//       res.render('index', { notes: result });
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

app.use('/index', (req, res, next) => {
  axios
    .get(`http://localhost:7000/api/v1/notes`)
    .then((res) => {
      return res.data.notes;
    })
    .then((result) => {
      res.render('index', { notes: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use('/views', (req, res, next) => {
  const id = req.body.viewId;
  axios
    .get(`http://localhost:7000/api/v1/notes/${id}`)
    .then((res) => {
      return res.data.note;
    })
    .then((result) => {
      res.render('view', {
        note: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use('/delete', (req, res, next) => {
  const id = req.body.deleteId;
  axios
    .delete(`http://localhost:7000/api/v1/notes/${id}`)
    .then((res) => {
      console.log('Note Deleted');
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect('/success');
});

app.use('/add-note', (req, res, next) => {
  res.render('add-note');
});

app.use('/acceptNote', (req, res, next) => {
  const title = req.body.title;
  const body = req.body.body;
  axios
    .post(`http://localhost:7000/api/v1/notes`, {
      title: title,
      body: body,
    })
    .then((res) => {
      // return res.data.note;
      console.log('Note Added');
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect('/success');
});

app.use('/edit', (req, res, next) => {
  const id = req.body.editId;
  axios
    .get(`http://localhost:7000/api/v1/notes/${id}`)
    .then((res) => {
      return res.data.note;
    })
    .then((result) => {
      res.render('edit-note', { note: result });
    })
    .catch((err) => {
      console.log(er);
    });
});

app.use('/NoteUpdateAccept', (req, res, next) => {
  const id = req.body.noteId;
  const title = req.body.title;
  const body = req.body.body;
  axios
    .put(`http://localhost:7000/api/v1/notes/${id}`, {
      title: title,
      body: body,
    })
    .then((res) => {
      // return res.data.note;
      console.log('Note Updated');
    });
  res.redirect('/success');
});

app.use('/success', (req, res, next) => {
  res.render('success');
});

app.listen(5000, (req, res, next) => {
  console.log('Front End Running Successfully');
});
