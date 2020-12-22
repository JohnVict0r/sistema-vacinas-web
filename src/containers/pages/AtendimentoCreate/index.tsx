import Panel from "../../../components/Panel";
import { Row, Col } from "antd";
import moment from "moment";

import React, { useState, useEffect } from "react";
import { Form, Button, Select, InputNumber, DatePicker } from "antd";
import api from "../../../services/api";
import { getAuthToken } from "../../../utils/authentication";
import { useHistory } from "react-router-dom";

function range(start: any, end: any) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

function disabledDate(current: any) {
  // Can not select days before today and today
  return current && current < moment().endOf("day");
}

function disabledDateTime() {
  return {
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56],
  };
}

function AtendimentoCreate() {
  const [form] = Form.useForm();
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const [estabelecimentos, setEstabelecimentos] = useState<any[]>([]);
  const [estabelecimento, setEstabelecimento] = useState([]);

  const [vagas, setVagas] = useState();

  const token = getAuthToken();

  useEffect(() => {
    api.get(`estabelecimentos/`).then((response) => {
      setEstabelecimentos(response.data);
    });
  }, []);

  const onFinish = (values: any) => {
    setLoading(true);

    Object.keys(values).forEach((key) => {
      if (values[key] === undefined) {
        values[key] = " ";
      }
    });
    api
      .post(
        `/atendimentos/`,
        {
          ...values,
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
    <Panel title="Cadastrar Vacinação">
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
                {estabelecimentos.map((city) => (
                  <Select.Option key={city.co_unidade} value={city.co_unidade}>
                    {city.no_fantasia}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="horario"
              label="Date e Horário"
              rules={[
                {
                  required: true,
                  message: "Por favor, informe a data e horário!",
                },
              ]}
            >
              <DatePicker
                format="YYYY-MM-DD HH:mm:ss"
                disabledDate={disabledDate}
                disabledTime={disabledDateTime}
                showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
              />
            </Form.Item>

            <Form.Item
              name="vagas"
              label="Quantidade de Vagas"
              rules={[
                {
                  required: true,
                  message:
                    "Por favor, selecione informe a quantidade de vagas!",
                },
              ]}
            >
              <InputNumber
                placeholder="vagas"
                min={1}
                max={20}
                value={vagas}
                onChange={(value) => {
                  setVagas(value);
                }}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                size="large"
                loading={loading}
              >
                Cadastrar Atendimento
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Panel>
  );
}

export default AtendimentoCreate;
