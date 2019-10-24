import React, { Component } from 'react'
import axios from 'axios';
import { Button, Input } from 'reactstrap';
import './SpeechToText.css';

export class SpeechToText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
    }

    onFormSubmit(e) {
        e.preventDefault()
        // console.log(this.state.file);
        this.fileUpload(this.state.file)
            .then((response) => {
                console.log(response.data);
            })
    }

    onChange(e) {
        this.setState({ file: e.target.files[0] })
    }

    fileUpload(file) {
        const url = 'https://localhost:5001/api/Transcriber/FileUpload';
        const formData = new FormData();
        formData.append("File", file)
        // const config = {
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     }
        // }
        
        // axios({
        //     method: 'post',
        //     url: url,
        //     data: formData,
        //     config: { config }
        // })
        axios.post(url, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(function (response) {
            //handle success
            console.log(response);
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <h2>Upload Audio File</h2>
                <Input type="file" name="file" onChange={this.onChange} />
                <Button type="submit">Upload</Button>
            </form>
        )
    }
}
