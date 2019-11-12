import React, { Component } from 'react';

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
                            <p>From {role.DateFrom} &ndash; {role.DateTo}</p>
                            <p>Achievements:</p>
                            {role.Achievements.map((x, i) =>
                                <ul>
                                    <li key={i}>{x.Achievement}</li>
                                    {x.SubPoints.map((y, i) =>
                                        y.subpoint.length > 0 ? <ul><li key={i}>{y.subpoint}</li></ul> : ""
                                    )}
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