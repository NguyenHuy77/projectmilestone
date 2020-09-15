import React, { Component } from 'react'
import OneFeedBack from './OneFeedBack';
import { docClient } from './backend'
import { AppStream } from 'aws-sdk';
export default class FeedbackList extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             feedbacks:[]
        }
    }
     // Fetch the list of feedbacks that the logged in user has made
     fetchData() {
        
        var param = {
            TableName: 'feedbacks',
        }
        docClient.scan(param, function (err, data) {
            if (err) {
                console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("GetItem succeeded:", JSON.stringify(data, null, 2));

                    this.setState({ feedbacks: data.Items })
            }
        }.bind(this));
    }
    checkFeedbacks()
    {
        if(this.state.feedbacks.length === 0)
        {
            return <h1 style={{ color: "white", padding: "15px" }}>There is no feedbacks.</h1>
        }
        else
        {
            return <>{this.state.feedbacks.map(f=>
                <OneFeedBack feedback={f}/>
                )}</>
        }
    }
    componentDidMount()
    {
        this.fetchData()
    }
    render() {
        return (
            <main className="bg-dark page landing-page" style={{ paddingTop: '50px' }}>
                    <section className="bg-dark clean-block clean-info dark">
                        <div className="container bg-dark">
                            <div className="block-heading">
                                <h2 className="text-monospace text-info">Feedback List</h2>
                            </div>
                            <div className="row align-items-center mt-5" style={{padding:"20px"}}>
                               {this.checkFeedbacks()}
                            </div>
                        </div>
                    </section>
                </main>
        )
    }
}
