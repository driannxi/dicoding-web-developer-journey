import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NoteDetail from "../components/NoteDetail";
import { getNote } from "../utils/network-data";

function DetailPage({ deleteNote }) {
  const { id } = useParams();
  const navigate = useNavigate();
  // const note = getNote(id);

  const [note, setNote] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    async function fetchNote() {
      const { error, data } = await getNote(id);
      if (!error) {
        setNote(data);
      }
      setInitializing(false);
    }

    fetchNote();
  }, [id]);

  const onDeleteHendler = async (e) => {
    e.preventDefault();
    await deleteNote(id);
    navigate("/");
  };

  if (initializing) {
    return <p className="notes-list__empty">Memuat catatan...</p>;
  }

  if (!note) {
    return <p className="notes-list__empty">Catatan tidak ditemukan</p>;
  }

  // const onDeleteHendler = (e) => {
  //   e.preventDefault();
  //   deleteNote(id);
  //   navigate("/");
  // };

  return (
    <div>
      <NoteDetail
        title={note.title}
        body={note.body}
        createdAt={note.createdAt}
        onDelete={onDeleteHendler}
      />
    </div>
  );
}

export default DetailPage;
