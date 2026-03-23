---
name: "tabs"
description: "用于内容分类后的展示切换。"
url: "https://tdesign.tencent.com/uniapp/components/tabs"
---



## 引入

可在 `main.ts` 或在需要使用的页面或组件中引入。

```js
import TTabs from '@tdesign/uniapp/tabs/tabs.vue';
import TTabsPanel from '@tdesign/uniapp/tab-panel/tab-panel.vue';
```

### 基础选项卡


```vue
<template>
  <view>
    <t-tabs
      :default-value="0"
      t-class="custom-tabs"
      @change="onTabsChange"
      @click="onTabsClick"
    >
      <t-tab-panel
        label="选项"
        value="0"
      />
      <t-tab-panel
        label="选项"
        value="1"
      />
    </t-tabs>

    <t-tabs
      :default-value="0"
      t-class="custom-tabs"
      @change="onTabsChange"
      @click="onTabsClick"
    >
      <t-tab-panel
        label="选项"
        value="0"
      />
      <t-tab-panel
        label="选项"
        value="1"
      />
      <t-tab-panel
        label="上限六个文字"
        value="2"
      />
    </t-tabs>

    <t-tabs
      :default-value="0"
      t-class="custom-tabs"
      @change="onTabsChange"
      @click="onTabsClick"
    >
      <t-tab-panel
        label="选项"
        value="0"
      />
      <t-tab-panel
        label="选项"
        value="1"
      />
      <t-tab-panel
        label="选项"
        value="2"
      />
      <t-tab-panel
        label="上限四字"
        value="3"
      />
    </t-tabs>

    <t-tabs
      :default-value="0"
      sticky
      :sticky-props="stickyProps"
      t-class="custom-tabs"
      @change="onTabsChange"
      @click="onTabsClick"
      @scroll="onStickyScroll"
    >
      <t-tab-panel
        label="选项"
        value="0"
      />
      <t-tab-panel
        label="选项"
        value="1"
      />
      <t-tab-panel
        label="选项"
        value="2"
      />
      <t-tab-panel
        label="选项"
        value="3"
      />
      <t-tab-panel
        label="上限四字"
        value="4"
      />
    </t-tabs>
  </view>
</template>

<script>
import TTabs from '@tdesign/uniapp/tabs/tabs.vue';
import TTabPanel from '@tdesign/uniapp/tab-panel/tab-panel.vue';
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TTabs,
    TTabPanel,
  },
  props: {
    stickyOffset: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
    };
  },
  computed: {
    stickyProps() {
      return {
        zIndex: 100,
        offsetTop: this.stickyOffset,

      };
    },
  },
  created() {},
  methods: {
    onTabsChange(event) {
      console.log(`Change tab, tab-panel value is ${event.value}.`);
    },
    onTabsClick(event) {
      console.log(`Click tab, tab-panel value is ${event.value}.`);
    },
    onStickyScroll(event) {
      console.log('sticky scroll: ', event);
    },
  },
};
</script>
<style>

.custom-tabs {
    margin-bottom: 32rpx;
}
</style>
```


### 等距选项卡


```vue
<template>
  <view>
    <t-tabs
      :default-value="0"
      :space-evenly="false"
      @change="onTabsChange"
      @click="onTabsClick"
    >
      <t-tab-panel
        v-for="(item, index) in 8"
        :key="index"
        label="选项"
        :value="index"
      />
    </t-tabs>
  </view>
</template>

<script>
import TTabs from '@tdesign/uniapp/tabs/tabs.vue';
import TTabPanel from '@tdesign/uniapp/tab-panel/tab-panel.vue';
export default {
  components: {
    TTabs,
    TTabPanel,
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    onTabsChange(event) {
      console.log(`Change tab, tab-panel value is ${event.value}.`);
    },
    onTabsClick(event) {
      console.log(`Click tab, tab-panel value is ${event.value}.`);
    },
  },
};
</script>
<style>
</style>
```


