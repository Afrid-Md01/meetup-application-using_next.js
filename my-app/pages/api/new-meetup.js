import { MongoClient } from "mongodb";
// route will be /api/new-meetup

async function Handler(req, res) {

  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://afridmd001:mongodbUser2000@cluster0.rjwist1.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    const dataBase = client.db();

    const meetupsCollections = dataBase.collection('meetups');

    const result = await meetupsCollections.insertOne(data);
    console.log  (result);

    client.close();

    res.status(201).json({message : 'New meetup inserted!'})

  }

  if (req.method === "GET") {

    const client = await MongoClient.connect(
      "mongodb+srv://afridmd001:mongodbUser2000@cluster0.rjwist1.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    const dataBase = client.db();

    const meetupsCollections = dataBase.collection('meetups');

    const result = await meetupsCollections.insertOne(data);
    console.log  (result);

    client.close();

    res.status(201).json({message : 'New meetup inserted!'})

  }
}
export default Handler;
