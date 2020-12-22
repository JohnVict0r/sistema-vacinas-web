import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import { getAuthToken } from "../../../utils/authentication";
import Panel from "../../../components/Panel";
import { Row, List, Col, Card, Tag } from "antd";

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

function EstabelecimentoAgendamentoList() {
  const [agendamentos, setAgendamentos] = useState<any[]>([]);

  const token = getAuthToken();

  useEffect(() => {
    api
      .get(`/agendamentos/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setAgendamentos(response.data));
  }, [token]);

  const handleAccept = (id: any) => {
    api
      .put(
        `/agendamentos/`,
        {
          id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => window.location.reload());
  };

  return (
    <>
      <Panel title="Agendamentos de vacinação">
        <Row gutter={[24, 24]} style={{ width: "100%" }}>
          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            <List
              grid={{ gutter: 16, column: 2 }}
              dataSource={agendamentos}
              renderItem={(item) => (
                <List.Item>
                  <Card
                    title={`Agendamento: ${item.id}`}
                    extra={
                      item.atendido ? (
                        <Tag color="success">Atendido</Tag>
                      ) : (
                        <>
                          <Tag color="warning">Aguardando</Tag>
                          <Tag
                            color="default"
                            onClick={() => handleAccept(item.id)}
                          >
                            Aceitar
                          </Tag>
                        </>
                      )
                    }
                  >
                    <p>Estabelecimento - data - horario:</p>
                    <p>{item.horario.split(0, -13)}</p>
                    <p>usuário: {item.user}</p>
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

export default EstabelecimentoAgendamentoList;
