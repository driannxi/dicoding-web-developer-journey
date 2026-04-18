import React from "react";
import NoteItem from "./NoteItem";

function NoteList({ notess }) {
  return (
    <div className="notes-list">
      {notess.map((note) => (
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
