import React, { Component } from 'react'
import DateTimePicker from 'react-datetime-picker';
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
            location:"",
            teachers: [],
            locations: []
        }
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
            location:""
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
        
        var input = {
            title: this.state.title,
            guest_name: this.props.guest_name,
            meetingdate: this.state.meetingdate,
            meeting_user: this.state.meeting_user,
            status: "OnProgress",
            note: this.state.note,
            location: this.state.location
        }
        var url = "https://5cb2d49e6ce9ce00145bef17.mockapi.io/api/v1/appointments"
        const response = fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            //ode: 'cors', // no-cors, *cors, same-origin
            //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            //credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            //redirect: 'follow', // manual, *follow, error
            //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(input) // body data type must match "Content-Type" header
        })
            .then(response => {
                this.resetState();
                this.props.refreshProfile();
                alert("You have successfully created an appointment")
            })
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
                    </div>

                    <div className="form-group">
                        <h3>Meeting Date</h3>
                         <DateTimePicker  value ={this.state.meetingdate}
                        onChange = {this.onChangeDate} />
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
