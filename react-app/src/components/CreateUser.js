import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
    };

    axios
      .post(this.props.url + "/users/add", user)
      .then((doc) => {})
      .catch((err) => [console.log("Error adding new user : " + err)]);

    this.setState({
      username: "",
    });
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center">Create New User</h1>
        <div className="col-12 col-md-6">
          <form onSubmit={this.onSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username:
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={this.state.username}
                onChange={this.onChangeUsername}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
