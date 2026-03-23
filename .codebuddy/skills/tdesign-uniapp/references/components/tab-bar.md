---
name: "tabbar"
description: "用于在不同功能模块之间进行快速切换，位于页面底部。"
url: "https://tdesign.tencent.com/uniapp/components/tab-bar"
---



## 引入

可在 `main.ts` 或在需要使用的页面或组件中引入。

```js
import TTabBar from '@tdesign/uniapp/tab-bar/tab-bar.vue';
import TTabBarItem from '@tdesign/uniapp/tab-bar-item/tab-bar-item.vue';
```

### 组件类型
#### 纯文本标签栏


```vue
<template>
  <view>
    <t-tab-bar
      t-class="t-tab-bar"
      :value="value"
      theme="tag"
      :split="false"
      :fixed="false"
      @change="onChange"
    >
      <t-tab-bar-item
        v-for="(item, index) in list"
        :key="index"
        :value="item.value"
      >
        {{ item.label }}
      </t-tab-bar-item>
    </t-tab-bar>
  </view>
</template>

<script>
import TTabBar from '@tdesign/uniapp/tab-bar/tab-bar.vue';
import TTabBarItem from '@tdesign/uniapp/tab-bar-item/tab-bar-item.vue';
export default {
  components: {
    TTabBar,
    TTabBarItem,
  },
  data() {
    return {
      value: 'home',
      list: [
        {
          value: 'home',
          label: '首页',
        },
        {
          value: 'app',
          label: '应用',
        },
        {
          value: 'chat',
          label: '聊天',
        },
        {
          value: 'user',
          label: '我的',
        },
      ],
    };
  },
  created() {},
  methods: {
    onChange(e) {
      this.value = e.value;
    },
  },
};
</script>
<style>
</style>
```


#### 图标加文字标签栏


```vue
<template>
  <view>
    <t-tab-bar
      t-class="t-tab-bar"
      :value="value"
      theme="tag"
      :fixed="false"
      :split="false"
      @change="onChange"
    >
      <t-tab-bar-item
        v-for="(item, index) in list"
        :key="index"
        :value="item.value"
        :icon="item.icon"
      >
        {{ item.label }}
      </t-tab-bar-item>
    </t-tab-bar>
  </view>
</template>

<script>
import TTabBar from '@tdesign/uniapp/tab-bar/tab-bar.vue';
import TTabBarItem from '@tdesign/uniapp/tab-bar-item/tab-bar-item.vue';
export default {
  components: {
    TTabBar,
    TTabBarItem,
  },
  data() {
    return {
      value: 'label_1',
      list: [
        {
          value: 'label_1',
          label: '首页',
          icon: 'home',
        },
        {
          value: 'label_2',
          label: '应用',
          icon: 'app',
        },
        {
          value: 'label_3',
          label: '聊天',
          icon: 'chat',
        },
        {
          value: 'label_4',
          label: '我的',
          icon: 'user',
        },
      ],
    };
  },
  created() {},
  methods: {
    onChange(e) {
      this.value = e.value;
    },
  },
};
</script>
<style>
</style>
```


#### 纯图标标签栏


```vue
<template>
  <view>
    <t-tab-bar
      t-class="t-tab-bar"
      :value="value"
      theme="tag"
      :split="false"
      :fixed="false"
      @change="onChange"
    >
      <t-tab-bar-item
        v-for="(item, index) in list"
        :key="index"
        :value="item.value"
        :icon="item.icon"
        :aria-label="item.ariaLabel"
      />
    </t-tab-bar>
  </view>
</template>

<script>
import TTabBar from '@tdesign/uniapp/tab-bar/tab-bar.vue';
import TTabBarItem from '@tdesign/uniapp/tab-bar-item/tab-bar-item.vue';
export default {
  components: {
    TTabBar,
    TTabBarItem,
  },
  data() {
    return {
      value: 'label_1',
      list: [
        {
          value: 'label_1',
          icon: 'home',
          ariaLabel: '首页',
        },
        {
          value: 'label_2',
          icon: 'app',
          ariaLabel: '软件',
        },
        {
          value: 'label_3',
          icon: 'chat',
          ariaLabel: '聊天',
        },
        {
          value: 'label_4',
          icon: 'user',
          ariaLabel: '我的',
        },
      ],
    };
  },
  created() {},
  methods: {
    onChange(e) {
      this.value = e.value;
    },
  },
};
</script>
<style>
</style>
```


#### 双层级纯文本标签栏


