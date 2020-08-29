import React from 'react'
import {
    //MDBContainer,
    MDBBtn,
    //MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBModalFooter,
    MDBInput,
} from "mdbreact"
import { Link, Redirect } from "react-router-dom"

export default class LoginChange extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        // this.props.logout();

        this.state = {
            email: "",
            password: "",
            submitted: false,
            myuser: undefined,
            listOfUsers: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    getInfo() {
        let myUrl = 'https://5cb2d49e6ce9ce00145bef17.mockapi.io/api/v1/users';
        fetch(myUrl)
            .then(res => res.json())
            .then(data => {
                var user = data.find(e => e.email === this.state.email);
                if (user !== undefined) {
                    if(this.state.password == user.password)
                    {
                        this.setState({ myuser: user })
                        alert("You have logged in successfully")
                    }
                    else
                    {
                        alert("Wrong password!")
                    }
                }
                else
                {
                    alert("User does not exist!")
                }

            })
    }
    reDirecting() {
        if (this.state.myuser !== undefined) {
            return <Redirect to={"/Profile/" + this.state.myuser.userName} />
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { email, password } = this.state;
        if (email && password) {
            // eslint-disable-next-line no-restricted-globals
            history.push("/");
        } else {
            alert("Some thing is missing");
        }
    }

    render() {
        return (
            <div>
                {this.reDirecting()}
                <div>
                    <nav class="navbar navbar-light navbar-expand-md sticky-top navigation-clean-button" style={{ height: '80px', backgroundColor: '#37434d', color: '#ffffff' }} >
                        <div class="container-fluid">
                            <a class="navbar-brand" href="#">
                                <i class="fa fa-globe"></i>&nbsp;Milestone 1
                            </a>
                            <ul class='navbar-nav'>
                                <li class='nav-item'>
                                    <input
                                        class="d-md ml-auto rounded"
                                        icon="envelop"
                                        style={{ marginTop: '7px' }}
                                        name="email"
                                        type="email"
                                        value={this.state.email}
                                        placeholder="Your email"
                                        onChange={this.handleChange.bind(this)}
                                    />
                                </li>
                                <li class='nav-item'>
                                    <input
                                        class="d-md ml-auto rounded"
                                        style={{ marginTop: '7px' }}
                                        name="password"
                                        type="password"
                                        value={this.state.password}
                                        placeholder="Your password"
                                        onChange={this.handleChange.bind(this)}
                                    />
                                </li>
                                <li class='nav-item'>
                                    <button
                                        type="button"
                                        class="btn btn-primary btn-sm"
                                        onClick={this.getInfo.bind(this)}
                                    >Log in</button>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        )
    }
}