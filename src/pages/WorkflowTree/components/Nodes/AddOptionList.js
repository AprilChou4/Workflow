/*
 * @Description: 节点类型选择 条件/结果
 * @Author: zhouxiaojuan
 * @Date: 2021-04-21 09:55:51
 * @LastEditTime: 2021-05-13 18:42:33
 * @LastEditors: zhouxiaojuan
 */
import React from 'react';
import AddNodeOption from './AddOption';
import { OptionNames, OptionTypes } from './Constants';

function AddNodeList(props) {
  return (
    <div className="add-node-popover-body">
      {/* <AddNodeOption type="approver" onClick={() => props.onOptionClick(OptionTypes.APPROVER)} name={OptionNames[OptionTypes.APPROVER]} /> */}
      <AddNodeOption
        type="condition"
        onClick={() => props.onOptionClick(OptionTypes.CONDITION)}
        name={OptionNames[OptionTypes.CONDITION]}
      />
      <AddNodeOption
        type="result"
        onClick={() => props.onOptionClick(OptionTypes.RESULT)}
        name={OptionNames[OptionTypes.RESULT]}
      />
    </div>
  );
}

export default AddNodeList;
