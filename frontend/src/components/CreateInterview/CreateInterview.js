import React, {Component} from "react";
import Helmet from "react-helmet";
import PageTitle from "./../../containers/PageTitle";
import {Modal, Button} from "react-bootstrap";
import "./CreateInterview.css";
import {connect} from "react-redux";
import DatePicker from "react-datepicker";
import {createInterview} from "../../redux/actions/interviewActions";
import {getVacancies} from "../../redux/actions/vacanciesActions";
import {getCandidates} from "../../redux/actions/candidatesActions";
import {showProjects} from "../../redux/actions/projectActions";
import {getPositions} from "../../redux/actions/positionActions";
import {getLevels} from "../../redux/actions/levelsActions";
import VirtualizedSelect from "react-virtualized-select";
import "react-select/dist/react-select.css";
import "react-virtualized/styles.css";
import "react-virtualized-select/styles.css";

class CreateInterview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: "",
            candidate: "Choose candidate",
            vacancy: "Choose vacancy",
            interviewer: "",
            dateError: "",
            timeError: "",
            candidateError: "",
            vacancyError: "",
            interviewerError: "",
            showModalAlert: false,
            showModalConfirm: false,
            showModaLCreateAlert: false,
            selectValue: ""
        };
    }

    componentWillMount() {
        this.props.onCheckUserRole(true);
        const {dispatch} = this.props;
        dispatch(getVacancies());
        dispatch(showProjects());
        dispatch(getCandidates());
        dispatch(getPositions());
        dispatch(getLevels());
    }

    handleDateChange(date) {
        this.setState({date: date});

    }

    openModalConfirm() {
        this.setState({
            showModalConfirm: true
        });
    }

    closeModalConfirm() {
        this.setState({
            showModalConfirm: false
        });
    }

    validateFormFields(event) {
        let date = this.state.date,
            vacancy = this.state.vacancy,
            candidate = this.state.candidate,
            interviewer = this.state.interviewer,
            emptyFieldMessage = "Please, choose an option";

        if (!date) {
            event.preventDefault();
            this.setState({
                dateError: emptyFieldMessage
            });
        }
        if (!candidate) {
            event.preventDefault();
            this.setState({
                candidateError: emptyFieldMessage
            });
        }
        if (!vacancy) {
            event.preventDefault();
            this.setState({
                vacancyError: emptyFieldMessage
            });
        }
        if (!interviewer) {
            event.preventDefault();
            this.setState({
                interviewerError: emptyFieldMessage
            });
        }
        if (date &&
            candidate &&
            vacancy) {
            let candidateID = this.state.candidate.value,
                vacancyID = this.state.vacancy.value;
            event.preventDefault();
            this.props.history.push("/interviews-upcoming");
            const {dispatch} = this.props;
            dispatch(createInterview(
                {
                    date_time: date,
                    candidate_id: candidateID,
                    vacancy_id: vacancyID,
                    user_id: 19,
                    rating_id: 12
                }
            ));
        }
    }

    getOptionID(selectId) {
        let e = document.getElementById(selectId);
        let selectedOptionID = e.options[e.selectedIndex].id;
        return +selectedOptionID;
    }

    leaveForm() {
        this.resetFormFields();
        this.closeModalConfirm();
        this.props.history.push("/interviews-upcoming");
    }

    resetFormFields() {
        this.setState({date: ""});
        this.setState({time: ""});
        this.setState({candidate: ""});
        this.setState({vacancy: ""});
        this.setState({interviewer: ""});
    }

    isFieldsNotEmpty(event) {
        event.preventDefault();
        if (this.state.date ||
            this.state.candidate ||
            this.state.vacancy ||
            this.state.interviewer) {
            this.setState({
                confirmText: "Are you sure you want to cancel without saving changes?"
            });
            this.openModalConfirm();
        } else {
            this.props.history.push("/interviews-upcoming");
        }
    }



    render() {

        let candidates = this.props.candidates,
            vacancies = this.props.vacancies,
            projects = this.props.projects,
            levels = this.props.levels,
            positions = this.props.positions,
            vacancy = this.state.vacancy,
            candidate = this.state.candidate;


        let showCandidates = (candidate) => {

                let options = [];

                if (candidates.length) {
                    let compareSurname = (a, b) => {
                            if (a.surname > b.surname) return 1;
                            if (a.surname < b.surname) return -1;
                        },
                        sortedCandidates = candidates.sort(compareSurname) || {};


                    sortedCandidates.map((item, index) => {
                        let currentCandidate = {value: item.id,
                            label:"" + item.surname + " " + item.name + ""};
                        options.push(currentCandidate);
                    });
                }

                // https://swizec.com/blog/dropdown-inputs-react/swizec/7224

                return (

                    <div className="form-group search-box_input">
                        <label className="control-label">Candidate</label>
                        <VirtualizedSelect
                            name="university"
                            options={options}
                            onChange={(candidate) => this.setState({ candidate })}
                            value={this.state.candidate}
                        />
                    </div>
                );

        };

        let showVacancies = (vacancy) => {
            if (vacancy) {

                let options = [];

                if (vacancies.length && positions.length && projects.length && levels.length) {

                    let comparePositions = (a, b) => {
                            let first = positions.find(item => a.position_id === item.id);
                            let second = positions.find(item => b.position_id === item.id);

                            if (first.name > second.name) return 1;
                            if (first.name < second.name) return -1;
                        },
                        sortedVacancies = vacancies.sort(comparePositions) || {};

                    sortedVacancies.map((item, index) => {
                        let currentProject = projects.find(current => item.project_id === current.id),
                        currentLevel = levels.find(current => item.level_id === current.id),
                        currentPosition = positions.find(current => item.position_id === current.id);

                        let currentVacancy = {value: item.id,
                            label: "" + currentPosition.name + " " + currentLevel.name + " " + currentProject.title};
                        options.push(currentVacancy);
                    });
                }

                // https://swizec.com/blog/dropdown-inputs-react/swizec/7224

                return (

                    <div className="form-group search-box_input">
                        <label className="control-label">Vacancy</label>
                        <VirtualizedSelect
                            name="university"
                            options={options}
                            onChange={(vacancy) => this.setState({ vacancy })}
                            value={this.state.vacancy}
                        />
                    </div>
                );



                    {/*options = sortedVacancies.map((item, index) => {*/}
                        {/*let currentProject = projects.find(current => item.project_id === current.id),*/}
                            {/*currentLevel = levels.find(current => item.level_id === current.id),*/}
                            {/*currentPosition = positions.find(current => item.position_id === current.id);*/}


                        {/*let position = "" + currentPosition.name + " " + currentLevel.name + " " + currentProject.title;*/}
                        {/*return (*/}
                            {/*<option key={index} id={item.id}>{position}</option>*/}
                        {/*)*/}
                    {/*});*/}
                // }
                //
                // return (
                //     <div className="form-group">
                //         <label className="control-label">Vacancy</label>
                //         <select className="form-control form-control-sm filter-select custom-mode"
                //                 id="vacancy"
                //                 onChange={(event) => this.handleVacancyChange(event)}
                //         >
                //             <option>Choose vacancy</option>
                //             {options}
                //         </select>
                //     </div>
                // );
            }
        };


        return (
            <div>
                <Helmet>
                    <title>Create Interview</title>
                </Helmet>
                <div className="row sameheight-container custom-btn-group">
                    <div className="col-md-12">
                        <PageTitle
                            pageTitle='Create Interview'
                            showBackBtn={true}
                            showButton={false}
                            backBtnId="back-create-interview"
                            titleForButton=''
                            linkForButton=''
                        />

                        <form onSubmit={(event) => this.validateFormFields(event)}>

                            <div className="clearfix form-group">
                                <div className="create-interview-select">
                                    <label className="control-label">Date</label>
                                    <DatePicker
                                        className="form-control form-control-sm filter-select"
                                        placeholderText="Date"
                                        selected={this.state.date}
                                        onChange={(event) => this.handleDateChange(event)}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        dateFormat="LLL"
                                    />
                                    <span className="has-error error-message">{this.state.dateError}</span>
                                </div>
                            </div>



                            {showCandidates(candidate)}
                            {showVacancies(vacancy)}

                            {/*<div className="form-group form-field-margin">*/}
                            {/*<div>*/}
                            {/*<label className="control-label">Interviewer</label>*/}
                            {/*<select className="form-control form-control-sm create-interview-select-long"*/}
                            {/*onChange={(event) => this.handleInterviewerChange(event)}*/}
                            {/*>*/}
                            {/*<option>K. Makiy</option>*/}
                            {/*<option>A. Larin</option>*/}
                            {/*<option>T. Grabets</option>*/}
                            {/*</select>*/}
                            {/*<span className="has-error error-message">{this.state.interviewerError}</span>*/}
                            {/*</div>*/}
                            {/*</div>*/}
                            <div className="form-group">
                                <button
                                    id="create-interview-submitBtn"
                                    type="submit"
                                    className="btn btn-primary"
                                >Create
                                </button>
                                <button
                                    id="create-interview-resetBtn"
                                    className="btn btn-danger"
                                    onClick={(event) => this.isFieldsNotEmpty(event)}
                                >Cancel
                                </button>
                            </div>
                        </form>

                    </div>
                    <Modal className="custom-btn-group"
                           show={this.state.showModalConfirm}
                           onHide={() => this.closeModalConfirm()}>
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Are you sure you want to cancel without saving changes?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                id="modal-confirm-yes"
                                className="btn btn-primary"
                                onClick={() => this.leaveForm()}
                            >Yes
                            </Button>
                            <Button
                                id="modal-confirm-no"
                                className="btn btn-danger"
                                onClick={() => this.closeModalConfirm()} bsStyle="primary"
                            >No
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        interviews: state.interviews,
        vacancies: state.vacancies.vacancies,
        candidates: state.candidates.candidates,
        projects: state.project.projects,
        levels: state.levels.levels,
        positions: state.positions.positions,
    }
}

export default connect(mapStateToProps)(CreateInterview);