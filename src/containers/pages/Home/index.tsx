import React from "react";
import { Row, Col, Empty } from "antd";
import "./styles.less";
import Panel from "../../../components/Panel";

import { CalendarOutlined } from "@ant-design/icons";
import { getProfile } from "../../../utils/authentication";
import { useHistory } from "react-router-dom";

const Home: React.FC = () => {
  const history = useHistory();
  const profile = getProfile();

  return (
    <>
      <Row
        className="welcome-text"
        gutter={[24, 24]}
        style={{ width: "100%", margin: "0px" }}
      >
        <Col span={24}>
          <h1>Seja bem vindo, {profile.username}!</h1>
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ width: "100%", margin: "0px" }}>
        <Col xs={{ span: 24 }} lg={{ span: 24 }}>
          <Panel
            title={"Agendamentos"}
            icon={CalendarOutlined}
            style={{ height: "100%" }}
            action={
              <p
                onClick={() => {
                  history.push("/vaccines");
                }}
                style={{
                  color: "#701AA7",
                  cursor: "pointer",
                  verticalAlign: "middle",
                  textAlign: "center",
                }}
              >
                Ver todos cadastrados
              </p>
            }
          >
            <Row gutter={[24, 24]} style={{ width: "100%" }}>
              <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                <Empty
                  imageStyle={{
                    height: 60,
                  }}
                  description={<span>Em breve</span>}
                ></Empty>
              </Col>
            </Row>
          </Panel>
        </Col>
      </Row>
    </>
  );
};

export default Home;
