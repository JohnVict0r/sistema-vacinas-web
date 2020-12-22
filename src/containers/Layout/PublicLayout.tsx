import React, { FC } from "react";

import { Layout, Row, Col } from "antd";

const PublicLayout: FC = ({ children }) => {
  return (
    <Layout style={{ backgroundColor: "#FCFCFC", height: "100%" }}>
      <div
        style={{
          paddingTop: "20px",
          paddingBottom: "10px",
          textAlign: "center",
        }}
      ></div>
      <Row justify="center" align="middle" style={{ height: "100%" }}>
        <Col xs={{ span: 20 }} lg={{ span: 8 }}>
          {children}
        </Col>
      </Row>
    </Layout>
  );
};

export default PublicLayout;
