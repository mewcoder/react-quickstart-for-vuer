# 写给 vuer 的 react 的快速上手指南
> 主要对比 Vue3+ 和 React16.8+

> 多看文档！！！
>
> https://react.dev/         https://legacy.reactjs.org/     https://zh-hans.reactjs.org/  https://zh-hans.legacy.reactjs.org/
>
> https://cn.vuejs.org/     https://v2.cn.vuejs.org/

## 1. 组件风格

### 1.1 React

React中提供了两种风格的组件：类组件和函数组件

> React 类式组件已过时，简单了解即可，👉[going-all-in-on-modern-react-with-hooks](https://react.dev/blog/2023/03/16/introducing-react-dev#going-all-in-on-modern-react-with-hooks)

```jsx
// 类组件
class Greeting extends Component {
  // 类组件render方法是必须的
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}

// 函数组件
function Greeting(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

函数组件相比较类组件，依靠Hooks：

- 更简洁
- 便于逻辑的拆分复用
- 没有 this 指向不明问题

### 2.2 Vue

**Options API**：Vue2 时期的 Class风格，Vue3也支持，但 Vue3 更推荐使用类似 React Hooks 的 Composition API

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

**Composition API**：Vue3 借鉴 Hooks 的思想，基于响应式系统实现了组合式API，能更好地组织代码和逻辑重用。

> 注意 Composition API 只是一种风格，通过 setup 选项/或者 `<script setup>` 语法糖定义；两种 API 风格都是基于同一个底层系统；
>
> - Vue3 中选项式 API 是在组合式 API 的基础上实现的👉 [applyOptions](https://github.com/vuejs/core/blob/main/packages/runtime-core/src/componentOptions.ts#L608)。
> - Vue2.7 也支持了 Composition API，👉[src/V3](https://github.com/vuejs/vue/blob/main/src/v3/index.ts)，使用上有一些[限制](https://blog.vuejs.org/posts/vue-2-7-naruto)。

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

> [script setup](https://cn.vuejs.org/api/sfc-script-setup.html)
>
> [组合式API](https://cn.vuejs.org/guide/reusability/composables.html)
>
> [组合式 API 常见问答](https://cn.vuejs.org/guide/extras/composition-api-faq.html)



## 2. JSX & template

JSX 是一个 JavaScript 的语法扩展，或者说是一个类似于 XML 的 ECMAScript 语法扩展。

JSX 和 template 对比

- JSX：拥有 JS 的能力，更纯粹，更灵活；类型支持好

- template：
  - 优点：可读性好，更易上手，适合初学者；vue通过编译可做优化；
  - 缺点：引入模板语法、模板指令等新概念；类型支持不好；



### 2.1 JSX 使用

> [html-to-jsx](https://transform.tools/html-to-jsx)

先简单介绍一下 JSX 的使用，对于 Vue 使用者来说刚上手可能有些别扭，需要适应。

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

3. 条件渲染：基于 JS 的能力

```jsx
  return <div>{isLoggedIn ? <AdminPanel /> : <LoginForm />}</div>;
  
  return <div>{isLoggedIn && <AdminPanel />}</div>;
```

4. 列表渲染：基于 JS 的能力，使用map

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

6. 组件返回多个元素,`React.Fragment`的语法糖，vue2不支持，vue3支持

```jsx
  return (
    <>
      <div>1</div>
      <div>2</div>
    </>
  );
```



### 2.2 渲染函数

React 和 Vue 都是基于虚拟DOM设计的，JSX 或 template 都会编译成 render 函数，返回 VNode

JSX 这种属于声明式，而直接使用createElement 属于编程式。

**React**

```jsx
import { createElement } from 'react';
// 函数组件直接return，类组件需要定义render函数
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

React 通过 `createElement` 创建 VNode，React 通过  Babel 插件将  JSX 语法编译成为 `createElement` 的代码，JSX 可以看做语法糖。 

> `createElement(type, props, ...children)`  
>
>  https://babeljs.io/repl

**Vue**

Vue3 提供了 h 函数用于创建 VNode，Vue2 略有差异；Vue 是通过 Compiler 将 template 编译成 render 函数

```jsx
import { h, ref } from 'vue'
export default {
  setup() {
    const count = ref(0)
    // setup 可以直接返回一个渲染函数，或者通过render选项定义
    return () => h('div', count.value)
  }
}
```

> [Vue3文档-渲染函数 & JSX](https://cn.vuejs.org/guide/extras/render-function.html#render-functions-jsx)
>
> [Vue2文档-渲染函数 & JSX](https://v2.cn.vuejs.org/v2/guide/render-function.html)



## 3. React Hooks

Hooks 只能在函数组件中使用，且只能在组件函数的最顶层（条件语句、循环语句或其他嵌套函数内都不行）调用。

### 3.1 useState

让函数组件也可以有 state 状态, 并进行状态数据的读写操作。

```jsx
     const [count, setCount] = useState(0);
  //     -------  ----------          -----
  //        ^         ^                 ^
  //        |         |                 |
  //    state变量  state setter函数        state初始值
```

- setter 函数的功能，更新 state 变量并触发 React 重新渲染组件。每次更新 state 都会重新生成一份快照，函数(组件)会根据新的 state 生成新的 VNode，然后更新视图。
- setter 函数分两种情况：

```jsx
const [count, setCount] = useState(0);

// 传入普通值，由于拿到当前的 count:0，并不会修改当前的count
const add1 = () => {
  setCount(count + 1) // => count = 0 + 1 = 1
  setCount(count + 1) // => count = 0 + 1 = 1
  setCount(count + 1) // => count = 0 + 1 = 1 
};

// 传入函数`n => n + 1`,可以拿到更新后的 count,相当于把更新函数加入了队列
const add2 = () => {
  setCount(n => n + 1) // => count = 0 + 1 = 1
  setCount(n => n + 1) // => count = 1 + 1 = 2 
  setCount(n => n + 1) // => count = 2 + 1 = 3
};
```

>  React 的强调的是数据不可变(immutable)，而 Vue 核心是响应式(数据可变)

### 3.2 useEffect&useLayoutEffect

> 副作用就是让一个函数不再是纯函数的各类操作，比如请求数据，DOM操作等

- 可用于模拟类组件中的生命周期钩子
- 副作用执行

**useEffect**

```jsx
useEffect(() => {/* 省略 */; return () => {/* 省略 */};}, [status]);
//        ------------------------------------------     -------
//                       ^         -----------------        ^
//                       |                 ^                |
//                  副作用回调函数         清除函数         依赖值数组
```

- 如果不传第二个参数，则每次渲染都会调用

- 如果依赖值数组为空，则副作用回调函数会在组件挂载后执行一次（可以访问 DOM）。对标  Vue  中的`onMouted`

  - 如果 return 了函数，则为清除函数，会在组件被卸载之前执行。对标  Vue  中的`onUnmouted`

- 如果依赖值数组不为空，其中的值如果发生变化( shallow compare )，副作用回调函数会重新执行。

  - 依赖值可以使用 props、state、context 的变量

>Vue 中 watchEffect 会自动追踪依赖，且首次会执行。

**useLayoutEffect**

使用方法和 useEffect 相同，但它会在所有DOM变更之后**同步**调用回调函数，和 componentDidMount 时机相同

而 useEffect 的回调函数会在组件渲染到屏幕之后**延迟**执行。



### 3.3 useContext 

> 类似 Vue 中的 provide 和 inject

如果组件层级比较深，使用 props 逐级透传不方便，可使用 `createContext`和`useContext`

```jsx
import { createContext, useContext } from 'react';

const ThemeContext = createContext(null);

export default function MyApp() {
  return (
    <ThemeContext.Provider value="dark">
      <Form />
    </ThemeContext.Provider>
  )
}

// Button 是 MyApp 的后代组件
function Button() {
  const theme = useContext(ThemeContext);
  return <button className={theme} />;
}
```

### 3.4 useRef&useImperativeHandle

使用`useState`定义的变量，每次渲染的都是一个 state 快照，是相互独立的。如何让组件在重新渲染之间保留数据，则需要使用 `useRef`，其定义的变量是可变的，也不会触发重新渲染。

> 不要在渲染过程中读取或写入 `ref.current`

一般用于保存DOM或任意数据，重新渲染 `useRef ` 将返回相同的引用。

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

- 存储数据

> Vue 是本来数据就是可变的，可以维持状态，不需要这玩意。

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

- 操作DOM  

> 这里就和 Vue中 使用 ref 差不多

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
```

- **forwardRef** 

```jsx
// 使用 forwardRef 定义组件，可以传递 ref 参数
const MyInput = forwardRef(function MyInput(props, ref) {
  // ...
});
```

- 传递 ref 引用，用于操作子代组件的DOM。Vue 中直接获取组件实例的对应的ref变量即可
- 配和 **useImperativeHandle**  选择暴露子组件的方法，类似 Vue3 中的 `expose`

```jsx
import { forwardRef, useImperativeHandle } from 'react';

const MyInput = forwardRef(function MyInput(props, ref) {
  useImperativeHandle(ref, () => {
    return {
      // ... your methods ...
    };
  }, []);

  return <input {...props} />;
});
```

> Imperative: 必要

### 3.5 useCallback&useMemo

> 优化性能使用，可以减少不必要的渲染，不必过早的性能优化
>
>  function useCallback(callback,deps ) { return useMemo( () => callback, deps); }

```jsx
// useCallback 是通过 useMemo 实现的
function useCallback(callback,deps ) { return useMemo(() => callback, deps); }

const memoizedFunc = useCallback(() => {/*省略*/}, [a, b]);
//    ------------               ---------------   -----
//         ^                            ^            ^
//         |                            |            |
//   记忆化的回调函数                   回调函数      依赖值数组


const memoizedFunc = useMemo(() => () => {/*省略*/}, [a, b]);
//    ------------           ---------------------   -----
//       ^                      ^  ---------------      ^
//       |                      |         ^             |
// 工厂函数返回的回调函数        工厂函数   回调函数        依赖值数组
```

- **useMemo** 

useMemo 的功能是为工厂函数返回一个记忆化的计算值，在两次渲染之间，只有依赖值数组中的依赖值有变化时，该 Hook 才会调用工厂函数重新计算，将新的返回值记忆化并返回给组件。

useMemo 最重要的使用场景，是将执行成本较高的计算结果存入缓存，通过减少重复计算来提升组件性能。

> useMemo类似 Vue 中的 computed 



- **useCallback**

如果需要缓存函数则使用 useCallback，少一层箭头函数，更方便使用。

useCallback ，它会把作为第一个参数的回调函数返回给组件，只要第二个参数依赖值数组的依赖项不改变，它就会保证一直返回同一个回调函数（引用），而不是新建一个函数，这也保证了回调函数的闭包也是不变的；相反，当依赖项改变时， useCallback 才会更新回调函数及其闭包。



### 3.6 useReducer

像数组的`reduce`方法一样，接受 `目前的状态` 和 `action` ，然后返回 `下一个状态`。

```jsx
const [state, dispatch] = useReducer(reducer, initState);
```

```jsx

const initialState = { count: 0 };

// 返回新的 state
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  // useReducer 会根 据dispatch的action，返回新的state，并触发rerender
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </>
  );
}
```



## 4. Diff

> [Why remove time slicing from vue3?](https://github.com/vuejs/rfcs/issues/89#top)
>
> 总结就是：Vue由于响应式和编译优化，性能已经足够好，引入 Fiber 会增加复杂度，收益没有那么明显。







## 其他

https://juejin.cn/post/7195486276936532028
