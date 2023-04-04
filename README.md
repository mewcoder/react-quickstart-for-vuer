### 写给 vue 使用者的 react 的上手指南
> 主要对比 Vue3+ 和 React16.8+

> 多看文档！！！
>
> https://react.dev/         https://legacy.reactjs.org/
>
> https://cn.vuejs.org/     https://v2.cn.vuejs.org/

## 1. 组件风格

### React

React中提供了两种风格的组件：类组件和函数组件

> React 类式组件已过时，简单了解即可，[going-all-in-on-modern-react-with-hooks](https://react.dev/blog/2023/03/16/introducing-react-dev#going-all-in-on-modern-react-with-hooks)

```jsx
class Greeting extends Component {
  // 类式组件render方法是必须的
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}

function Greeting(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

函数组件相比较类组件，优点是更轻量与灵活，便于逻辑的拆分复用。

### Vue

Options API：Class风格

```vue
<script>
export default {
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    increment() {
      this.count++;
    },
  },
};
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

Composition API：Vue3 借鉴 Hooks 的思想，基于响应式系统实现了组合式API，能更好地逻辑重用和代码组织

```vue
<script setup>
import { ref } from "vue";

const count = ref(0);

function increment() {
  count.value++;
}
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

> [组合式API](https://cn.vuejs.org/guide/reusability/composables.html)
>
> [组合式 API 常见问答](https://cn.vuejs.org/guide/extras/composition-api-faq.html)

## 2. JSX & template

JSX 是一个 JavaScript 的语法扩展，或者说是一个类似于 XML 的 ECMAScript 语法扩展。

### JSX使用

https://transform.tools/html-to-jsx

1. 属性要变驼峰

```jsx
 return <img className="avatar" />;
```

2. 变量要用`{}`

```jsx
return (
  <h1
    style={{
      color: user.color,
    }}
  >
    {/* 单行注释 */}
    {user.name}
  </h1>
);
// style={{}}不是特殊语法，里面的花括号代表style对象
```

3. 条件渲染：JS的能力

```jsx
  return <div>{isLoggedIn ? <AdminPanel /> : <LoginForm />}</div>;
  
  return <div>{isLoggedIn && <AdminPanel />}</div>;
```

4. 列表渲染：使用map

```jsx
const listItems = products.map((product) => (
  <li key={product.id}>{product.title}</li>
));

return <ul>{listItems}</ul>;
```

5. 声明事件

```jsx
return <button onClick={handleClick}>Click me</button>;
```

6. 返回多个标签

```jsx
  return (
    <>
      <div>1</div>
      <div>2</div>
    </>
  );
```



React 和 Vue 都是基于 虚拟DOM设计的，JSX 或 template 都会编译成 render 函数，返回 VNode

### React

```jsx
import { createElement } from 'react';
function Greeting({ name }) {
  return createElement(
    'h1',
    { className: 'greeting' },
    'Hello ',
    createElement('i', null, name),
    '. Welcome!'
  );
}

// 等价于JSX:
function Greeting({ name }) {
  return (
    <h1 className="greeting">
      Hello <i>{name}</i>. Welcome!
    </h1>
  );
}
```

React通过`createElement`创建 VNode，React 通过  Babel 插件将  JSX 语法编译成为 `createElement` 的代码，JSX 可以看做语法糖。

> `createElement(type, props, ...children)`

### Vue

Vue3 提供了 h 函数用于创建 VNode，Vue2 中则是 createElement。Vue 是通过 Compiler 将 template 编译成 render 函数

```jsx
import { ref, h } from "vue";
export default {
  props: {
    /* ... */
  },
  setup(props) {
    const count = ref(1);
    // 返回渲染函数
    return () => h("div", props.msg + count.value);
  },
};
```

Vue通过插件也能使用 JSX 

> [Vue3文档-渲染函数 & JSX](https://cn.vuejs.org/guide/extras/render-function.html#render-functions-jsx)
>
> [Vue2文档-渲染函数 & JSX](https://v2.cn.vuejs.org/v2/guide/render-function.html)

### 对比

JSX：拥有 JS 的能力，更纯粹，更灵活；类型支持好

template：

- 优点：可读性好，更易上手，适合初学者；vue通过编译可做优化；
- 缺点：引入模板语法、模板指令等新概念类型支持不好；

## 3. React Hooks

React的数据是不可变的(immutable)

Hooks 只能在函数组件中使用，且只能在组件函数的最顶层调用。

### useState

让函数组件也可以有 state 状态, 并进行状态数据的读写操作

```jsx
  const [showAdd, setShowAdd] = useState(false);
  //     -------  ----------             -----
  //        ^         ^                    ^
  //        |         |                    |
  //    state变量  state更新函数           state初始值
```

### useEffect

> 副作用就是让一个函数不再是纯函数的各类操作，比如请求数据，DOM操作等

- 可用于模拟类组件中的生命周期钩子
- 副作用执行

```jsx
useEffect(() => {/* 省略 */; return () => {/* 省略 */};}, [status]);
//        ------------------------------------------     -------
//                       ^         -----------------        ^
//                       |                 ^                |
//                  副作用回调函数         清除函数         依赖值数组
```

- 如果不传第二参数，则每次渲染都会调用

- 如果依赖值数组为空，则副作用回调函数会在组件挂载后执行一次（可以访问 DOM），对标Vue中的`onMouted`

  - 如果 return 了函数，则为清除函数，会在组件被卸载之前执行。对标Vue中的`onUnmouted`

- 如果依赖值数组不为空，其中的值如果发生变化(shallow compare)，副作用回调函数会重新执行。

  - 依赖值可以使用 props、state、context 的变量

  

### useRef

用于保存DOM或任意数据，在下一次渲染中，`useRef`将返回相同的对象。

```jsx

const Component = () => {
  const myRef = useRef(null);
  //    -----          ----
  //      ^              ^
  //      |              |
  //   可变ref对象     可变ref对象current属性初始值

  // 读取可变值
  const value = myRef.current;
  // 更新可变值
  myRef.current = newValue;
  return (<div></div>);
};
```

- 存储属性

```jsx
import { useRef } from 'react';

export default function Counter() {
  let ref = useRef(0);

  function handleClick() {
    ref.current = ref.current + 1;
  }

  return (
    <button onClick={handleClick}>
      Click me!
    </button>
  );
}

```

- 操作DOM 类型 Vue中的 ref 

```jsx
import { useRef } from 'react';

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  );
}

```



### useCallback

它会把作为第一个参数的回调函数返回给组件，只要第二个参数依赖值数组的依赖项不改变，它就会保证一直返回同一个回调函数（引用），而不是新建一个函数，这也保证了回调函数的闭包也是不变的；相反，当依赖项改变时， useCallback 才会更新回调函数及其闭包。

```jsx
const memoizedFunc = useCallback(() => {/*省略*/}, [a, b]);
//    ------------               ---------------   -----
//         ^                            ^            ^
//         |                            |            |
//   记忆化的回调函数                   回调函数      依赖值数组
```

