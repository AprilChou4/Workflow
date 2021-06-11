/*
 * @Description:
 * @Author: zhouxiaojuan
 * @Date: 2021-04-21 09:55:51
 * @LastEditTime: 2021-06-07 16:49:15
 * @LastEditors: zhouxiaojuan
 */

// 添加节点类型
export const OptionTypes = {
  APPROVER: 1,
  NOTIFIER: 2,
  BRANCH: 3,
  CONDITION: 4,
  RESULT: 5,
};
export const NodeTypes = { ...OptionTypes, START: 0 };
// 节点类型默认标题名
export const OptionNames = {
  [OptionTypes.APPROVER]: '审批人',
  [OptionTypes.NOTIFIER]: '抄送人',
  [OptionTypes.CONDITION]: '条件分支',
  [OptionTypes.RESULT]: '结果',
};
// 节点模板
export const NodeTemplates = {
  [OptionTypes.APPROVER]: {
    nodeName: '审核人',
    error: true,
    type: OptionTypes.APPROVER,
    // settype: 1,
    // selectMode: 0,
    // selectRange: 0,
    // directorLevel: 1,
    // replaceByUp: 0,
    // examineMode: 1,
    // noHanderAction: 1,
    // examineEndDirectorLevel: 0,
    nodeUserList: [],
  },
  [OptionTypes.NOTIFIER]: {
    nodeName: '抄送人',
    type: OptionTypes.NOTIFIER,
    ccSelfSelectFlag: 1,
    nodeUserList: [],
  },
  // 加号添加
  [OptionTypes.CONDITION]: {
    nodeName: '路由',
    type: OptionTypes.CONDITION,
    childNode: null,
    conditionNodes: [],
  },
  // 添加条件分支
  [OptionTypes.BRANCH]: {
    nodeName: '条件1',
    type: OptionTypes.BRANCH,
    priorityLevel: 2,
    conditionList: [],
    nodeUserList: [],
    childNode: null,
  },
  [OptionTypes.RESULT]: {
    nodeName: '结果',
    type: OptionTypes.RESULT,
    nodeUserList: [],
  },
};
