import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';



export default class Addcontact extends Component {
    constructor(props){
        super(props)
        this.state={
            redirect: false
        };
    }


    render() {
        return this.state.redirect ? (
            <Redirect to="/contact-list" />
          ) : (
            <div>
                <h4>{this.props.edit ? 'Edit Contact' : 'New Contact'}</h4>
                <div className="form">
                    <div><label>Name : </label><input name="name" type="text" onChange={this.props.handleChange} value={this.props.contact.name} /></div>
                    <div><label>telephone : </label><input name="telephone" type="text" onChange={this.props.handleChange} value={this.props.contact.telephone} /></div>
                    <div><label>E-mail : </label><input name="email" type="email" onChange={this.props.handleChange} value={this.props.contact.email} /></div>
                    <input type="button" value={this.props.edit ? 'Edit contact' : 'Add Contact'} onClick={() => {
            this.props.action();
            this.setState({ redirect: true });
          }} />
                   
                </div>
            </div>
        )
    }
}
