---
name: "sticky"
description: "用于常驻页面顶部的信息、操作展示。"
url: "https://tdesign.tencent.com/uniapp/components/sticky"
---



## 引入

可在 `main.ts` 或在需要使用的页面或组件中引入。

```js
import TSticky from '@tdesign/uniapp/sticky/sticky.vue';
```

## 代码演示

将内容包裹在 `Sticky` 组件内


### 基础吸顶


```vue
<template>
  <view>
    <t-sticky :offset-top="navbarHeight">
      <t-button
        size="large"
        theme="primary"
        t-class="external-class"
        custom-style="width: 104px"
      >
        基础吸顶
      </t-button>
    </t-sticky>
  </view>
</template>

<script>
import TSticky from '@tdesign/uniapp/sticky/sticky.vue';
import TButton from '@tdesign/uniapp/button/button.vue';
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TSticky,
    TButton,
  },
  props: {
    navbarHeight: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style scoped>
/* :deep(.external-class) {
    width: 208rpx;
} */
</style>
```



### 吸顶距离


```vue
<template>
  <view>
    <t-sticky :offset-top="40 + navbarHeight">
      <t-button
        size="large"
        theme="danger"
        t-class="external-class"
        custom-style="width: 104px;margin-left: 136px;"
      >
        吸顶距离
      </t-button>
    </t-sticky>
  </view>
</template>

<script>
import TSticky from '@tdesign/uniapp/sticky/sticky.vue';
import TButton from '@tdesign/uniapp/button/button.vue';
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TSticky,
    TButton,
  },
  props: {
    navbarHeight: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style scoped>
/* :deep(.external-class) {
    width: 208rpx;
    margin-left: 272rpx;
} */
</style>
```


### 指定容器


```vue
<template>
  <view class="wrapper">
    <t-sticky
      :container="container"
      :offset-top="navbarHeight"
    >
      <t-button
        size="large"
        t-class="external-class green-button"
        hover-class="hover-class "
        custom-style="width: 104px;margin-left: 256px;"
      >
        指定容器
      </t-button>
    </t-sticky>
  </view>
</template>

<script>
import TSticky from '@tdesign/uniapp/sticky/sticky.vue';
import TButton from '@tdesign/uniapp/button/button.vue';
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TSticky,
    TButton,
  },
  props: {
    navbarHeight: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      container: null,
    };
  },
  mounted() {
    // 处理小程序 ready 生命周期
    this.$nextTick(() => this.ready());
  },
  created() {},
  methods: {
    ready() {
      this.container = () => uni.createSelectorQuery().in(this)
        .select('.wrapper');
    },
  },
};
</script>
<style scoped>
.wrapper {
    width: 100%;
    height: 150px;
    background-color: var(--bg-color-demo-secondary);
}

/* :deep(.external-class) {
    width: 208rpx;
    margin-left: 512rpx;
} */

.green-button {
    z-index: 0 !important;
    background-color: #008858 !important;
    color: #fff !important;
}

.hover-class::after {
    z-index: -1;
    background-color: #006c45;
    border-color: #006c45;
}
</style>
```




## API

### Sticky Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
custom-style | Object | - | 自定义样式 | N
container | Function | - | 函数返回容器对应的 NodesRef 节点，将对应节点指定为组件的外部容器，滚动时组件会始终保持在容器范围内，当组件即将超出容器底部时，会返回原位置 | N
disabled | Boolean | false | 是否禁用组件 | N
offset-top | String / Number | 0 | 吸顶时与顶部的距离，单位`px` | N
z-index | Number | 99 | 吸顶时的 z-index | N

### Sticky Events

名称 | 参数 | 描述
-- | -- | --
scroll | `(context: { scrollTop: number, isFixed: boolean })` | 滚动时触发，scrollTop: 距离顶部位置，isFixed: 是否吸顶

### Sticky Slots

名称 | 描述
-- | --
\- | 默认插槽，自定义内容区域内容

### Sticky External Classes

类名 | 描述
-- | --
t-class | 根节点样式类
t-class-content | 内容样式类
