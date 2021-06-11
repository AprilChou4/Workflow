/*
 * @Description:递归渲染节点
 * @Author: zhouxiaojuan
 * @Date: 2021-04-21 09:55:51
 * @LastEditTime: 2021-06-11 15:24:55
 * @LastEditors: zhouxiaojuan
 */
import React from 'react';
import MatchNode from './Node';

/**
 *  递归渲染树
 * @param {*} config 工作流数据
 * @param {*} pRef 父节点数据引用
 * @returns
 */
function Render(props) {
  const { config, pRef, isEdit } = props;
  console.log(props, pRef, '------Render--props-----------');
  return (
    <React.Fragment>
      <MatchNode pRef={pRef} config={config} isEdit={isEdit} />
      {config.childNode && <Render pRef={config} config={config.childNode} />}
    </React.Fragment>
  );
}

export default Render;
