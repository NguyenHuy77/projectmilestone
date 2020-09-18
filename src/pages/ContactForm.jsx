import React, { Component, Fragment } from "react";
import { Redirect } from 'react-router-dom'
import { docClient } from './backend'
import { v4 as uuidv4 } from 'uuid'; // For version 4

export default class ContactForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "",
      email: "",
      message: "",
      refresh: false
    }
  }
  handleChange(event) {
    let obj = []
    obj[event.target.name] = event.target.value
    this.setState(obj)
  }
  createData() {
    if (this.state.name === "") {
      alert("Please enter your name")
      return;
    }
    if (this.state.email === "") {
      alert("Please enter your email")
      return;
    }
    if (this.state.message === "") {
      alert("Please enter your message")
      return;
    }
    var form =
    {
      id: uuidv4(),
      name: this.state.name,
      email: this.state.email,
      message: this.state.message
    }
    var params = {
      TableName: "feedbacks",
      Item: form
    };
    docClient.put(params, function (err, data) {

      if (err) {
        console.log("users::save::error - " + JSON.stringify(err, null, 2));
      } else {
        alert('Your message has been sent to the System.')
        this.setState({ refresh: true })
      }
    }.bind(this))

  }
  resetPage() {
    if (this.state.refresh) {
      return <Redirect to="/"></Redirect>
    }
  }
  render() {
    return (
      <main className="" style={{ paddingTop: '0px' }}>
        <section className="">
          <div className="">
            <div className="block-heading">
              <h2 className="text-monospace text-info">Contact Form</h2>
              <div className="container">
                {this.resetPage()}
                <form className="contact-form">
                  <div class="form-group">
                    <label for="name">
                      Name: <span className="text-danger pl-3">NAME IS REQUIRED</span>
                    </label>
                    <input
                      required
                      type="text"
                      class="form-control"
                      placeholder="Enter Your Name"
                      name="name"
                      onChange={this.handleChange.bind(this)}
                    ></input>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">
                      Email address:
            <span className="text-danger pl-3"> EMAIL IS REQUIRED</span>
                    </label>
                    <input
                      required
                      type="email"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      name="email"
                      onChange={this.handleChange.bind(this)}
                    ></input>
                    <small id="emailHelp" class="form-text text-muted">
                      We'll never share your email with anyone else.
                    </small>
                  </div>
                  <div class="form-group">
                    <label for="exampleFormControlTextarea1">
                      Message{" "}
                      <span className="text-danger pl-3"> MESSAGE IS REQUIRED</span>
                    </label>
                    <textarea
                      required
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      name="message"
                      onChange={this.handleChange.bind(this)}
                    ></textarea>
                  </div>
                  <div class="form-group">
                  <button
                      onClick={this.createData.bind(this)}
                      class="contact-btn btn"
                      style={{ position: 'absolute' }}
                    >
                      SEND MESSAGE
                  </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

    )
  }
}

