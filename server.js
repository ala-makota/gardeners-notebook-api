const express = require("express");
const cors = require('cors'); 
const mongo = require("mongodb").MongoClient;
const app = express();


app.listen(3000, () => console.log("Server ready"));

const url = "mongodb://localhost:27017";

let db

mongo.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) {
      console.error(err)
      return
    }
    else {
        console.log("connected");
    }
    db = client.db("Gardener-Notebook");
    plants = db.collection("plants");
  }
);


app.use(express.json());
app.use(cors());

// app.post("/plant", (req, res) => {
//     const name = req.body.name
//     plants.insertOne({ name: name }, (err, result) => {
//         if (err) {
//         console.error(err)
//         res.status(500).json({ err: err })
//         return
//         }
//         console.log(result)
//         res.status(200).json({ ok: true })
//     })
// });

app.get("/plants", (req, res) => {
    plants.find().toArray((err, items) => {
        if (err) {
        console.error(err)
        res.status(500).json({ err: err })
        return
        }
        res.status(200).json(items)
    })
});