```vue
<template>
  <view>
    <t-tab-bar
      t-class="t-tab-bar"
      default-value="user"
      theme="tag"
      :split="false"
      :fixed="false"
    >
      <t-tab-bar-item
        v-for="(item, index) in list"
        :key="index"
        :value="item.value"
        :sub-tab-bar="item.children"
      >
        {{ item.label }}
      </t-tab-bar-item>
    </t-tab-bar>
  </view>
</template>

<script>
import TTabBar from '@tdesign/uniapp/tab-bar/tab-bar.vue';
import TTabBarItem from '@tdesign/uniapp/tab-bar-item/tab-bar-item.vue';
const list = [
  {
    value: 'home',
    label: '首页',
    icon: 'home',
    children: [],
  },
  {
    value: 'app',
    label: '应用',
    icon: 'app',
    children: [],
  },
  {
    value: 'user',
    label: '我的',
    children: [
      {
        value: 'info',
        label: '基本信息',
      },
      {
        value: 'home-page',
        label: '个人主页',
      },
      {
        value: 'setting',
        label: '设置',
      },
    ],
  },
];
export default {
  components: {
    TTabBar,
    TTabBarItem,
  },
  data() {
    return {
      list,
    };
  },
  created() {},
  methods: {},
};
</script>
<style>
</style>
```


### 组件样式

#### 弱选中标签栏


```vue
<template>
  <view>
    <!-- 文本 + 徽标 -->
    <view class="wrapper">
      <t-tab-bar
        t-class="t-tab-bar"
        default-value="label1"
        :fixed="false"
      >
        <t-tab-bar-item
          :badge-props="{count: 16, offset: [16, 0]} "
          aria-label="首页，有16条消息"
          value="label1"
        >
          首页
        </t-tab-bar-item>
        <t-tab-bar-item
          :badge-props="{ dot: true, offset: [16, 0] }"
          aria-label="应用，有新的消息"
          value="label2"
        >
          应用
        </t-tab-bar-item>
        <t-tab-bar-item
          :badge-props="{count: 'New', offset: [16, 0]}"
          aria-label="聊天，New"
          value="label3"
        >
          聊天
        </t-tab-bar-item>
        <t-tab-bar-item
          :badge-props="{count: '···', offset: [16, 0]}"
          aria-label="我的，有很多消息"
          value="label4"
        >
          我的
        </t-tab-bar-item>
      </t-tab-bar>
    </view>

    <!-- 图标 + 徽标 -->
    <view class="wrapper">
      <t-tab-bar
        t-class="t-tab-bar"
        default-value="label1"
        :split="false"
        :fixed="false"
      >
        <t-tab-bar-item
          :badge-props="{count: 16}"
          aria-label="首页，有16条消息"
          value="label1"
          icon="home"
        />
        <t-tab-bar-item
          :badge-props="{ dot: true }"
          aria-label="应用，有新的消息"
          value="label2"
          icon="app"
        />
        <t-tab-bar-item
          :badge-props="{count: 'New'}"
          aria-label="聊天，New"
          value="label3"
          icon="chat"
        />
        <t-tab-bar-item
          :badge-props="{count: '···'}"
          aria-label="我的，有很多消息"
          value="label4"
          icon="user"
        />
      </t-tab-bar>
    </view>

    <!-- 文本 + 图标 + 徽标 -->
    <view class="wrapper">
      <t-tab-bar
        t-class="t-tab-bar"
        default-value="label1"
        :split="false"
        :fixed="false"
      >
        <t-tab-bar-item
          :badge-props="{count: 16}"
          aria-label="首页，有16条消息"
          value="label1"
          icon="home"
        >
          首页
        </t-tab-bar-item>
        <t-tab-bar-item
          :badge-props="{ dot: true }"
          aria-label="应用，有新的消息"
          value="label2"
          icon="app"
        >
          应用
        </t-tab-bar-item>
        <t-tab-bar-item
          :badge-props="{count: 'New'}"
          aria-label="聊天，New"
          value="label3"
          icon="chat"
        >
          聊天
        </t-tab-bar-item>
        <t-tab-bar-item
          :badge-props="{count: '···'}"
          aria-label="我的，有很多消息"
          value="label4"
          icon="user"
        >
          我的
        </t-tab-bar-item>
      </t-tab-bar>
    </view>
  </view>
</template>

<script>
import TTabBar from '@tdesign/uniapp/tab-bar/tab-bar.vue';
import TTabBarItem from '@tdesign/uniapp/tab-bar-item/tab-bar-item.vue';
export default {
  components: {
    TTabBar,
    TTabBarItem,
  },
  data() {
    return {
      list: [
        {
          value: 'label_1',
          label: '文字',
          icon: 'home',
        },
        {
          value: 'label_2',
          label: '文字',
          icon: 'app',
        },
        {
          value: 'label_3',
          label: '文字',
          icon: 'chat',
        },
        {
          value: 'label_4',
          label: '文字',
          icon: 'user',
        },
      ],
    };
  },
  created() {},
  methods: {},
};
</script>
<style>
.wrapper:not(:last-child) {
    margin-bottom: 32rpx;
}
</style>
```


#### 悬浮胶囊标签栏


