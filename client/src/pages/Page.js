import { useState, useEffect } from "react";
import axios from "axios";
import "./Page.css";
import { Link, useHistory } from "react-router-dom";

function Page() {
  //to avoid create page each article , I cath article name from url
  const url = window.location.href;
  const articleName = url.split("/")[3].trim();
  const baseUrl = "http://localhost:9090/articles/";
  const [article, setArticle] = useState([]);
  const history = useHistory();

  async function getData() {
    await axios
      .get(baseUrl + articleName)
      .then((response) => {
        setArticle(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getData();
  });

  //console.log(articleName);
  return (
    <div>
      <h1>{article?.name}</h1>
      <Link to={"edit/" + article.name}>
        <div className="edit">
          <button>Edit</button>
        </div>
      </Link>

      <span>
        {/* if article name does not exist no display Edit  */}
        {articleName === article.name ? (
          <p className="content">{article?.content}</p>
        ) : (
          <p className="noArticle">
            No article with this exact name found. Use Edit button in the header
            to add it.
          </p>
        )}
      </span>
      <div className="goHome">
        <button
          onClick={() => {
            history.push("/");
          }}
        >
          Home Page
        </button>
      </div>
    </div>
  );
}

export default Page;
