// to call apis from the backend and do CRUD operations
const router = require("express").Router();
var fs = require("fs"),
  parseString = require("xml2js").parseString,
  xml2js = require("xml2js");

let Book = require("../models/book.model");

//Get books method
router.get("/", (req, res) => {
  Book.find()
    .then((books) => {
      //code for extract xml doc data
      fs.readFile("book.xml", "utf-8", function (err, data) {
        if (err) {
          console.log(err);
          res.json({ dataFromDB: books, xmlData: null });
        }
        if (data) {
          res.json({ dataFromDB: books, xmlData: data });
        }
      });
    })
    .catch((err) => res.status(400).json("error" + err));
});

//Add books method
router.post("/add", (req, res) => {
  //mapping data from request xml data
  const newBook = new Book({
    author: req.body.book.author,
    title: req.body.book.title,
    genre: req.body.book.genre,
    price: req.body.book.price,
    description: req.body.book.description,
  });

  //saving book data in mongoDB
  newBook
    .save()
    .then((addedBook) => {
      //code for adding xml element into xml doc
      fs.readFile("book.xml", "utf-8", function (err, data) {
        if (err) console.log(err);
        if (data) {
          // we then pass the data to our method here
          parseString(data, function (err, result) {
            if (err) console.log(err);
            if (result) {
              const xmlDoc = result;

              //creating new book element
              xmlBookEl = {
                $: { id: addedBook._id },
                ...req.body.book,
              };

              //adding the new book element to xml
              xmlDoc.catalog.book.push(xmlBookEl);

              // create a new builder object and then convert
              // our json back to xml.
              const builder = new xml2js.Builder();
              const xml = builder.buildObject(xmlDoc);

              fs.writeFile("book.xml", xml, function (err, data) {
                if (err) console.log(err);
              });
            }
          });
        }
      });

      //response after sucessfull
      res.json({ addedBook, msg: "Book added" });
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
