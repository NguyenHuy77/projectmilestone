import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Link } from "react-router-dom"
import Appointment from './Appointment'
import Calendar from './Calendar'
import ApList from './ApList'
import EditAppointment from './EditAppointment';
import { Redirect } from 'react-router-dom';
import RegisterChange from './RegisterChange';
import { docClient } from './backend'
import { parseMarker } from '@fullcalendar/core'
import FeedbackList from './FeedbackList'
import SimpleReactValidator from 'simple-react-validator'

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
            avatar: '',
            password: '',
            npassword: '',
            cnpassword: '',
            address: '',
            city: '',
            country: ''
        }
        this.validator = new SimpleReactValidator({autoForceUpdate: this})
    }

    // Fetch the account using props passed down from the Login component
    fectchAccount() {
        const { match: { params } } = this.props; // Seperate params from props for easier future call
        if (this.state.user.id == undefined) {
            var param = {}
            var hashKey = { "userid": params.userName }
            param.TableName = 'users'
            param.Key = hashKey
            console.log(params.userName)
            docClient.get(param, function (err, data) {
                if (err) {
                    console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    //console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
                    this.setState({
                        user: data.Item,
                        userName: data.Item.userName,
                        email: data.Item.email,
                        lastName: data.Item.lastName,
                        firstName: data.Item.firstName,
                        avatar: data.Item.avatar,
                        address: data.Item.address,
                        city: data.Item.city,
                        country: data.Item.country
                    })

                }
            }.bind(this));

        }
    }
    handleAvatar() {
        if (this.state.user.avatar === "undefined") {
            return "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/256x256/plain/user.png"
        }

        return this.state.user.avatar

    }
    // Prepare the found account for display
    refresh() {
        const { match: { params } } = this.props; // Seperate params from props for easier future call
        if (this.state.user.id == undefined) {
            var param = {}
            var hashKey = { "userid": params.userName }
            param.TableName = 'users'
            param.Key = hashKey
            console.log(params.userName)
            docClient.get(param, function (err, data) {
                if (err) {
                    console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
                    this.setState({ user: data.Item })

                }
            }.bind(this));

        }
    }

    // The Put method for updating user's information
    handleUpdate() {
        var params = {
            TableName: "users",
            Key: { "userid": this.state.user.userid, },
            UpdateExpression: "set email = :e, firstName = :f, lastName = :l",
            ExpressionAttributeValues: {
                ":e": this.state.email,
                ":f": this.state.firstName,
                ":l": this.state.lastName,
            },
            ReturnValues: "UPDATED_NEW"
        };
        if (// Check if the needed fields are not empty
            this.validator.fieldValid('email') &&
            this.validator.fieldValid('firstName') &&
            this.validator.fieldValid('lastName')
        ) {// The Put method will be as follow
            docClient.update(params, function (err, data) {
                if (err) {
                    console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    console.log("Update Item succeeded:", JSON.stringify(data, null, 2));
                    this.fectchAccount()
                }
            }.bind(this));
            alert('The account has been successfully updated')
        } else {
            this.validator.showMessages()
        }
    }

    // Similar to the Put method above but is designed to the avatar change only
    handleUpdateAvatar() {
        var params = {
            TableName: "users",
            Key: { "userid": this.state.user.userid, },
            UpdateExpression: "set avatar = :a",
            ExpressionAttributeValues: {
                ":a": this.state.avatar,
            },
            ReturnValues: "UPDATED_NEW"
        };
        if (
            this.validator.fieldValid('avatar')
        ) {
            docClient.update(params, function (err, data) {
                if (err) {
                    console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                    this.fectchAccount()
                }
            }.bind(this));
            alert('The avatar has been successfully updated')
        } else {
            this.validator.showMessages()
        }
    }

    // Similar to the Put method above but is designed for the password change only
    handleChangePassword() {
        var params = {
            TableName: "users",
            Key: { "userid": this.state.user.userid, },
            UpdateExpression: "set password = :p",
            ExpressionAttributeValues: {
                ":p": this.state.npassword,
            },
            ReturnValues: "UPDATED_NEW"
        };

        console.log("Updating the item...");

        if (
            this.validator.fieldValid('password') &&
            this.validator.fieldValid('npassword') &&
            this.validator.fieldValid('cnpassword')
        ) {
            if (this.state.password === this.state.user.password) {
                if (this.state.npassword === this.state.cnpassword) {
                    docClient.update(params, function (err, data) {
                        if (err) {
                            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                        } else {
                            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                            this.fectchAccount()
                        }
                    }.bind(this));
                    alert('The password has been successfully updated')
                } else {
                    alert("The new password does not match")
                }
            } else {
                alert('Check your password again')
            }
        } else {
            this.validator.showMessages()
        }
    }
    checkFeedBack()
    {
        if(this.state.user.userName ==="admin")
        {
            return <li>
            <Link to={"/Profile/" + this.state.user.userName + "/ViewFeedbacks"}>View Feedbacks</Link>
        </li>
        }
    }
    logOut() {
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
                                                <img alt={this.state.user.avatar} className="rounded-circle mb-3 mt-4" src={this.handleAvatar()} width="160" height="160" />
                                                <div className="mb-3">

                                                    <input
                                                        className="form-control"
                                                        type="email"
                                                        placeholder={this.state.user.avatar}
                                                        value={this.state.avatar}
                                                        name="avatar"
                                                        onChange={this.handleChange.bind(this)}
                                                    />
                                                    {this.validator.message('avatar', this.state.avatar, 'required|url')}
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
                                                    {this.checkFeedBack()}
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
                                            <Route path="/Profile/:userName/ViewFeedbacks" render={(props) => <FeedbackList/>} />
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
                                        {this.validator.message('email', this.state.email, 'required|email')}
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
                                        {this.validator.message('firstName', this.state.firstName, 'required|alpha')}
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
                                        {this.validator.message('lastName', this.state.lastName, 'required|alpha')}
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
                            <div className="form-group"><label htmlFor="address"><strong>Address</strong></label>
                                <input placeholder={this.state.user.address}
                                    value={this.state.address}
                                    onChange={this.handleChange.bind(this)}
                                    className="form-control" type="text" name="address" />
                            </div>
                            <div className="form-row">
                                <div className="col">
                                    <div className="form-group"><label htmlFor="city"><strong>City</strong></label>
                                        <input placeholder={this.state.user.city}
                                            value={this.state.city}
                                            onChange={this.handleChange.bind(this)}
                                            className="form-control" type="text" name="city" /></div>
                                </div>
                                <div className="col">
                                    <div className="form-group"><label htmlFor="country"><strong>Country</strong></label>
                                        <input placeholder={this.state.user.country}
                                            value={this.state.country}
                                            onChange={this.handleChange.bind(this)}
                                            className="form-control" type="text" name="country" /></div>
                                </div>
                            </div>
                            <div className="form-group"><button className="btn btn-primary btn-sm" type="submit">Save&nbsp;Settings</button></div>
                        </form>
                    </div>
                </div>
                <div className="card shadow" visible="false">
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
                                        {this.validator.message('password', this.state.password, 'required')}
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
                                        {this.validator.message('npassword', this.state.npassword, 'required')}
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
                                        {this.validator.message('cnpassword', this.state.cnpassword, 'required')}
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