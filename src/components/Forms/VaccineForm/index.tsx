import React, { FC, useState, useEffect } from "react";
import { Form, Input, Button, Select, Space, InputNumber } from "antd";
import moment from "moment";
import api from "../../../services/api";
import { getAuthToken } from "../../../utils/authentication";
import { useHistory } from "react-router-dom";

export const textMonths: any = {
  1: "Janeiro",
  2: "Fevereiro",
  3: "Março",
  4: "Abril",
  5: "Maio",
  6: "Junho",
  7: "Julho",
  8: "Agosto",
  9: "Setembro",
  10: "Outubro",
  11: "Novembro",
  12: "Dezembro",
};

const months = [
  { name: "Janeiro", value: 1 },
  { name: "Fevereiro", value: 2 },
  { name: "Março", value: 3 },
  { name: "Abril", value: 4 },
  { name: "Maio", value: 5 },
  { name: "Junho", value: 6 },
  { name: "Julho", value: 7 },
  { name: "Agosto", value: 8 },
  { name: "Setembro", value: 9 },
  { name: "Outubro", value: 10 },
  { name: "Novembro", value: 11 },
  { name: "Dezembro", value: 12 },
];

interface Props {
  readonly buttonText: string;
  readonly professional?: boolean;
}
const VaccineForm: FC<Props> = ({ buttonText, professional }) => {
  const [form] = Form.useForm();
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const [vaccines, setVaccines] = useState<any[]>([]);

  const [day, setDay] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();

  const [vaccineSelected, setVaccineSelected] = useState();

  const [patients, setPatients] = useState<any[]>([]);

  const [patient, setPatient] = useState<any>();

  const token = getAuthToken();

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

  useEffect(() => {
    api
      .get("patients", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPatients(response.data);
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
        professional ? "/patients/vaccines" : `/me/vaccines`,
        {
          ...values,
          user: patient,
          vaccine: vaccineSelected,
          date_application: `${year}-${month}-${day}`,
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
    <Form
      name="vaccine-form"
      className="vaccine-form"
      layout="vertical"
      form={form}
      onFinish={onFinish}
      onFinishFailed={(err) => console.log("erro no finish", err)}
      scrollToFirstError
    >
      {professional && (
        <Form.Item
          name="user"
          label="Paciente"
          rules={[
            { required: true, message: "Por favor, selecione o paciente!" },
          ]}
        >
          <Select
            showSearch
            optionFilterProp="children"
            placeholder="Selecione uma opção"
            value={patient}
            onChange={(value) => {
              setPatient(value);
            }}
          >
            {patients.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.username}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )}
      <Form.Item
        name="vaccine"
        label="Nome"
        rules={[{ required: true, message: "Por favor, selecione o Nome!" }]}
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
        name="date"
        label="Data de Vacinação"
        rules={[
          {
            required: true,
            message: "Por favor, informe a data de vacinação!",
          },
        ]}
      >
        <Space>
          <InputNumber
            placeholder="Dia"
            min={1}
            max={31}
            value={day}
            onChange={(value) => {
              setDay(value);
            }}
          />
          <Select
            placeholder="Mês"
            value={month}
            onChange={(value) => {
              setMonth(value);
            }}
          >
            {months.map((item) => (
              <Select.Option value={item.value}>{item.name}</Select.Option>
            ))}
          </Select>
          <InputNumber
            placeholder="Ano"
            min={1910}
            max={moment().year()}
            value={year}
            onChange={(value) => {
              setYear(value);
            }}
          />
        </Space>
      </Form.Item>
      <Form.Item label="Lote da vacina" name="lote">
        <Input size="large" defaultValue=" " />
      </Form.Item>
      <Form.Item label="Responsável pela aplicação da vacina" name="applicator">
        <Input size="large" defaultValue=" " />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          size="large"
          loading={loading}
        >
          {buttonText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default VaccineForm;
