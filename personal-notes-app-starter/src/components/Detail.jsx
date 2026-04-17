import React from "react";
import { showFormattedDate } from "../utils";

function Detail({ title, body, createdAt }) {
  return (
    <article>
      <h3>{title}</h3>
      <p>{showFormattedDate(createdAt)}</p>
      <p>{body}</p>
    </article>
  );
}

export default Detail;
