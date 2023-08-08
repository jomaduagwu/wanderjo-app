// import React from 'react';

// const DestinationCard = ({ destination }) => {
//   const { name, date, temperature, description } = destination;

//   return (
//     <div className="destination-card">
//       <h2>{name}</h2>
//       <p>Date: {date}</p>
//       <p>Temperature: {temperature}&#176;F</p>
//       <p>Description: {description}</p>
//     </div>
//   );
// };

// export default DestinationCard;

import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

const DestinationCard = ({ destination }) => {
  const { name, date, temperature, description } = destination;

  return (
    <Card title={name}>
      <Meta title={`Date: ${date}`} description={`Temperature: ${temperature}°F`} />
      <p>Description: {description}</p>
    </Card>
  );
};

export default DestinationCard;

