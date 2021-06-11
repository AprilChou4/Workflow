/* eslint-disable */

import React, { useContext } from 'react';
import AddNode from './Add';
import Render from './Render';
import { NodeTypes } from './Constants';
import WFC from '../OperatorContext';
import { Icon } from 'antd';
import EditConditionName from './EditConditionName';

function CoverLine({ first = false, last = false }) {
  return (
    <React.Fragment>
      {first && <div className="top-left-cover-line" />}
      {first && <div className="bottom-left-cover-line" />}
      {last && <div className="top-right-cover-line" />}
      {last && <div className="bottom-right-cover-line" />}
    </React.Fragment>
  );
}

// 条件节点
function BranchNode(props) {
  const { first = false, last = false } = props;
  const { onAddNode, onDeleteNode, onSelectNode } = useContext(WFC);
  // console.log(props, "-------props----BranchNode--------");
  return (
    <div className="condition-node">
      <div className="condition-node-box">
        <div className="auto-judge">
          {/* 向左移动 */}
          {!first && (
            <div className="sort-left" onClick={() => props.sortLeft(props)}>
              <Icon type="left" />
            </div>
          )}
          <div className="title-wrapper">
            <EditConditionName
              nodeName={props.nodeName}
              onTitleChange={val => props.onTitleChange(val, props)}
            />
            <span className="priority-title">
              优先级
              {props.priorityLevel}
            </span>
            <Icon
              type="copy"
              className="anticon anticon-close copy"
              onClick={() => props.copyBranch(props)}
            />
            {/* <i className="anticon anticon-close close" onClick={props.delBranch}></i> */}
            <Icon type="close" className="anticon anticon-close close" onClick={props.delBranch} />
          </div>
          {/* 向右移动 */}
          {!last && (
            <div
              className="sort-right"
              onClick={e => {
                e.stopPropagation();
                props.sortRight(props);
              }}
            >
              <Icon type="right" />
            </div>
          )}
          <div className="content" onClick={() => props.onBranchClick(props.objRef)}>
            <div className="text">
              {props.owner ? (
                <div dangerouslySetInnerHTML={{ __html: props.owner }} />
              ) : (
                <span className="placeholder">请设置条件</span>
              )}
              {/* {props.owner ? props.owner : <span className="placeholder">请设置条件</span>} */}
            </div>
            <i className="anticon anticon-right arrow" />
            {/* <Icon type="right" /> */}
          </div>
        </div>
        <AddNode objRef={props.objRef} />
      </div>
    </div>
  );
}

function ConditionNode({ conditionNodes: branches = [], ...restProps }) {
  const { onAddNode, updateNode, onDeleteNode, onSelectNode, isEdit } = useContext(WFC);
  function addBranch() {
    onAddNode(NodeTypes.BRANCH, restProps.pRef, restProps.objRef);
  }
  function copyBranch(branch) {
    let { objRef } = restProps;
    let copyBranch = deepClone(branch);
    copyBranch.priorityLevel = objRef.conditionNodes.length + 1;
    objRef.conditionNodes.push(copyBranch);
    updateNode();
  }

  // 向左移动
  function sortLeft(branch) {
    let { objRef } = restProps;
    let branchCopy = deepClone(branch);
    let targetIndex = objRef.conditionNodes.findIndex(
      item => item.priorityLevel === branchCopy.priorityLevel - 1
    );
    let branchIndex = objRef.conditionNodes.findIndex(
      item => item.priorityLevel === branchCopy.priorityLevel
    );
    let targetCopy = deepClone(objRef.conditionNodes[targetIndex]);
    targetCopy.priorityLevel += 1;
    branchCopy.priorityLevel -= 1;
    objRef.conditionNodes[branchIndex] = targetCopy;
    objRef.conditionNodes[targetIndex] = branchCopy;
    updateNode();
  }

  // 向右移动
  function sortRight(branch) {
    console.log(branch, '------branch');
    // debugger;
    let { objRef } = restProps;
    // console.log(
    //   objRef,
    //   "-----------------------------objRef=-----------------"
    // );
    let branchCopy = deepClone(branch);
    let targetIndex = objRef.conditionNodes.findIndex(
      item => item.priorityLevel === branchCopy.priorityLevel + 1
    );
    let branchIndex = objRef.conditionNodes.findIndex(
      item => item.priorityLevel === branchCopy.priorityLevel
    );
    let targetCopy = deepClone(objRef.conditionNodes[targetIndex]);
    targetCopy.priorityLevel -= 1;
    branchCopy.priorityLevel += 1;
    objRef.conditionNodes[branchIndex] = targetCopy;
    objRef.conditionNodes[targetIndex] = branchCopy;
    console.log(objRef.conditionNodes, 'objRef.conditionNodes');
    updateNode();
  }

  function onTitleChange(val, branch) {
    let { objRef } = restProps;
    let branchCopy = deepClone(branch);
    let targetIndex = objRef.conditionNodes.findIndex(
      item => item.priorityLevel === branchCopy.priorityLevel
    );
    branchCopy.nodeName = val;
    objRef.conditionNodes[targetIndex] = branchCopy;
    updateNode();
  }
  // 深拷贝
  function deepClone(data) {
    var t = type(data),
      o,
      i,
      ni;

    if (t === 'array') {
      o = [];
    } else if (t === 'object') {
      o = {};
    } else {
      return data;
    }

    if (t === 'array') {
      for (i = 0, ni = data.length; i < ni; i++) {
        o.push(deepClone(data[i]));
      }
      return o;
    } else if (t === 'object') {
      for (i in data) {
        o[i] = deepClone(data[i]);
      }
      return o;
    }
  }
  function type(obj) {
    var toString = Object.prototype.toString;
    var map = {
      '[object Boolean]': 'boolean',
      '[object Number]': 'number',
      '[object String]': 'string',
      '[object Function]': 'function',
      '[object Array]': 'array',
      '[object Date]': 'date',
      '[object RegExp]': 'regExp',
      '[object Undefined]': 'undefined',
      '[object Null]': 'null',
      '[object Object]': 'object',
    };
    return map[toString.call(obj)];
  }
  function delBranch(i) {
    console.log('delBranch(i)', i);
    // if (branches.length === 2) {
    //   onDeleteNode(restProps.pRef, restProps.objRef);
    //   return;
    // }

    onDeleteNode(restProps.pRef, restProps.objRef, NodeTypes.BRANCH, i);
  }
  function onBranchClick(objRef) {
    onSelectNode(restProps.objRef, objRef);
  }

  return (
    branches &&
    branches.length > 0 && (
      <div className="branch-wrap">
        <div className="branch-box-wrap">
          <div className="branch-box">
            <button className="add-branch" onClick={addBranch} disabled={!isEdit}>
              添加条件
            </button>
            {branches.map((item, index) => {
              return (
                <div className="col-box" key={index.toString()}>
                  <BranchNode
                    {...item}
                    first={index === 0}
                    onBranchClick={onBranchClick}
                    copyBranch={copyBranch}
                    sortLeft={sortLeft}
                    sortRight={sortRight}
                    onTitleChange={onTitleChange}
                    delBranch={() => delBranch(index)}
                    last={index === branches.length - 1}
                    objRef={item}
                  />
                  {item.childNode && <Render pRef={item} config={item.childNode} />}
                  <CoverLine first={index === 0} last={index === branches.length - 1} />
                </div>
              );
            })}
          </div>
          <AddNode objRef={restProps.objRef} />
        </div>
      </div>
    )
  );
}

export default ConditionNode;
