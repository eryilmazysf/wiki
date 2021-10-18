const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

//articles
const articles = [
  { id: 1, name: "article1", content: "wiki project 1" },
  { id: 2, name: "article2", content: "wiki project 2" },
  { id: 3, name: "article3", content: "wiki project 3" },
  { id: 4, name: "article4", content: "wiki project 4" },
  { id: 5, name: "article5", content: "wiki project 5" },
];

//get all articles
app.get("/articles/", (req, res) => {
  res.contentType("application/json");
  res.status(200).json(articles);
});

// create a new article
app.post("/articles/", (req, res) => {
  const article = {
    id: articles.length + 1,
    name: req.body.name,
    content: req.body.content,
  };
  articles.push(article);
  res.status(201).send(article);
});

//update a article with given name
app.put("/articles/:name", (req, res) => {
  let article = articles.find((a) => a.name === req.params.name);
  if (!article) {
    res.status(404).send("The article with the given name was not found!!!");
  }
  article.name = req.body.name ? req.body.name : article.name;
  article.content = req.body.content ? req.body.content : article.content;
  res.status(200).send(article);
});

//get specific article wtih given name
app.get("/articles/:name", (req, res) => {
  let article = articles.find((a) => a.name === req.params.name);
  if (!article) {
    res.status(404).send("The article with the given name was not found!!!");
  }
  res.contentType("text/html");
  res.status(200).contentType("text/html").send(article);
});

//port
const port = process.env.PORT || 9090;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
