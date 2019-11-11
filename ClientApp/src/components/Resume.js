import React, { Component } from 'react';

import Roles from './Roles';
import Qualifications from './Qualifications';
import Skills from './Skills';

export class Resume extends Component {

    componentDidMount() {
        this.render();
    }

    renderResume() {
        return (
            <section>
                <section className="section-bottom-margin">
                    <div className="heading-band">
                        <h2>Personal summary</h2>
                    </div>
                    <article>
                    <p>I am an experienced IT professional. 
                        My web development skills range across the full web technology stack, with a preference 
                        for front-end technologies. I also have extensive experience in content management systems, 
                        functional and technical analysis, stakeholder management, and training and mentoring.</p>
                    <p>I am a member of the Australian Computer Society (ACS) with Certified Professional (CP) status.</p> 
                    </article>
                </section>
                <Skills></Skills>
                <Roles></Roles>
                <Qualifications></Qualifications>
            </section>
        );
    }

    render() {
        let content = this.renderResume();

        return (
            <div style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                {content}
            </div>
        );
    }
}
