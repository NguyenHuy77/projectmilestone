import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Link } from "react-router-dom"
import Appointment from './Appointment'
import Calendar from './Calendar'
import ApList from './ApList'
import EditAppointment from './EditAppointment';
import { Redirect } from 'react-router-dom';
import RegisterChange from './RegisterChange';
const myGet = 'https://5cb2d49e6ce9ce00145bef17.mockapi.io/api/v1/users'
export default class Profile extends React.Component {
    constructor() {
        super()
        this.state = {
            user: {},
            account: [],
            id: '',
            userName: '',
            email: '',
            lastName: '',
            firstName: '',
            avatar:'',
            password:'',
            npassword:'',
            cnpassword:'',
        }
    }

    // Fetch the account using props passed down from the Login component
    fectchAccount() {
        const { match: { params } } = this.props; // Seperate params from props for easier future call
        if (this.state.user.id == undefined) {
            fetch(myGet)
                .then(res => res.json())
                .then(json => {
                    // Find the exact account among the retrieved data and add it to the state
                    let data = json.filter(a => a.userName === params.userName)
                    this.setState({ user: data[0] })                  
                })
        }
    }

    // Prepare the found account for display
    refresh() {
        const Url = 'https://5cb2d49e6ce9ce00145bef17.mockapi.io/api/v1/users/' + this.state.user.id;
        fetch(Url)
            .then(res => res.json())
            .then(json => {
                this.setState({ user: json })
            })

    }

