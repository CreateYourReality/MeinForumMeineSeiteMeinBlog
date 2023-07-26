import mongoose from "mongoose";

const mongoURL = 'mongodb://localhost:27017/777kun';

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => console.error('MongoDB connection error:', error));
db.once('open', () => console.log('Connected to MongoDB'));

let collections = [];

const refreshCollections = () => {
    let names = [];
    collections = mongoose.connections[0].collections;
    console.log(mongoose.connections[0]);
    Object.keys(collections).forEach(k =>  {
        names.push(k);
    });
    return names; 
}


let CollectionNames = refreshCollections() //= mongoose.model('CollectionName', collectionNameSchema);

export default CollectionNames;


// verbindung mit der Datenbank aufbauen (hinter den port kommt der Name der Datenbank)
// mongoose.connect("mongodb://localhost:27017/777kun")
