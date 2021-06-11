/*
 * @Description:
 * @Author: zhouxiaojuan
 * @Date: 2021-04-21 09:55:51
<<<<<<< HEAD:src/pages/WorkflowTree/components/Drawers/DrawerWraper.js
 * @LastEditTime: 2021-06-11 14:50:34
=======
 * @LastEditTime: 2021-06-11 09:45:19
>>>>>>> dcc2a9597052947fcb120155581dc4cde2db9c8b:src/pages/Collection/Tactics/WorkflowTree/components/Drawers/DrawerWraper.js
 * @LastEditors: zhouxiaojuan
 */
import React, { Component } from 'react';
import { Drawer } from 'antd';
// import ConditionForm from './ConditionForm';

export class DrawerWraper extends Component {
  state = {
    visible: false,
    currentNode: null,
    updateNode: null,
    title: '',
  };

  // 显示弹窗
  showDrawer = (currentNode, updateNode) => {
    console.log(currentNode, '--------currentNode');
    this.setState({
      visible: true,
      currentNode,
      updateNode,
      title: currentNode.current?.nodeName || '',
    });
  };

  // 关闭弹窗
  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { currentNode, updateNode, visible, title } = this.state;
    return (
      <div>
        {visible && (
          <Drawer
            title={title || ' '}
            width={800}
            onClose={this.onClose}
            visible={visible}
            bodyStyle={{ paddingBottom: 80 }}
            headerStyle={{ height: 54 }}
          >
            {/* 条件弹窗内容 */}
            {/* <ConditionForm
              currentNode={currentNode}
              updateNode={updateNode}
              onClose={this.onClose}
              setDrawerState={data => this.setState(data)}
<<<<<<< HEAD:src/pages/WorkflowTree/components/Drawers/DrawerWraper.js
            /> */}
=======
            />
>>>>>>> dcc2a9597052947fcb120155581dc4cde2db9c8b:src/pages/Collection/Tactics/WorkflowTree/components/Drawers/DrawerWraper.js
          </Drawer>
        )}
      </div>
    );
  }
}
export default DrawerWraper;
