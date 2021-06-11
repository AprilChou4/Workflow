/*
 * @Description:
 * @Author: zhouxiaojuan
 * @Date: 2021-04-22 18:22:28
<<<<<<< HEAD:src/pages/WorkflowTree/components/Drawers/ConditionTable.js
 * @LastEditTime: 2021-06-11 14:50:27
 * @LastEditors: zhouxiaojuan
 */
import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Form, Select } from 'antd';
import Relation from './Relation';
import {
  paramQuery, // 参数查询
=======
 * @LastEditTime: 2021-05-31 20:38:06
 * @LastEditors: zhouxiaojuan
 */
import React, { useEffect, useState, useContext } from 'react';
import { Dict } from 'yrantd';
import { Table, Button, Input, Form, TreeSelect, Select } from 'antd';
import Relation from './Relation';
import {
  paramQuery, // 参数查询
  querynodeList, // 末端节点
  // 案件类型
  queryList,
>>>>>>> dcc2a9597052947fcb120155581dc4cde2db9c8b:src/pages/Collection/Tactics/WorkflowTree/components/Drawers/ConditionTable.js
} from '@/services/collection/collection';
import { queryProductList } from '@/services/collection/product';
// 团队成员
import { queryTeamUserList } from '@/services/collection/team';

import DropSelectTable from '@/components/DropSelectTable';
import TeamTreeSelect from './TeamTreeSelect';
import EndNodeSelect from './EndNodeSelect';
import CaseType from './CaseType';

import styles from './style.less';

const { Option } = Select;
// 运算符列表
const operatorList = [
  '大于等于',
  '大于',
  '小于等于',
  '小于',
  '等于',
  '不等于',
  '包含',
  '不包含',
  '在集合',
  '不在集合',
  '为空',
  '不为空',
  '开始于',
  '不开始于',
  '结束于',
  '不结束于',
];

// 值类型列表
const valueTypeList = [
  {
    key: 1,
    value: '输入值',
  },
  {
    key: 2,
    value: '常量',
  },
  {
    key: 3,
    value: '变量',
  },
  {
    key: 4,
    value: '案件类型',
  },
  {
    key: 5,
    value: '末端节点',
  },
  {
    key: 6,
    value: '催收团队',
  },
  {
    key: 7,
    value: '团队成员',
  },
  {
    key: 8,
    value: '产品目录',
  },
];
const ConditionTable = ({ dataList, form, tableKey }) => {
  // 表格数据
  const [dataSource, setDataSource] = useState([]);
<<<<<<< HEAD:src/pages/WorkflowTree/components/Drawers/ConditionTable.js
  useEffect(() => {
    setDataSource(dataList);
    // dataList.forEach((item, index) => {
    //   // setFieldsValue不生效
    //   setTimeout(() => {
    //     form.setFieldsValue({
    //       [`condition[${tableKey}][${index}].param`]: item.param || '',
    //       [`condition[${tableKey}][${index}].valueType`]: item.valueType || '',
    //     });
    //   }, 200);
    // });
  }, [dataList]);
=======
  useEffect(
    () => {
      setDataSource(dataList);
      // dataList.forEach((item, index) => {
      //   // setFieldsValue不生效
      //   setTimeout(() => {
      //     form.setFieldsValue({
      //       [`condition[${tableKey}][${index}].param`]: item.param || '',
      //       [`condition[${tableKey}][${index}].valueType`]: item.valueType || '',
      //     });
      //   }, 200);
      // });
    },
    [dataList]
  );
>>>>>>> dcc2a9597052947fcb120155581dc4cde2db9c8b:src/pages/Collection/Tactics/WorkflowTree/components/Drawers/ConditionTable.js

  // 删除行
  const handleDelete = index => {
    const newList = dataSource.filter((item, key) => index !== key);
    setDataSource(newList);
  };

  const getValueDom = type => {
    switch (type) {
      case 1:
        return <Input autoComplete="off" placeholder="请输入" allowClear />;
      case 2:
        return (
          <DropSelectTable
            service={paramQuery}
            titleKey="paramName"
            queryKey="paramName"
            stateKey="paramGroupName"
            placeholder="常量"
            defaultQuery={{ paramGroupType: '020' }}
            idKey="paramId"
            // onChange={(value, data) => {
            //   alert(1);
            //   console.log(value, data, '-----value---data-----');
            // }}
          />
        );
      case 3:
        return (
          <DropSelectTable
            service={paramQuery}
            titleKey="paramName"
            queryKey="paramName"
            stateKey="paramGroupName"
            placeholder="变量"
            defaultQuery={{ paramGroupType: '010' }}
            idKey="paramId"
          />
        );
      case 4:
        return <CaseType />;
      case 5:
        return <EndNodeSelect />;
      case 6:
        return <TeamTreeSelect />;
      case 7:
        return (
          <DropSelectTable
            service={queryTeamUserList}
            titleKey="userName"
            queryKey="userName"
            stateKey="teamName"
            placeholder="团队成员"
            idKey="userId"
          />
        );
      default:
        return (
          <DropSelectTable
            service={queryProductList}
            titleKey="productName"
            stateKey="productCatalog"
            dictkey="collection_product_catalog"
            queryKey="productName"
            placeholder="产品目录"
            idKey="productId"
          />
        );
    }
  };

  // 值类型改变 清空值
  const changeValueType = (index, value) => {
    form.setFieldsValue({
      [`condition[${tableKey}][${index}].rowValue`]: value === 1 ? '' : undefined,
    });
  };

  // 添加条件
  const handleAdd = () => {
    setDataSource([...dataSource, {}]);
  };

  // 表格列
  const columns = [
    {
      title: '参数',
      dataIndex: 'param',
      width: 180,
      render: (text, record, index) => {
        return (
          <Form.Item>
            {form.getFieldDecorator(`condition[${tableKey}][${index}].param`, {
              initialValue: text || '',
              rules: [{ required: true }],
            })(
              <DropSelectTable
                service={paramQuery}
                titleKey="paramName"
                stateKey="paramGroupName"
                idKey="paramId"
                queryKey="paramName"
                placeholder="参数"
                defaultQuery={{ paramGroupType: '010' }}
<<<<<<< HEAD:src/pages/WorkflowTree/components/Drawers/ConditionTable.js
              />,
=======
              />
>>>>>>> dcc2a9597052947fcb120155581dc4cde2db9c8b:src/pages/Collection/Tactics/WorkflowTree/components/Drawers/ConditionTable.js
            )}
          </Form.Item>
        );
      },
    },
    {
      title: '运算符',
      dataIndex: 'operator',
      width: 100,
      render: (text, record, index) => {
        return (
          <Form.Item>
            {form.getFieldDecorator(`condition[${tableKey}][${index}].operator`, {
              initialValue: text || undefined,
              rules: [{ required: true }],
            })(
              <Select placeholder="请选择">
                {operatorList.map(val => (
                  <Option key={val} value={val}>
                    {val}
                  </Option>
                ))}
              </Select>,
            )}
          </Form.Item>
        );
      },
    },
    {
      title: '值类型',
      dataIndex: 'valueType',
      width: 120,
      render: (text, record, index) => {
        return (
          <Form.Item>
            {form.getFieldDecorator(`condition[${tableKey}][${index}].valueType`, {
              initialValue: text || undefined,
              rules: [{ required: true }],
            })(
              <Select placeholder="请选择" onChange={(...args) => changeValueType(index, args)}>
                {valueTypeList.map(item => (
                  <Option key={item.key} value={item.key}>
                    {item.value}
                  </Option>
                ))}
              </Select>,
            )}
          </Form.Item>
        );
      },
    },
    {
      title: '值',
      dataIndex: 'rowValue',
      width: 180,
      render: (text, record, index) => {
        // console.log(form.getFieldsValue(), '-------asgeagegeagg');
        // const { valueName } = text || {};
        const formValues = form.getFieldsValue();
        const { condition } = formValues;
        return (
          <Form.Item>
            {form.getFieldDecorator(`condition[${tableKey}][${index}].rowValue`, {
              initialValue: text || '',
              rules: [{ required: true }],
            })(getValueDom(condition?.[tableKey]?.[index]?.valueType))}
          </Form.Item>
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'operate',
      width: 60,
      render: (text, record, index) => <a onClick={() => handleDelete(index)}>删除</a>,
    },
    {
      title: '',
      dataIndex: 'relation',
      width: 1,
      className: styles['td-notshow'],
      render: (text, record, index) => {
        return (
          <Form.Item className={styles['item-notshow']}>
            {form.getFieldDecorator(`condition[${tableKey}][${index}].relation`, {
              initialValue: text || '且',
            })(<Input />)}
          </Form.Item>
        );
      },
    },
    {
      title: '',
      dataIndex: 'groupRelation',
      width: 1,
      className: styles['td-notshow'],
      render: (text, record, index) => {
        return (
          <Form.Item className={styles['item-notshow']}>
            {form.getFieldDecorator(`condition[${tableKey}][${index}].groupRelation`, {
              initialValue: text || '且',
            })(<Input />)}
          </Form.Item>
        );
      },
    },
  ];
  return (
    <div className={styles.relationTableWrap}>
      <Relation form={form} tableKey={tableKey} value={dataSource?.[0]?.relation} />
      <Table
        rowClassName={() => 'editable-row'}
        size="small"
        rowKey={(record, index) => index + 1}
        pagination={false}
        locale={{
          emptyText: '暂无条件',
        }}
        dataSource={dataSource}
        columns={columns}
      />
      <Button type="dashed" onClick={handleAdd} style={{ marginTop: 12, width: '100%' }}>
        添加条件
      </Button>
    </div>
  );
};
ConditionTable.defaultProps = {
  // 表格数据
  dataList: [],
  // 表格序号
  tableKey: 0,
};
export default ConditionTable;
