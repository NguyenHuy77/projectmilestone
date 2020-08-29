import React from "react";
import { Link, Redirect } from "react-router-dom";
import {
  //MDBContainer,
  MDBBtn,
  //MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBInput,
} from "mdbreact";
import history from "../history";

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    // reset login status
    // this.props.logout();

    this.state = {
      email: "",
      password: "",
      submitted: false,
      myuser: undefined,
      listOfUsers: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  getInfo() {
    let myUrl = 'https://5cb2d49e6ce9ce00145bef17.mockapi.io/api/v1/users';
    fetch(myUrl)
      .then(res => res.json())
      .then(data => {
        var user = data.find(e => e.email === this.state.email);
        if (user !==null) {
          this.setState({ myuser:user })
          alert("you have logged in successfully!");
        }

      })
  }
  reDirecting()
  {
    if(this.state.myuser !==undefined)
    {
      return <Redirect to={"/Profile/"+this.state.myuser.userName} />
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const { email, password } = this.state;
    if (email && password) {
      history.push("/");
    } else {
      alert("Some thing is missing");
    }
  }
  render() {
    //const { loggingIn } = this.props;
    //const { email, password, submitted } = this.state;
    return (

      <div className="mt-5">
        {this.reDirecting()}
        <div
          className="container rounded p-3"
          style={{ height: "", width: "800px", border: "2px solid grey" }}
        >
          <MDBModalHeader
            className="text-center"
            titleclassName="w-100 font-weight-bold"
          >
            Login
          </MDBModalHeader>
          <MDBModalBody>
            <form className="mx-3 grey-text">
              <MDBInput
                label="Your email"
                icon="envelope"
                group
                name="email"
                type="email"
                value={this.state.email}
                validate
                error="wrong"
                success="right"
                onChange={this.handleChange.bind(this)}
              />
              <MDBInput
                label="Your password"
                icon="lock"
                group
                name="password"
                type="password"
                value={this.state.password}
                validate
                onChange={this.handleChange.bind(this)}
              />
            </form>
          </MDBModalBody>
          <MDBModalFooter className="justify-content-center">
            <MDBBtn
              type="button"
              color="deep-orange"
              onClick={this.getInfo.bind(this)}
            >
              Login
            </MDBBtn>
            
              <Link to="/register"><MDBBtn
              type="button"
              color="deep-green"
            >Register</MDBBtn></Link>
            
            
          </MDBModalFooter>
        </div>
      </div>
    );
  }
}

// function mapState(state) {
//   const { loggingIn } = state.authentication;
//   return { loggingIn };
// }

// const connectedLoginPage = connect(mapState)(LoginPage);
// export { connectedLoginPage as LoginPage };
