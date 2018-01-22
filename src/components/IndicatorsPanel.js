/* -*- coding: utf-8 -*-

Copyright (c) 2016-2017 Rafael Villar Burke <pachi@rvburke.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import React, { Component } from "react";
import { Button, Col, Glyphicon, Grid, Panel, Row } from "react-bootstrap";

export default class IndicatorsPanel extends Component {
  constructor(...args) {
    super(...args);
    this.state = { open: false };
  }

  render() {
    // climate, radiationdata,
    const {
      Autil,
      climateTotRadJul,
      huecosA,
      huecosAU,
      opacosA,
      opacosAU,
      ptsPsiL,
      totalA,
      totalAU,
      K,
      Qsoljul,
      qsj
    } = this.props;
    const Qsoljul_clima = Qsoljul(climateTotRadJul);
    const qsj_clima = qsj(climateTotRadJul);

    return (
      <Grid>
        <Row>
          <Col md={1}>
            <Button
              bsSize="xs"
              bsStyle="info"
              onClick={() => this.setState({ open: !this.state.open })}
            >
              <Glyphicon glyph="plus" />
            </Button>
          </Col>
          <Col md={3} title="Transmitancia térmica global del edificio">
            <b>
              <i>K</i> = {K.toFixed(2)} <i>W/m²K</i>
            </b>
          </Col>
          <Col md={3} title="Indicador de control solar">
            <b>
              <i>
                q<sub>sol;jul</sub>
              </i>{" "}
              = {qsj_clima.toFixed(2)} <i>kWh/m²/mes</i>
            </b>
          </Col>
          <Col md={5} className="text-right">
            <p title="Superficie útil del edificio o parte del edificio">
              <b>
                A<sub>util</sub>
              </b>{" "}
              ={" "}
              <input
                type="text"
                onChange={e => this.handleChange(e)}
                value={Autil}
              />{" "}
              m²
            </p>
          </Col>
        </Row>
        <Panel
          id="detalleindicadores"
          expanded={this.state.open}
          bsStyle="info"
        >
          <Panel.Collapse>
            <Panel.Body>
              <Grid>
                <Row>
                  <h3>Transmitancia térmica global</h3>
                  <p>
                    Transmisión de calor a través de la envolvente térmica
                    (huecos, opacos y puentes térmicos)
                  </p>
                  <p>
                    H<sub>tr,adj</sub> &asymp; &sum;<sub>x</sub> b<sub>
                      tr,x
                    </sub>{" "}
                    · [&sum;<sub>i</sub> A<sub>x,i</sub> · U<sub>x,i</sub>{" "}
                    (huecos + opacos) + &sum;<sub>k</sub> l<sub>x,k</sub> · ψ<sub
                    >
                      x,k
                    </sub>{" "}
                    (PTs)] = {huecosAU.toFixed(2)} W/K (huecos) +{" "}
                    {opacosAU.toFixed(2)} W/K (opacos) + {ptsPsiL.toFixed(2)}{" "}
                    W/K (PTs) = {(totalAU + ptsPsiL).toFixed(2)} W/K{" "}
                  </p>
                  <p>Superficie de intercambio de la envolvente térmica</p>
                  <p>
                    &sum;A = &sum; b<sub>tr,x</sub> · A<sub>x</sub> ={" "}
                    {Number(huecosA).toFixed(2)} m² (huecos) +{" "}
                    {Number(opacosA).toFixed(2)} m² (opacos) ={" "}
                    {Number(totalA).toFixed(2)} m²
                  </p>
                  <p>Valor del indicador:</p>
                  <p>
                    <b>K</b> = H<sub>tr,adj</sub> / &sum;A &asymp;{" "}
                    {(totalAU + ptsPsiL).toFixed(2)} / {totalA.toFixed(2)} ={" "}
                    <b>
                      {Number(K).toFixed(2)} <i>W/m²K</i>
                    </b>
                  </p>
                </Row>
                <Row>
                  <h3>Control solar</h3>
                  <p>
                    Ganancias solares en el mes de julio con los dispositivos de
                    sombra activados
                  </p>
                  <p>
                    Q<sub>sol;jul</sub> &sum;<sub>k</sub>(F<sub>sh,obst</sub> ·
                    g<sub>gl;sh;wi</sub> · (1 − F<sub>F</sub>) · A<sub>w,p</sub>{" "}
                    · H<sub>sol;jul</sub>) = {Qsoljul_clima.toFixed(2)} kWh/mes
                  </p>
                  <p>Superficie útil</p>
                  <p>
                    A<sub>util</sub> = {Autil} m²
                  </p>
                  <p>Valor del indicador:</p>
                  <p>
                    <b>
                      q<sub>sol;jul</sub>
                    </b>{" "}
                    = Q<sub>sol;jul</sub> / A<sub>util</sub> ={Qsoljul_clima.toFixed(
                      2
                    )}{" "}
                    / {Autil} ={" "}
                    <b>
                      <i>{Number(qsj_clima).toFixed(2)} kWh/m²/mes</i>
                    </b>
                  </p>
                </Row>
              </Grid>
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
      </Grid>
    );
  }

  // Actualización de Autil
  handleChange(e) {
    const currentValue = e.target.value;
    this.props.appstate.Autil = Number(currentValue);
  }
}
