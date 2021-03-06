/* -*- coding: utf-8 -*-

Copyright (c) 2016-2021 Rafael Villar Burke <pachi@rvburke.com>

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

import React, { useState, useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { observer } from "mobx-react-lite";

import AppState from "../../stores/AppState";

import AddRemoveButtonGroup from "./AddRemoveButtonGroup";
import ShadesTable from "./ShadesTable";

// Vista de elementos de sombra del edificio
const ShadesView = observer(() => {
  const appstate = useContext(AppState);
  const [selected, setSelected] = useState([]);

  return (
    <Col>
      <Row>
        <Col>
          <h4>
            Elementos de sombra{" "}
            <small className="text-muted">({appstate.shades.length})</small>
          </h4>
        </Col>
        <Col md="auto">
          <AddRemoveButtonGroup
            elements="shades"
            newobj="newShade"
            selected={selected}
            setSelected={setSelected}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <ShadesTable selected={selected} setSelected={setSelected} />
        </Col>
      </Row>
      <Row className="text-info small mt-3">
        <Col>
          <p>Donde:</p>
          <ul>
            <li>
              <b>Orientación</b>: Orientación (gamma) [-180,+180] (S=0, E=+90,
              W=-90). Medido como azimuth geográfico de la proyección horizontal
              de la normal a la superficie.
            </li>
            <li>
              <b>Inclinación</b>: Inclinación (beta) [0, 180]. Medido respecto a
              la horizontal y normal hacia arriba (0 -&gt; superficie mirando
              hacia arriba, 180 -&gt; superficie mirando hacia abajo)
            </li>
          </ul>
        </Col>
      </Row>
    </Col>
  );
});

export default ShadesView;
