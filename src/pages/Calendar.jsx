import React, { Component } from 'react'

import { docClient } from './backend'

import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
export default class MyCalendar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      listOfAppoinments: [],
      list: []
    }
  }
  fetchData() {
    //const { match: { params } } = this.props; // Seperate params from props for easier future call
    console.log(this.props.userName)
    var param = {


      TableName: 'appointments',

    };

    docClient.scan(param, function (err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        //console.log("Success", data.Items);
        var events = []
        data.Items.forEach(function (element, index, array) {
          
            var e = {
              id: element.id,
              Subject: element.title,
              StartTime: new Date(element.meetingdate),
              EndTime: new Date(element.meetingdate),
              IsAllDay: false,
              Status: element.stat,
              Priority: 'High'
            }
            events.push(e);
            console.log(element.title + " (" + element.meetingdate + ")");

        });
        this.setState({ list: events })
      }
    }.bind(this));


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
        <ScheduleComponent height='550px' selectedDate={Date.now()} currentView={"Month"} eventSettings={{
          dataSource: this.state.list,
          fields: {
            id: 'Id',
            subject: { name: 'Subject' },
            isAllDay: { name: 'IsAllDay' },
            startTime: { name: 'StartTime' },
            endTime: { name: 'EndTime' }
          }
        }}>
          <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>


      </div>
    )
  }
}
