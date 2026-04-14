import React from "react";
import { Link } from "react-router-dom";

function NoteItem({ id, title, body, createdAt, achived }) {
  return (
    <article>
      <h3>
        <Link to={`/notes/${id}`}>{title}</Link>
      </h3>
      <p>{body}</p>
    </article>
  );
}

export default NoteItem;
