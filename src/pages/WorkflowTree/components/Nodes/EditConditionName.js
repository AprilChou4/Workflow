/*
 * @Description:变价条件名称
 * @Author: zhouxiaojuan
 * @Date: 2021-04-21 09:55:51
 * @LastEditTime: 2021-04-22 14:54:24
 * @LastEditors: zhouxiaojuan
 */
import React, { useState, useEffect, useRef } from "react";
import { Icon, Input } from "antd";
function EditConditionName(props) {
  const { nodeName, onTitleChange, placeholder } = props;
  let [title, setTitle] = useState("");
  let [editable, setEditable] = useState(false);
  let input = useRef(null);
  // 设置
  useEffect(() => {
    setTitle(nodeName);
  }, [nodeName]);

  function onFocus(e) {
    e.currentTarget.select();
  }
  function onBlur(e) {
    setEditable(false);
    onTitleChange && onTitleChange(e.target.value);
    if (!title) {
      setTitle(nodeName);
    }
  }
  function onClick() {
    setEditable(true);
  }
  useEffect(() => {
    if (editable) {
      input.current.focus();
    }
  }, [editable]);
  function onChange(e) {
    let val = e.target.value;
    setTitle(val);
  }
  return (
    <React.Fragment>
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
          style={{ width: 120 }}
          placeholder={placeholder}
        />
      ) : (
        <span className="editable-title" onClick={onClick}>
          {title}
        </span>
      )}
    </React.Fragment>
  );
}
export default EditConditionName;
