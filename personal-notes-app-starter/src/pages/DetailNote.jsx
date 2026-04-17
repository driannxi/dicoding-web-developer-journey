import React from "react";
import { useParams } from "react-router-dom";
import Detail from "../components/Detail";
import { getNote } from "../utils/local-data";

function DetailNote() {
  const { id } = useParams();
  const note = getNote(id);

  return (
    <>
      <Detail title={note.title} body={note.body} createdAt={note.createdAt} />
    </>
  );
}

export default DetailNote;
