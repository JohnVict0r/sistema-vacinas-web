import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  isFirstAccess,
  setFirstAccess,
  getAuthToken,
  setProfile,
} from "../../../utils/authentication";
import { Typography, Row, Col, Button } from "antd";
import api from "../../../services/api";

const Welcome: React.FC = () => {
  const history = useHistory();

  const token = getAuthToken();

  useEffect(() => {
    api
      .get(`/me/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setProfile(response.data));
  }, [token]);

  if (!isFirstAccess()) {
    history.push("/home");
  }
  return (
    <>
      <Row gutter={[24, 24]} style={{ width: "100%", margin: "0px" }}>
        <Col>
          <Typography.Paragraph style={{ textAlign: "center" }}>
            Este é o seu primeiro acesso no cartão de vacina digital.
          </Typography.Paragraph>
          <Button
            type="primary"
            className="login-form-button"
            size="large"
            onClick={() => {
              setFirstAccess();
              history.push("/home");
            }}
          >
            Continuar
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Welcome;
