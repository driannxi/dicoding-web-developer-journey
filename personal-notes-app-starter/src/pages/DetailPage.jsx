import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import NoteDetail from "../components/NoteDetail";
import { getNote } from "../utils/local-data";

function DetailPage({ deleteNote }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const note = getNote(id);

  const onDeleteHendler = (e) => {
    e.preventDefault();
    deleteNote(id);
    navigate("/");
  };

  return (
    <div>
      <NoteDetail
        title={note.title}
        body={note.body}
        createdAt={note.createdAt}
      />
      <button type="button" onClick={onDeleteHendler}>
        klikk
      </button>
    </div>
  );
}

export default DetailPage;
