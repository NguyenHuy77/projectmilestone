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
import { docClient } from './backend'
export default class LoginChange extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        // this.props.logout();

        this.state = {
            admin: "",
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
        var params = {
            TableName: 'users',
        }
        docClient.scan(params, function (err, data) {
            if (err) {
                console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
                var user = data.Items.find(e => e.email === this.state.email);
                if (user === undefined) {
                    alert("User does not exist!")
                    return;
                }
                if (this.state.password == user.password) {
                    this.setState({ myuser: user })
                    alert("You have logged in successfully")
                    return;
                }
                else {
                    alert("Wrong password!")
                    return;
                }

            }
        }.bind(this));
        // let myUrl = 'https://5cb2d49e6ce9ce00145bef17.mockapi.io/api/v1/users';
        // fetch(myUrl)
        //     .then(res => res.json())
        //     .then(data => {
        //         var user = data.find(e => e.email === this.state.email);
        //         if (user !== undefined) {
        //             if(this.state.password == user.password)
        //             {
        //                 this.setState({ myuser: user })
        //                 alert("You have logged in successfully")
        //             }
        //             else
        //             {
        //                 alert("Wrong password!")
        //             }
        //         }
        //         else
        //         {
        //             alert("User does not exist!")
        //         }

        //     })
    }
    reDirecting() {
        if (this.state.admin === "admin") {
            return <Redirect to={"/Admin"} />
        }
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