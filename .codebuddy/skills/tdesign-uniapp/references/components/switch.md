---
name: "switch"
description: "用于控制某个功能的开启和关闭。"
url: "https://tdesign.tencent.com/uniapp/components/switch"
---



## 引入

可在 `main.ts` 或在需要使用的页面或组件中引入。

```js
import TSwitch from '@tdesign/uniapp/switch/switch.vue';
```

### 基础开关


```vue
<template>
  <view>
    <t-cell
      title="基础开关"
      :bordered="false"
    >
      <template
        #note
      >
        <t-switch
          :default-value="true"
        />
      </template>
    </t-cell>
  </view>
</template>

<script>
import TCell from '@tdesign/uniapp/cell/cell.vue';
import TSwitch from '@tdesign/uniapp/switch/switch.vue';
export default {
  components: {
    TCell,
    TSwitch,
  },
  data() {
    return {
      defaultVal: true,
    };
  },
  created() {},
  methods: {
  },
};
</script>
<style>
</style>
```


### 带描述开关


```vue
<template>
  <view>
    <t-cell title="带文字开关">
      <template
        #note
      >
        <t-switch
          :value="defaultVal"
          :label="['开', '关']"
          @change="handleChange"
        />
      </template>
    </t-cell>

    <t-cell
      title="带图标开关"
      :bordered="false"
    >
      <template
        #note
      >
        <t-switch
          :default-value="true"
          :icon="['check', 'close']"
        />
      </template>
    </t-cell>
  </view>
</template>

<script>
import TCell from '@tdesign/uniapp/cell/cell.vue';
import TSwitch from '@tdesign/uniapp/switch/switch.vue';
export default {
  components: {
    TCell,
    TSwitch,
  },
  data() {
    return {
      defaultVal: true,
    };
  },
  created() {},
  methods: {
    handleChange(e) {
      this.defaultVal = e.value;
    },
  },
};
</script>
<style>
</style>
```


### 自定义颜色


```vue
<template>
  <view class="custom-color">
    <t-cell
      title="自定义颜色开关"
      :bordered="false"
    >
      <template
        #note
      >
        <t-switch
          :default-value="true"
        />
      </template>
    </t-cell>
    <!-- <t-cell title="自定义颜色" bordered="{{false}}">
    <t-switch loading defaultValue="{{true}}" slot="note" />
  </t-cell>
  <t-cell title="自定义颜色" bordered="{{false}}">
    <t-switch defaultValue="{{true}}" label="{{['关', '开']}}" slot="note" />
  </t-cell>
  <t-cell title="自定义颜色" bordered="{{false}}">
    <t-switch defaultValue="{{true}}" icon="{{['close', 'check']}}" slot="note" />
  </t-cell> -->
  </view>
</template>

<script>
import TCell from '@tdesign/uniapp/cell/cell.vue';
import TSwitch from '@tdesign/uniapp/switch/switch.vue';
export default {
  components: {
    TCell,
    TSwitch,
  },
  data() {
    return {
      defaultVal: true,
    };
  },
  created() {},
  methods: {
  },
};
</script>
<style>
.custom-color {
    --td-switch-checked-color: #00a870;
}
</style>
```


### 开关状态


```vue
<template>
  <view>
    <view class="demo-desc">
      加载状态
    </view>

    <view class="group">
      <t-cell title="加载状态">
        <template
          #note
        >
          <t-switch
            :default-value="false"
            loading
          />
        </template>
      </t-cell>
      <t-cell
        title="加载状态"
        :bordered="false"
      >
        <template
          #note
        >
          <t-switch
            :default-value="true"
            loading
          />
        </template>
      </t-cell>
    </view>

    <view class="demo-desc">
      禁用状态
    </view>

    <view class="group">
      <t-cell title="禁用状态">
        <template
          #note
        >
          <t-switch
            disabled
          />
        </template>
      </t-cell>
      <t-cell
        title="禁用状态"
        :bordered="false"
      >
        <template
          #note
        >
          <t-switch
            :default-value="true"
            disabled
          />
        </template>
      </t-cell>
    </view>
  </view>
</template>

<script>
import TCell from '@tdesign/uniapp/cell/cell.vue';
import TSwitch from '@tdesign/uniapp/switch/switch.vue';
export default {
  components: {
    TCell,
    TSwitch,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style>
.group {
    margin-top: 32rpx;
}

.group + .demo-desc {
    margin-top: 48rpx;
}
</style>
```


