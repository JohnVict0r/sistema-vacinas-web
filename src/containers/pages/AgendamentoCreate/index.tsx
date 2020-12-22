import Panel from "../../../components/Panel";
import { Row, Col } from "antd";

import React, { useState, useEffect } from "react";
import { Form, Button, Select } from "antd";
import api from "../../../services/api";
import { getAuthToken } from "../../../utils/authentication";
import { useHistory } from "react-router-dom";

function AgendamentoCreate() {
  const [form] = Form.useForm();
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const [vaccines, setVaccines] = useState<any[]>([]);

  const [vaccineSelected, setVaccineSelected] = useState();

  const [estabelecimentos, setEstabelecimentos] = useState<any[]>([]);
  const [estabelecimento, setEstabelecimento] = useState([]);

  const [horarios, setHorarios] = useState<any[]>([]);
  const [horario, setHorario] = useState();

  const [ufs, setUfs] = useState<any[]>([]);
  const [stateId, setStateId] = useState<any>();
  const [cities, setCities] = useState<any[]>([]);
  const [city, setCity] = useState();

  const token = getAuthToken();

  useEffect(() => {
    api.get("ufs").then((response) => {
      setUfs(response.data);
    });
  }, []);

  useEffect(() => {
    api.get(`municipios`).then((response) => {
      setCities(response.data);
    });
  }, []);

  useEffect(() => {
    api.get(`estabelecimentos/`).then((response) => {
      setEstabelecimentos(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get(`atendimentos/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setHorarios(response.data);
      });
  }, [token]);

  useEffect(() => {
    api
      .get("vaccines/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setVaccines(response.data);
      });
  }, [token]);

  const onFinish = (values: any) => {
    setLoading(true);

    Object.keys(values).forEach((key) => {
      if (values[key] === undefined) {
        values[key] = " ";
      }
    });
    api
      .post(
        `/me/agendamentos`,
        {
          ...values,
          vaccine: vaccineSelected,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setLoading(false);

        history.push("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Panel title="Agendar Vacinação">
      <Row gutter={[24, 24]} style={{ width: "100%" }}>
        <Col xs={{ span: 24 }} lg={{ span: 12, offset: 6 }}>
          <Form
            name="vaccine-form"
            className="vaccine-form"
            layout="vertical"
            form={form}
            onFinish={onFinish}
            onFinishFailed={(err) => console.log("erro no finish", err)}
            scrollToFirstError
          >
            <Form.Item
              name="vaccine"
              label="Nome"
              rules={[
                { required: true, message: "Por favor, selecione o Nome!" },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="Selecione uma opção"
                value={vaccineSelected}
                onChange={(value) => {
                  setVaccineSelected(value);
                }}
              >
                {vaccines.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="state"
              label="Estado"
              rules={[
                { required: true, message: "Por favor, selecione um estado!" },
              ]}
            >
              <Select
                placeholder="Selecione um estado"
                onChange={(value) => {
                  setStateId(value);
                }}
                allowClear
              >
                {ufs.map((uf) => (
                  <Select.Option key={uf.cod} value={uf.cod}>
                    {uf.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="city"
              label="Cidade"
              rules={[
                { required: true, message: "Por favor, selecione uma cidade!" },
              ]}
            >
              <Select
                placeholder="Selecione uma cidade"
                value={city}
                onChange={(value) => {
                  setCity(value);
                }}
                allowClear
              >
                {cities
                  .filter((item) => item.cod_uf === stateId)
                  .map((city) => (
                    <Select.Option key={city.cod} value={city.cod}>
                      {city.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="estabelecimento"
              label="Estabelecimento"
              rules={[
                { required: true, message: "Por favor, selecione uma cidade!" },
              ]}
            >
              <Select
                placeholder="Selecione um estabelecimento"
                value={estabelecimento}
                onChange={(value) => {
                  setEstabelecimento(value);
                }}
                allowClear
              >
                {estabelecimentos
                  .filter((item) => item.co_municipio_gestor === city)
                  .map((city) => (
                    <Select.Option
                      key={city.co_unidade}
                      value={city.co_unidade}
                    >
                      {city.no_fantasia}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="horario"
              label="Horário"
              rules={[
                { required: true, message: "Por favor, selecione uma cidade!" },
              ]}
            >
              <Select
                placeholder="Selecione um horário"
                value={horario}
                onChange={(value) => {
                  setHorario(value);
                }}
                allowClear
              >
                {horarios
                  // eslint-disable-next-line
                  .filter((item) => item.estabelecimento == estabelecimento)
                  .filter((item) => item.vagas !== 0)
                  .map((city) => (
                    <Select.Option key={city.id} value={city.nome}>
                      {`${city.horario} - ${city.vagas} vagas`}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                size="large"
                loading={loading}
              >
                Agendar Vacinação
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Panel>
  );
}

export default AgendamentoCreate;
