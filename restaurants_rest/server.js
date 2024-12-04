import express from "express";
import cors from "cors";
import db from "./db/connection.js";

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json());

// Get restaurant by ID
app.get("/restaurants/:id", function (req, res) {
  const restaurant_id = req.params["id"];
  db.collection("restaurants")
    .findOne({ restaurant_id: restaurant_id })
    .then((value) => res.send(value))
    .catch(() => res.status(500).send("Not Found"));
});

// Create a new restaurant
app.post("/restaurants", function (req, res) {
  const { restaurant_id, name, borough, cuisine } = req.body;
  db.collection("restaurants")
    .insertOne({ restaurant_id, name, borough, cuisine })
    .then((result) =>
      result.acknowledged
        ? res.send({ restaurant_id, name, borough, cuisine })
        : res.status(500).send("Failed")
    )
    .catch(() => res.status(500).send("Failed"));
});

// Delete a restaurant
app.delete("/restaurants/:id", function (req, res) {
  const restaurant_id = req.params["id"];
  db.collection("restaurants")
    .deleteOne({ restaurant_id: restaurant_id })
    .then((result) =>
      result.acknowledged && result.deletedCount >= 1
        ? res.send("Success")
        : res.status(500).send("Failed")
    )
    .catch(() => res.status(500).send("Not Found"));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
