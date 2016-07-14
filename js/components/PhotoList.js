import React from 'react'
import Relay from 'react-relay'

class PhotoList extends React.Component {
  renderPhotos() {
    return this.props.viewer.photos.edges.map(edge =>
      <li key={edge.node.id}>{edge.node.name} reaction: {edge.node.reaction}</li>
    );
  }

  render() {
    var numPhotos = this.props.viewer.totalCount;
    return (
      <section className="main">
        <ul className="photo-list">
          {this.renderPhotos()}
        </ul>
        <div>
          Total photos: {numPhotos}
        </div>
      </section>
    );
  }
}

export default Relay.createContainer(PhotoList, {
  initialVariables: {
    limit: 200
  },

  // prepareVariables() {
  //   return {
  //     limit: 200
  //   };
  // },

  fragments: {
    viewer: () => Relay.QL`fragment on User { photos(first: 10) {edges {node {id,name, reaction}}}, totalCount }`
  }
});
