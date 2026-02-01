import React, { useState, useEffect, useContext } from "react";
import { Fade } from "react-reveal";
import "./Profile.css";
import GithubProfileCard from "../../components/githubProfileCard/GithubProfileCard";
import { openSource, socialMediaLinks } from "../../portfolio";
import axios from "axios";
import StyleContext from "../../contexts/StyleContext";

export default function Profile() {
  const { isDark } = useContext(StyleContext);
  const [prof, setProf] = useState({});
  const [showProfile, setShowProfile] = useState(true);

  useEffect(() => {
    if (openSource.showGithubProfile === "true" || openSource.showGithubProfile === true) {
      const getProfileData = async () => {
        try {
          const response = await axios.get(
            "https://api.github.com/users/" + socialMediaLinks.github.split("/")[3]
          );
          setProf(response.data);
        } catch (err) {
          setShowProfile(false);
        }
      };
      getProfileData();
    } else {
      setShowProfile(false);
    }
  }, []);

  if (!showProfile) {
    return null;
  }

  return (
    <Fade bottom duration={1000} distance="20px">
      {openSource.showGithubProfile ? (
        <div className="main" id="profile">
          <h1 className="profile-title">Profile</h1>
          <div className="repo-cards-div-main">
            <GithubProfileCard prof={prof} key={prof.id} />
          </div>
        </div>
      ) : null}
    </Fade>
  );
}