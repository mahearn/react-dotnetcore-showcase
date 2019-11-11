import React, { Component } from 'react';

import qualsData from '../data/qualifications.json';
import './Resume.css';

class Qualifications extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            qualifications: []
        }
    }

    componentDidMount() {
        this.setState({
            qualifications: qualsData.Qualifications
        });
        this.render();
    }

    renderQualifications(qualifications) {
        return (
            <section className="section-bottom-margin">
                <div className="heading-band"><h2>Education</h2></div>
                <article>
                    {qualifications.map((q, i) =>
                        <article key={i}>
                            <p className="p-large"><strong>{q.Name}</strong> from {q.Institution}</p>
                            <p>Graduated: {q.YearOfGraduation}</p>
                        </article>
                    )}
                </article>
            </section>
        );
    }

    render() {
        let content = this.renderQualifications(this.state.qualifications);

        return (
            <div style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                { content }
            </div>
        );
    }

}

export default Qualifications;