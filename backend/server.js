import express from "express"
import cors from "cors"
import morgan from "morgan";
import multer from "multer";
import { v2 as cloudinary } from 'cloudinary';
import { Test } from "./models/TestModel.js"
import { Post } from "./models/PostModel.js"
//import { Author } from "./models/AuthorModel.js"
import { Hakunamatata } from "./models/hakunamatataMode.js";
import "./models/index.js"
import CollectionName from "./models/index.js";
import { postSchema } from "./models/PostModel.js";
import mongoose from "mongoose";

          
cloudinary.config({ 
  cloud_name: 'dpdeiwzu8', 
  api_key: '927492337474971', 
  api_secret: 'hrbWuHwrvSGvHMXvWCxuz9yHOgc' 
});

const app = express();
const PORT = 3001;
const upload = multer({ storage: multer.memoryStorage() })

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())



app.get("/777kun", async (req, res) => {
    const data = await Post.find()
    res.json(data)
})


app.get("/categories/:name", async(req,res) => {
    let data = [];//data = await Post.find();
    const Post = mongoose.model(req.params.name, postSchema)
    data = await Post.find();
    res.json(data);
})

app.get("/categories/:name/:id", async (req, res) => {
    const postId = req.params.id;
    console.log(req.params.name);

    try {
        const Post = mongoose.model(req.params.name, postSchema)
        const dbRes = await Post.find({ _id: postId });
        res.json(dbRes);
    } catch (err) {
        console.log(err);
        res.send("there was an error");
    }
});


app.post("/categories/:name", upload.single("image"), async (req, res) => {
    try {
      /*  const author = await Author.findById(req.body.author)
        if (author === null) {
          return res.send("Author is invalid")
        } */
        const Post = mongoose.model(req.params.name, postSchema)
       cloudinary.uploader.upload_stream({ resource_type: "image", folder: "777kun" }, async (err, result) => {
            const response = await Post.create({ ...req.body, image: { url: result.secure_url, imageId: result.public_id } })
            res.json(response)
        }).end(req.file.buffer)
    } catch (err) {
        console.log(err)
        res.status(500).send("there was an error")
    }
})

/*
app.post("/777kun", upload.single("image"), async (req, res) => {
    try {
        const author = await Author.findById(req.body.author)
        if (author === null) {
            return res.send("Author is invalid")
        }
       cloudinary.uploader.upload_stream({ resource_type: "image", folder: "777kun" }, async (err, result) => {
            const response = await Post.create({ ...req.body, image: { url: result.secure_url, imageId: result.public_id } })
            res.json(response)
        }).end(req.file.buffer)
    } catch (err) {
        console.log(err)
        res.status(500).send("there was an error")
    }
}) */



/*
app.put("/categorie/:name/:id", async (req, res) => {
    const postId = req.params.id;
    try {
        const Post = mongoose.model(req.params.name, postSchema)
        const dbRes = await Post.find({ id: postId });
        res.json(dbRes);
    } catch (err) {
        console.log(err);
        res.send("there was an error");
    }
}); */
/*
app.delete("/posts/:id", async (req, res) => {
    const postId = req.params.id;
    try {
        const dbRes = await Post.findByIdAndDelete(postId);
        cloudinary.uploader.destroy(dbRes.image?.imageId, (err) => console.log(err))
        res.send("post has been deleted");
    } catch (err) {
        console.log(err);
        res.send("there was an error");
    }
}); */
/*
app.post("/author", async (req, res) => {
    try {
        const newAuthor = await Author.create(req.body);
        res.json(newAuthor);
    } catch (err) {
        console.log(err);
        res.send("there was an error");
    }
});


app.get("/author/:authorId", async (req, res) => {
    try {
        const authorId = req.params.authorId;
        const posts = await Post.find({ author: authorId });
        res.json(posts);
    } catch (err) {
        console.log(err);
        res.send("there was an error");
    }
}); */

app.get('/collectionNames', async (req, res) => {
    try {

      const collections = await CollectionName
      res.json(collections);

    } catch (error) {
      console.error('Error fetching collection names:', error);
      res.status(500).json({ error: 'Failed to fetch collection names' });
    }
  });

app.listen(PORT, () => console.log("Der Server läuft", PORT))