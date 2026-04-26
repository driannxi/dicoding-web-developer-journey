import React from "react";
import { useNavigate } from "react-router-dom";

function NoteNewPageWrapper(props) {
  const navigate = useNavigate();
  return <NoteNewPage {...props} navigate={navigate} />;
}

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

  noteSubmit = async (event) => {
    event.preventDefault();
    await this.props.addNotes(this.state);
    this.props.navigate("/");
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
        <button className="btn_add_note" type="submit">
          Add New Note
        </button>
      </form>
    );
  }
}

export default NoteNewPageWrapper;
