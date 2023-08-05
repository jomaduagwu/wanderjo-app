import React from 'react';
import { Card, Col, Row } from 'antd';

const { Meta } = Card;

const PageContent = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={8}>
        <Card
          hoverable
          style={{ width: '100%', padding: '10px' }}
          cover={<img alt="Europe Street beat" 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQExdx5edKWXm38iUKvnzhlT1PjnfIGloVXNg&usqp=CAU" />}
        >
          <Meta
            title="Spain"
            description="Lorem ipsum dolor sit ame"
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <Card
          hoverable
          style={{ width: '100%', padding: '10px' }}
          cover={<img alt="Europe Street beat" 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQExdx5edKWXm38iUKvnzhlT1PjnfIGloVXNg&usqp=CAU" />}
        >
          <Meta
            title="Destination Example"
            description="Lorem ipsum dolor sit ame"
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <Card
          hoverable
          style={{ width: '100%',  padding: '10px' }}
          cover={<img alt="Europe Street beat" 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQExdx5edKWXm38iUKvnzhlT1PjnfIGloVXNg&usqp=CAU" />}
        >
          <Meta
            title="Destination Example"
            description="Lorem ipsum dolor sit ame"
          />
        </Card>
      </Col>
    </Row>
  );
};

export default PageContent;