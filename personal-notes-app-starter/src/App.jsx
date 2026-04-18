import React from "react";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import DetailPage from "./pages/DetailPage";
import NoteNewPage from "./pages/NoteNewPage";
import { getAllNotes } from "./utils/local-data";
import { addNote } from "./utils/local-data";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getAllNotes(),
    };
  }

  Add = ({ title, body }) => {
    this.setState((prevState) => {
      return {
        notes: addNote({ title, body }),
      };
    });
  };

  render() {
    return (
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage notes={this.state.notes} />} />
          <Route path="/notes/:id" element={<DetailPage />} />
          <Route
            path="/notes/new"
            element={<NoteNewPage addNotes={this.Add} />}
          />
        </Routes>
      </div>
    );
  }
}

export default App;
