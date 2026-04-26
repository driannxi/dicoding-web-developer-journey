import React from "react";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import DetailPage from "./pages/DetailPage";
import NoteNewPage from "./pages/NoteNewPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { getUserLogged, putAccessToken } from "./utils/network-data";
import Navigation from "./components/Navigation";
import { getActiveNotes } from "./utils/network-data";
import { addNote } from "./utils/network-data";
import { deleteNote } from "./utils/network-data";
import ThemeContext from "./contexts/ThemeContext";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: localStorage.getItem("theme") || "dark",
      notes: [],
      authedUser: null,
      initializing: true,
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
  }

  toggleTheme() {
    this.setState((prevState) => {
      const newTheme = prevState.theme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      return { theme: newTheme };
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.theme !== this.state.theme) {
      document.documentElement.setAttribute("data-theme", this.state.theme);
    }
  }

  onLogout() {
    this.setState(() => {
      return {
        authedUser: null,
      };
    });
    putAccessToken("");
  }

  async componentDidMount() {
    document.documentElement.setAttribute("data-theme", this.state.theme);
    this.handleAuth();
  }

  handleAuth = async () => {
    const { data } = await getUserLogged();
    this.setState({ authedUser: data, initializing: false });

    if (data) {
      const { error, data: notesData } = await getActiveNotes();
      if (!error) this.setState({ notes: notesData });
    }
  };

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

  NoteDeleteHendler = async (id) => {
    const { error } = await deleteNote(id);
    if (!error) {
      const { data: notesData } = await getActiveNotes();
      this.setState({
        notes: notesData,
      });
    }
  };

  render() {
    const themeContextValue = {
      theme: this.state.theme,
      toggleTheme: this.toggleTheme,
    };

    if (this.state.initializing) {
      return null;
    }

    if (this.state.authedUser === null) {
      return (
        <ThemeContext.Provider value={themeContextValue}>
          <div className="app-container">
            <header className="header">
              <h1>Notes App</h1>
              <Navigation />
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
        </ThemeContext.Provider>
      );
    }

    return (
      <ThemeContext.Provider value={themeContextValue}>
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
      </ThemeContext.Provider>
    );
  }
}

export default App;
