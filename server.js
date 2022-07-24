const express = require("express");
const cors = require('cors'); 
const mongo = require("mongodb").MongoClient;
const app = express();
const router = express.Router()
var ObjectId = require('mongodb').ObjectID;
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
  let id = req.params.id;
  var query = {"_id": ObjectId(id) };
  plants.find(query).toArray((err, items) => {
        if (err) {
        console.error(err)
        res.status(500).json({ err: err })
        return
        }
        res.status(200).json(items)
    })
})

app.delete('/plant/:id',  (req, res) => {
  console.log("del " + req.params);
  let id = req.params.id;
  console.log("id AAAAAAAAA " + id +"AAAAAAA");
  var query = {"_id": ObjectId(id.toString()) };
  // plants.deleteOne(query)
  console.log("query " + query);
  plants.findOneAndDelete(query, (err, deletedObj) => {
    if (err) {
        res.status(404).json({status: false, error: "Item not found"});
    }
    else {
        res.status(200).json({status: true, message: "Item successfully deleted"}); 
    }
})
});
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
