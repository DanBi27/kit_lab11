import React from "react";

function RepoUsers(props) {
  return (
    <div className="repo">
      <img src={props.avatar} />
      <a className="url" href={props.url}>
        {props.name}
      </a>
      &nbsp; from
      <p className="login">{props.login}</p>
    </div>
  );
}

export default RepoUsers;
