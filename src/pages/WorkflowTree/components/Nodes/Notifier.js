/*
 * @Description: 抄送
 * @Author: zhouxiaojuan
 * @Date: 2021-04-25 09:40:15
 * @LastEditTime: 2021-04-26 17:18:27
 * @LastEditors: zhouxiaojuan
 */
import React, { useContext } from 'react';
import NodeWrap from './Wrap';
import TitleElement from './TitleElement';
import WFC from '../OperatorContext';

function NotifierNode(props) {
  const { onDeleteNode, onSelectNode } = useContext(WFC);
  function delNode() {
    onDeleteNode(props.pRef, props.objRef);
  }
  function onChange(val) {
    props.pRef.childNode.nodeName = val;
  }

  function onContentClick() {
    onSelectNode(props.pRef, props.objRef);
    props.onContentClick && props.onContentClick();
  }

  let TitleEl = (
    <TitleElement
      delNode={delNode}
      placeholder={props.nodeName}
      nodeName={props.nodeName}
      onTitleChange={onChange}
    />
  );
  return (
    <NodeWrap
      titleStyle={{ backgroundColor: 'rgb(50, 150, 250)' }}
      onContentClick={onContentClick}
      title={TitleEl}
      objRef={props.objRef}
    >
      <div className="text">{props.owner ? props.owner : '请选择抄送人'}</div>
      <i className="anticon anticon-right arrow" />
    </NodeWrap>
  );
}
export default NotifierNode;