### 尺寸


```vue
<template>
  <view>
    <t-cell title="大尺寸 32">
      <template
        #note
      >
        <t-switch
          :default-value="true"
          size="large"
        />
      </template>
    </t-cell>
    <t-cell title="中尺寸 28">
      <template
        #note
      >
        <t-switch
          :default-value="true"
        />
      </template>
    </t-cell>
    <t-cell
      title="小尺寸 24"
      :bordered="false"
    >
      <template
        #note
      >
        <t-switch
          :default-value="true"
          size="small"
        />
      </template>
    </t-cell>
  </view>
</template>

<script>
import TCell from '@tdesign/uniapp/cell/cell.vue';
import TSwitch from '@tdesign/uniapp/switch/switch.vue';
export default {
  components: {
    TCell,
    TSwitch,
  },
  data() {
    return {
      defaultVal: true,
    };
  },
  created() {},
  methods: {

  },
};
</script>
<style>
</style>
```


## API

### Switch Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
custom-style | Object | - | 自定义样式 | N
custom-value | Array | [true, false] | 用于自定义开关的值，[打开时的值，关闭时的值]。默认为 [true, false]。示例：[1, 0]、['open', 'close']。TS 类型：`Array<SwitchValue>` | N
disabled | Boolean | undefined | 是否禁用组件。优先级：Switch.disabled > Form.disabled | N
icon | Array | [] | 开关的图标；[打开时的图标，关闭时的图标]。TS 类型：`string[]` | N
label | Array | [] | 开关内容，[开启时内容，关闭时内容]。示例：['开', '关'] 。TS 类型：`string[]` | N
loading | Boolean | false | 是否处于加载中状态 | N
size | String | medium | 开关尺寸。可选项：small/medium/large | N
value | String / Number / Boolean | - | 开关值。支持语法糖 `v-model:value`。TS 类型：`SwitchValue` `type SwitchValue = string \| number \| boolean`。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/switch/type.ts) | N
default-value | String / Number / Boolean | - | 开关值。非受控属性。TS 类型：`SwitchValue` `type SwitchValue = string \| number \| boolean`。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/switch/type.ts) | N

### Switch Events

名称 | 参数 | 描述
-- | -- | --
change | `(context: { value: SwitchValue })` | 数据发生变化时触发

### Switch External Classes

类名 | 描述
-- | --
t-class | 根节点样式类
t-class-body | 描述文本样式类
t-class-dot | 滑块样式类
t-class-label | 开关内容样式类

### CSS Variables

组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-switch-checked-color | @brand-color | -
--td-switch-checked-disabled-color | @brand-color-disabled | -
--td-switch-dot-disabled-color | @font-white-1 | -
--td-switch-dot-horizontal-margin | 6rpx | -
--td-switch-dot-large-size | 52rpx | -
--td-switch-dot-plain-horizontal-margin | 10rpx | -
--td-switch-dot-plain-large-size | 44rpx | -
--td-switch-dot-plain-size | 36rpx | -
--td-switch-dot-plain-small-size | 28rpx | -
--td-switch-dot-shadow | @shadow-1 | -
--td-switch-dot-size | 44rpx | -
--td-switch-dot-small-size | 36rpx | -
--td-switch-height | 56rpx | -
--td-switch-icon-large-size | 48rpx | -
--td-switch-icon-size | 40rpx | -
--td-switch-icon-small-size | 32rpx | -
--td-switch-label-checked-color | @switch-checked-color | -
--td-switch-label-color | @bg-color-secondarycontainer-active | -
--td-switch-label-font-size | 28rpx | -
--td-switch-label-large-font-size | 32rpx | -
--td-switch-label-small-font-size | 24rpx | -
--td-switch-large-height | 64rpx | -
--td-switch-large-radius | calc(@switch-large-height / 2) | -
--td-switch-large-width | 104rpx | -
--td-switch-loading-color | @brand-color | -
--td-switch-radius | calc(@switch-height / 2) | -
--td-switch-small-height | 48rpx | -
--td-switch-small-radius | calc(@switch-small-height / 2) | -
--td-switch-small-width | 78rpx | -
--td-switch-unchecked-color | @bg-color-secondarycontainer-active | -
--td-switch-unchecked-disabled-color | @bg-color-component-disabled | -
--td-switch-width | 90rpx | -
