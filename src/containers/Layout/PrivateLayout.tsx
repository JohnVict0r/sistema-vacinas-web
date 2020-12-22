import React, { FC, useState } from "react";

import { Layout, Button, Menu, Dropdown, Drawer } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  DownOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

import "./PrivateLayout.less";
import Avatar from "antd/lib/avatar/avatar";
import { removeAuthToken, getProfile } from "../../utils/authentication";
import { useHistory, useLocation } from "react-router-dom";
import VaccineIcon from "../../components/Icons/VaccineIcon";

const { Header, Sider, Content } = Layout;

const PrivateLayout: FC = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const history = useHistory();
  const location = useLocation();

  const profile = getProfile();

  const isMobile = window.innerWidth < 720;
  const menuProfile = () => (
    <Menu>
      <Menu.Item
        key="1"
        icon={<LogoutOutlined />}
        onClick={() => {
          history.push("/login");
          removeAuthToken();
        }}
        style={{ color: "#FF0000" }}
      >
        Sair
      </Menu.Item>
    </Menu>
  );

  const selectedMenuNav = (menuName: string) => {
    const pathName = location.pathname;

    if (pathName !== `/${menuName}`) {
      return false;
    }
    return true;
  };

  return (
    <Layout>
      {isMobile ? (
        <Drawer
          title={<div className="logo"></div>}
          placement="left"
          closable={false}
          onClose={() => setCollapsed(!collapsed)}
          visible={!collapsed}
          key="left"
        >
          <Menu theme="light" mode="inline">
            <Menu.Item
              key="1"
              icon={<AppstoreOutlined />}
              className={
                selectedMenuNav("home")
                  ? "ant-menu-item ant-menu-item-selected"
                  : "ant-menu-item"
              }
              onClick={() => {
                history.push("/home");
              }}
            >
              Home
            </Menu.Item>
            {profile.is_patient && (
              <Menu.Item
                key="2"
                icon={<VaccineIcon />}
                className={
                  selectedMenuNav("minhas-vacinas")
                    ? "ant-menu-item ant-menu-item-selected"
                    : "ant-menu-item"
                }
                onClick={() => {
                  history.push("/minhas-vacinas");
                }}
              >
                Minhas vacinas
              </Menu.Item>
            )}

            {profile.is_patient && (
              <Menu.Item
                key="3"
                icon={<VaccineIcon />}
                className={
                  selectedMenuNav("meus-agendamentos")
                    ? "ant-menu-item ant-menu-item-selected"
                    : "ant-menu-item"
                }
                onClick={() => {
                  history.push("/meus-agendamentos");
                }}
              >
                Agendamentos
              </Menu.Item>
            )}
            {profile.is_professional_health && (
              <Menu.Item
                key="4"
                icon={<VaccineIcon />}
                className={
                  selectedMenuNav("agendamentos")
                    ? "ant-menu-item ant-menu-item-selected"
                    : "ant-menu-item"
                }
                onClick={() => {
                  history.push("/agendamentos");
                }}
              >
                Agendamentos
              </Menu.Item>
            )}
            {profile.is_professional_health && (
              <Menu.Item
                key="5"
                icon={<VaccineIcon />}
                className={
                  selectedMenuNav("vacinar")
                    ? "ant-menu-item ant-menu-item-selected"
                    : "ant-menu-item"
                }
                onClick={() => {
                  history.push("/vacinar");
                }}
              >
                Vacinar Paciente
              </Menu.Item>
            )}
            {profile.is_professional_health && (
              <Menu.Item
                key="6"
                icon={<VaccineIcon />}
                className={
                  selectedMenuNav("atendimentos")
                    ? "ant-menu-item ant-menu-item-selected"
                    : "ant-menu-item"
                }
                onClick={() => {
                  history.push("/atendimentos");
                }}
              >
                Atendimentos
              </Menu.Item>
            )}
          </Menu>
        </Drawer>
      ) : (
        <Sider
          theme="light"
          style={{ height: "100vh" }}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div className="logo">logo</div>
          <Menu theme="light" mode="inline">
            <Menu.Item
              key="1"
              icon={<AppstoreOutlined />}
              className={
                selectedMenuNav("home")
                  ? "ant-menu-item ant-menu-item-selected"
                  : "ant-menu-item"
              }
              onClick={() => {
                history.push("/home");
              }}
            >
              Home
            </Menu.Item>
            {profile.is_patient && (
              <Menu.Item
                key="2"
                icon={<VaccineIcon />}
                className={
                  selectedMenuNav("minhas-vacinas")
                    ? "ant-menu-item ant-menu-item-selected"
                    : "ant-menu-item"
                }
                onClick={() => {
                  history.push("/minhas-vacinas");
                }}
              >
                Minhas vacinas
              </Menu.Item>
            )}

            {profile.is_patient && (
              <Menu.Item
                key="3"
                icon={<VaccineIcon />}
                className={
                  selectedMenuNav("meus-agendamentos")
                    ? "ant-menu-item ant-menu-item-selected"
                    : "ant-menu-item"
                }
                onClick={() => {
                  history.push("/meus-agendamentos");
                }}
              >
                Agendamentos
              </Menu.Item>
            )}
            {profile.is_professional_health && (
              <Menu.Item
                key="4"
                icon={<VaccineIcon />}
                className={
                  selectedMenuNav("agendamentos")
                    ? "ant-menu-item ant-menu-item-selected"
                    : "ant-menu-item"
                }
                onClick={() => {
                  history.push("/agendamentos");
                }}
              >
                Agendamentos
              </Menu.Item>
            )}
            {profile.is_professional_health && (
              <Menu.Item
                key="5"
                icon={<VaccineIcon />}
                className={
                  selectedMenuNav("vacinar")
                    ? "ant-menu-item ant-menu-item-selected"
                    : "ant-menu-item"
                }
                onClick={() => {
                  history.push("/vacinar");
                }}
              >
                Vacinar Paciente
              </Menu.Item>
            )}
            {profile.is_professional_health && (
              <Menu.Item
                key="6"
                icon={<VaccineIcon />}
                className={
                  selectedMenuNav("atendimentos")
                    ? "ant-menu-item ant-menu-item-selected"
                    : "ant-menu-item"
                }
                onClick={() => {
                  history.push("/atendimentos");
                }}
              >
                Atendimentos
              </Menu.Item>
            )}
          </Menu>
        </Sider>
      )}

      <Layout>
        <Header className="header">
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => {
                setCollapsed(!collapsed);
              },
            }
          )}
          <Dropdown overlay={menuProfile} className="profile">
            <Button style={{ border: "none" }}>
              <Avatar
                style={{
                  color: "#FCFCFC",
                  backgroundColor: "#016A60",
                  marginRight: "10px",
                }}
              >
                {profile && profile.username[0]}
              </Avatar>
              {profile.username}
              <DownOutlined />
            </Button>
          </Dropdown>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default PrivateLayout;
