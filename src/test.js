/*
* 测试组件
* create by@cxy
* */
import React,{ useEffect, useState } from 'react';

const Example = (props) => {

  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      console.log(`You clicked ${count} times`);
    }, 3000);
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        V1
      </button>
    </div>
  );
};

export default Example;
