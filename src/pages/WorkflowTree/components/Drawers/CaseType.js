/*
 * @Description: 
 * @Author: zhouxiaojuan
 * @Date: 2021-05-24 19:16:15
 * @LastEditTime: 2021-05-24 19:29:37
 * @LastEditors: zhouxiaojuan
 */
import React, { useEffect, useState, useMemo } from 'react';
import { Dict } from 'yrantd';
import { queryList, querynodeList } from '@/services/collection/collection';

const CaseType = () => {
  const [caseTypeList, setCaseTypeList] = useState([]);
  const queryCaseType = () => {
    queryList().then(res => {
      if (res.responseType === 'HSJRY_SUCCESS') {
        setCaseTypeList(res.data);
      }
    });
  };
  useEffect(() => {
    queryCaseType();
  }, []);
  // 案件类型
  const caseType = useMemo(
    () => caseTypeList.map(val => ({ itemKey: val.caseTypeId, itemName: val.caseTypeName })),
    [caseTypeList]
  );
  sessionStorage.dict_caseType = JSON.stringify(caseType);

  return <Dict.Select dictkey="caseType" placeholder="请输入案件类型" />;
};
export default CaseType;
