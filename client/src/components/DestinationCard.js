import React from 'react';
<<<<<<< HEAD
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
=======

const DestinationCard = ({ destination }) => {
  const { name, date, temperature, description } = destination;

  return (
    <div className="destination-card">
      <h2>{name}</h2>
      <p>Date: {date}</p>
      <p>Temperature: {temperature}&#176;F</p>
      <p>Description: {description}</p>
    </div>
>>>>>>> 0a1b1f1 (delete file then create new filess, image galerry, place, travel destination)
  );
};

export default DestinationCard;
