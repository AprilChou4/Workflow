/*
 * @Description:
 * @Author: zhouxiaojuan
 * @Date: 2021-04-21 09:55:51
 * @LastEditTime: 2021-05-25 10:52:31
 * @LastEditors: zhouxiaojuan
 */
import React, { useState, useContext } from 'react';
import WFC from './OperatorContext';

const ZOOM = {
  DOWN: 1,
  UP: 2,
  MIN: 50,
  MAX: 300,
};

function ZoomLayout(props) {
  const { isEdit } = useContext(WFC);
  // 放大比例, 按百分制给 100 为 100%
  let [scale, setScale] = useState(100);
  function zoomSize(type) {
    if (type === ZOOM.DOWN) {
      if (scale === ZOOM.MIN) {
        return;
      }
      scale -= 10;
      setScale(scale);
    }
    if (type === ZOOM.UP) {
      if (scale === ZOOM.MAX) {
        return;
      }
      scale += 10;
      setScale(scale);
    }
  }
  return (
    <React.Fragment>
      <div className="zoom">
        <div
          className={'zoom-out' + (scale === ZOOM.MIN ? ' disabled' : '')}
          onClick={() => zoomSize(ZOOM.DOWN)}
        />
        <span>{scale}%</span>
        <div
          className={'zoom-in' + (scale === ZOOM.MAX ? ' disabled' : '')}
          onClick={() => zoomSize(ZOOM.UP)}
        />
      </div>
      <div
        className={`box-scale ${isEdit ? '' : 'box-scale-disabled'}`}
        id="box-scale"
        style={{
          transform: `scale(${scale / 100})`,
          transformOrigin: '50% 0px 0px',
        }}
      >
        {props.children}
      </div>
    </React.Fragment>
  );
}

export default ZoomLayout;
