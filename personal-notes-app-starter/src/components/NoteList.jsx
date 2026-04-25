import React from "react";
import NoteItem from "./NoteItem";

function NoteList({ notess }) {
  if (!notess.length) {
    return (
      <div>
        <p>tidak ada catatan</p>
      </div>
    );
  }

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
