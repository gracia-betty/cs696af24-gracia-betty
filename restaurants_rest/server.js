import express from "express";
import cors from "cors";
import db from "./db/connection.js";

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/restaurants', async (req, res) => {
    const { borough, cuisine } = req.query;

    // Validate that both parameters are provided
    if (!borough || !cuisine) {
        return res.status(400).send({ error: "Both borough and cuisine parameters are required" });
    }

    try {
        // Use aggregation to perform a case-insensitive match
        const restaurants = await db.collection("restaurants").aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            { $eq: [{ $toLower: "$borough" }, borough.toLowerCase()] },
                            { $eq: [{ $toLower: "$cuisine" }, cuisine.toLowerCase()] }
                        ]
                    }
                }
            }
        ]).toArray();

        if (restaurants.length > 0) {
            res.send(restaurants);
        } else {
            res.status(404).send({ error: "No restaurants found for the given borough and cuisine" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

app.get('/restaurants/:id', async (req, res) => {
    const restaurant_id = req.params["id"];
    try {
        const restaurant = await db.collection("restaurants").findOne({ restaurant_id });
        if (restaurant) {
            res.send(restaurant);
        } else {
            res.status(404).send({ error: "Restaurant not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.post('/restaurants', async (req, res) => {
    const { restaurant_id, name, borough, cuisine } = req.body;
    try {
        const result = await db.collection("restaurants").insertOne({
            restaurant_id, name, borough, cuisine
        });
        if (result.acknowledged) {
            res.send({ restaurant_id, name, borough, cuisine });
        } else {
            res.status(500).send("Failed to add restaurant");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to add restaurant");
    }
});

app.delete('/restaurants/:id', async (req, res) => {
    const restaurant_id = req.params["id"];
    try {
        const result = await db.collection("restaurants").deleteOne({ restaurant_id });
        if (result.acknowledged && result.deletedCount > 0) {
            res.send("Success");
        } else {
            res.status(404).send("Restaurant not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to delete restaurant");
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
