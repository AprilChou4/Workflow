/*
 * @Description:
 * @Author: zhouxiaojuan
 * @Date: 2021-04-21 09:55:51
 * @LastEditTime: 2021-06-11 15:24:25
 * @LastEditors: zhouxiaojuan
 */

import React, { useMemo } from 'react';
import data from './data.json';
import WorkFlow from './components/WorkFlow';
import styles from './css/workflow.less';
// const config = data.data.nodeConfig;
function App({ onSave, loading, queryStrategy }) {
  const config = data.data.nodeConfig;
  console.log(config, '-------config');
  return (
    <div className={styles.WorkflowTree}>
      <WorkFlow config={config} loading={loading} onSave={onSave} queryStrategy={queryStrategy} />
    </div>
  );
}

App.defaultProps = {
  // 策略回显数据
  strategyData: {
    // 策略内容  json字符串 Base64编码格式
    strategyContent: '',
  },
  // 保存策略
  onSave(data) {},
  // 加载...
  loading: false,
  queryStrategy() {},
};
export default App;
