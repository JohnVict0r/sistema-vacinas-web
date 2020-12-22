import React, { FC, useState } from "react";
import { Form, Input, Button, Typography } from "antd";

import "./index.less";
import { setAuthToken, setProfile } from "../../../utils/authentication";
import api from "../../../services/api";
import { useHistory } from "react-router-dom";

const LoginForm: FC = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    setLoading(true);
    api
      .post("/login/", values)
      .then((response) => {
        setLoading(false);
        setAuthToken(response.data.access);
        setProfile(response.data.access);
        history.push("/welcome");
      })
      .catch(({ response }) => {
        console.log(response);
        setLoading(false);
      });
  };

  return (
    <>
      <Typography.Title
        style={{
          textAlign: "center",
          fontSize: `40px`,
          color: `#1a2423`,
          marginBottom: `32px`,
        }}
      >
        Acessar o cartão de vacina digital
      </Typography.Title>
      <Form
        name="login-form"
        className="login-form"
        layout="vertical"
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        requiredMark={false}
      >
        <Form.Item
          label="Usuário"
          name="username"
          rules={[{ required: true, message: "Por favor, insira o username!" }]}
          className="form-item"
        >
          <Input placeholder="Usuário" size="large" />
        </Form.Item>
        <Form.Item
          label="Senha"
          name="password"
          rules={[{ required: true, message: "Por favor, insira a senha!" }]}
          className="form-item"
        >
          <Input type="password" size="large" placeholder="Senha" />
        </Form.Item>

        <Form.Item className="form-item">
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            size="large"
            loading={loading}
            style={{ height: `48px`, fontSize: `16px` }}
          >
            Entrar
          </Button>
        </Form.Item>
        <div className="login-form-register">
          Não tem conta?
          <a href="/register"> Crie uma agora</a>
        </div>
      </Form>
    </>
  );
};

export default LoginForm;
