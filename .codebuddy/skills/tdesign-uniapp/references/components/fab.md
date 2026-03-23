---
name: "fab"
description: "当功能使用图标即可表意清楚时，可使用纯图标悬浮按钮，例如：添加、发布。"
url: "https://tdesign.tencent.com/uniapp/components/fab"
---




## 引入

可在 `main.ts` 或在需要使用的页面或组件中引入。

```js
import TFab from '@tdesign/uniapp/fab/fab.vue';
```

### 基础使用


```vue
<template>
  <view>
    <t-fab
      icon="add"
      aria-label="增加"
      @click="handleClick"
    />
  </view>
</template>

<script>
import TFab from '@tdesign/uniapp/fab/fab.vue';
export default {
  components: {
    TFab,
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    handleClick(e) {
      console.log(e);
    },
  },
};
</script>
```


### 进阶使用


```vue
<template>
  <view>
    <t-fab
      icon="add"
      :button-props="fabButton"
      text="分享给朋友"
      @click="handleClick"
    />
  </view>
</template>

<script>
import TFab from '@tdesign/uniapp/fab/fab.vue';
export default {
  components: {
    TFab,
  },
  data() {
    return {
      fabButton: {
        icon: 'share',
        openType: 'share',
      },
    };
  },
  created() {},
  methods: {
    handleClick(e) {
      console.log(e);
    },
  },
};
</script>
<style>
/* @import './index.css'; */
</style>
```


### 可移动悬浮按钮


```vue
<template>
  <view>
    <t-fab
      icon="gesture-press"
      text="拖我"
      aria-label="增加"
      :using-custom-navbar="!isMPAlipay"
      draggable
      :y-bounds="[0, 32]"
      @click="handleClick"
      @drag-start="handleDragStart"
      @drag-end="handleDragEnd"
    />
  </view>
</template>

<script>
import TFab from '@tdesign/uniapp/fab/fab.vue';
export default {
  components: {
    TFab,
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    handleClick(e) {
      console.log('handleClick: ', e);
    },
    handleDragStart(e) {
      console.log('handleDragStart: ', e);
    },
    handleDragEnd(e) {
      console.log('handleDragEnd: ', e);
    },
  },
};
</script>
<style>
</style>
```


### 带自动收缩功能


```vue
<template>
  <view>
    <t-fab
      :custom-style="scrolling ? 'right: 0;bottom:64px;' : 'right:16px; bottom:24px'"
      @click="handleClick"
      @dragstart="handleDragStart"
      @dragend="handleDragEnd"
    >
      <view
        v-if="!scrolling"
        class="wrap"
      >
        <view class="item">
          <t-icon
            name="add-circle"
            size="20"
          />
          <view class="text">
            添加
          </view>
        </view>
        <view class="item">
          <t-icon
            name="star"
            size="20"
          />
          <view class="text">
            收藏
          </view>
        </view>
        <view class="item">
          <t-icon
            name="jump"
            size="20"
          />
          <view class="text">
            分享
          </view>
        </view>
      </view>
      <view
        v-else
        class="symbol"
      >
        <t-icon
          name="chevron-left"
          size="20"
        />
      </view>
    </t-fab>
  </view>
</template>

<script>
import TFab from '@tdesign/uniapp/fab/fab.vue';
import TIcon from '@tdesign/uniapp/icon/icon.vue';
import pageScrollMixin from '@tdesign/uniapp/mixins/page-scroll';


export default {
  components: {
    TFab,
    TIcon,
  },
  mixins: [pageScrollMixin()],
  data() {
    return {
      scrolling: false,
      timer: null,
    };
  },
  methods: {
    handleClick(e) {
      console.log('handleClick: ', e);
    },
    handleDragStart(e) {
      console.log('handleDragStart: ', e);
    },
    handleDragEnd(e) {
      console.log('handleDragEnd: ', e);
    },
    onScroll() {
      clearTimeout(this.timer);
      this.scrolling = true,
      this.timer = setTimeout(() => {
        this.scrolling = false;
      }, 100);
    },
  },
};
</script>
<style>
.wrap {
    border: 1px solid #dcdcdc;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding: 8px 0;
    border-radius: 22px;
    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.1), 0px 8px 10px 1px rgba(0, 0, 0, 0.06), 0px 3px 14px 2px rgba(0, 0, 0, 0.05);
    background: rgba(255, 255, 255, 1);
    width: 44px;
    height: 156px;
    box-sizing: border-box;
}

.item {
    width: 100%;
    height: 44px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.9);
    cursor: pointer;
}

.item:not(:last-child) {
    margin-bottom: 4px;
}

.text {
    height: 20px;
    line-height: 20px;
}

.symbol {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 16px 0 0 16px;
    background: #fff;

    border: 1px solid #dcdcdc;
    border-right: 0;
    box-shadow: 0px 5px 5px -3px #0000001a, 0px 8px 10px 1px #0000000f, 0px 3px 14px 2px #0000000d;
}
</style>
```


## FAQ

### 为什么通过 style/customStyle 设置 top/left 调整初试定位后，会使页面内容无法点击以及拖拽异常？

由于 `position: fixed;` 会使得元素脱离文档流，它将悬浮于页面上方。同时，元素没有设置宽高，当同时使用 `top`、`right`、`bottom` 和 `left` 属性时，浏览器会根据给定的 `top`、`right`、`bottom` 和 `left` 创建一个矩形框来容纳元素及其内容，所以会出现元素覆盖页面内容及拖拽异常等问题。

Fab 组件默认定位 `right: 16px; bottom: 32px;`，且拖拽功能也是通过调整 `right` 与 `bottom` 属性值实现，因此在使用 `Fab` 组件时，仅支持通过 `style/customStyle` 属性设置 `right/bottom` 来调整初试位置， 避免使用 `top/left`。

### 开启 Skyline 渲染引擎后，组件所在页面崩溃？

因为 Skyline 还不支持多层阴影，要等微信官方处理。当下可参考 [#2865](https://github.com/Tencent/tdesign-miniprogram/issues/2865) 进行规避处理


## API

### Fab Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
custom-style | Object | - | 自定义样式 | N
button-props | Object | - | 透传至 Button 组件。TS 类型：`ButtonProps`，[Button API Documents](./button?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/fab/type.ts) | N
draggable | String / Boolean | false | 是否可拖拽。`true` / `'all'`可拖动<br>`'vertical'`可垂直拖动<br>`'horizontal'`可水平拖动<br>`false`禁止拖动。TS 类型：`boolean \| FabDirectionEnum ` `type FabDirectionEnum = 'all' \| 'vertical' \| 'horizontal'`。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/fab/type.ts) | N
icon | String | - | 图标 | N
style | String | right: 16px; bottom: 32px; | 悬浮按钮的样式，常用于调整位置（即将废弃，建议使用 `style`） | N
text | String | - | 文本内容 | N
using-custom-navbar | Boolean | false | 是否使用了自定义导航栏 | N
y-bounds | Array | - | 设置垂直方向边界限制，示例：[48, 48] 或 ['96px', 80]。TS 类型：`Array<string \| number>` | N

### Fab Events

名称 | 参数 | 描述
-- | -- | --
click | `(context: {e: Event})` | 悬浮按钮点击事件
drag-end | `(context: { e: TouchEvent })` | 结束拖拽时触发
drag-start | `(context: { e: TouchEvent })` | 开始拖拽时触发

### Fab Slots

名称 | 描述
-- | --
\- | 默认插槽，按钮内容

### CSS Variables

组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-fab-shadow | @shadow-2 | -
