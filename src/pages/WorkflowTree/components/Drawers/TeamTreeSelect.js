/*
 * @Description: 催收团队树
 * @Author: zhouxiaojuan
 * @Date: 2021-04-26 19:51:01
 * @LastEditTime: 2021-05-31 20:43:16
 * @LastEditors: zhouxiaojuan
 */
import React from 'react';
import { TreeSelect } from 'antd';
import { queryTeamList } from '@/services/collection/team';
import { listToTree } from '@/utils/utils';

class TeamTreeSelect extends React.Component {
  state = {
    selectValue: undefined,
    //   树结构
    treeData: [],
  };
  componentDidMount() {
    queryTeamList().then(res => {
      const { dataList } = res.data || {};
      const list = listToTree(dataList);
      // const loop = data => {
      //   return data.map(item => {
      //     if (item.children) {
      //       item.children = loop(item.children);
      //     }
      //     return {
      //       ...item,
      //       title: item.teamName,
      //       value: item.teamId,
      //     };
      //   });
      // };
      // console.log((loop(cloneDeep(list)), '------loop(list)--'));
      this.setState({
        treeData: list,
      });
    });
  }

  changeSelect = (value, label, extra) => {
    const { onChange } = this.props;
    console.log(value, label, extra, '---value, label, extra--');
    onChange({
      valueName: label,
      valueId: value,
    });
    this.setState({ selectValue: value });
  };

  render() {
    const { selectValue, treeData } = this.state;
    const { onChange, ...rest } = this.props;
    console.log(treeData, '---treeData');
    return (
      <TreeSelect
        style={{ width: '100%' }}
        dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}
        treeData={treeData}
        placeholder="请选择催收团队"
        treeDefaultExpandAll
        {...rest}
        onChange={this.changeSelect}
        value={selectValue}
      />
    );
  }
}
export default TeamTreeSelect;
