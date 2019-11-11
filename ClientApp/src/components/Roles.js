import React, { Component } from 'react';
import moment from 'moment';

import rolesData from '../data/roles.json';
import './Resume.css';

class Roles extends Component {

    constructor(props) {
        super(props);

        this.state = {
            roles: []
        }
    }

    componentDidMount() {
        this.setState({
            roles: rolesData.Roles
        });
        this.render();
    }

    renderRoles(roles) {
        return (
            <section className="section-bottom-margin">
                <div className="heading-band"><h2>Career history</h2></div>
                <article>
                    {roles.map((role, i) =>
                        <article key={i}>
                            <h3>{role.Title}</h3>
                            <h4>{role.Company}</h4>
                            <p>From {moment(role.DateFrom).format("DD MMM YYYY") } to {moment(role.DateTo).format("DD MMM YYYY")}</p>
                            <p>Achievements:</p>
                            {role.Achievements.map((achievement, i) =>
                                <ul key={i}>
                                    <li>{achievement.Achievement}</li>
                                </ul>
                            )}
                        </article>
                    )}
                </article>
            </section>
        );
    }

    render() {
        let content = this.renderRoles(this.state.roles);

        return (
            <div style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                {content}
            </div>
        );
    }

}

export default Roles;