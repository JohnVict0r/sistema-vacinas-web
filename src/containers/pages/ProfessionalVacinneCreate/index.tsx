import React from "react";
/* import api from "../../services/api";*/

import Panel from "../../../components/Panel";
import VaccineForm from "../../../components/Forms/VaccineForm";
import { Row, Col } from "antd";

function ProfessionalVacinneCreate() {
  return (
    <Panel title="Cadastrar Vacinação">
      <Row gutter={[24, 24]} style={{ width: "100%" }}>
        <Col xs={{ span: 24 }} lg={{ span: 12, offset: 6 }}>
          <VaccineForm buttonText="Cadastrar Vacinação" professional={true} />
        </Col>
      </Row>
    </Panel>
  );
}

export default ProfessionalVacinneCreate;
