import React from 'react'
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
//import Profile from './Profile'

const myPost = 'https://5cb2d49e6ce9ce00145bef17.mockapi.io/api/v1/users'
export default class Register extends React.Component {
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

    handleChange(event) {
        let obj = []
        obj[event.target.name] = event.target.value
        this.setState(obj)
    }

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
                userName: this.state.userName,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password
            }
            console.log(account)
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
    refreshPage() {
        if (this.state.registered) {
            return <Redirect to="/" />
        }
    }
    render() {
        return (
            <div>
                <div class='container rounded' style={{ height: '650px', width: '800px', border: '2px solid grey' }}>
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
                                icon='envelope'
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
                                icon='envelope'
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
                                icon='envelope'
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

                        <MDBBtn type='button' color='deep-orange' onClick={this.handleAdd.bind(this)}>
                            SIGN UP
                                </MDBBtn>
                        {this.refreshPage()}
                        
                            <Link to="/">
                            <MDBBtn type='button' color='deep-green'>Already had an account?
                            </MDBBtn>
                            </Link>
                                
                    </MDBModalFooter>
                </div>

                <div>

                </div>
            </div >
        )
    }

} 