    // The Put method for updating user's information
    handleUpdate() {       
        if (// Check if the needed fields are not empty
            this.state.email !== '' &&
            this.state.firstName !== '' &&
            this.state.lastName !== ''
        ) {// The Put method will be as follow
            fetch(myGet + '/' + this.state.user.id, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'put',
                body: JSON.stringify({
                    // Declare and stringify the fields that need updating
                    email: this.state.email,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName
                })
            })
                .then(() => this.props.fectchAccount()) // Fetch the exact account again to apply changes
            alert('The account has been successfully updated')
        } else {
            alert('Please enter correct information')
        }
    }

    // Similar to the Put method above but is designed to the avatar change only
    handleUpdateAvatar() {
        if (
          
            this.state.avatar !== ''
        ) {
          
            fetch(myGet + '/' + this.state.user.id, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'put',
                body: JSON.stringify({
                  
                    avatar: this.state.avatar
                })
            })
                .then(() => this.props.fectchAccount())
            alert('The avatar has been successfully updated')
        } else {
            alert('Please enter avatar source')
        }
    }

    // Similar to the Put method above but is designed for the password change only
    handleChangePassword(){
        if (
            this.state.password !== '' &&
            this.state.npassword !== '' &&
            this.state.cnpassword !== ''
        ) {
            if (this.state.password === this.state.user.password){
                if (this.state.npassword === this.state.cnpassword){
                    fetch(myGet + '/' + this.state.user.id, {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        method: 'put',
                        body: JSON.stringify({
                          
                            password: this.state.npassword
                        })
                    })
                        .then(() => this.props.fectchAccount())
                    alert('The password has been successfully updated')
                }  else{
                    alert("The new password does not match")
                }  
            } else{
                alert('Check your password again')
            }
        } else {
            alert('Please enter avatar source')
        }
    }

    logOut(){
        return <Redirect to="/"></Redirect>
    }

    // This block of code is for the left side of the screens, avatar and calendar
    displayInfo() {
        return (
            <div id="wrapper">
                <div key={this.state.user.id}>
                    <div className="d-flex flex-column" id="content-wrapper">
                        <div id="content">
                            <div className="container-fluid">
                                <h3 className="text-dark mb-4">Profile</h3>
                                <div className="row mb-3">
                                    <div className="col-lg-4">
                                        <div className="card mb-3">
                                            <div className="card-body text-center shadow">
                                                <img alt={this.state.user.avatar} className="rounded-circle mb-3 mt-4" src={this.state.user.avatar} width="160" height="160" />
                                                <div className="mb-3">
                                            
                                                <input
                                                    className="form-control"
                                                    type="email"
                                                    placeholder={this.state.user.avatar}
                                                    value={this.state.avatar}
                                                    name="avatar"
                                                    onChange={this.handleChange.bind(this)}
                                            />
                                            <button className="btn btn-primary btn-sm" type="submit" onClick={this.handleUpdateAvatar.bind(this)}>Change Photo</button>
                                        
                                            </div>
                                            </div>
                                            <div className="card-body text-center shadow">
                                                <ul>
                                                    <li>
                                                        <Link to={"/Profile/" + this.state.user.userName + ""}>Profile Setting</Link>
                                                    </li>
                                                    <li>
                                                        <Link to={"/Profile/" + this.state.user.userName + "/Appointments"}>Make Appointment</Link>
                                                    </li>
                                                    <li>
                                                        <Link to={"/Profile/" + this.state.user.userName + "/ViewAppointments"}>View Appointment</Link>
                                                    </li>
                                                    <li>
                                                        <Link to={"/"}>Log Out</Link>
                                                    </li>
                                                </ul>
                                                <Calendar userName={this.state.user.userName} />
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-lg-8">
                                        <Switch>
                                    
                                            <Route exact path="/Profile/:userName" render={e => this.displayProfile(this.state.user)} />
                                            <Route path="/Profile/:userName/Appointments" render={(props) => <Appointment guest_name={this.state.user.userName} refreshProfile={this.refresh.bind(this)} />} />
                                            <Route path="/Profile/:userName/ViewAppointments" render={(props) => <ApList userName={this.state.user.userName} />} />
                                            <Route path={`/Profile/:userName/:appointmentId`} render={(props) =>
                                                <EditAppointment {...props} />
                                            }>
                                            </Route>
                                            <Route path={`/`} render={(props) =>
                                                <RegisterChange {...props} />
                                            }>
                                            </Route>
                                        </Switch>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // This block of code is for the right side of the screen, displaying private information such as name and password
    displayProfile(a) {
        return <div className="row">
            <div className="col">
                <div className="card shadow mb-3">
                    <div className="card-header py-3">
                        <p className="text-primary m-0 font-weight-bold">User Settings</p>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="username">
                                            <strong>Username</strong>
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder={this.state.user.userName}
                                            value={this.state.userName}
                                            onChange={this.handleChange.bind(this)}
                                            disabled
                                            name="userName"
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="email">
                                            <strong>Email Address</strong>
                                        </label>
                                        <input
                                            className="form-control"
                                            type="email"
                                            placeholder={this.state.user.email}
                                            value={this.state.email}
                                            name="email"
                                            onChange={this.handleChange.bind(this)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="first_name">
                                            <strong>First Name</strong>
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder={this.state.user.firstName}
                                            value={this.state.firstName}
                                            name="firstName"
                                            onChange={this.handleChange.bind(this)}
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="last_name">
                                            <strong>Last Name</strong>
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder={this.state.user.lastName}
                                            value={this.state.lastName}
                                            name="lastName"
                                            onChange={this.handleChange.bind(this)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary btn-sm" type="submit" onClick={this.handleUpdate.bind(this)}>Save Settings</button>
                            </div>
                        </form>

                    </div>
                </div>
                <div className="card shadow">
                    <div className="card-header py-3">
                        <p className="text-primary m-0 font-weight-bold">Contact Settings</p>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group"><label htmlFor="address"><strong>Address</strong></label><input className="form-control" type="text" placeholder="Sunset Blvd, 38" name="address" /></div>
                            <div className="form-row">
                                <div className="col">
                                    <div className="form-group"><label htmlFor="city"><strong>City</strong></label><input className="form-control" type="text" placeholder="Los Angeles" name="city" /></div>
                                </div>
                                <div className="col">
                                    <div className="form-group"><label htmlFor="country"><strong>Country</strong></label><input className="form-control" type="text" placeholder="USA" name="country" /></div>
                                </div>
                            </div>
                            <div className="form-group"><button className="btn btn-primary btn-sm" type="submit">Save&nbsp;Settings</button></div>
                        </form>
                    </div>
                </div>
                <div className="card shadow" visible ="false">
                    <div className="card-header py-3">
                        <p className="text-primary m-0 font-weight-bold">Private Information</p>
                    </div>
                    <div className="card-body" >
                        <form>
                        <div className="form-row">
                              
                            <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="email">
                                            <strong>Last Password</strong>
                                        </label>
                                        <input
                                            className="form-control"
                                            type="password"
                                            value={this.state.password}
                                            name="password"
                                            onChange={this.handleChange.bind(this)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="first_name">
                                            <strong>New Password</strong>
                                        </label>
                                        <input
                                            className="form-control"
                                            type="password"
                                            value={this.state.npassword}
                                            name="npassword"
                                            onChange={this.handleChange.bind(this)}
                                        />
                                    </div>
                                </div>
                               
                            </div>
                            <div className="form-row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="first_name">
                                            <strong>Confirm New Password</strong>
                                        </label>
                                        <input
                                            className="form-control"
                                            type="password"
                                            value={this.state.cnpassword}
                                            name="cnpassword"
                                            onChange={this.handleChange.bind(this)}
                                        />
                                    </div>
                                </div>
                               
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary btn-sm" type="submit" onClick={this.handleChangePassword.bind(this)}>Change Password</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    }

    // Register changes to the state
    handleChange(event) {
        let obj = []
        obj[event.target.name] = event.target.value
        this.setState(obj)
    }

    // Start the component with the defined method called immediately
    componentDidMount() {
        this.fectchAccount()
    }

    render() {
        return (
            <div>
                {this.displayInfo()}
            </div>
        )
    }
}