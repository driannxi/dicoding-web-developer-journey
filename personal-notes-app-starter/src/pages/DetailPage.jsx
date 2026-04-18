import React from "react";
import { useParams } from "react-router-dom";
import NoteDetail from "../components/NoteDetail";
import { getNote } from "../utils/local-data";

function DetailPage() {
  const { id } = useParams();
  const note = getNote(id);

  return (
    <div>
      <NoteDetail title={note.title} body={note.body} createdAt={note.createdAt} />
    </div>
  );
}

export default DetailPage;
