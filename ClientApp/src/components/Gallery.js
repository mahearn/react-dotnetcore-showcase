import React, { Component } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce'
import { Media, Button, InputGroup, Form, Input, Col, Row, } from 'reactstrap';
import './gallery.css';

const Search = (props) => {

  return (
    <Row className="search">
      <Col sm="12">
        <Form>
          <InputGroup>
            <Input placeholder="Find a photo" onChange={props.onChange}/>
          </InputGroup>
        </Form>
      </Col>
    </Row>
  )
}

export class Gallery extends Component {
  static displayName = Gallery.name;
  doDebounce = debounce(this.fetchSearch, 250);

  constructor (props) {
    super(props);

    this.state = {
        photos: [],
        isLoading: true,
        error: null, 
        searchTerm: ''
    }

    this.onRemoveItem = this.onRemoveItem.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this); 
  }

  onRemoveItem(id) {
    var tempArray = this.state.photos;
    if (id >= 0) {
      tempArray.splice(id, 1);
      this.setState({ photos: tempArray });
    }
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({ searchTerm, isLoading: false });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
    this.doDebounce();
  }

  fetchSearch() {
    const searchTerm = this.state.searchTerm;
    axios.get('https://localhost:5001/api/Gallery/GetPhotos?query=' + searchTerm)
      .then(response => this.setState({
        photos: response.data,
        isLoading: false
      }))
      .catch(error => this.setState({
        error,
        isLoading: false
      }));
  }

  renderGallery (photos) {
    const searchTerm = this.state.searchTerm;

    return (
      <div>
        <Search
          value={searchTerm}
          onChange={this.onSearchChange}>
          Search
        </Search>
        <div className="photo-list-container">
          {photos.map((photo, i) =>
            <Media key={i}>
              <Media>
                <Media object src={photo.urls.thumb} />
              </Media>
              <Media body>
                <Media heading>
                  {photo.user.name}
                </Media>
                {photo.description}
              </Media>
              <Button color="danger"
                onClick={() => this.onRemoveItem(i)}
                type="button">
                Remove photo
              </Button>
            </Media>
          )}
        </div>
      </div>
    );
  }

  render () {
    let contents = this.state.isLoading
      ? <p><em>Loading...</em></p>
      : this.renderGallery(this.state.photos);

    return (
      <div>
        <div className="heading-box">
          <div className="animated-border">
            <h1>Photo Gallery</h1>
          </div>
        </div>
        <p>This component demonstrates fetching data from the Unsplash API (https://api.unsplash.com/) via a .NET Core WebAPI backend.</p>
        {contents}
      </div>
    );
  }
}
