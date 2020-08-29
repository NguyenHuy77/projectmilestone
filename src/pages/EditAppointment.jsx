import React from 'react'
import DateTimePicker from 'react-datetime-picker';

const myPut = "https://5cb2d49e6ce9ce00145bef17.mockapi.io/api/v1/appointments"
export default class EditAppointment extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            oneApp: [],
            type: 'text',
            title: "",
            guest_name: "",
            meetingdate: "",
            meeting_user: "",
            note: "",
            status: "",
            location: "",
            building: 1,
            floor: 1,
            room: 1,
            locations:[],
            teachers:[]
        }
    }

    fetchAppointment() {
        const { match: { params } } = this.props
        fetch(myPut + "/" + params.appointmentId)
            .then(response => response.json())
            .then(json => {
                this.setState({ oneApp: json })
            })
            .then(() => this.displayInfo())
    }
    
    // Acessing data from API recall
    displayInfo() {
        // Spliting the location into different fields
        //var locationSplit = []
       // locationSplit = this.state.oneApp.location.split(".")
        var date = new Date(this.state.oneApp.meetingdate)
        this.setState({
            title: this.state.oneApp.title,
            meetingdate: date,
            meeting_user: this.state.oneApp.meeting_user,
            note: this.state.oneApp.note,
            location: this.state.oneApp.location
            //building: locationSplit[0],
            //floor: locationSplit[1],
            //room: locationSplit[2]
        })
    }
    
    // Register changes to the state
    handleChange(event) {
        let obj = []
        obj[event.target.name] = event.target.value
        this.setState(obj)
    }
    onChangeDate = meetingdate => this.setState({ meetingdate })

    // Not currently in use, for development reference only
    onFocus() {
        this.setState({
            type: 'date'
        })
    }

    // Not currently in use, for development reference only
    onBlur() {
        this.setState({
            type: 'text'
        })
    }

    // The Put method for updating an appointment's fields
    handleUpdate() {
        // Re-combining fields into one location field 
        // for easy update, not currently in use
        var location = this.state.building + "." + this.state.floor + "." + this.state.room
        fetch(myPut + '/' + this.state.oneApp.id, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'put',
            body: JSON.stringify({
                title: this.state.title,
                meetingdate: this.state.meetingdate,
                meeting_user: this.state.meeting_user,
                note: this.state.note,
                location: this.state.location
            })
        })
            .then(() => this.fetchAppointment())
        alert('The appointment has been successfully updated')
    }

    // Fetch the available teachers for people to choose from
    fetchTeachers() {
        let url = "https://5f4529863fb92f0016754661.mockapi.io/teachers"
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({ teachers: data })
            })
    }

    // Fetch the available locations for people to choose from
    fetchLocations() {
        let url = "https://5f4529863fb92f0016754661.mockapi.io/locations"
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({ locations: data })
            })
    }

    // Start the component with the mentioned method called
    componentDidMount() {
        this.fetchAppointment();
        this.fetchLocations();
        this.fetchTeachers();
        console.log('Fetched') // Test whether they run succesfully
    }

    render() {
        return (
            <div className="container">
                <h1>Edit Your Appointment</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder={this.state.title}
                            name="title"
                            onChange={this.handleChange.bind(this)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Meeting Date</label>
                        <h3>Meeting Date</h3>
                        <DateTimePicker  value ={this.state.meetingdate}
                        onChange = {this.onChangeDate} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="meetingperson">Meeting Person</label>
                        <select name="meeting_user" onChange={this.handleChange.bind(this)}>
                            {this.state.teachers.map(e => {
                                if(e.name === this.state.meeting_user)
                                {
                                    return <option value={e.name} selected>{e.name}</option>
                                }
                                return <option value={e.name}>{e.name}</option>
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <h2>Location</h2>
                        <select 
                        onChange={this.handleChange.bind(this)} 
                        >
                            {this.state.locations.map(e => {
                                
                                if(e.location === this.state.location)
                                {
                                    
                                    return <option value={e.location} selected>{e.location}</option>
                                }
                                else
                                {
                                    return <option value={e.location}>{e.location}</option>
                                }
                            })}
                        </select>
                        {/* Building :
                        <input
                            type="number"
                            className="form-control"
                            name="building"
                            placeholder={this.state.building}
                            onChange={this.handleChange.bind(this)}
                        />
                        Floor :
                        <input
                            type="number"
                            className="form-control"
                            name="floor"
                            placeholder={this.state.floor}
                            onChange={this.handleChange.bind(this)}
                        />
                        Room :
                        <input
                            type="number"
                            className="form-control"
                            name="room"
                            placeholder={this.state.room}
                            onChange={this.handleChange.bind(this)}
                        /> */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="note">Note</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder={this.state.note}
                            name="note"
                            onChange={this.handleChange.bind(this)}
                        />
                    </div>
                </form>
                <button className="btn btn-primary" onClick={this.handleUpdate.bind(this)}>Save Changes</button>
            </div>
        )
    }
}