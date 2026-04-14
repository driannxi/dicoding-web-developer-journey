import React from "react";

function NoteItem({ id, title, body, createdAt, achived }) {
  return (
    <article>
      <h3> {title}</h3>
      <p>{body}</p>
    </article>
  );
}

export default NoteItem;
