/*
 * @Description:添加组件
 * @Author: zhouxiaojuan
 * @Date: 2021-04-21 09:55:51
 * @LastEditTime: 2021-06-11 15:25:07
 * @LastEditors: zhouxiaojuan
 */
import React, { useState, useContext, useEffect } from 'react';
import AddNodeList from './AddOptionList';
import WFC from '../OperatorContext';
import { Popover } from 'antd';

function AddNode(props) {
  // console.log(props, '----AddNode=====--props');
  // 添加气泡卡片显示与否
  const [showPop, setShowPop] = useState(false);
  function onClickAdd(e) {
    e.nativeEvent.stopImmediatePropagation();
    setShowPop(!showPop);
  }
  const hidePop = () => {
    setShowPop(false);
  };

  useEffect(() => {
    document.addEventListener('click', hidePop);
    return () => {
      document.removeEventListener('click', hidePop);
    };
  });
  const { onAddNode } = useContext(WFC);

  // 点击新增节点
  function onOptionClick(type) {
    console.log(type, '-------------type----------');
    onAddNode(type, props.pRef, props.objRef);
    setShowPop(false);
  }

  const addNodeListWrapper = <AddNodeList onOptionClick={onOptionClick} />;
  return (
    <div className="add-node-btn-box">
      <div className="add-node-btn">
        <Popover
          content={addNodeListWrapper}
          placement="rightBottom"
          trigger="click"
          visible={showPop}
        >
          <span>
            <button type="button" className="btn" onClick={onClickAdd}>
              <span className="iconfont">+</span>
            </button>
          </span>
        </Popover>
      </div>
    </div>
  );
}

export default AddNode;
