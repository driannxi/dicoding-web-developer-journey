import React from "react";
import NoteItem from "./NoteItem";
import DetailNote from "../pages/DetailNote";

function NoteList({ notes }) {
  return (
    <div className="notes-list">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          id={note.id}
          title={note.title}
          body={note.body}
          createdAt={note.createdAt}
        />
      ))}
    </div>
  );
}

export default NoteList;
