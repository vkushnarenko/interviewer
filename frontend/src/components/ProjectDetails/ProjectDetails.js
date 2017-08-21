import React, {Component} from "react";
import {IndexLink} from "react-router-dom";
import {Link} from "react-router-dom";
import "./ProjectDetails.css";
import {connect} from "react-redux";


class ProjectDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projectTitle: "Project Title",
            projectDescription: "Lorem ipsum dolor sit amet, nulla quam sapien praesent purus commodo nascetur"
        }
    }

    handleTitleChange(event) {
        this.setState({projectTitle: event.target.value});
    }

    handleDescrChange(event) {
        this.setState({projectDescription: event.target.value});
    }



    render() {

        return (
            <div>
                <div className="row sameheight-container">
                    <div className="col-md-12 component-container">
                        <div className="title-block">
                            <h3 className="title ">{this.state.projectTitle}</h3>
                            <Link to="/dashboard/projects" className="title-description">
                                Back to list
                            </Link>
                        </div>
                        <div className="card card-default">
                                <div className="form-control boxed card-block">
                                    {this.state.projectDescription}
                                </div>
                        </div>
                        <div className="form-group">
                            <button
                                type="submit"
                                className="btn btn-primary"
                            >Edit</button>
                            <button
                                type="reset"
                                className="btn btn-primary right-project-btn"
                            >Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        newProject: state.project,
        newNote: state.notifications
    }
}

export default connect(mapStateToProps)(ProjectDetails);
