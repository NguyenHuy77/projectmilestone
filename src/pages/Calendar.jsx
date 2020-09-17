import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { docClient } from './backend'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
export default class Calendar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            listOfAppoinments: [],
            list: []
        }
    }
    fetchData() {
        //const { match: { params } } = this.props; // Seperate params from props for easier future call
        
        var param = {
            
            KeyConditionExpression: 'guest_name = :g',            
            TableName: 'appointments',
            FilterExpression: "#cg = :data",
            ExpressionAttributeNames: {
                "#cg": "guest_name",
            },
    
            ExpressionAttributeValues: {
                ':data':this.props.userName,          
              },
          };
          
          docClient.scan(param, function(err, data) {
            if (err) {
              console.log("Error", err);
            } else {
              //console.log("Success", data.Items);
              data.Items.forEach(function(element, index, array) {
                console.log(element.title + " (" + element.meetingdate + ")");
              });
            }
          });


        // let url = "https://5cb2d49e6ce9ce00145bef17.mockapi.io/api/v1/appointments"
        // fetch(url)
        //     .then(response => response.json())
        //     .then(data => {          
        //         let events=[]
        //         data = data.filter(a => a.guest_name == this.props.userName)    
        //         data.forEach(e => {                   
        //             var event = { title: e.title, date: e.meetingdate }                
        //            events.push(event)
        //         })
        //         this.setState({list:events})
        //     })
    }
    componentDidMount() {
        this.fetchData();
    }
    render() {
        return (
            <div className="container">
              
            </div>
        )
    }
}
