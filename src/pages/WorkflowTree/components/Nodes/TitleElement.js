/*
 * @Description:结果标题元素
 * @Author: zhouxiaojuan
 * @Date: 2021-04-21 09:55:51
 * @LastEditTime: 2021-05-12 17:20:27
 * @LastEditors: zhouxiaojuan
 */
import React, { useState, useEffect, useRef } from 'react';
import { Icon, Input } from 'antd';

function TitleElement(props) {
  const { onTitleChange, icon, placeholder, delNode, nodeName } = props;
  const [title, setTitle] = useState('');
  // 是否可编辑
  const [editable, setEditable] = useState(false);
  const input = useRef(null);
  useEffect(
    () => {
      setTitle(nodeName);
    },
    [nodeName]
  );

  function onFocus(e) {
    e.currentTarget.select();
  }
  function onBlur() {
    setEditable(false);
    if (!title) {
      setTitle(props.placeholder);
    }
  }

  // 点击标题可编辑
  function onClick() {
    setEditable(true);
  }
  useEffect(
    () => {
      if (editable) {
        input.current.focus();
      }
    },
    [editable]
  );
  function onChange(e) {
    const { value } = e.target;
    // eslint-disable-next-line no-unused-expressions
    onTitleChange && onTitleChange(value);
    setTitle(value);
  }
  return (
    <React.Fragment>
      {icon && <span className="iconfont">{icon}</span>}
      {editable ? (
        <Input
          ref={input}
          type="text"
          className="ant-input editable-title-input"
          size="small"
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          value={title}
          style={{ color: '#333' }}
          placeholder={placeholder}
        />
      ) : (
        <span className="editable-title" onClick={onClick}>
          {title}
        </span>
      )}
      <Icon type="close" className="anticon anticon-close close" onClick={delNode} />
    </React.Fragment>
  );
}
export default TitleElement;
