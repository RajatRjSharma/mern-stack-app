import React, { Component } from "react";
import Datepicker from "react-datepicker";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: [],
      redirect: false,
    };
  }

  componentDidMount() {
    axios
      .get(this.props.url + "/exercises/" + this.props.params.id)
      .then((doc) => {
        this.setState({
          users: doc.data ? [{ username: doc.data.username }] : [],
          username: doc.data ? doc.data.username : "",
          description: doc.data ? doc.data.description : "",
          duration: doc.data ? doc.data.duration : 0,
          date: doc.data ? new Date(doc.data.date.split("T")[0]) : new Date(),
        });
      });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };

    axios
      .post(
        this.props.url + "/exercises/update/" + this.props.params.id,
        exercise
      )
      .then((doc) => {
        this.setState({
          redirect: true,
        });
      })
      .catch((err) => [console.log("Error updating exercise log : " + err)]);
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center">Update Exercise Log</h1>
        <div className="col-12 col-md-6">
          <form onSubmit={this.onSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username:
              </label>
              <select
                className="form-control"
                id="username"
                required
                value={this.state.username}
                onChange={this.onChangeUsername}
              >
                {this.state.users.map((user) => (
                  <option key={user.username} value={user.username}>
                    {user.username}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description:
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={this.state.description}
                onChange={this.onChangeDescription}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="duration" className="form-label">
                Duration (mins):
              </label>
              <input
                type="number"
                className="form-control"
                id="duration"
                min={0}
                value={this.state.duration}
                onChange={this.onChangeDuration}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                Date:
              </label>
              <Datepicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </form>
        </div>
        {this.state.redirect && <Navigate to="/" replace={true}></Navigate>}
      </div>
    );
  }
}

export default withParams(EditExercise);
