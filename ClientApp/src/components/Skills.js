import React, { Component } from 'react';

import skillsData from '../data/skills.json';
import './Resume.css';

class Roles extends Component {

    constructor(props) {
        super(props);

        this.state = {
            skills: []
        }
    }

    componentDidMount() {
        this.setState({
            skills: skillsData.Skills
        });
        this.render();
    }

    renderSkills(skills) {
        return (
            <section className="section-bottom-margin">
                <div className="heading-band"><h2>Skills</h2></div>
                <article>
                    {skills.map((skill, i) =>
                        <span key={i}>
                            {skill.Name}&nbsp;|&nbsp;
                        </span>
                    )}
                </article>
            </section>
        );
    }

    render() {
        let content = this.renderSkills(this.state.skills);

        return (
            <div style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                {content}
            </div>
        );
    }

}

export default Roles;