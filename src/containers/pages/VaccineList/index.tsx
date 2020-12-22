import React, { useEffect, useState } from "react";
// import api from "../../services/api";

import "./style.css";

import api from "../../../services/api";
import { getAuthToken } from "../../../utils/authentication";
import Panel from "../../../components/Panel";
import { Row, Col, Empty, Button } from "antd";
import { FormOutlined } from "@ant-design/icons";
import Card from "../../../components/Card";
import { dateExtend } from "../../../utils/format";
import { useHistory } from "react-router-dom";

export interface IVacinne {
  id: number;
  name: string;
  description: string;
  lote: string; //lote
  applicator: string;
  location: string;
  date_application: string;
  order: number;
  vaccine_id: number;
}

function VaccineList() {
  const [vaccines, setVaccines] = useState<IVacinne[]>([]);

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
              history.push("/vaccines/create");
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
                  name={`${vaccine.name} - ${vaccine.description}`}
                  date={dateExtend(vaccine.date_application)}
                  location={vaccine.lote}
                ></Card>
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
