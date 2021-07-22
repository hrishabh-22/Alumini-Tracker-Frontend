import React, { useState, useEffect } from "react";
import Menu from "../components/Menu";
import Profile from "./Profile";
import Card from "./Card";
import Button from "@material-ui/core/Button";
import ArticleCard from "./ArticleCard";
import ProjectCard from "./ProjectCard";
import {
  getArticle,
  getProject,
  getRecommendadionUsers,
  addPreference,
} from "../apicalls/allapicalls";
import { getjwtemail, getjwtid } from "../auth/index";
import { userDetail } from "../apicalls/allapicalls";

const UserDashboard = (props) => {
  const [USEREMAIL, SetUSEREMAIL] = useState(getjwtemail());
  const [USERID, SetUSERID] = useState(getjwtid());
  const [URLMATCHER, SetURLMATCHER] = useState(
    `http://localhost:8000/api/user/${USERID}/`
  );
  const [userArticles, setUserArticles] = useState([]);
  const [allArticles, setAllArticles] = useState([]);
  const [userProjects, setUserProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [articleRefresh, setArticleRefresh] = useState(1);
  const [projectRefresh, setProjectRefresh] = useState(1);
  const [showRatingsForm, setShowRatingsForm] = useState(false);
  const [recommendationUsers, setRecommendationUsers] = useState([]);
  const [refRecommendationList, setRefRecommendationList] = useState(false);
  const [finalUsersList, setFinalUsersList] = useState([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [preferences, setPreferences] = useState({
    user: URLMATCHER,
    java: "",
    python: "",
    javascript: "",
  });

  const { user, java, python, javascript } = preferences;

  const handleChange = (name) => (event) => {
    setPreferences({ ...preferences, [name]: event.target.value });
  };

  const loadAllArticles = () => {
    getArticle()
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setAllArticles(data);
        }
      })
      .catch((err) => console.log(err));
  };

  const loadAllProjects = () => {
    getProject()
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setAllProjects(data);
        }
      })
      .catch((err) => console.log(err));
  };

  const loadAllRecommendationUsers = () => {
    getRecommendadionUsers()
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setRecommendationUsers(data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadAllArticles();
  }, [articleRefresh]);

  useEffect(() => {
    loadAllProjects();
  }, [projectRefresh]);

  useEffect(() => {
    loadAllRecommendationUsers();
  }, [refRecommendationList]);

  const ratingsForm = () => {
    return (
      <div className="border col-sm-5">
        <form>
          <div className="form-group row">
            <label htmlFor="java" className="col-sm-2 col-form-label">
              <b>Java</b>
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                required
                className="form-control"
                value={java}
                onChange={handleChange("java")}
                id="java"
                placeholder="Enter Rating b/w 1-5"
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="python" className="col-sm-2 col-form-label">
              <b>Python</b>
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                required
                className="form-control"
                value={python}
                onChange={handleChange("python")}
                id="python"
                placeholder="Enter Rating b/w 1-5"
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="javascript" className="col-sm-2 col-form-label">
              <b>JS</b>
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                required
                className="form-control"
                value={javascript}
                onChange={handleChange("javascript")}
                id="javascript"
                placeholder="Enter Rating b/w 1-5"
              />
            </div>
          </div>
          <button
            className="btn btn-danger"
            onClick={submitPreferences}
            style={{ marginBottom: 10 }}
          >
            Add Preference
          </button>
        </form>
      </div>
    );
  };

  const similarity = (TU, RU) => {
    console.log("STU: ", TU);
    console.log("SRU: ", RU);
    if (RU.length <= 3) {
      return RU;
    } else {
      const tuJava = TU[0].java;
      const tuPython = TU[0].python;
      const tuJavascript = TU[0].javascript;
      const valueArray = [];
      const userUrlArray = [];
      const recommendationUserDetails = [];

      for (let i = 0; i < RU.length; i++) {
        let fRU = RU[i];
        let ruJava = fRU.java;
        let ruPython = fRU.python;
        let ruJavascript = fRU.javascript;

        let pushData = Math.sqrt(
          Math.pow(tuJava - ruJava, 2) +
            Math.pow(tuPython - ruPython, 2) +
            Math.pow(tuJavascript - ruJavascript, 2)
        );
        valueArray.push({ id: i, data: pushData });
      }
      console.log("Value Array: ", valueArray);
      valueArray.sort((a, b) => {
        return b.data - a.data;
      });
      console.log("New Value Array: ", valueArray);
      //console.log(valueArray[1].id);

      for (let j = 0; j < 3; j++) {
        let userIDINDEX = valueArray[j].id;
        let recommendationUserUrl = RU[userIDINDEX].user;
        userUrlArray.push(recommendationUserUrl);
      }
      console.log("Url array: ", userUrlArray);

      for (let k = 0; k < 3; k++) {
        userDetail(userUrlArray[k])
          .then((data) => {
            if (data.error) {
              console.log(data.error);
            } else {
              recommendationUserDetails.push(data);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }

      console.log("Recommendation Users List: ", recommendationUserDetails);
      return recommendationUserDetails;
    }
  };

  const btnRecommendationUser = () => {
    const TU = recommendationUsers.filter((user) => user.user == URLMATCHER);
    if (TU.length === 0) {
      setShowRatingsForm(true);
    } else {
      setShowRatingsForm(false);
      const RU = recommendationUsers.filter((user) => user.user !== URLMATCHER);
      if (RU.length === 0) {
        console.log("You are the only user");
      } else {
        const finalArray = similarity(TU, RU);
        setFinalUsersList(finalArray);
        setRefRecommendationList(!refRecommendationList);
        setShowRecommendations(!showRecommendations);
      }
    }
  };

  const submitPreferences = (event) => {
    event.preventDefault();
    addPreference({ user, java, python, javascript })
      .then((data) => {
        console.log(data);
        if (data.user === user) {
          setPreferences({
            ...preferences,
            user: URLMATCHER,
            java: "",
            python: "",
            javascript: "",
          });
        } else {
          console.log("Error in addPreference:");
        }
      })
      .catch((err) => console.log(err));
    setShowRatingsForm(false);
    setRefRecommendationList(!refRecommendationList);
  };

  return (
    <div>
      <Menu />
      <h1>Dashboard</h1>
      <Profile />
      <Button
        color="secondary"
        variant="outlined"
        style={{ marginTop: 10, marginBottom: 10 }}
        onClick={() => {
          setArticleRefresh(2);
          const myArticleArray = allArticles.filter(
            (article) => article.author == USEREMAIL
          );
          setUserArticles(myArticleArray);
        }}
      >
        Show My Articles
      </Button>
      <div className="row">
        {userArticles.map((article, index) => {
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
      <Button
        color="secondary"
        variant="outlined"
        style={{ marginTop: 10, marginBottom: 10 }}
        onClick={() => {
          setProjectRefresh(2);
          const myProjectArray = allProjects.filter(
            (project) => project.author == USEREMAIL
          );
          setUserProjects(myProjectArray);
        }}
      >
        Show My Projects
      </Button>
      <div className="row">
        {userProjects.map((project, index) => {
          return !project.image ? (
            <ProjectCard key={index} />
          ) : (
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
      <Button
        color="secondary"
        variant="outlined"
        style={{ marginTop: 10, marginBottom: 10 }}
        onClick={btnRecommendationUser}
      >
        Recommended Users
      </Button>
      {showRatingsForm ? ratingsForm() : null}
      {!showRecommendations ? null : (
        <div className="row">
          {finalUsersList.map((user, index) => {
            return (
              <Card
                key={index}
                image={user.image}
                author={user.email}
                title={user.name}
                desc={user.phone}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
