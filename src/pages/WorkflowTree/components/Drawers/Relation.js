/*
 * @Description: 条件之间关系
 * @Author: zhouxiaojuan
 * @Date: 2021-04-22 20:16:31
 * @LastEditTime: 2021-05-12 14:11:15
 * @LastEditors: zhouxiaojuan
 */
import React, { useState, useEffect } from 'react';
import { Popconfirm, Radio } from 'antd';
import styles from './style.less';

const Relation = ({ descFlag = true, form, value, tableKey }) => {
  // 1=且 2=或
  const [type, setType] = useState(1);
  useEffect(
    () => {
      setType(value === '且' ? 1 : 2);
    },
    [value]
  );

  //   切换radio
  const onChange = e => {
    const radioVal = e.target.value;
    setType(radioVal);

    setTimeout(() => {
      // eslint-disable-next-line no-unused-expressions
      form?.setFieldsValue({
        // 切换组内
        ...(descFlag
          ? { [`condition[${tableKey}][0].relation`]: radioVal === 1 ? '且' : '或' }
          : {}),
        // 切换组与组之间
        ...(!descFlag
          ? { [`condition[${tableKey}][0].groupRelation`]: radioVal === 1 ? '且' : '或' }
          : {}),
      });
    }, 200);
    // dataSource?.map((item, index) => {
    //   setTimeout(() => {
    //     form.setFieldsValue({
    //       [`condition[${tableKey}][${index}].relation`]: radioVal === 1 ? '且' : '或',
    //     });
    //   }, 200);
    // });
  };
  return (
    <div className={styles.RelationWrap}>
      {descFlag && '条件之间的关系:'}
      <Popconfirm
        placement="topLeft"
        title={
          <Radio.Group onChange={onChange} value={type}>
            <Radio value={1}>且，满足所有条件</Radio>
            <Radio value={2}>或，满足任一条件</Radio>
          </Radio.Group>
        }
        icon={null}
      >
        <span className={styles[`${type === 1 ? 'relationTagAnd' : 'relationTagOr'}`]}>
          {type === 1 ? '且' : '或'}
        </span>
      </Popconfirm>
    </div>
  );
};
Relation.defaultProps = {
  // true=显示文字说明
  descFlag: true,
  form: null,
  // 表格序号
  tableKey: 0,
  // value
  value: '且',
};
export default Relation;
