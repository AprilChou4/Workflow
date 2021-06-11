/* eslint-disable */
import React, { Component } from 'react';
import { Divider, Form, Button, Col, Row, Input, Select, Icon, message } from 'antd';
import { cloneDeep } from 'lodash';
import styles from './style.less';
import ConditionTable from './ConditionTable';
import Relation from './Relation';

const { Option } = Select;

export class ConditionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      // 条件组 一个二维数组
      // conListGroup: [{ list: [] }],
      // conListGroup: [[],[]],
      conListGroup: [],
      tempList: [],
      groupIndex: '',
    };
  }
  componentDidMount() {
    const { currentNode } = this.props;
    // const checkedArr = currentNode.current?.ownerList?.map(item => {
    //   return Object.keys(item).map(key => {
    //     return {
    //       key,
    //       value: item[key],
    //     };
    //   });
    // });
    const matchGroup = currentNode.current?.ownerList;
    this.setState({
      conListGroup: matchGroup || [[{}]],
    });
  }
  deleteFormItem = (key, groupIndex) => {
    let { conListGroup } = this.state;
    const newConListGroup = conListGroup.map((item, index) => {
      if (index === groupIndex) {
        item.list = item.list.filter((i, j) => i.key !== key);
      }
      return item;
    });
    this.setState({
      conListGroup: newConListGroup,
    });
  };

  // 删除组
  deleteGroup = previndex => {
    let { conListGroup, groupIndex } = this.state;
    const newIndex = previndex < groupIndex ? groupIndex-- : groupIndex;
    const newConListGroup = conListGroup.filter((item, index) => index !== previndex);
    this.setState({
      conListGroup: newConListGroup,
      groupIndex: newIndex,
    });
  };
  // 条件拼接字符串
  conditionStr = condition => {
    // console.log(condition, '------condition---------');
    // groupRelation/relation使用列表的第一个数据的值
    let str = '';
    condition.forEach((val, key) => {
      if (!val) return;
      val.forEach((item, index) => {
        const { param, operator, rowValue } = item;
        if (index !== 0)
          str += `<span 
          class="${val[0]?.relation === '且' ? styles.relationTagAnd : styles.relationTagOr}">
            ${val[0]?.relation}
          </span>`;
        // 输入值没有valueName
        str += param.valueName + ` ${operator} ` + (rowValue?.valueName || rowValue);
      });
      if (key < condition.length - 1)
        str += `<span 
      class="${
        condition?.[key]?.[0]?.groupRelation === '且' ? styles.relationTagAnd : styles.relationTagOr
      }">
      ${condition?.[key]?.[0]?.groupRelation || ''}
      </span>`;
    });
    return str;
  };
  // 判断是否有重复的条件
  conditionCompare = condition => {
    const conditionList = condition?.map(val => {
      return val?.map((item, index) => {
        const { param, operator, rowValue } = item;
        const str = param.valueName + ` ${operator} ` + (rowValue?.valueName || rowValue);
        return str;
      });
    });
    return conditionList.every(val => {
      if (val.length !== [...new Set(val)].length) {
        message.warning('条件重复，请修改');
        return false;
      }
      return true;
    });
  };

  // 保存
  submit = () => {
    const { form, currentNode, updateNode } = this.props;
    const { conListGroup } = this.state;
    form.validateFieldsAndScroll((err, values) => {
      if (err || !this.conditionCompare(values.condition)) return;

      const newCondition = values.condition.filter(item => item);
      currentNode.current.owner = this.conditionStr(values.condition) || '';
      currentNode.current.ownerList = newCondition;
      // console.log(currentNode, currentNode.current.type, 'currentNode.current.type');
      if (currentNode) {
        if (values?.name) currentNode.current.nodeName = values.name;
      }
      if (currentNode && currentNode.current.type === 3) {
        // if (values?.name) currentNode.current.nodeName = values.name;
        // 处理优先级;
        if (values?.priority) {
          const conditionNodes = cloneDeep(currentNode.prev.conditionNodes);
          // 需要移至的位置
          const targetIndex = conditionNodes.findIndex(
            item => item.priorityLevel === values.priority
          );
          // 当前分支原来的位置
          const branchIndex = conditionNodes.findIndex(
            // item => item.nodeName === currentNode.current.nodeName
            item => item.nodeId === currentNode.current.nodeId
          );
          // 目标
          const targetCopy = cloneDeep(conditionNodes[targetIndex]);
          targetCopy.priorityLevel = currentNode.current.priorityLevel;
          // 当前的node
          const branchCopy = cloneDeep(currentNode.current);
          branchCopy.priorityLevel = values.priority;
          currentNode.prev.conditionNodes[branchIndex] = targetCopy;
          currentNode.prev.conditionNodes[targetIndex] = branchCopy;
        }
      }
      // else if (currentNode && currentNode.current.type === 5) {
      //   if (values?.name) currentNode.current.nodeName = values.name;
      // }
      this.props.onClose();
      updateNode();
    });
  };

  // 添加条件组
  addConditionGroup = () => {
    const { conListGroup } = this.state;
    console.log(conListGroup, [...conListGroup, [{}]], '---------conListGroup ');
    this.setState({
      conListGroup: [...conListGroup, [{}]],
    });
  };

  // 更改优先级
  changeLevel = () => {};

  render() {
    const { conListGroup } = this.state;
    const { onClose, form, currentNode, updateNode, setDrawerState } = this.props;
    const { type } = currentNode.current;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 15, offset: 2 },
    };
    // console.log(conListGroup, currentNode, '------currentNode');
    // 默认优先级回显?? 增加判断结果没有
    const levelIndex = currentNode.prev?.conditionNodes?.findIndex(
      item => currentNode.current?.nodeName === item.nodeName
    );
    const { priorityLevel } = currentNode.current;
    return (
      <div>
        <Form layout="vertical" hideRequiredMark className={styles['conditionForm']}>
          <Row>
            <Col span={12}>
              <Form.Item label={`${type === 3 ? '条件' : '结果'}名称`} {...formItemLayout}>
                {getFieldDecorator('name', {
                  initialValue: currentNode.current.nodeName,
                  rules: [
                    {
                      required: true,
                      message: `请输入${type === 3 ? '条件' : '结果'}名称`,
                    },
                  ],
                })(
                  <Input
                    placeholder="请输入条件名称"
                    autoComplete="off"
                    maxLength={100}
                    onChange={e => {
                      // currentNode.current.nodeName = e.target.value;
                      // updateNode();
                      setDrawerState({
                        title: e.target.value,
                      });
                    }}
                  />
                )}
              </Form.Item>
            </Col>
            {type === 3 && (
              <Col span={12}>
                <Form.Item label="优先级" {...formItemLayout}>
                  {getFieldDecorator('priority', {
                    initialValue: priorityLevel,
                    // initialValue:  levelIndex + 1,
                    rules: [],
                  })(
                    <Select placeholder="请选择" onChange={this.changeLevel}>
                      {currentNode.prev?.conditionNodes?.map((item, index) => (
                        <Option key={index} value={index + 1}>
                          优先级
                          {index + 1}
                        </Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            )}
          </Row>
          <Divider orientation="left" className={styles['m-divider']}>
            规则配置
          </Divider>

          {/* 条件组 */}
          {conListGroup.map((item, index) => (
            <div key={index} className="group">
              {/* {index !== 0 && (
                <Relation
                  descFlag={false}
                  tableKey={index}
                  form={form}
                  value={conListGroup[index - 1]?.[0].groupRelation}
                />
              )} */}

              <div
                className={
                  conListGroup?.length > 1 ? styles['group-wrapper-multi'] : 'group-wrapper-single'
                }
              >
                {conListGroup?.length > 1 && (
                  <div className={styles['group-header']}>
                    <span>条件组</span>
                    <Icon type="delete" onClick={() => this.deleteGroup(index)} />
                  </div>
                )}
                <ConditionTable form={form} tableKey={index} dataList={item} />
              </div>
              {index < conListGroup.length - 1 && (
                <Relation
                  descFlag={false}
                  tableKey={index}
                  form={form}
                  value={conListGroup[index]?.[0].groupRelation}
                />
              )}
            </div>
          ))}

          {/* 条件有 结果没有 */}
          {type === 3 && (
            <Button shape="round" type="primary" icon="plus" onClick={this.addConditionGroup}>
              添加条件组
            </Button>
          )}
        </Form>
        <div className={styles['m-btnwrap']}>
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            取消
          </Button>
          <Button onClick={this.submit} type="primary">
            保存
          </Button>
        </div>
      </div>
    );
  }
}
const ConditionFormWrapper = Form.create()(ConditionForm);
ConditionFormWrapper.defaultProps = {
  // 关闭弹层
  onClose() {},
};
export default ConditionFormWrapper;
