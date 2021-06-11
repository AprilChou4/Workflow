/*
 * @Description: 
 * @Author: zhouxiaojuan
 * @Date: 2021-04-22 16:33:26
 * @LastEditTime: 2021-05-06 17:30:11
 * @LastEditors: zhouxiaojuan
 */
import React from 'react';

function AddNodeOption({ type, onClick, name }) {
  return (
    <a className={`add-node-popover-item ${type}`} onClick={onClick}>
      <div className="item-wrapper">
        <span className="iconfont">{type === 'result' ? '\ue61a' : '\ue6bd'}</span>
      </div>
      <p>{name}</p>
    </a>
  );
}

export default AddNodeOption;