### 带图标选项卡


```vue
<template>
  <view>
    <t-tabs :default-value="0">
      <t-tab-panel
        v-for="(item, index) in 3"
        :key="index"
        icon="app"
        label="选项"
        :value="index"
      />
    </t-tabs>
  </view>
</template>

<script>
import TTabs from '@tdesign/uniapp/tabs/tabs.vue';
import TTabPanel from '@tdesign/uniapp/tab-panel/tab-panel.vue';
export default {
  components: {
    TTabs,
    TTabPanel,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style>
</style>
```


### 带徽章选项卡


```vue
<template>
  <view>
    <t-tabs :default-value="0">
      <t-tab-panel
        label="选项"
        value="0"
        :badge-props="{ dot: true, offset: [0, 1] }"
      />
      <t-tab-panel
        label="选项"
        value="1"
        :badge-props="{ count: 8, offset: [0, 1] }"
      />
      <t-tab-panel
        label="选项"
        value="2"
      />
    </t-tabs>
  </view>
</template>

<script>
import TTabs from '@tdesign/uniapp/tabs/tabs.vue';
import TTabPanel from '@tdesign/uniapp/tab-panel/tab-panel.vue';
export default {
  components: {
    TTabs,
    TTabPanel,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style>
</style>
```


### 带内容区选项卡


```vue
<template>
  <view>
    <t-tabs
      :animation="{ duration: 0.6 }"
      :default-value="0"
      t-class="custom-tabs"
      t-class-content="custom-panel"
      @change="onTabsChange"
      @click="onTabsClick"
    >
      <t-tab-panel
        label="选项一"
        value="0"
      >
        <view class="custom-panel__content">
          选项一内容
        </view>
      </t-tab-panel>
      <t-tab-panel
        label="选项二"
        value="1"
      >
        <view class="custom-panel__content">
          选项二内容
        </view>
      </t-tab-panel>
      <t-tab-panel
        label="选项三"
        value="2"
      >
        <view class="custom-panel__content">
          选项三内容
        </view>
      </t-tab-panel>
      <t-tab-panel
        label="选项四"
        value="3"
      >
        <view class="custom-panel__content">
          选项四内容
        </view>
      </t-tab-panel>
    </t-tabs>
  </view>
</template>

<script>
import TTabs from '@tdesign/uniapp/tabs/tabs.vue';
import TTabPanel from '@tdesign/uniapp/tab-panel/tab-panel.vue';
export default {
  components: {
    TTabs,
    TTabPanel,
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    onTabsChange(event) {
      console.log(`Change tab, tab-panel value is ${event.value}.`);
    },
    onTabsClick(event) {
      console.log(`Click tab, tab-panel value is ${event.value}.`);
    },
  },
};
</script>
<style>
.custom-tabs {
    margin-bottom: 32rpx;
}

.custom-panel {
    color: var(--td-text-color-primary);
}

.custom-panel__content {
    height: 240rpx;
    font-size: 28rpx;
    color: var(--td-text-color-placeholder);
    padding: 40rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
```


### 选项卡状态


```vue
<template>
  <view>
    <t-tabs
      :value="value"
      @change="onTabsChange"
      @click="onTabsClick"
    >
      <t-tab-panel
        :label="value == '0' ? '选中' : '默认'"
        value="0"
      />
      <t-tab-panel
        :label="value == '1' ? '选中' : '默认'"
        value="1"
      />
      <t-tab-panel
        label="禁用"
        value="2"
        disabled
      />
    </t-tabs>
  </view>
</template>

<script>
import TTabs from '@tdesign/uniapp/tabs/tabs.vue';
import TTabPanel from '@tdesign/uniapp/tab-panel/tab-panel.vue';
export default {
  components: {
    TTabs,
    TTabPanel,
  },
  data() {
    return {
      value: '0',
    };
  },
  created() {},
  methods: {
    onTabsChange(event) {
      this.value = event.value;
      console.log(`Change tab, tab-panel value is ${event.value}.`);
    },
    onTabsClick(event) {
      console.log(`Click tab, tab-panel value is ${event.value}.`);
    },
  },
};
</script>
<style>
</style>
```


