const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

require("dotenv").config();
const userName = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "welcome" });
});


const uri = `mongodb+srv://${userName}:${password}@cluster0.or4h7.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

client.connect((err) => {
  const productsCollection = client
    .db("NobabjadaEcommerce")
    .collection("products");

  //   Post - (Create)
  app.post("/addProduct", (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const image = req.body.image;
    console.log(req.body)
    // res.json({data: req.body})
    productsCollection
            .insertOne(req.body)
            .then((result) => {
                res.send(result.insertedCount > 0);
            });
  });

  //   GET - (Read)
  app.get("/vegetables", (req, res) => {
    vegetableCollection.find({}).toArray((err, vegetables) => {
      err && console.log(err);
      res.send(vegetables);
    });
  });

  // GET by ID - (Read)
  app.get("/vegetable/:id", (req, res) => {
    const id = ObjectId(req.params.id);
    vegetableCollection.find({ _id: id }).toArray((err, vegetables) => {
      err && console.log(err);
      res.send(vegetables[0]);
    });
  });

  // UPDATE - (Update)
  app.patch("/update/:id", (req, res) => {
    const id = ObjectId(req.params.id);
    const name = req.body.name;
    const price = req.body.price;
    const quantity = req.body.quantity;

    vegetableCollection
      .updateOne(
        {
          _id: id,
        },
        {
          $set: {
            name,
            price,
            quantity,
          },
        }
      )
      .then((result) => {
        res.send(result.modifiedCount > 0);
      });
  });

  // DELETE - (Delete)
  app.delete("/delete/:id", (req, res) => {
    const id = ObjectId(req.params.id);
    vegetableCollection.deleteOne({ _id: id }).then((result) => {
      res.send(result.deletedCount > 0);
    });
  });

  err ? console.error(err) : console.log("MongoDB Connected!");
});

app.listen(process.env.PORT || port, () => {
  console.log(`Nobabjada Running on port ${port}`);
});
