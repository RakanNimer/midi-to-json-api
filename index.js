"use strict";
const exec = require('child_process').exec
var express = require('express');
var app = express();
var fileUpload = require('express-fileupload');

app.use(fileUpload());


app.post('/upload', function(req, res) {
    var sampleFile;

    if (!req.files) {
        res.send('No files were uploaded.');
        return;
    }

    sampleFile = req.files.sampleFile;
    var midifile = './uploads/filename.midi';
    sampleFile.mv(midifile, function(err) {
        if (err) {
            res.status(500).send(err);
        }
        else {
          let child = exec('./midifile/bin/midi2text '+midifile, (err, stdout, stderr) => {
            let notes = stdout.split('\n').map((note) => note.split('\t')).map(noteArray=>(
              {
                type: noteArray[0],
                startTime: noteArray[1],
                duration: noteArray[2],
                noteNumber: noteArray[3],
                velocity: noteArray[4],
              }
            ))
            res.json({status: 'OK', data: {notes}});
          })

        }
    });
});

app.get('/upload', function(req, res) {
  var html = `
  <html>
      <body>
          <form ref='uploadForm'
              id='uploadForm'
              action='/upload'
              method='post'
              encType="multipart/form-data">
                  <input type="file" name="sampleFile" />
                  <input type='submit' value='Upload!' />
          </form>
      </body>
  </html>
  `;
  res.send(html);
})


app.get('/', function (req, res) {
  console.log("asd");
  var midiFile = './uploads/beet1track-medium-fast.mid';
  console.log(midiFile);
  let child = exec('./midifile/bin/midi2text '+midiFile, (err, stdout, stderr) =>     {
    // console.log('this is with bash',stdout, stderr)
    let notes = stdout.split('\n').map((note) => note.split('\t'))
    res.send(JSON.stringify(notes)+" "+JSON.stringify(err)+JSON.stringify(stderr));
  })

});

app.listen(3000, function () {

  console.log('Example app listening on port 3000!');
});
