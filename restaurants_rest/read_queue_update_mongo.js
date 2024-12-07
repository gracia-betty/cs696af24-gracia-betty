import { MongoClient } from 'mongodb';
import Queue from 'bull';
import {} from 'dotenv/config';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function run() {
    const messageQueue = new Queue('messageQueue');

    messageQueue.process(async (job) => {
        console.log('Processing: ' + job.id);
        const database = client.db('sample_restaurants');
        const restaurants = database.collection('restaurants');
    
        const query = { restaurant_id: job.data.restaurant_id };
    
        if (job.data.updates === "delete") {
            // Delete the document
            await restaurants.deleteOne(query);
            console.log(`Deleted document with restaurant_id: ${job.data.restaurant_id}`);
        } else {
            // Update or insert the document
            await restaurants.updateOne(
                query,
                { $set: JSON.parse(job.data.updates) },
                { upsert: true }
            );
            console.log('Processed: ' + JSON.stringify(job.data));
        }
    });
    
}

run().catch(console.dir);
