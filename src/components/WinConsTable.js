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
import { Col, Row } from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { observer, inject } from "mobx-react";

import AddRemoveButtonGroup from "./AddRemoveButtonGroup";

const WinConsTable = inject("appstate")(
  observer(
    class WinConsTable extends Component {
      constructor(props, context) {
        super(props, context);
        this.state = { selected: [] };
      }

      Float2DigitsFormatter = (cell, _row) => (
        <span>{Number(cell).toFixed(2)}</span>
      );

      onRowSelect(row, isSelected) {
        const name = row.name;
        if (isSelected) {
          this.setState({ selected: [...this.state.selected, name] });
        } else {
          this.setState({
            selected: this.state.selected.filter((it) => it !== name),
          });
        }
      }

      render() {
        const wincons = Object.values(this.props.appstate.wincons);

        return (
          <Col>
            <Row>
              <Col>
                <h4>Construcciones de Huecos</h4>
              </Col>
              <Col md="auto">
                <AddRemoveButtonGroup
                  objects={wincons}
                  newObj={this.props.appstate.newWinCons}
                  selected={this.state.selected}
                  clear={() => this.setState({ selected: [] })}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <BootstrapTable
                  data={wincons}
                  version="4"
                  striped
                  hover
                  bordered={false}
                  cellEdit={{ mode: "dbclick", blurToSave: true }}
                  selectRow={{
                    mode: "checkbox",
                    clickToSelectAndEditCell: true,
                    selected: this.state.selected,
                    onSelect: this.onRowSelect.bind(this),
                    hideSelectColumn: true,
                    bgColor: "lightgray",
                  }}
                >
                  <TableHeaderColumn dataField="id" isKey={true} hidden={true}>
                    - ID -{" "}
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="name"
                    headerText="Nombre que identifica de forma única la construcción de hueco"
                    width="30%"
                  >
                    Nombre
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="group"
                    headerText="Grupo de soluciones al que pertenece la construcción (solo a efectos de clasificación)"
                  >
                    Grupo
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="U"
                    dataFormat={this.Float2DigitsFormatter}
                    headerText="Transmitancia térmica del hueco (W/m²K)"
                  >
                    U<sub>w</sub>
                    <br />
                    <span style={{ fontWeight: "normal" }}>
                      <i>[W/m²K]</i>{" "}
                    </span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="Ff"
                    dataFormat={this.Float2DigitsFormatter}
                    headerText="Fracción de marco de la construcción de hueco (-)"
                  >
                    F<sub>f</sub>
                    <br />
                    <span style={{ fontWeight: "normal" }}>
                      <i>[-]</i>{" "}
                    </span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="gglwi"
                    dataFormat={this.Float2DigitsFormatter}
                    headerText="Factor solar del hueco sin la protección solar activada (g_glwi = g_gln * 0.90) (-)"
                  >
                    g<sub>gl;wi</sub>
                    <br />
                    <span style={{ fontWeight: "normal" }}>
                      <i>[-]</i>{" "}
                    </span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="gglshwi"
                    dataFormat={this.Float2DigitsFormatter}
                    headerText="Factor solar del hueco con la protección solar activada (g_glwi = g_gln * 0.90) (-)"
                  >
                    g<sub>gl;sh;wi</sub>
                    <br />
                    <span style={{ fontWeight: "normal" }}>
                      <i>[-]</i>{" "}
                    </span>
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="C_100"
                    dataFormat={this.Float2DigitsFormatter}
                    headerText="Permeabilidad al aire a 100 Pa (m³/hm²)"
                  >
                    C<sub>w;100Pa</sub>
                    <br />
                    <span style={{ fontWeight: "normal" }}>
                      <i>[m³/h·m²]</i>{" "}
                    </span>
                  </TableHeaderColumn>
                </BootstrapTable>
              </Col>
            </Row>
            <Row className="text-info small mt-3">
              <Col>
                <p>Donde:</p>
                <ul>
                  <li>
                    <b>Grupo</b>: grupo de clasificación de las construcciones
                    de opacos
                  </li>
                  <li>
                    <b>U</b>: Transmitancia térmica del hueco (W/m²K)
                  </li>
                  <li>
                    <b>
                      F<sub>f</sub>
                    </b>
                    : fracción de marco (-)
                  </li>
                  <li>
                    <b>
                      g<sub>gl;wi</sub>
                    </b>
                    : factor solar del hueco sin la protección solar activada
                    (g_glwi = g_gln * 0.90) (-)
                  </li>
                  <li>
                    <b>
                      g<sub>gl;sh;wi</sub>
                    </b>
                    : factor solar del hueco con la protección solar activada
                    (-)
                  </li>
                  <li>
                    <b>
                      C<sub>w;100</sub>
                    </b>
                    : Coeficiente de permeabilidad al aire del hueco a 100 Pa de
                    diferencia de presión (m³/h·m²). La clase de permeabilidad
                    al aire de los huecos, según la norma UNE EN 12207:2000 es:
                    Clase 1: C<sub>w;100</sub> &le; 50m3/hm2, Clase 2: C
                    <sub>w;100</sub> &le; 27 m³/hm², Clase 3: C<sub>w;100</sub>{" "}
                    &le; 9 m³/hm², Clase 4: C<sub>w;100</sub> &le; 3 m³/hm².
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>
        );
      }
    }
  )
);

export default WinConsTable;
