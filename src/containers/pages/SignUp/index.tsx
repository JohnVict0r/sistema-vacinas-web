import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Typography } from "antd";
import api from "../../../services/api";
import { useHistory } from "react-router-dom";
import "./style.css";

const validateMessages = {
  // eslint-disable-next-line
  required: "${label} é um campo obrigatório!",
  types: {
    email: "Por favor, insira um E-mail válido!",
    // eslint-disable-next-line
    number: "${label} is not a validate number!",
  },
  number: {
    // eslint-disable-next-line
    range: "${label} must be between ${min} and ${max}",
  },
};

function SignUp() {
  const [form] = Form.useForm();
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    setLoading(true);
    api
      .post("/register/", {
        ...values,
      })
      .then(() => {
        setLoading(false);
        history.push("/success/register/");
      })
      .catch(({ response }) => {
        if (response.data.username) {
          form.setFields([
            {
              name: "username",
              errors: [response.data.username[0]],
            },
          ]);
        }
        if (response.data.email) {
          form.setFields([
            {
              name: "email",
              errors: [response.data.email[0]],
            },
          ]);
        }
        if (response.data.password) {
          form.setFields([
            {
              name: "password",
              errors: [response.data.password[0]],
            },
          ]);
        }
        setLoading(false);
      });
  };

  return (
    <>
      <Typography.Title
        style={{ textAlign: "center", fontSize: `40px`, marginBottom: `32px` }}
      >
        Cadastro
      </Typography.Title>
      <Form
        name="login-form"
        className="login-form"
        layout="vertical"
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={(err) => console.log("erro no finish", err)}
        requiredMark={false}
        scrollToFirstError
        validateMessages={validateMessages}
      >
        <Form.Item
          label="Usuário"
          name="username"
          className="login-form-item"
          rules={[
            {
              required: true,
              message: "Por favor, insira o usuário!",
            },
            {
              pattern: new RegExp("[a-zA-Z \u00C0-\u00FF]"),
              message: "Apenas Letras!",
            },
          ]}
        >
          <Input
            placeholder="Ex.: Carlos"
            size="large"
            onKeyPress={(e) => {
              const specialCharRegex = new RegExp("[a-zA-Z \u00C0-\u00FF]");
              const pressedKey = String.fromCharCode(
                !e.charCode ? e.which : e.charCode
              );
              if (!specialCharRegex.test(pressedKey)) {
                e.preventDefault();
                return false;
              }
              return true;
            }}
          />
        </Form.Item>
        <Form.Item
          label="E-mail"
          name="email"
          className="login-form-item"
          rules={[{ type: "email", required: true }]}
        >
          <Input placeholder="Ex.:  Carlos.augusto@email.com" size="large" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Crie uma senha de acesso"
          rules={[
            {
              required: true,
              message: "Por favor, insira a senha!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm-password"
          label="Confirme a senha de acesso"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Por favor, confirme a senha!",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("As duas senhas não são iguais!");
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          className="login-form-item"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(
                      "É necessário concordar com os termos de uso"
                    ),
            },
          ]}
        >
          <Checkbox>
            Eu li e concordo com os Termos de Uso e a Política de Privacidade
          </Checkbox>
        </Form.Item>

        <Form.Item className="login-form-item">
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            size="large"
            loading={loading}
            style={{ height: `48px`, fontSize: `16px` }}
          >
            Criar minha conta
          </Button>
        </Form.Item>
        <div className="login-form-register">
          Já possui conta?
          <a href="/login"> Faça seu login</a>
        </div>
      </Form>
    </>
  );
}

export default SignUp;
