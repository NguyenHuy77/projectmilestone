import React from 'react'
import LoginChange from './LoginChange'
import {
    //MDBContainer,
    MDBBtn,
    //MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBModalFooter,
    MDBInput,
} from 'mdbreact';
import { Link, Redirect } from 'react-router-dom'
import Contact from './Contact';

const myPost = 'https://5cb2d49e6ce9ce00145bef17.mockapi.io/api/v1/users'
export default class RegisterChange extends React.Component {
    constructor() {
        super();
        this.state = {
            userName: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            registered: false
        }
    }

    // Register changes to the state
    handleChange(event) {
        let obj = []
        obj[event.target.name] = event.target.value
        this.setState(obj)
    }

    // Perform a Post method to send data
    // to an API
    handleAdd() {
        if (this.state.name === '' |
            this.state.email === '' |
            this.state.password === '' |
            this.state.firstName === '' |
            this.state.lastName === ''
        ) {
            alert('Something is missing')
        } else {
            let account = {
                // Defining fields to be presented at the API
                userName: this.state.userName,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password
            }
            console.log(account) // This command is to test whether the object above is created
            // The Post method
            fetch(myPost, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'post',
                body: JSON.stringify(account)
            })
                .then(json => {
                    alert('You have signed up successfully!')
                    this.setState({ registered: true })
                })
        }
    }

    // Controlling unwanted redirection
    refreshPage() {
        if (this.state.registered) {
            return <Redirect to="/" />
        }
    }

    render() {
        return (
            <div>
                <LoginChange />
                <div class='row'>
                    {/* This part is for the map display */}
                    <div class='col' style={{ border: '2px solid grey', paddingLeft: '30px' }}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1959.3865447437727!2d106.67931670809078!3d10.828669348071534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528fe994bbcaf%3A0x57fc04b92e1b4ebe!2zROG7sSDDoW4gQ2VudGVyIEhpbGxzIEfDsiBW4bqlcCwgUGjGsOG7nW5nIDcsIEfDsiBW4bqlcCwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1596602735408!5m2!1svi!2s"
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            allowFullScreen="true"
                            aria-hidden="false"
                            tabIndex="0"
                            title="map"

                        ></iframe>
                    </div>
                    {/* This part is for the register form */}
                    <div class='col'>
                        <div class='container rounded' style={{ height: '100%', width: '100%', border: '2px solid grey' }}>
                            <MDBModalHeader
                                className='text-center'
                                titleClass='w-100 font-weight-bold'
                            >
                                Sign up
                            </MDBModalHeader>
                            <MDBModalBody>
                                <form className='mx-3 grey-text'>
                                    <MDBInput
                                        label='Username'
                                        icon='user'
                                        group
                                        name='userName'
                                        type='text'
                                        value={this.state.userName}
                                        validate
                                        error='wrong'
                                        success='right'
                                        onChange={this.handleChange.bind(this)}
                                    />
                                    <MDBInput
                                        label='First name'
                                        icon='signature'
                                        group
                                        name='firstName'
                                        type='text'
                                        value={this.state.firstName}
                                        validate
                                        error='wrong'
                                        success='right'
                                        onChange={this.handleChange.bind(this)}
                                    />
                                    <MDBInput
                                        label='Last name'
                                        icon='signature'
                                        group
                                        name='lastName'
                                        type='text'
                                        value={this.state.lastName}
                                        validate
                                        error='wrong'
                                        success='right'
                                        onChange={this.handleChange.bind(this)}
                                    />
                                    <MDBInput
                                        label='Your email'
                                        icon='envelope'
                                        group
                                        name='email'
                                        type='email'
                                        value={this.state.email}
                                        validate
                                        error='wrong'
                                        success='right'
                                        onChange={this.handleChange.bind(this)}
                                    />
                                    <MDBInput
                                        label='Your password'
                                        icon='lock'
                                        group
                                        name='password'
                                        type='password'
                                        value={this.state.password}
                                        validate
                                        onChange={this.handleChange.bind(this)}
                                    />
                                </form>
                            </MDBModalBody>
                            <MDBModalFooter className='justify-content-center'>
                                <MDBBtn
                                    type='button'
                                    color='deep-orange'
                                    onClick={this.handleAdd.bind(this)}
                                >
                                    SIGN UP
                                </MDBBtn>
                                {this.refreshPage()}
                            </MDBModalFooter>
                        </div>

                        <div>

                        </div>
                    </div>
                </div>
                <Contact/>
            </div>
        )
    }
}