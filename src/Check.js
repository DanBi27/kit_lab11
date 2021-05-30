import "./style.css";
import React from "react";
import RepoUsers from "./Users";

//Для каждого репозитория выводите его название (ссылкой) и владельца (имя + аватар)

class RepoCheck extends React.Component {
  render() {
    return (
      <div class="list">
        {this.props.data.map((repo, index) => {
          if (index >= this.props.start && index <= this.props.end) {
            return (
              <RepoUsers
                fount={index}
                avatar={repo.owner.avatar_url}
                url={repo.url}
                name={repo.name}
                login={repo.owner.login}
              />
            );
          }
        })}
      </div>
    );
  }
}

export default RepoCheck;
