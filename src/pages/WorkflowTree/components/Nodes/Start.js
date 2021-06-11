/*
 * @Description:
 * @Author: zhouxiaojuan
 * @Date: 2021-04-21 09:55:51
 * @LastEditTime: 2021-04-26 17:20:35
 * @LastEditors: zhouxiaojuan
 */
import React from 'react';
import NodeWrap from './Wrap';
import AddNode from './Add';

function getOwner(flowPermission) {
  console.log('flowPermission:', flowPermission);
}
function StartNode({ nodeName, objRef }) {
  return (
    <div className="start-wrapper">
      <div className="circle">{nodeName}</div>
      <AddNode objRef={objRef} />
    </div>
  );
}
export default StartNode;
