/*
 * @Description:匹配节点
 * @Author: zhouxiaojuan
 * @Date: 2021-04-21 09:55:51
 * @LastEditTime: 2021-05-25 10:10:45
 * @LastEditors: zhouxiaojuan
 */
import React from 'react';
import StartNode from './Start';
import ApproverNode from './Approver';
import NotifierNode from './Notifier';
import ConditionNode from './Condition';
import Result from './Result';

/**
 * config.type:1=开始节点 4=条件节点 5=结果节点
 */
const NodeMaps = {
  0: StartNode,
  1: ApproverNode,
  2: NotifierNode,
  4: ConditionNode,
  5: Result,
};
const nodeClick = () => {};

function MatchNode({ config, pRef }) {
  const Node = NodeMaps[config.type] || null;
  return Node && <Node {...config} objRef={config} pRef={pRef} onClick={nodeClick} />;
}

export default MatchNode;
