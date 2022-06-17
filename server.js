const express = require("express");
const cors = require('cors'); 
const mongo = require("mongodb").MongoClient;
const app = express();
const router = express.Router()

module.exports = router;
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
    // client.close();
  }
);


app.use(express.json());
app.use(cors());

app.post("/plant/add", (req, res, next) => {
    const plant = req.body
    plants.insertOne(plant, (err, result) => {
        if (err) {
        console.error(err)
        res.status(500).json({ err: err })
        return
        }
    
        console.log(result)
        res.status(200).json({ ok: true })
    })
});

app.get('/plant/:id',  (req, res) => {
  const id = parseInt(req.params.id);

  console.log("id", id + "  " + typeof id);
  
  var query = { id: id };
  plants.find(query).toArray((err, items) => {
        if (err) {
        console.error(err)
        res.status(500).json({ err: err })
        return
        }
        res.status(200).json(items)
    })
})


app.get('/plants',  (req, res) => {
  plants.find().toArray((err, items) => {
        if (err) {
        console.error(err)
        res.status(500).json({ err: err })
        return
        }
        res.status(200).json(items)
    })
})
