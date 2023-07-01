import "./App.css";
import ButtonBox from "./components/ButtonBox";
import { useNavigate } from "react-router-dom";
//import json file
import articlesData from './assets/articles.json';

function Articles() {
  const navigate = useNavigate();
    const goHome = () => {
        navigate("/")
    }
  return (
    <div className="App">
      <header className="App-header">
        <a onClick={goHome} style={{"textDecoration": "underline", "cursor":"pointer", "marginTop":"1rem"}}>Back to Felix O'Mahony</a>
        <h1 style={{ "margin-bottom": "1rem" }}>Articles</h1>

        {articlesData.articles.map((article) => 
        <ButtonBox description = {article.description}
        link={article.link}
        title={article.title}>

        </ButtonBox>)}
      </header>
    </div>
  );
}

export default Articles;