### 选项卡尺寸


```vue
<template>
  <view>
    <t-tabs :default-value="0">
      <t-tab-panel
        label="小尺寸"
        value="0"
      />
      <t-tab-panel
        label="选项"
        value="1"
      />
      <t-tab-panel
        label="选项"
        value="2"
      />
      <t-tab-panel
        label="选项"
        value="3"
      />
    </t-tabs>

    <view style="height: 16px" />

    <t-tabs
      class="bigger"
      :default-value="0"
    >
      <t-tab-panel
        label="大尺寸"
        value="0"
      />
      <t-tab-panel
        label="选项"
        value="1"
      />
      <t-tab-panel
        label="选项"
        value="2"
      />
      <t-tab-panel
        label="选项"
        value="3"
      />
    </t-tabs>
  </view>
</template>

<script>
import TTabs from '@tdesign/uniapp/tabs/tabs.vue';
import TTabPanel from '@tdesign/uniapp/tab-panel/tab-panel.vue';
export default {
  components: {
    TTabs,
    TTabPanel,
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    onTabsChange(event) {
      console.log(`Change tab, tab-panel value is ${event.value}.`);
    },
    onTabsClick(event) {
      console.log(`Click tab, tab-panel value is ${event.value}.`);
    },
  },
};
</script>
<style>
.bigger {
  --td-tab-font: var(--td-font-body-large);
}
</style>
```


### 选项卡样式

使用 theme 属性可以变换风格，支持 line = 线条（默认）；tag = 标签；card = 卡片


```vue
<template>
  <view>
    <t-tabs
      :default-value="0"
      theme="tag"
    >
      <t-tab-panel
        v-for="(item, index) in 4"
        :key="index"
        label="选项"
        :value="index"
      />
    </t-tabs>

    <view style="height: 16px" />

    <t-tabs
      :default-value="0"
      theme="card"
    >
      <t-tab-panel
        v-for="(item, index) in 4"
        :key="index"
        label="选项"
        :value="index"
      />
    </t-tabs>
  </view>
</template>

<script>
import TTabs from '@tdesign/uniapp/tabs/tabs.vue';
import TTabPanel from '@tdesign/uniapp/tab-panel/tab-panel.vue';
export default {
  components: {
    TTabs,
    TTabPanel,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style>
</style>
```


<!-- 横向选项卡支持超过屏幕滑动 -->

### 受控用法

```html
<t-tabs :value="value" @change="onTabsChange">
  <t-tab-panel label="标签页一" value="0">标签一内容</t-tab-panel>
  <t-tab-panel label="标签页二" value="1">标签二内容</t-tab-panel>
</t-tabs>
```

```js
export default{
  data: {
    return {
      value: '0',
    };
  },
  methods: {
    onTabsChange(e) {
      this.value = e.value;
    },
  }
  
};
```

### 与 Popup 使用

```html
 <t-popup :visible="visible" @visible-change="onVisibleChange">
  <t-tabs ref="tabs" defaultValue="0" @change="onTabsChange" @click="onTabsClick" t-class="custom-tabs">
    <t-tab-panel label="标签页一" value="0">标签一内容</t-tab-panel>
    <t-tab-panel label="标签页二" value="1">标签二内容</t-tab-panel>
    <t-tab-panel label="标签页三" value="2">标签三内容</t-tab-panel>
  </t-tabs>
</t-popup>
```

```js
export default {
  data: {
    return {
      visible: false,
    };
  },
  methods: {
    showPopup() {
      this.visible = true;
      setTimeout(() => {
        const tabs = this.$refs['tabs'];

        // 这一步很重要，因为小程序的无法正确执行生命周期，所以需要手动设置下 tabs 的滑块
        tabs.setTrack(); 
      });
    },
  },
})
```

