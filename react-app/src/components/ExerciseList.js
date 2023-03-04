import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class ExerciseList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);
    this.getExercises = this.getExercises.bind(this);

    this.state = {
      exercises: [],
    };
  }

  componentDidMount() {
    this.getExercises();
  }

  getExercises() {
    axios
      .get(this.props.url + "/exercises/")
      .then((doc) => {
        this.setState({
          exercises: doc.data && doc.data.length > 0 ? doc.data : [],
        });
      })
      .catch((err) => {
        console.log("Error in getting exercises : " + err);
      });
  }

  deleteExercise(id) {
    axios
      .delete(this.props.url + "/exercises/" + id)
      .then((doc) => {
        console.log(doc.data);
        this.getExercises();
      })
      .catch((err) => {
        console.log("Error in getting exercises : " + err);
      });
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center mb-2">Exercises List</h1>
        <table className="table text-center">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Duration</th>
              <th scope="col">Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.exercises.map((exercise, index) => {
              return (
                <tr key={index + 1}>
                  <th scope="row">{index + 1}</th>
                  <td>{exercise.username}</td>
                  <td>{exercise.description}</td>
                  <td>{exercise.duration}</td>
                  <td>{exercise.date.split("T")[0]}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-sm btn-primary me-1"
                    >
                      <Link to={"/edit/" + exercise._id}>
                        <span style={{ color: "white" }}>Edit</span>
                      </Link>
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-danger ms-1"
                      onClick={() => {
                        this.deleteExercise(exercise._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
