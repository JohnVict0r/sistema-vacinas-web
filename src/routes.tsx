import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Login from "./containers/pages/Login";
import SignUp from "./containers/pages/SignUp";
import ProfileVaccineCreate from "./containers/pages/ProfileVacinneCreate";
import { isAuthenticated } from "./utils/authentication";
import PrivateLayout from "./containers/Layout/PrivateLayout";
import PublicLayout from "./containers/Layout/PublicLayout";
import Home from "./containers/pages/Home";
import VaccineList from "./containers/pages/VaccineList";
import AgendamentoList from "./containers/pages/AgendamentoList";
import Welcome from "./containers/pages/Welcome";
import Success from "./containers/pages/Success";
import AgendamentoCreate from "./containers/pages/AgendamentoCreate";
import AtendimentoCreate from "./containers/pages/AtendimentoCreate";
import ProfessionalVacinneCreate from "./containers/pages/ProfessionalVacinneCreate";
import AtendimentoList from "./containers/pages/AtendimentoList";
import EstabelecimentoAgendamentoList from "./containers/pages/EstabelecimentoAgendamentoList";

interface IPublicRouteProps {
  component: any;
}

interface IPrivateRouteProps {
  component: any;
}

const PublicRoute: any = ({
  component: Component,
  ...rest
}: IPublicRouteProps) => (
  <Route
    {...rest}
    render={(props) => (
      <PublicLayout>
        <Component {...props} />
      </PublicLayout>
    )}
  />
);

const PrivateRoute: any = ({
  component: Component,
  ...rest
}: IPrivateRouteProps) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <PrivateLayout>
            <Component {...props} />
          </PrivateLayout>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute path="/login" component={Login} />
        <PublicRoute path="/register" component={SignUp} />
        <PublicRoute path="/welcome" component={Welcome} />
        <PublicRoute path="/success/:type" component={Success} />
        <PrivateRoute path="/home" component={Home} />
        <PrivateRoute path="/minhas-vacinas" exact component={VaccineList} />
        <PrivateRoute
          path="/minhas-vacinas/create"
          exact
          component={ProfileVaccineCreate}
        />
        <PrivateRoute
          path="/vacinar"
          exact
          component={ProfessionalVacinneCreate}
        />
        <PrivateRoute
          path="/meus-agendamentos"
          exact
          component={AgendamentoList}
        />
        <PrivateRoute
          path="/meus-agendamentos/create"
          exact
          component={AgendamentoCreate}
        />
        <PrivateRoute
          path="/agendamentos"
          exact
          component={EstabelecimentoAgendamentoList}
        />
        <PrivateRoute path="/atendimentos" exact component={AtendimentoList} />
        <PrivateRoute
          path="/atendimentos/create"
          exact
          component={AtendimentoCreate}
        />
        <Redirect
          to={{
            pathname: "/login",
          }}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
