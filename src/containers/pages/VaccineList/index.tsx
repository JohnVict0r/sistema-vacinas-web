import React, { useEffect, useState } from "react";
// import api from "../../services/api";

import "./style.css";

import api from "../../../services/api";
import { getAuthToken } from "../../../utils/authentication";
import Panel from "../../../components/Panel";
import { Row, Col, Empty, Button, Card, Tag } from "antd";
import { FormOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { dateExtend } from "../../../utils/format";

function VaccineList() {
  const [vaccines, setVaccines] = useState<any[]>([]);

  const token = getAuthToken();

  const history = useHistory();
  useEffect(() => {
    api
      .get(`/me/vaccines`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setVaccines(response.data));
  }, [token]);

  return (
    <>
      <Panel
        title="Minhas Vacinas"
        action={
          <Button
            style={{ backgroundColor: "#641498", color: "#FCFCFC" }}
            icon={<FormOutlined />}
            onClick={() => {
              history.push("/minhas-vacinas/create");
            }}
          >
            Cadastrar Vacina
          </Button>
        }
      >
        <Row gutter={[24, 24]} style={{ width: "100%" }}>
          {vaccines.length > 0 ? (
            vaccines.map((vaccine) => (
              <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                <Card
                  title={`Vacina: ${vaccine.vaccine}`}
                  extra={
                    vaccine.is_professional_created ? (
                      <Tag color="success">Verificado</Tag>
                    ) : (
                      <Tag color="warning">Privado</Tag>
                    )
                  }
                >
                  <p>{dateExtend(vaccine.date_application)}</p>
                  <p>Lote: {vaccine.lote}</p>
                </Card>
              </Col>
            ))
          ) : (
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
              <Empty
                imageStyle={{
                  height: 60,
                }}
                description={<span>Nenhuma vacina cadastrada</span>}
              ></Empty>
            </Col>
          )}
        </Row>
      </Panel>
    </>
  );
}

export default VaccineList;
