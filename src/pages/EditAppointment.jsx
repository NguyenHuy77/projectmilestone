import React from 'react'
import DateTimePicker from 'react-datetime-picker';
import { docClient } from './backend'
import SimpleReactValidator from 'simple-react-validator'
import moment from 'moment'

window.moment = moment

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
            locations: [],
            teachers: []
        }
        this.validator = new SimpleReactValidator({ autoForceUpdate: this })
    }

    fetchAppointment() {
        const { match: { params } } = this.props; // Seperate params from props for easier future call        
        var param = {}
        var hashKey = { "id": params.appointmentId }
        param.TableName = 'appointments'
        param.Key = hashKey
        console.log(params.userName)
        docClient.get(param, function (err, data) {
            if (err) {
                console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
                this.setState({
                    oneApp: data.Item,
                    title: data.Item.title,
                    guest_name: data.Item.guest_name,
                    meetingdate: data.Item.meetingdate,
                    meeting_user: data.Item.meeting_user,
                    note: data.Item.note,
                    status: data.Item.stat,
                    location: data.Item.address,
                })

            }
        }.bind(this));
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
        //var location = this.state.building + "." + this.state.floor + "." + this.state.room
        if (this.validator.allValid()) {
            var params = {
                TableName: "appointments",
                Key: { "id": this.state.oneApp.id },
                UpdateExpression: "set title = :t, meetingdate = :md, meeting_user = :mu, note = :n, address = :l",
                ExpressionAttributeValues: {
                    ":t": this.state.title,
                    ":md": this.state.meetingdate,
                    ":mu": this.state.meeting_user,
                    ":n": this.state.note,
                    ":l": this.state.location,
                },
                ReturnValues: "UPDATED_NEW"
            };

            docClient.update(params, function (err, data) {
                if (err) {
                    console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                    alert('The appointment has been successfully updated')
                    this.fetchAppointment()
                }
            }.bind(this));
        } else {
            this.validator.showMessages()
        }
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
                            placeholder={this.state.oneApp.title}
                            name="title"
                            onChange={this.handleChange.bind(this)}
                        />
                        {this.validator.message('title', this.state.title, ['required', { max: 50 }, { min: 5 }])}
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Meeting Date</label>
                        <h3>Meeting Date</h3>
                        {/* <DateTimePicker value={this.state.oneApp.meetingdate}
                            onChange={this.onChangeDate} /> */}
                        <input
                            type='date'
                            name='date'
                            value={this.state.meetingdate}
                            onChange={this.handleChange.bind(this)}
                        />
                        {this.validator.message('date', moment(this.state.meetingdate), ['required', { after_or_equal: moment() }, { before: moment().add(7, 'day') }])}
                    </div>
                    <div className="form-group">
                        <h2>Meeting Person</h2>
                        <select name="meeting_user" onChange={this.handleChange.bind(this)}>
                            {this.state.teachers.map(e => {
                                if (e.name === this.state.oneApp.meeting_user) {
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

                                if (e.location === this.state.oneApp.address) {

                                    return <option value={e.location} selected>{e.location}</option>
                                }
                                else {
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
                            placeholder={this.state.oneApp.note}
                            name="note"
                            onChange={this.handleChange.bind(this)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="note">Status </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder={this.state.oneApp.note}
                            name="note"
                            value={this.state.oneApp.stat}
                            disabled
                        />
                    </div>
                </form>
                <button className="btn btn-primary" onClick={this.handleUpdate.bind(this)}>Save Changes</button>
            </div>
        )
    }
}