import React from 'react'
import "../App.css";
import OneAd from './OneAp';
import { Link } from "react-router-dom";
import { docClient } from './backend'


export default class ApList extends React.Component {
    constructor(props) {
        super(props)
        this.fetchData = this.fetchData.bind(this)
        this.state = {
            aps: [],
            refresh: true

        }
    }

    // Fetch the list appointment that the logged in user has made
    fetchData() {
        
        var param = {
            TableName: 'appointments',
        }
        docClient.scan(param, function (err, data) {
            if (err) {
                console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
                if(this.props.userName === "admin")
                {
                    this.setState({ aps: data.Items })
                }
                else
                {
                    this.setState({ aps: data.Items.filter(a=>a.guest_name === this.props.userName)})
                }

            }
        }.bind(this));
    }

    // This method is called within the OneAp component
    deleteFunction(value) {
        var confirmation = window.confirm("Do you want to delete this appointment?")
        if (confirmation === true) {
            var params = {
                TableName: "appointments",
                Key: { "id": value },
            };

            docClient.delete(params, function (err, data) {
                if (err) {
                    console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
                    this.fetchData()
                }
            }.bind(this));
        }


    }

    // This method is called within the OneAp component to approve appointment
    approveFunction(value) {
        var params = {
            TableName: "appointments",
            Key: { "id": value },
            UpdateExpression: "set status = :s",
            ExpressionAttributeValues: {
                ":s": "Approved"
            }
        };

        docClient.update(params, function (err, data) {
            if (err) {
                console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                this.fetchData()
            }
        }.bind(this));
    }
    // Start the component with the mentioned method
    componentDidMount() {
        this.fetchData()

    }

    render() {
        if (this.state.aps.length === 0) {
            return (<div >
                <main className="bg-dark page landing-page" style={{ paddingTop: '50px' }}>
                    <section className="bg-dark clean-block clean-info dark">
                        <div className="container bg-dark">
                            <div className="block-heading">
                                <h2 className="text-monospace text-info">List of Appointments</h2>

                            </div>
                            <div className="row align-items-center mt-5">
                                <h1 style={{ color: "white", padding: "15px" }}>There is no appointment</h1>
                            </div>
                        </div>
                    </section>
                </main>
            </div>)
        }
        return (
            <div >
                <main className="bg-dark page landing-page" style={{ paddingTop: '50px' }}>
                    <section className="bg-dark clean-block clean-info dark">
                        <div className="container bg-dark">
                            <div className="block-heading">
                                <h2 className="text-monospace text-info">List of Appointments</h2>

                            </div>
                            <div className="row align-items-center mt-5" style={{padding:"20px"}}>

                                {this.state.aps.map((a) =>
                                    <div style={{ color: "inherit", textDecoration: "none" }} className="col-lg-4 pb-4">
                                        <OneAd
                                            appointmentId={a.id}
                                            userName={a.guest_name}
                                            title={a.title}
                                            location={a.address}
                                            time={a.meetingdate}
                                            avatar={a.avatar}
                                            status={a.status}
                                            deleteFunction={this.deleteFunction}
                                            approveFunction={this.approveFunction}
                                            admin={this.props.admin} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        )
    }
}