```vue
<template>
  <view>
    <t-tab-bar
      t-class="t-tab-bar"
      :value="value"
      shape="round"
      theme="tag"
      :split="false"
      :fixed="false"
      @change="onChange"
    >
      <t-tab-bar-item
        v-for="(item, index) in list"
        :key="index"
        :value="item.value"
        :icon="item.icon"
        :aria-label="item.ariaLabel"
      />
    </t-tab-bar>
  </view>
</template>

<script>
import TTabBar from '@tdesign/uniapp/tab-bar/tab-bar.vue';
import TTabBarItem from '@tdesign/uniapp/tab-bar-item/tab-bar-item.vue';
export default {
  components: {
    TTabBar,
    TTabBarItem,
  },
  data() {
    return {
      value: 'label_1',
      list: [
        {
          value: 'label_1',
          icon: 'home',
          ariaLabel: '首页',
        },
        {
          value: 'label_2',
          icon: 'app',
          ariaLabel: '软件',
        },
        {
          value: 'label_3',
          icon: 'chat',
          ariaLabel: '聊天',
        },
        {
          value: 'label_4',
          icon: 'user',
          ariaLabel: '我的',
        },
      ],
    };
  },
  created() {},
  methods: {
    onChange(e) {
      this.value = e.value;
    },
  },
};
</script>
<style>
</style>
```


#### 自定义主题


```vue
<template>
  <view class="wrapper">
    <t-tab-bar
      t-class="t-tab-bar"
      :value="value"
      :fixed="false"
      @change="onChange"
    >
      <t-tab-bar-item
        v-for="(item, index) in list"
        :key="index"
        :value="item.value"
        :icon="item.icon"
        :aria-label="item.ariaLabel"
      />
    </t-tab-bar>
  </view>
</template>

<script>
import TTabBar from '@tdesign/uniapp/tab-bar/tab-bar.vue';
import TTabBarItem from '@tdesign/uniapp/tab-bar-item/tab-bar-item.vue';
export default {
  components: {
    TTabBar,
    TTabBarItem,
  },
  data() {
    return {
      value: 'label_1',
      list: [
        {
          value: 'label_1',
          icon: 'home',
          ariaLabel: '首页',
        },
        {
          value: 'label_2',
          icon: 'app',
          ariaLabel: '软件',
        },
        {
          value: 'label_3',
          icon: 'chat',
          ariaLabel: '聊天',
        },
        {
          value: 'label_4',
          icon: 'user',
          ariaLabel: '我的',
        },
      ],
    };
  },
  created() {},
  methods: {
    onChange(e) {
      this.value = e.value;
    },
  },
};
</script>
<style>
.wrapper {
    --td-tab-bar-border-color: var(--td-border-level-1-color, #e7e7e7);
    --td-tab-bar-bg-color: var(--td-bg-color-secondarycontainer, #f3f3f3);
    --td-tab-bar-hover-color: #ddd;
    --td-tab-bar-item-color: var(--td-text-color-primary, rgba(0, 0, 0, 0.9));
    --td-tab-bar-item-active-color: var(--td-brand-color, #0052d9);
}
</style>
```


## API

### TabBar Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
custom-style | Object | - | 自定义样式 | N
bordered | Boolean | true | 是否显示外边框 | N
fixed | Boolean | true | 是否固定在底部 | N
placeholder | Boolean | false | 固定在底部时是否开启占位 | N
safe-area-inset-bottom | Boolean | true | 是否开启底部安全区适配 | N
shape | String | normal | 标签栏的形状。可选项：normal/round | N
split | Boolean | true | 是否需要分割线 | N
theme | String | normal | 选项风格。可选项：normal/tag | N
value | String / Number / Array | - | 当前选中标签的索引。支持语法糖 `v-model:value`。TS 类型：`string \| number \| Array<string \| number>` | N
default-value | String / Number / Array | - | 当前选中标签的索引。非受控属性。TS 类型：`string \| number \| Array<string \| number>` | N
z-index | Number | 1 | 标签栏层级 | N

### TabBar External Classes

类名 | 描述
-- | --
t-class | 根节点样式类


### TabBarItem Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
custom-style | Object | - | 自定义样式 | N
badge-props | Object | {} | 图标右上角提示信息。TS 类型：`BadgeProps`，[Badge API Documents](./badge?tab=api)。[详细类型定义](https://github.com/tencent/tdesign-miniprogram/blob/develop/packages/uniapp-components/tab-bar-item/type.ts) | N
icon | String / Object | - | 图标名称。传入对象时透传至 Icon 组件 | N
sub-tab-bar | Array | - | 二级菜单。TS 类型：`SubTabBarItem[] ` `interface SubTabBarItem { value: string; label: string }`。[详细类型定义](https://github.com/tencent/tdesign-miniprogram/blob/develop/packages/uniapp-components/tab-bar-item/type.ts) | N
value | String / Number | - | 标识符 | N

### TabBarItem Slots

名称 | 描述
-- | --
icon | 图标插槽，用于自定义图标区域内容

### CSS Variables

组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-tab-bar-bg-color | @bg-color-container | -
--td-tab-bar-border-color | @border-level-1-color | -
--td-tab-bar-round-shadow | @shadow-3 | -
--td-tab-bar-active-bg | @brand-color-light | -
--td-tab-bar-active-color | @brand-color | -
--td-tab-bar-color | @text-color-primary | -
--td-tab-bar-height | 80rpx | -
--td-tab-bar-hover-bg-color | rgba(0, 0, 0, 0.05) | -
--td-tab-bar-spread-border-color | @border-color | -
--td-tab-bar-spread-shadow | @shadow-3 | -