## API

### Tabs Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
custom-style | Object | - | 自定义样式 | N
animation | Object | - | 动画效果设置。其中 duration 表示动画时长。（单位：秒）。TS 类型：`TabAnimation` `type TabAnimation = { duration: number } & Record<string, any>`。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/tabs/type.ts) | N
bottom-line-mode | String | fixed | 激活下划线的模式。可选项：fixed/auto/full | N
show-bottom-line | Boolean | true | 是否展示底部激活线条 | N
space-evenly | Boolean | true | 选项卡头部空间是否均分 | N
split | Boolean | true | `1.1.10`。是否展示分割线 | N
sticky | Boolean | false | 是否开启粘性布局 | N
sticky-props | Object | - | 透传至 Sticky 组件。TS 类型：`StickyProps`，[Sticky API Documents](./sticky?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/tabs/type.ts) | N
swipeable | Boolean | true | 是否可以滑动切换 | N
theme | String | line | 标签的样式。可选项：line/tag/card | N
value | String / Number | - | 激活的选项卡值。支持语法糖 `v-model:value`。TS 类型：`TabValue` `type TabValue = string \| number`。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/tabs/type.ts) | N
default-value | String / Number | - | 激活的选项卡值。非受控属性。TS 类型：`TabValue` `type TabValue = string \| number`。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/tabs/type.ts) | N

### Tabs Events

名称 | 参数 | 描述
-- | -- | --
change | `(context: { value: TabValue; label: string })` | 激活的选项卡发生变化时触发
click | `(context: { value: TabValue; label: string })` | 点击选项卡时触发
scroll | `(context: { scrollTop: number, isFixed: boolean })` | 页面滚动时触发

### Tabs Slots

名称 | 描述
-- | --
\- | 默认插槽，自定义选项卡内容
middle | 中间内容，介于头部和内容之间

### Tabs External Classes

类名 | 描述
-- | --
t-class | 根节点样式类
t-class-active | 激活态样式类
t-class-content | 内容样式类
t-class-item | 选项样式类
t-class-track | 滚动条样式类


### TabPanel Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
custom-style | Object | - | 自定义样式 | N
badge-props | Object | {} | 透传至 Badge 组件 | N
disabled | Boolean | false | 是否禁用当前选项卡 | N
icon | String / Object | - | `1.0.0-rc.1`。图标，传对象则透传至 Icon | N
label | String | - | 选项卡名称 | N
lazy | Boolean | false | 是否启用选项卡懒加载 | N
panel | String | - | 用于自定义选项卡面板内容 | N
value | String / Number | - | 选项卡的值，唯一标识。TS 类型：`TabValue`，[Tabs API Documents](./tabs?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/tab-panel/type.ts) | N

### TabPanel Slots

名称 | 描述
-- | --
\- | 默认插槽，自定义选项卡面板内容
panel | 自定义 `panel` 显示内容

### CSS Variables

组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-tab-border-color | @component-stroke | -
--td-tab-font | @font-body-medium | -
--td-tab-icon-size | 36rpx | -
--td-tab-item-active-color | @brand-color | -
--td-tab-item-color | @text-color-primary | -
--td-tab-item-disabled-color | @text-color-disabled | -
--td-tab-item-height | 96rpx | -
--td-tab-item-tag-active-bg | @brand-color-light | -
--td-tab-item-tag-bg | @bg-color-secondarycontainer | -
--td-tab-item-tag-height | 64rpx | -
--td-tab-item-vertical-height | 108rpx | -
--td-tab-item-vertical-width | 208rpx | -
--td-tab-nav-bg-color | @bg-color-container | -
--td-tab-track-color | @brand-color | -
--td-tab-track-radius | 8rpx | -
--td-tab-track-thickness | 6rpx | -
--td-tab-track-width | 32rpx | -
