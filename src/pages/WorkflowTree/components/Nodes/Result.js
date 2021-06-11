/*
 * @Description:
 * @Author: zhouxiaojuan
 * @Date: 2021-04-21 09:55:51
 * @LastEditTime: 2021-05-25 10:38:46
 * @LastEditors: zhouxiaojuan
 */
import React, { useContext } from 'react';
import NodeWrap from './Wrap';
import TitleElement from './TitleElement';
import WFC from '../OperatorContext';

function Result(props) {
  const { nodeName, pRef, objRef, owner } = props;
  // console.log(pRef, '---------pRef---result----');
  const { onDeleteNode, onSelectNode, isEdit } = useContext(WFC);
  function delNode() {
    onDeleteNode(pRef, objRef);
  }
  function onChange(val) {
    pRef.childNode.nodeName = val;
  }

  function onContentClick() {
    onSelectNode(pRef, objRef);
    // eslint-disable-next-line no-unused-expressions
    props.onContentClick && props.onContentClick();
  }

  const TitleEl = (
    <TitleElement
      delNode={delNode}
      placeholder={nodeName}
      nodeName={nodeName}
      onTitleChange={onChange}
    />
  );
  return (
    <NodeWrap
      titleStyle={{ backgroundColor: 'rgb(50, 150, 250)' }}
      onContentClick={onContentClick}
      title={TitleEl}
      objRef={objRef}
    >
      <div className="text">{owner || <span className="placeholder">请设置结果</span>}</div>
      <i className="anticon anticon-right arrow" />
    </NodeWrap>
  );
}
export default Result;
