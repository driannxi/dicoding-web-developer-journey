import React from "react";
import { showFormattedDate } from "../utils";

function NoteDetail({ title, body, createdAt }) {
  return (
    <article className=".detail-page">
      <h3 className="detail-page__title">{title}</h3>
      <p className="detail-page__createdAt">{showFormattedDate(createdAt)}</p>
      <p className="detail-page__body">{body}</p>
    </article>
  );
}

export default NoteDetail;
