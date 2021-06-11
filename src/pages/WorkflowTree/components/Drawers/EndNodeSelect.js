/*
 * @Description: 末端节点
 * @Author: zhouxiaojuan
 * @Date: 2021-05-20 19:07:47
 * @LastEditTime: 2021-06-01 18:10:26
 * @LastEditors: zhouxiaojuan
 */
import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import {
  querynodeList, // 末端节点
} from '@/services/collection/collection';

const { Option } = Select;
const EndNodeSelect = props => {
  const { onChange, value, ...rest } = props;
  // 末端节点列表
  const [endNodeList, setNodeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectValue, setSelectValue] = useState(undefined);
  useEffect(() => {
    setLoading(true);
    querynodeList().then(res => {
      if (res?.responseType === 'HSJRY_SUCCESS') {
        setNodeList(res?.data);
      }
      setLoading(false);
    });
  }, []);

  useEffect(
    () => {
      setSelectValue(value);
    },
    [value]
  );

  const changeSelect = (val, option) => {
    console.log(option, '------option');
    onChange({
      valueName: option?.props?.name,
      valueId: val,
    });
    setSelectValue(val);
  };
  return (
    <Select
      style={{ width: 160 }}
      showSearch
      placeholder="请选择末端节点"
      allowClear
      optionLabelProp="name"
      filterOption={(input, option) =>
        option.props.name.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      loading={!!loading}
      {...rest}
      value={selectValue?.valueName}
      onChange={changeSelect}
    >
      {endNodeList.map(item => {
        return (
          <Option value={item.endNodeId} key={item.endNodeId} name={item.endNodeName}>
            {item.endNodeName}
            <div style={{ color: '#999' }}>{item.caseTypeName}</div>
          </Option>
        );
      })}
    </Select>
  );
};
export default EndNodeSelect;
