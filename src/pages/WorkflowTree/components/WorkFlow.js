/* eslint-disable no-unused-expressions */
import React, { useState, useRef, useEffect } from 'react';
import { Button, Spin } from 'antd';
import EndNode from './Nodes/End';
import Render from './Nodes/Render';
import ZoomLayout from './ZoomLayout';
import { OptionTypes, NodeTemplates, NodeTypes } from './Nodes/Constants';
import WFC from './OperatorContext';
import DrawerWraper from './Drawers/DrawerWraper';
import styles from '../css/workflow.less';
// import { uuid } from '@/utils/utils';
import qs from 'qs';

function uuid() {
  const s = [];
  const hexDigits = '0123456789ABCDEF';
  for (let i = 0; i < 32; i += 1) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4'; // 版本4，伪随机数
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);

  return s.join('');
}

function WorkFlow({ config: _config, onSave, loading, queryStrategy }) {
  // 节点是否可编辑
  const [isEdit, setIsEdit] = useState(true);

  // 节点数据
  const [config, setConfig] = useState(_config);
  // 右侧弹窗引用
  const drawerRef = useRef(null);

  // 节点数据变化
  useEffect(() => {
    setConfig(_config);
  }, [_config]);

  // 更新节点
  function updateNode() {
    setConfig({ ...config });
  }

  let currentNode = null;
  // 链表操作: 几种行为， 添加行为，删除行为，点击行为     pRef.childNode -> objRef.childNode -> 后继
  // 添加节点 pRef??不存在
  function onAddNode(type, pRef, objRef) {
    console.log(type, '---------type');
    const o = objRef.childNode;
    if (type === OptionTypes.APPROVER) {
      objRef.childNode = {
        ...NodeTemplates[OptionTypes.APPROVER],
        nodeId: uuid(),
        childNode: o,
      };
    }
    if (type === OptionTypes.NOTIFIER) {
      objRef.childNode = {
        ...NodeTemplates[OptionTypes.NOTIFIER],
        nodeId: uuid(),
        childNode: o,
      };
    }
    if (type === OptionTypes.CONDITION) {
      objRef.childNode = {
        ...NodeTemplates[OptionTypes.CONDITION],
        nodeId: uuid(),
        conditionNodes: [
          {
            ...NodeTemplates[OptionTypes.BRANCH],
            nodeId: uuid(),
            nodeName: '条件1',
            childNode: o,
            priorityLevel: 1,
          },
          {
            ...NodeTemplates[OptionTypes.BRANCH],
            nodeId: uuid(),
            nodeName: '条件2',
          },
        ],
      };
    }
    if (type === OptionTypes.BRANCH) {
      const newBranch = { ...NodeTemplates[NodeTypes.BRANCH], nodeId: uuid() };
      newBranch.priorityLevel = objRef.conditionNodes.length + 1;
      newBranch.nodeName = `条件${objRef.conditionNodes.length + 1}`;
      objRef.conditionNodes.push(newBranch);
    }
    if (type === OptionTypes.RESULT) {
      objRef.childNode = {
        ...NodeTemplates[NodeTypes.RESULT],
        nodeId: uuid(),
        childNode: o,
      };
    }
    updateNode();
  }
  // 删除节点
  function onDeleteNode(pRef, objRef, type, index) {
    if (type === NodeTypes.BRANCH) {
      // console.log([...objRef.conditionNodes], index);
      objRef.conditionNodes.splice(index, 1);
      objRef.conditionNodes.map((item, key) => {
        if (key >= index) {
          item.priorityLevel -= 1;
        }
        return item;
      });
      // console.log(objRef.conditionNodes);
      // ??自己加的
      if (objRef.conditionNodes.length === 1) {
        const newObj = objRef.conditionNodes?.[0].childNode;
        pRef.childNode = newObj;
      }
    } else {
      const newObj = objRef.childNode;
      pRef.childNode = newObj;
    }
    updateNode();
  }

  // 获取节点，显示右侧弹窗
  function onSelectNode(pRef, objRef) {
    currentNode = {
      current: objRef,
      prev: pRef,
    };
    // console.log('currentNode:', currentNode);
    // console.log('ref', drawerRef);
    // console.log('config', config);
    if (objRef.type === 3 || objRef.type === 5)
      drawerRef.current.showDrawer(currentNode, updateNode);
  }

  // 取消策略
  function cancelNode() {
    setIsEdit(false);
    queryStrategy();
  }

  // 保存策略
  function saveNode() {
    // console.log(config, '-----------保存-quoteParamIds--------');
    // 常量、变量引用
    const quoteParamIdList = [];
    const quoteParamIdList1 = []; // 方便调试
    // 末端节点引用
    const endNodeIdList = [];
    const endNodeIdList1 = [];

    // 未设置条件列表
    const noSetList = [];
    // 获取引用的常量变量 、末端节点
    const loop = dataSource => {
      const { conditionNodes, childNode } = dataSource || {};
      // 条件
      conditionNodes?.forEach(item => {
        if (!item?.ownerList && [3, 5].includes(item?.type)) {
          noSetList.push(item);
        }
        item?.ownerList?.forEach(val => {
          val?.forEach(v => {
            quoteParamIdList.push(v?.param?.valueId);
            quoteParamIdList1.push(`${v?.param?.valueName} ${v?.param?.valueId}`);
            // 常量、变量
            if ([2, 3].includes(v.valueType)) {
              quoteParamIdList.push(v?.rowValue?.valueId);
              quoteParamIdList1.push(`${v?.rowValue?.valueName} : ${v?.rowValue?.valueId}`);
            } else if (v.valueType === 5) {
              endNodeIdList.push(v?.rowValue?.valueId);
              endNodeIdList1.push(`${v?.rowValue?.valueName} : ${v?.rowValue?.valueId}`);
            }
          });
        });
        if (item?.childNode) {
          loop(item?.childNode);
        }
      });

      if (!dataSource?.ownerList && [3, 5].includes(dataSource?.type)) {
        noSetList.push(dataSource);
      }
      // 结果
      dataSource?.ownerList?.forEach(val => {
        val?.forEach(v => {
          quoteParamIdList.push(v?.param?.valueId);
          quoteParamIdList1.push(`${v?.param?.valueName} ${v?.param?.valueId}`);
          // 常量、变量
          if ([2, 3].includes(v.valueType)) {
            quoteParamIdList.push(v?.rowValue?.valueId);
            quoteParamIdList1.push(`${v?.rowValue?.valueName} : ${v?.rowValue?.valueId}`);
          }
        });
      });

      if (childNode) {
        // console.log(childNode, '111----------childNode');
        loop(childNode);
      }
    };
    loop(config);
    console.log(
      noSetList,
      quoteParamIdList,
      quoteParamIdList1,
      endNodeIdList,
      endNodeIdList1,
      '---------quoteParamIdList1',
    );

    if (noSetList?.length) {
      // 如果没有设置条件
      ShowConfirm({
        title: '当前无法保存',
        type: 'error',
        okText: '知道了',
        width: 400,
        content: (
          <div>
            <p>以下内容不完善，请修改后发布</p>
            <div className={styles['error-infos']}>
              {noSetList?.map((item, index) => (
                <div className={styles['error-item']} key={index}>
                  <div className={styles['error-item-label']}>策略配置</div>
                  <div className={styles['error-item-content']}>{item.nodeName}: 未设置条件</div>
                </div>
              ))}
            </div>
          </div>
        ),
      });
      return;
    }

    // const content = Utf8.parse(JSON.stringify(config));
    // console.log(config, '------content');
    onSave({
      strategyContent: config,
      quoteParamIdList,
      endNodeIdList,
    }).then(() => {
      setIsEdit(false);
    });
  }

  // 修改策略
  function editNode() {
    setIsEdit(true);
  }

  // console.log(config, '----------render0--------------');
  const urlParams = qs.parse(window.location.search.substr(1));
  const { type } = urlParams;
  return (
    <WFC.Provider value={{ config, updateNode, onAddNode, onDeleteNode, onSelectNode, isEdit }}>
      <div
        style={{
          position: 'absolute',
          zIndex: 100,
          top: 12,
          right: 16,
        }}
      >
        {isEdit ? (
          <>
            <Button
              onClick={cancelNode}
              style={{
                marginRight: 8,
              }}
            >
              取消
            </Button>
            <Button onClick={saveNode} type="primary">
              保存
            </Button>
          </>
        ) : (
          type !== 'look' && (
            <Button onClick={editNode} type="primary">
              修改
            </Button>
          )
        )}
      </div>
      <section className="dingflow-design">
        <Spin spinning={loading}>
          <ZoomLayout>
            <Render config={config} />
            <EndNode />
          </ZoomLayout>
        </Spin>
      </section>
      <DrawerWraper ref={drawerRef} updateNode={updateNode} />
    </WFC.Provider>
  );
}

export default WorkFlow;
