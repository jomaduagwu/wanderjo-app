import React from 'react';
import { Card } from 'antd';

const DestinationCard = ({ name, location, description, image, category }) => {
  return (
    <Card
      hoverable
      style={{ width: 300, margin: '10px' }}
      cover={<img alt={name} src={image} />}
    >
      <h3>{name}</h3>
      <p>{location}</p>
      <p>{description}</p>
      <p>{category}</p>
    </Card>
  );
};

export default DestinationCard;
