import React, { Component } from 'react';
import axios from 'axios';
import { InputGroup, Button, Form, Input, Col, Row, } from 'reactstrap';

import './SpeechToText.css';

const UploadForm = () => {

    return (
        <Row className="">
            <Col sm="12">
                <Form encType="multipart/form-data" onSubmit="">
                    <InputGroup>
                        <Input 
                            type="file" 
                            placeholder="Upload file..." />
                    </InputGroup>
                    <Button 
                        color="success"
                        type="button">
                        Upload file
                    </Button>
                </Form>
            </Col>
        </Row>
    )
}

export class SpeechToText extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            transcription: {} 
        }
    }

    fetchTranslation() {
        const transcription = this.state.transcription;

        axios.get('https://localhost:5001/api/SpeechToText')
            .then(response => this.setState({
                transcription: response.data,
                isLoading: false
            }))
            .catch(error => this.setState({
                error,
                isLoading: false
            }));
    }

    renderResults() {
        //how to render??
        
    }
     
    render() {
        let contents = this.state.isLoading
            ? <p><em>Loading...</em></p>
            : this.renderResults(this.state.transcription);

        return (
            <div>
                <div className="heading-box">
                    <div className="animated-border">
                        <h1>Transcribe a spoken-word audio file</h1>
                    </div>
                </div>
                <p>This component uses the AssemblyAI API (https://api.assemblyai.com/v2/transcript) to transcribe a spoken word audio file.</p>
                {contents}
            </div>
        );
    }
}