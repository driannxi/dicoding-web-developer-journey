import React from "react";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import DetailPage from "./pages/DetailPage";
import NoteNewPage from "./pages/NoteNewPage";
// import { getAllNotes } from "./utils/local-data";
// import { addNote } from "./utils/local-data";
import { deleteNote } from "./utils/local-data";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { getUserLogged, putAccessToken } from "./utils/network-data";
import Navigation from "./components/Navigation";
import { getActiveNotes } from "./utils/network-data";
import { addNote } from "./utils/network-data";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      authedUser: null,
      initializing: true,
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  // async onLoginSuccess({ accessToken }) {
  //   putAccessToken(accessToken);
  //   const { data } = await getUserLogged();
  //   this.setState(() => {
  //     return {
  //       authedUser: data,
  //     };
  //   });
  // }

  onLogout() {
    this.setState(() => {
      return {
        authedUser: null,
      };
    });
    putAccessToken("");
  }

  async componentDidMount() {
    const { data } = await getUserLogged();
    this.setState(() => {
      return {
        authedUser: data,
        initializing: false,
      };
    });

    if (data) {
      const { error, data: notesData } = await getActiveNotes();
      if (!error) {
        this.setState({ notes: notesData });
      }
    }
  }

  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data: userData } = await getUserLogged();
    const { error, data: notesData } = await getActiveNotes();
    this.setState(() => {
      return {
        authedUser: userData,
        notes: error ? [] : notesData,
      };
    });
  }

  // async componentDidMount() {
  //   const { data } = await getActiveNotes;
  //   this.setState(() => {
  //     return {
  //       notes: data,
  //     };
  //   });
  // }

  // AddNoteHendler = ({ title, body }) => {
  //   addNote({ title, body });

  //   this.setState(() => {
  //     return {
  //       notes: getAllNotes(),
  //     };
  //   });
  // };

  AddNoteHendler = async ({ title, body }) => {
    const { error } = await addNote({ title, body });
    if (!error) {
      const { data: notesData } = await getActiveNotes();
      this.setState({
        notes: notesData,
      });
    } else {
      alert("Gagal menambahkan catatan");
    }
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
    if (this.state.initializing) {
      return null;
    }

    if (this.state.authedUser === null) {
      return (
        <div className="app-container">
          <header className="header">
            <h1>Notes App</h1>
          </header>
          <main>
            <Routes>
              <Route
                path="/*"
                element={<LoginPage loginSuccess={this.onLoginSuccess} />}
              />
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
          <Navigation
            logout={this.onLogout}
            name={this.state.authedUser.name}
          />
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
