import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;

app.set('view engine', 'ejs');  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];  
let postIdCounter = 1;  

// Route to render the home page
app.get("/", (req, res) => {
    res.render("index", { posts });
});

// Route to handle new blog post creation
app.post("/blog", (req, res) => {
    const { title, content, author } = req.body;
    const newPost = {
        id: postIdCounter++,
        title,
        content,
        author
    };
    posts.push(newPost);
    res.redirect("/");  
});


app.get("/edit/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);
    if (post) {
        res.render("edit", { post });
    } else {
        res.status(404).send("Post not found");
    }
});

// Route to handle post editing
app.post("/edit/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.title = req.body.title;
        post.content = req.body.content;
        post.author = req.body.author;
        res.redirect("/");
    } else {
        res.status(404).send("Post not found");
    }
});

// Route to handle post deletion
app.post("/delete/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    posts = posts.filter(p => p.id !== postId);
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Your app is listening on port ${port}!`);
});
