import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Dashboard from './../Dashboard';
import Header from './../Header';
import SideMenu from './../SideMenu';
import CreateProject from './../CreateProject';

class Main extends Component {
    render() {
        return (
            <div className="main-wrapper">
                <div className="app">
                    <Header/>
                    <SideMenu/>

                    <article className="content dashboard-page">
                        <Switch>
                            <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                            <Route exact path='/createproject' name="Create project" component={CreateProject}/>
                            <Redirect form="/" to="/dashboard"/>
                        </Switch>
                    </article>
                </div>

            </div>


        );
    }
}

export default Main;