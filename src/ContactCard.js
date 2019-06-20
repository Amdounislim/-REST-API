import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class ContactCard extends Component {
    render() {
        const { contact, getPerson, deleteContact } = this.props;
        return (
            <div>          
                <div className="list">
                <div className="line">Name : <h6>{contact.name}</h6></div>
                <div className="line">Phone : <h6>{contact.telephone}</h6></div>
                <div className="line">E-mail : <h6>{contact.email}</h6></div>
                <div className="buttons">
                    <Link to="/edit-contact">
                        <input type="button" value="Edit" onClick={() => getPerson(contact, true)} />
                    </Link>
                    <input type="button" value="Delete" onClick={() => deleteContact(contact._id)} />
                </div>
                </div>
            </div>
        )
    }
}






