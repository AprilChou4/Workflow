/*
 * @Description: 
 * @Author: zhouxiaojuan
 * @Date: 2021-04-25 09:40:15
 * @LastEditTime: 2021-05-25 10:47:24
 * @LastEditors: zhouxiaojuan
 */
import React from 'react';
import { NodeTypes } from './Constants';
import AddNode from './Add';

function NodeWrap(props) {
  const { title, children, objRef, onContentClick, titleStyle, type } = props;
  return (
    <div>
      <div className="node-wrap">
        <div className={`node-wrap-box ${type === NodeTypes.START ? 'start-node' : ''}`}>
          <div className="title" style={titleStyle}>
            {title}
          </div>
          <div className="content" onClick={onContentClick}>
            {children}
          </div>
        </div>
        <AddNode objRef={objRef} />
      </div>
    </div>
  );
}
export default NodeWrap;
