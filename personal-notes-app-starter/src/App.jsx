import React from "react";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import DetailPage from "./pages/DetailPage";
import NoteNewPage from "./pages/NoteNewPage";
import { getAllNotes } from "./utils/local-data";
import { addNote } from "./utils/local-data";
import { deleteNote } from "./utils/local-data";
import RegisterPage from "./pages/RegisterPage";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getAllNotes(),
      authedUser: null,
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
    if (this.state.authedUser === null) {
      return (
        <div className="app-container">
          <header className="header">
            <h1>Notes App</h1>
          </header>
          <main>
            <Routes>
              <Route path="/*" element={<p>Halaman Login</p>} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </main>
        </div>
      );
    }

    return (
      <div className="app-container">
        <header className="header">
          <h1>Note App</h1>
        </header>
        <main>
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
        </main>
      </div>
    );
  }
}

export default App;
