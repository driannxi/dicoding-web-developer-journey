import React from "react";
import { Link } from "react-router-dom";

class NoteNewPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
    };
  }

  noteChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  noteSubmit = (event) => {
    event.preventDefault();
    this.props.addNotes(this.state);
  };

  render() {
    return (
      <form className="add-new-page__input" onSubmit={this.noteSubmit}>
        <input
          className="add-new-page__input__title"
          placeholder="Title"
          name="title"
          type="text"
          value={this.state.title}
          onChange={this.noteChange}
        ></input>
        <input
          className="add-new-page__input__body"
          placeholder="Notes"
          name="body"
          type="text"
          value={this.state.body}
          onChange={this.noteChange}
        ></input>
        <button type="submit">
          klikkkk
        </button>
      </form>
    );
  }
}

export default NoteNewPage;
