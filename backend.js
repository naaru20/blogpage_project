const http = require("http");
var express = require('express');
var app = express();
const path = require("path");
const port = 8000;
const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/contectform");
  console.log("we are connected");
}

const contectschema = new mongoose.Schema({
  name: {
    type: String,
    required : [true, "please Enter ur name"]
  },
  email: {
    type: String,
    required : [true, "please Enter ur name"]
  },
  help: {
    type: String,
    required : [true, "please Enter ur name"]
  }
});

const contect = mongoose.model("contect", contectschema);

app.use('/static', express.static('static'));
app.use(express.urlencoded());

// app.use(express.static(__dirname + '/public'));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/view"));

app.get("/", (req, res) => {
  res.status(200).render("index.pug");
});

app.get("/blogpost", (req, res) => {
  res.status(200).render("blogpost.pug");
});

app.get("/contect", (req, res) => {
  res.status(200).render("contect.pug");
});

app.get("/search", (req, res) => {
  res.status(200).render("search.pug");
});

app.post("/contect", (req, res) => {
  var myform = new contect(req.body);
  myform
    .save()
    .then(() => {
      res.send("your form is submited successfully");
    })
    .catch(() => {
      res.status(400).send("form is not submited");
    });
});

app.listen(port, () => {
  console.log(`hey, I'm ready as ${port}`);
});
