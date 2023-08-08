// import React from 'react';
// import DestinationCard from './DestinationCard';
// import '../Destination/DestinationList.css';

// const DestinationList = ({ destinations, onAttractionClick }) => {
//   return (
//     <div className="destination-list">
//       {destinations.map((destination, index) => (
//         <DestinationCard
//           key={index}
//           destination={destination}
//           onAttractionClick={onAttractionClick}
//         />
//       ))}
//     </div>
//   );
// };

// export default DestinationList;

// import React from 'react';
// import { List } from 'antd';
// import DestinationCard from './DestinationCard';
// import '../Destination/DestinationList.css';

// const DestinationList = ({ destinations, onAttractionClick }) => {
//   return (
//     <div className="destination-list">
//       <List
//         grid={{ gutter: 16, column: 3 }} // Adjust the column as needed
//         dataSource={destinations}
//         renderItem={(destination, index) => (
//           <List.Item>
//             <DestinationCard
//               destination={destination}
//               onAttractionClick={onAttractionClick}
//             />
//           </List.Item>
//         )}
//       />
//     </div>
//   );
// };

// export default DestinationList;

import React from 'react';
import { List, Row, Col } from 'antd';
import DestinationCard from './DestinationCard';

const DestinationList = ({ destinations, onAttractionClick }) => {
  return (
    <Row gutter={[16, 16]}>
      {destinations.map((destination, index) => (
        <Col xs={24} sm={12} md={8} lg={8} xl={8} key={index}>
          <DestinationCard destination={destination} onAttractionClick={onAttractionClick} />
        </Col>
      ))}
    </Row>
  );
};

export default DestinationList;
