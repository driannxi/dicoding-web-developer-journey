import React from "react";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import DetailPage from "./pages/DetailPage";
import NoteNewPage from "./pages/NoteNewPage";
import { getAllNotes } from "./utils/local-data";
import { addNote } from "./utils/local-data";
import { deleteNote } from "./utils/local-data";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getAllNotes(),
    };
  }

  AddNoteHendler = ({ title, body }) => {
    addNote({ title, body });

    this.setState(() => {
      return {
        notes: getAllNotes(),
      };
    });
  };

  NoteDeleteHendler = (id) => {
    deleteNote(id);

    this.setState(() => {
      return {
        notes: getAllNotes(),
      };
    });
  };

  render() {
    return (
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage notes={this.state.notes} />} />
          <Route
            path="/notes/:id"
            element={<DetailPage deleteNote={this.NoteDeleteHendler} />}
          />
          <Route
            path="/notes/new"
            element={<NoteNewPage addNotes={this.AddNoteHendler} />}
          />
        </Routes>
      </div>
    );
  }
}

export default App;
