import { useState, useEffect } from "react";
import axios from "axios";
import "./Edit.css";
import { useHistory } from "react-router-dom";

function Edit() {
  const url = window.location.href;
  const articleName = url.split("/")[4];
  const baseUrl = "http://localhost:9090/articles/";
  const [article, setArticle] = useState([]);
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const history = useHistory();

  async function getData() {
    await axios
      .get(baseUrl + articleName)
      .then((response) => {
        setArticle(response.data);
        setContent(response.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);
  //console.log(article);
  const handleChange = (e) => {
    e.preventDefault();
    setContent(e.target.value);
  };
  //   run axios.put if article exists, if not run axios.post to create a new article
  const handleClick = () => {
    article.name
      ? axios
          .put(`${baseUrl}${articleName}`, {
            content: content,
          })
          .then((response) => {
            if (response.statusText === "OK") {
              history.goBack();
            }
          })
          .catch((err) => console.log(err))
      : axios
          .post(`${baseUrl}`, {
            name: name.trim(),
            content: content.trim(),
          })
          .then((response) => {
            //console.log(response);
            if (response.statusText === "Created") {
              history.push("/");
            }
          })
          .catch((err) => console.log(err));
  };
  const cancelClick = () => {
    history.push("/");
  };
  const nameChange = (e) => {
    setName(e.target.value);
  };
  //console.log(content);
  return (
    <div>
      <h1>{article.name}</h1>
      <div className="formContainer">
        {!article.name && (
          <div>
            <h1>Create New Article</h1>
            <p>Name:</p>
            <input type="text" onChange={nameChange} value={name} />
          </div>
        )}

        <p>Content:</p>
        <textarea
          className="content"
          type="text"
          onChange={handleChange}
          value={content}
        />
      </div>
      <div className="buttonContainer">
        <button onClick={handleClick}>Save</button>
        <button onClick={cancelClick}>Cancel</button>
      </div>
    </div>
  );
}

export default Edit;
