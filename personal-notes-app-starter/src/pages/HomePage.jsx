import React from "react";
import NoteList from "../components/NoteList";
import { Link } from "react-router-dom";

function HomePage({ notes }) {
  return (
    <section>
      <NoteList notess={notes} />
      <button className="btn_add_note">
        <Link to={`/notes/new`}>ADD NOTE</Link>
      </button>
    </section>
  );
}

export default HomePage;
