import React from 'react';

export default class Page extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Head name={this.props.item.name}/>
      </div>
    );
  }
}
Page.propTypes = { item: React.PropTypes.object.isRequired };
// Page.defaultProps = { item: { name: 'aaa' } };

const Head = (props) =>  <h1>{props.name}</h1>;
Head.propTypes = { name: React.PropTypes.string.isRequired };