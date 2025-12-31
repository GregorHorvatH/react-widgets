import React, { useState, useRef } from 'react';
import { v4 as uuid4 } from 'uuid';

import { ReactWidgets } from './ReactWidgets';
import { MAX_COL_SIZE, MAX_ROW_SIZE } from './ReactWidgets/constants'

import chart1 from './ReactWidgets/assets/chart-1.jpg';
import chart2 from './ReactWidgets/assets/chart-2.jpg';
import chart3 from './ReactWidgets/assets/chart-3.jpg';

const IMAGES = {
  1: chart1,
  2: chart2,
  3: chart3,
  4: chart2,
  5: chart1,
  6: chart3,
};

const TestComponent = ({ widget }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', overflow: 'auto' }}>
    <span>Size X: {widget.hSize}/{MAX_ROW_SIZE}</span>
    <span>Size Y: {widget.vSize}/{MAX_COL_SIZE}</span>
    {IMAGES[widget.number] && <img src={IMAGES[widget.number]} />}
  </div>
);

const App = () => {
  const widgetsRef = useRef();
  const [fullWidth, setFullWidth] = useState(false);
  const [fullHeight, setFullHeight] = useState(false);

  const addWidget = () => {
    widgetsRef.current.setWidgets(prev => [
      ...prev,
      {
        id: uuid4(),
        number: widgetsRef.current.widgets.length + 1,
        hSize: 1,
        vSize: 1,
        title: `Widget ${widgetsRef.current.widgets.length + 1}`,
        component: TestComponent,
      },
    ]);
  };

  return (
    <div className='app'>
      <div className='header'>
        <span>Widgets DEMO</span>
        <div className='toolbox'>
          <label>
            <span>Full width</span>
            <input type="checkbox" checked={fullWidth} onChange={() => setFullWidth(prev => !prev)} />
          </label>
          <label>
            <span>Full height</span>
            <input type="checkbox" checked={fullHeight} onChange={() => setFullHeight(prev => !prev)} />
          </label>
          <button onClick={addWidget}>+ Add Widget</button>
        </div>
      </div>
      <ReactWidgets fullHeight={fullHeight} fullWidth={fullWidth} ref={widgetsRef} />
    </div>
  )
}

export default App;
