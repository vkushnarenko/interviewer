import React, {Component} from 'react';
import {Link, IndexLink} from 'react-router-dom';
import "./ProjectsList.css";
import {Modal, Button} from 'react-bootstrap';


class ProjectsList extends Component {

      render() {

        return (
            <div className="bcgr">
                <div className="row sameheight-container">
                    <div className="col-md-12">
                        <div className="title-block">
                            <h3 className="title">Projects</h3>
                        </div>
                        <div className="card card-block sameheight-item">
                            <Link to="/dashboard/projects/create-project">
                                <button className="btn btn-primary">Create project</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <Modal>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Please use only latin letters, numbers and special symbols</p>
                    </Modal.Body>
                </Modal>
            </div>
        )

    }
}

export default ProjectsList;