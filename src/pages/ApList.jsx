import React from 'react'
import "../App.css";
import OneAd from './OneAp';
import {  Link } from "react-router-dom";



export default class ApList extends React.Component {
    constructor(props) {
        super(props)
        this.fetchData = this.fetchData.bind(this)
        this.state = {
             aps:[],
             refresh:false
    
        }
    }

    // Fetch the list appointment that the logged in user has made
    fetchData() {
        let url = "https://5cb2d49e6ce9ce00145bef17.mockapi.io/api/v1/appointments"
        fetch(url)
            .then(response => response.json())
            .then(data => {          
                this.setState({aps:data})
            })
    }

    // This method is called within the OneAp component
    deleteFunction(value)
    {
        var confirmation = window.confirm("Do you want to delete this appointment?")
        if(confirmation=== true)
        {
        var url = "https://5cb2d49e6ce9ce00145bef17.mockapi.io/api/v1/appointments/" +value
        const response = fetch(url, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        })
            .then(response => {
                this.setState({refresh:true})
                alert("You have successfully deleted an appointment");
            })
        }
    }

    // This method is called within the OneAp component to approve appointment
    approveFunction(value)
    {
        var confirmation = window.confirm("Do you want to approve this appointment?")
        if(confirmation=== true)
        {
        var url = "https://5cb2d49e6ce9ce00145bef17.mockapi.io/api/v1/appointments/" +value

        fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'put',
            body: JSON.stringify({
                status: "Approved"
            })
        })

        const response = fetch(url, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            
        })
            .then(response => {
                this.setState({refresh:true})
                alert("You have successfully approved an appointment");
            })
        }
    }
    // Start the component with the mentioned method
    componentDidMount() {
        this.fetchData()
        
    }

    render() {
        return (
            <div >
                 <main className="bg-dark page landing-page" style={{ paddingTop: '50px' }}>
                    <section className="bg-dark clean-block clean-info dark">
                        <div className="container bg-dark">
                            <div className="block-heading">
                                <h2 className="text-monospace text-info">List of Appointments</h2>
                              
                            </div>
                            <div className="row align-items-center mt-5">
                            {this.state.aps.map((a)=>
                    <Link to={`/advertisement/${a.id}`} style={{ color: "inherit", textDecoration: "none" }} className="col-lg-4 pb-4">
                        <OneAd 
                        appointmentId ={a.id}
                        userName = {a.guest_name} 
                        title={a.title} 
                        location={a.location} 
                        time={a.meetingdate} 
                        avatar={a.avatar}
                        status={a.status}
                        deleteFunction = {this.deleteFunction}
                        approveFunction = {this.approveFunction}
                        admin = {this.props.admin}/>
                    </Link>
                    )}
                            </div>
                        </div>
                    </section>
                    </main>
            </div>
        )
    }
}