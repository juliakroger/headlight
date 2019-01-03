import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'semantic-ui-react';


const ResultCard = props => (
  <Card fluid style={{marginTop: '16px', height: '600px'}}>
    <Image src={props.imageUrl} style={{maxHeight: '256px'}}/>
    <Card.Content>
      <Card.Header>{props.name}</Card.Header>
      <Card.Meta>
        {props.type}
      </Card.Meta>
      <Card.Description>{props.description}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a href={'google.com'}>Reference</a>
    </Card.Content>
  </Card>
);

ResultCard.defaultProps = {
  imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'
};

ResultCard.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string
};

export default ResultCard;
