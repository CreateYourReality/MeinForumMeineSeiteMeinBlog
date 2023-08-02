import express from "express"
import cors from "cors"
import morgan from "morgan";
import multer from "multer";
import mongoose from "mongoose";
import { v2 as cloudinary } from 'cloudinary';
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";

import { Post } from "./models/PostModel.js"

import CollectionName from "./models/index.js";
import { postSchema } from "./models/PostModel.js";
import { commentSchema } from "./models/CommentModel.js"

import { userRouter } from "./user/routes.js";

//import { Author } from "./models/AuthorModel.js"
//import "./models/index.js"
 
cloudinary.config({ 
  cloud_name: 'dpdeiwzu8', 
  api_key: '927492337474971', 
  api_secret: 'hrbWuHwrvSGvHMXvWCxuz9yHOgc' 
});

dotenv.config({
    path: path.join(path.resolve(), "..", ".env"),
  });
/*  
  await mongoose.connect(process.env.DB); */

const app = express();
const PORT = process.env.PORT //|| 3001;
const upload = multer({ storage: multer.memoryStorage() })

//const ReactAppDistPath = new URL("../frontend/dist/", import.meta.url);
//const ReactAppIndex = new URL("../frontend/dist/index.html", import.meta.url);

app.use(cors()) // SOLLTE EIGENTLICH WEG ?!?!?!?!
//app.use(morgan("dev"))
app.use(express.json());
app.use(cookieParser());
//app.use(express.static(ReactAppDistPath.pathname));





// ###### ROUTEN ######
app.use("/api/user", userRouter);

app.get("/777kun", async (req, res) => {
    const data = await Post.find()
    res.json(data)
})

/*app.get("/*", (req, res) => {
    res.sendFile(ReactAppIndex.pathname);
  });*/

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

app.delete("/categories/:name/:id", async (req, res) => {
    const postId = req.params.id;
    const categorieName = req.params.name
    try {
        const Post = mongoose.model(categorieName, postSchema)
        const dbRes = await Post.findByIdAndDelete(postId);
        cloudinary.uploader.destroy(dbRes.image?.imageId, (err) => console.log(err))
        res.send("post has been deleted");
    } catch (err) {
        console.log(err);
        res.send("there was an error");
    }
});


app.get("/comments/:postId/:id", async (req,res) => {
    const commentId = req.params.id;

    try{
        const Comment = mongoose.model("comments", commentSchema)
        const dbRes = await Comment.find({_id: commentId})
        res.json(dbRes)
    } catch (err) {
        console.log(err);
        res.send("there was an error");
    }
})

app.delete("/comments/:categorie/:postId/:id", async (req, res) => {
    const commentId = req.params.id;
    const postId = req.params.postId
    const categorie = req.params.categorie
    try {
        const Comment = mongoose.model("comments", commentSchema)
        const Post = mongoose.model(categorie, postSchema)
        const dbRes = await Comment.findByIdAndDelete(commentId);
        await Post.findOneAndUpdate({ _id: postId }, {"$pull": {comments: commentId}}, { new: true })
        cloudinary.uploader.destroy(dbRes.image?.imageId, (err) => console.log(err))
        res.send("post has been deleted");
    } catch (err) {
        console.log(err);
        res.send("there was an error");
    }
});




app.post("/categories/:name", upload.single("image"), async (req, res) => {
    try {
      /* const author = await Author.findById(req.body.author)
      if (author === null) {
        return res.send("Author is invalid")
      } */
  
      const Post = mongoose.model(req.params.name, postSchema)
  
      if (!req.file) {
        // Wenn kein Bild ausgewählt wurde, einfach ohne Bild speichern
        const response = await Post.create({ ...req.body });
        res.json(response);
        return;
      }
  
      cloudinary.uploader.upload_stream({ resource_type: "image", folder: "777kun" }, async (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("There was an error uploading the image");
          return;
        }
        const response = await Post.create({ ...req.body, image: { url: result.secure_url, imageId: result.public_id } });
        res.json(response);
      }).end(req.file.buffer);
    } catch (err) {
      console.log(err);
      res.status(500).send("There was an error");
    }
  });


app.post("/detailpost/:name/:id", upload.single("image"), async (req, res) => {
    try {
      /*  const author = await Author.findById(req.body.author)
        if (author === null) {
          return res.send("Author is invalid")
        } */
        const Comment = mongoose.model("comments", commentSchema) //commentSchema !!!!!!!!!!!!!!!!!!!!!!!!
       cloudinary.uploader.upload_stream({ resource_type: "image", folder: "777kun" }, async (err, result) => {
            const response = await Comment.create({ ...req.body, image: { url: result.secure_url, imageId: result.public_id } })
            res.json(response)
        }).end(req.file.buffer)
    } catch (err) {
        console.log(err)
        res.status(500).send("there was an error")
    }
})

app.put("/detailpost/:name/:id",upload.single() ,async (req, res) => {
    const postId = req.params.id;
    const commentId = req.body.commentId
  //  const commentId = "64c3d1eb2f4a78c9ee85f60a"
    console.log({commentId})
    try {
        const Post = mongoose.model(req.params.name, postSchema)
        const dbRes = await Post.findOneAndUpdate({ _id: postId }, {"$push": {comments: commentId}}, { new: true })
        res.json(dbRes);
    } catch (err) {
        console.log(err);
        res.send("there was an error");
    }
});

app.get('/collectionNames', async (req, res) => {
    try {

      const collections = await CollectionName
      res.json(collections);

    } catch (error) {
      console.error('Error fetching collection names:', error);
      res.status(500).json({ error: 'Failed to fetch collection names' });
    }
  });




// USER

//app.use("/api/user", userRouter)


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



app.listen(PORT, () => console.log("Der Server läuft", PORT))