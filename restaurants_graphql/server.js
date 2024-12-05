import express from "express";
import cors from "cors";
import gql from "graphql-tag";
import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { expressMiddleware } from '@apollo/server/express4';
import resolvers from "./resolvers.js";
import { readFileSync } from "fs";
import db from "./db/connection.js";
import redisClient from "./db/redis.js";

const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());
app.use(express.json());

const typeDefs = gql(
    readFileSync("schema.graphql", {
        encoding: "utf-8",
    })
);

const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
});
await server.start();

app.use(
    '/graphql',
    cors(),
    express.json(),
    expressMiddleware(server),
);

// Modify the HTTP GET request for caching logic
app.get('/restaurants/:id', async function(req, res) {
    const restaurant_id = req.params["id"];
    const value = await redisClient.get(restaurant_id);
    if (value) {
        res.send({"cached": true, "value": JSON.parse(value)});
    } else {
        const dbValue = await db.collection("restaurants").findOne({
            restaurant_id: restaurant_id,
        });
        if (dbValue) {
            await redisClient.set(restaurant_id, JSON.stringify(dbValue));
            res.send({"cached": false, "value": dbValue});
        } else {
            res.status(500).send("Not Found");
        }
    }
});

app.post('/restaurants', async (req, res) => {
    const { restaurant_id, name, borough, cuisine } = req.body;
  
    // Basic validation to check if all fields are present
    if (!restaurant_id || !name || !borough || !cuisine) {
      return res.status(400).send("Missing required fields");
    }
  
    try {
      // Save the restaurant to your database (e.g., MongoDB)
      const newRestaurant = { restaurant_id, name, borough, cuisine };
      await db.collection("restaurants").insertOne(newRestaurant);
  
      // Optionally, add the restaurant to Redis cache
      await redisClient.set(restaurant_id, JSON.stringify(newRestaurant));
  
      // Respond with the created restaurant data
      res.status(201).send(newRestaurant);
    } catch (error) {
      res.status(500).send("Error adding restaurant: " + error.message);
    }
});

app.delete('/restaurants/:id', async (req, res) => {
    const restaurant_id = req.params.id;
  
    try {
      // Check and delete the restaurant from Redis cache
      const cachedValue = await redisClient.get(restaurant_id);
      if (cachedValue) {
        await redisClient.del(restaurant_id);
        console.log(`Deleted restaurant ${restaurant_id} from Redis cache.`);
      }
  
      // Delete the restaurant from the database
      const result = await db.collection("restaurants").deleteOne({ restaurant_id: restaurant_id });
  
      if (result.deletedCount === 1) {
        res.status(200).send(`Successfully deleted restaurant with ID ${restaurant_id}.`);
      } else {
        res.status(404).send(`Restaurant with ID ${restaurant_id} not found.`);
      }
    } catch (error) {
      res.status(500).send("Error deleting restaurant: " + error.message);
    }
  });
  



app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
