import { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import { Link } from "react-router-dom";

const baseURL = "http://localhost:9090/articles/";
function Home() {
  const [articles, setArticles] = useState([]);

  async function getData() {
    await axios
      .get(baseURL)
      .then((response) => {
        setArticles(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getData();
  });
  //console.log(articles);
  return (
    <div className="container">
      <h1>Articles</h1>
      {articles.map((article) => (
        <div className="article" key={article.id}>
          <Link to={article.name}>{article.name}</Link>
        </div>
      ))}
    </div>
  );
}

export default Home;
