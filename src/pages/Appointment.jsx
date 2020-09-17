import React, { Component } from 'react'
import DateTimePicker from 'react-datetime-picker';
import { docClient } from './backend'
import { v4 as uuidv4 } from 'uuid'; // For version 4
import SimpleReactValidator from 'simple-react-validator'
import moment from 'moment'
import { WindowScrollController } from '@fullcalendar/core';

window.moment = moment

export default class Appointment extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: "",
            guest_name: "",
            meetingdate: "",
            meetingtime: "",
            meeting_user: "",
            note: "",
            status: "",
            building: 1,
            floor: 1,
            room: 1,
            location: "",
            teachers: [],
            locations: []
        }
        this.validator = new SimpleReactValidator({ autoForceUpdate: this })
    }
    resetState() {
        this.setState({
            title: "",
            guest_name: "",
            meetingdate: "",
            meetingtime: "",
            meeting_user: "",
            note: "",
            status: "",
            building: 1,
            floor: 1,
            room: 1,
            location: ""
        })
    }
    handleChangeTitle(event) {
        // let obj = []
        // obj[event.target.name] = event.target.value
        // console.log(this.state.appoinment.guest_name)
        // this.setState(obj)
        this.setState({
            title: event.target.value
        });
    }
    handleChangeGuestName(event) {
        // let obj = []
        // obj[event.target.name] = event.target.value
        // console.log(this.state.appoinment.guest_name)
        // this.setState(obj)
        this.setState({
            guest_name: event.target.value
        });
    }
    handleChangeMeetingDate(event) {
        this.setState({
            meetingdate: event.target.value
        });
    }
    handleChangeMeetingTime(event) {
        this.setState({
            meetingtime: event.target.value
        });
    }
    handleChangeMeetingLocation(event) {
        this.setState({
            location: event.target.value
        });
    }
    handleChangeMeetinUser(event) {
        this.setState({
            meeting_user: event.target.value
        });
    }
    handleChangeNote(event) {
        this.setState({
            note: event.target.value
        });
    }
    handleChange(event) {
        let obj = []
        obj[event.target.name] = event.target.value
        this.setState(obj)
    }
    fetchTeachers() {
        let url = "https://5f4529863fb92f0016754661.mockapi.io/teachers"
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({ teachers: data })
            })
    }
    fetchLocations() {
        let url = "https://5f4529863fb92f0016754661.mockapi.io/locations"
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({ locations: data })
            })
    }
    fetchAppointmentCreate() {

        var inputDate = new Date();
        
        inputDate.setTime(this.state.meetingdate);
        
        console.log(inputDate)
        var input = {
            id: uuidv4(),
            title: this.state.title,
            guest_name: this.props.guest_name,
            meetingdate: inputDate.toString(),
            meeting_user: this.state.meeting_user,
            stat: "OnProgress",
            note: this.state.note,
            address: this.state.location
        }

        //console.log(account)
        if (this.validator.allValid()) {
            var params = {
                TableName: "appointments",
                Item: input
            };
            docClient.put(params, function (err, data) {

                if (err) {
                    console.log("users::save::error - " + JSON.stringify(err, null, 2));
                } else {
                    this.resetState();
                    this.props.refreshProfile();
                    alert("You have successfully created an appointment")
                }
            }.bind(this))
        } else {
            console.log("error")
            this.validator.showMessages()
        }


    }
    componentDidMount() {
        this.fetchTeachers()
        this.fetchLocations()
    }
    onChangeDate = meetingdate => this.setState({ meetingdate })
    render() {
        return (
            <div className="container">
                <h1>Appointment Form</h1>
                <form>
                    <div className="form-group">
                        <h3>Title</h3>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter the appointment's title"
                            name="title"
                            onChange={this.handleChangeTitle.bind(this)}
                        />
                        {this.validator.message('title', this.state.title, ['required', { max: 50 }, { min: 5 }])}
                    </div>

                    <div className="form-group">
                        <h3>Meeting Date</h3>
                        <DateTimePicker value={this.state.meetingdate}
                            onChange={this.onChangeDate} disableClock/>
                        {/* <input
                            type='date'
                            name='date'
                            value={this.state.meetingdate}
                            onChange={this.handleChangeMeetingDate.bind(this)}
                        />
                        {this.validator.message('date', moment(this.state.meetingdate), ['required', { after_or_equal: moment() }, { before: moment().add(7, 'day') }])} */}
                    </div>
                    <div className="form-group">
                        <h3>Meeting Person</h3>
                        <select onChange={this.handleChangeMeetinUser.bind(this)}>
                            {this.state.teachers.map(e => {
                                return <option value={e.name}>{e.name}</option>
                            })}
                        </select>

                    </div>
                    <div className="form-group">
                        <h3>Location</h3>
                        <select onChange={this.handleChangeMeetingLocation.bind(this)}>
                            {this.state.locations.map(e => {
                                return <option value={e.location}>{e.location}</option>
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <h3>Note</h3>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter if there is any prior note"
                            name="note"
                            onChange={this.handleChangeNote.bind(this)} />
                    </div>
                </form>
                <button className="btn btn-primary" onClick={this.fetchAppointmentCreate.bind(this)}>Make appointment</button>
            </div>
        )
    }
}
