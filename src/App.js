import React, { Component } from "react";
import "./App.css";
import { Link, Route } from "react-router-dom";
import ContactCard from "./ContactCard";
import AddContact from "./AddContact";
import axios from "axios";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      telephone: "",
      email: "",
      contactlist: [],
      id: "",
      edit: false
    };
  }

  componentDidMount = () => {
    this.getContacts();
  };

  getContacts = () => {
    axios.get("/users").then(res =>
      this.setState({
        contactlist: res.data
      })
    );
  };
  addContact = () => {
    axios
      .post("/add-user", {
        name: this.state.name,
        telephone: this.state.telephone,
        email: this.state.email
      })
      .then(this.getContacts);
    this.add();
  };

  editContact = () => {
    axios
      .put("/modify_user/" + this.state.id, {
        name: this.state.name,
        telephone: this.state.telephone,
        email: this.state.email
      })
      .then(this.getContacts);
    this.add();
  };

  deleteContact = id => {
    axios
      .delete("/delete-user/" + id)
      .then(this.getContacts)
      .catch(err => console.log( err));
  };

  add = () => {
    this.setState({
      edit: false,
      name: "",
      telephone: "",
      email: ""
    });
  };

  getPerson = (contact, edit) => {
    this.setState({
      id: contact._id,
      name: contact.name,
      telephone: contact.telephone,
      email: contact.email,
      edit
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <div>
          <h1>My Contact</h1>
          <Link to="/contact-list">
            <button onClick={this.add}>Contact List</button>
          </Link>
          <Link to="/new-contact">
            <button onClick={this.add}>Add List</button>
          </Link>
        </div>
        <Route
          path="/contact-list"
          render={() => (
            <div className="contact-list">
              {this.state.contactlist.map(el => (
                <ContactCard
                  contact={el}
                  getPerson={this.getPerson}
                  deleteContact={this.deleteContact}
                />
              ))}
            </div>
          )}
        />
        <Route
          path="/(new-contact|edit-contact)/"
          render={() => (
            <AddContact
              handleChange={this.handleChange}
              action={this.state.edit ? this.editContact : this.addContact}
              edit={this.state.edit}
              contact={this.state}
            />
          )}
        />
      </div>
    );
  }
}
