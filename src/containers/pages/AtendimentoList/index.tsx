import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import { getAuthToken } from "../../../utils/authentication";
import Panel from "../../../components/Panel";
import { Row, List, Col, Button, Card, Tag } from "antd";
import { FormOutlined } from "@ant-design/icons";
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

function AtendimentoList() {
  const [agendamentos, setAgendamentos] = useState<any[]>([]);

  const token = getAuthToken();

  const history = useHistory();
  useEffect(() => {
    api
      .get(`/atendimentos/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setAgendamentos(response.data));
  }, [token]);

  return (
    <>
      <Panel
        title="Agenda de atendimentos"
        action={
          <Button
            style={{ backgroundColor: "#641498", color: "#FCFCFC" }}
            icon={<FormOutlined />}
            onClick={() => {
              history.push("/atendimentos/create");
            }}
          >
            Cadastrar Atendimento
          </Button>
        }
      >
        <Row gutter={[24, 24]} style={{ width: "100%" }}>
          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            <List
              grid={{ gutter: 16, column: 2 }}
              dataSource={agendamentos}
              renderItem={(item) => (
                <List.Item>
                  <Card
                    title={`Agendamento: ${item.id}`}
                    extra={<Tag color="warning">{item.vagas} vagas</Tag>}
                  >
                    <p>Estabelecimento: {item.horario.split("-")[1]}</p>
                    <p>Data e Horário: {item.horario}</p>
                  </Card>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Panel>
    </>
  );
}

export default AtendimentoList;
