import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import debounce from 'lodash/debounce'
import { Button, InputGroup, Form, Input, Col, Row, } from 'reactstrap';

import './News.css';

const BASE_URL = "http://hn.algolia.com/api/v1/";
//const PATH_SEARCH = "search";
const PATH_SEARCH = "search_by_date";
const PARAM_SEARCH = "?query=";

const Search = (props) => {
    return (
        <Row className="search">
            <Col sm="12">
                <Form>
                    <InputGroup>
                        <Input placeholder="Filter news items" onChange={props.onChange} />
                    </InputGroup>
                </Form>
            </Col>
        </Row>
    )
}

const Paginator = (props) => {
    return (
        <Row className="search">
            <Col sm="12">
                <Button id="prev" onClick={props.pagePrev}>Previous</Button> 
                <input type="text" value={props.value} readOnly></input>
                <Button id="next" onClick={props.pageNext}>Next</Button>
            </Col>
        </Row>
    )
}

export class News extends Component {
    doDebounce = debounce(this.fetchSearch, 500);

    constructor(props) {
        super(props);

        this.state = {
            results: [],
            isLoading: true,
            error: null,
            searchTerm: '',
            current_page: 0
        }

        this.onSearchChange = this.onSearchChange.bind(this); 
        this.onClickPagePrev = this.onClickPagePrev.bind(this);
        this.onClickPageNext = this.onClickPageNext.bind(this);
    }

    componentDidMount() {
        const { searchTerm, current_page } = this.state;
        this.setState({ searchTerm, isLoading: false, current_page });
    }

    onSearchChange(event) {
        this.setState({ searchTerm: event.target.value });
        this.doDebounce();
    }

    setNewsResults(results) {
        this.setState({ results: results.hits, isLoading: false });
        console.log(results.hits);
    }

    onClickPagePrev(event) {
        event.preventDefault();
        const currentPage = event.target.value;
        //console.log(currentPage);
        const prevPage = currentPage > 0 ? currentPage - 1 : currentPage;
        this.setState({ current_page: prevPage });
        this.fetchSearch(); // call the search method passing in the page param
    }

    onClickPageNext(event) {
        event.preventDefault();
        const currentPage = event.target.value;
        //console.log(currentPage);
        const nextPage = currentPage + 1;
        this.setState({ current_page: nextPage });
        this.fetchSearch(); // call the search method passing in the page param
    }

    fetchSearch() {
        const searchTerm = this.state.searchTerm;
        //const pageNum = this.state.current_page;
        //console.log(pageNum);
        // axios(`${BASE_URL}${PATH_SEARCH}${PARAM_SEARCH}` + searchTerm + '&page=' + pageNum)
        //     .then(result => this.setNewsResults(result.data))
        //     .catch(error => this.setState({
        //         error,
        //         isLoading: false
        //     }));
        axios(`${BASE_URL}${PATH_SEARCH}${PARAM_SEARCH}` + searchTerm)
            .then(result => this.setNewsResults(result.data))
            .catch(error => this.setState({
                error,
                isLoading: false
            }));
    }

    renderResults(results) {
        const searchTerm = this.state.searchTerm;
        const currentPage = this.state.current_page;

        return (
            <div>
                <Search
                    value={searchTerm}
                    onChange={this.onSearchChange}>
                    Search
                </Search>
                <Paginator
                    value={currentPage}
                    pagePrev={this.onClickPagePrev}
                    pageNext={this.onClickPageNext}>
                </Paginator>
                <div className="photo-list-container">
                    {results.map((result, i) =>
                        <div key={i} className="result-item">
                            <h4><a href={result.url}>{result.story_title}</a></h4>
                            <p>Author: {result.author} ({result.points} points)
                            <br />
                                <em>Created: {moment(result.created_at).format('DD-MM-YYYY')}</em></p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    render() {
        let contents = this.state.isLoading
            ? <p><em>Loading...</em></p>
            : this.renderResults(this.state.results);

        return (
            <div>
                <div className="heading-box">
                    <div className="animated-border">
                        <h1>Hacker News</h1>
                    </div>
                </div>
                <p>This component demonstrates asynchronous fetch of search results from Hacker News API (http://hn.algolia.com/api/v1).</p>
                {contents}
            </div>
        );
    }
    
}