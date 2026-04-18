import React from "react";
import NoteList from "../components/NoteList";
import { Link } from "react-router-dom";

function HomePage({ notes }) {
  return (
    <section>
      <NoteList notess={notes} />
      <button>
        <Link to={`/notes/new`}>add</Link>
      </button>
    </section>
  );
}

export default HomePage;
