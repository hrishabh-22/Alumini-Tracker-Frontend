import React, { useState, useEffect } from "react";
import { getArticle, getProject } from "../apicalls/allapicalls";
import Menu from "../components/Menu";
import Card from "./Card";
import ArticleCard from "./ArticleCard";

const Home = (props) => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(false);
  const [projects, setProjects] = useState([]);
  const [prjectError, setProjectError] = useState(false);

  const loadAllProjects = () => {
    getProject()
      .then((data) => {
        if (data.error) {
          setProjectError(data.error);
          console.log(error);
        } else {
          setProjects(data);
        }
      })
      .catch((err) => console.log(err));
  };

  const loadAllArticles = () => {
    getArticle()
      .then((data) => {
        if (data.error) {
          setError(data.error);
          console.log(error);
        } else {
          setArticles(data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadAllArticles();
    loadAllProjects();
  }, []);

  return (
    <div>
      <Menu />
      <h4>All Articles:</h4>
      <div className="row">
        {articles.map((article, index) => {
          return !article.image ? (
            <ArticleCard
              key={index}
              title={article.title}
              desc={article.description}
              author={article.author}
            />
          ) : (
            <Card
              key={index}
              title={article.title}
              author={article.author}
              image={article.image}
              desc={
                article.description.length > 100
                  ? article.description.substr(0, 99)
                  : article.description
              }
            />
          );
        })}
      </div>
      <h4>All Projects:</h4>
      <div className="row">
        {projects.map((project, index) => {
          return (
            <Card
              key={index}
              title={project.title}
              author={project.author}
              image={project.image}
              buttonAction="View"
              url={project.github_url}
              desc={
                project.description.length > 100
                  ? project.description.substr(0, 99)
                  : project.description
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
