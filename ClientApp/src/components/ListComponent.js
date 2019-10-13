import React, { Component } from 'react';
import { Media } from 'reactstrap';

export class ListComponent extends Component {
    // const { photos } = props.photos;

    render() {
        return (
            <div>
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
        );
    }
}