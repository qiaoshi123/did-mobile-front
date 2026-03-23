---
name: "badge"
description: "用于告知用户，该区域的状态变化或者待处理任务的数量。"
url: "https://tdesign.tencent.com/uniapp/components/badge"
---



## 引入

可在 `main.ts` 或在需要使用的页面或组件中引入。

```js
import TBadge from '@tdesign/uniapp/badge/badge.vue';
```

### 组件类型


```vue
<template>
  <view>
    <view class="demo-desc">
      红点徽标
    </view>
    <view class="demo-wrapper">
      <t-badge
        dot
        t-class="wrapper"
        content="消息"
      />
      <t-badge
        dot
        :offset="[1, -1]"
        t-class="wrapper"
      >
        <t-icon
          name="notification"
          size="48rpx"
          aria-label="通知"
        />
      </t-badge>
      <t-badge
        dot
        :offset="[1, 1]"
        t-class="wrapper"
      >
        <t-button>按钮</t-button>
      </t-badge>
    </view>

    <view class="demo-desc">
      数字徽标
    </view>
    <view class="demo-wrapper">
      <t-badge
        count="8"
        content="消息"
        :offset="[4]"
        t-class="wrapper"
      />
      <t-badge
        count="2"
        :offset="[2, -2]"
        t-class="wrapper"
      >
        <t-icon
          name="notification"
          size="48rpx"
          aria-label="通知"
        />
      </t-badge>
      <t-badge
        count="8"
        :offset="[2, 2]"
        t-class="wrapper"
      >
        <t-button>按钮</t-button>
      </t-badge>
    </view>

    <view class="demo-desc">
      自定义徽标
    </view>
    <view class="demo-wrapper">
      <t-badge
        count="NEW"
        :offset="[0, 2]"
        aria-role="button"
      >
        <t-button
          icon="notification"
          aria-label="通知"
          shape="square"
          size="large"
        />
      </t-badge>
    </view>
  </view>
</template>

<script>
import TBadge from '@tdesign/uniapp/badge/badge.vue';
import TIcon from '@tdesign/uniapp/icon/icon.vue';
import TButton from '@tdesign/uniapp/button/button.vue';
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TBadge,
    TIcon,
    TButton,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style>
:deep(.wrapper) {
    margin-right: 48px;
}

.demo-wrapper {
    display: flex;
    margin-left: 32rpx;
    margin-top: 28px;
    margin-bottom: 24px;
    align-items: center;
}
</style>
```


### 组件样式


```vue
<template>
  <view>
    <!--
  由于 button 被 t-badeg包裹，t-badge 中存在 role="option", 导致button中的 role=button 失去作用。相当于button 被申明了 role=presentation
  因此提升了 aria-role=button 到 t-badge上
  可参考： https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/option_role
  https://www.zhangxinxu.com/wordpress/2017/01/voiceover-aria-web-accessible-iphone/
-->

    <view class="demo-desc">
      圆形徽标
    </view>
    <view class="demo-wrapper">
      <t-badge
        count="2"
        :offset="[2, -2]"
      >
        <t-icon
          name="notification"
          size="48rpx"
          aria-label="通知"
        />
      </t-badge>
    </view>

    <view class="demo-desc">
      方形徽标
    </view>
    <view class="demo-wrapper">
      <t-badge
        count="2"
        shape="square"
        :offset="[1, -2]"
      >
        <t-icon
          name="notification"
          size="48rpx"
          aria-label="通知"
        />
      </t-badge>
    </view>

    <view class="demo-desc">
      气泡徽标
    </view>
    <view class="demo-wrapper">
      <t-badge
        count="领积分"
        shape="bubble"
        aria-role="button"
      >
        <t-button
          icon="shop"
          aria-label="商店"
          shape="square"
          size="large"
        />
      </t-badge>
    </view>

    <view
      class="demo-desc"
      style="margin-bottom: 32rpx"
    >
      角标
    </view>
    <t-cell
      title="单行标题"
      t-class="t-class-cell"
    >
      <template #note>
        <t-badge
          count="NEW"
          :offset="skylineRender ? ['-18rpx', '-32rpx'] : [0, 0]"
          shape="ribbon-left"
        />
      </template>
    </t-cell>
    <t-cell
      title="单行标题"
      :bordered="false"
      t-class="t-class-cell"
    >
      <template #note>
        <t-badge
          count="NEW"
          :offset="skylineRender ? ['-18rpx', '-32rpx'] : [0, 0]"
          shape="ribbon"
        />
      </template>
    </t-cell>

    <view
      class="demo-desc"
      style="margin-bottom: 32rpx"
    >
      三角角标
    </view>
    <t-cell
      title="单行标题"
      t-class="t-class-cell"
    >
      <template #note>
        <t-badge
          count="NEW"
          :offset="skylineRender ? ['-24rpx', '-32rpx'] : [0, 0]"
          shape="triangle-left"
        />
      </template>
    </t-cell>
    <t-cell
      title="单行标题"
      :bordered="false"
      t-class="t-class-cell"
    >
      <template #note>
        <t-badge
          count="NEW"
          :offset="skylineRender ? ['-24rpx', '-32rpx'] : [0, 0]"
          shape="triangle-right"
        />
      </template>
    </t-cell>
  </view>
</template>

<script>
import TBadge from '@tdesign/uniapp/badge/badge.vue';
import TCell from '@tdesign/uniapp/cell/cell.vue';
import TIcon from '@tdesign/uniapp/icon/icon.vue';
import TButton from '@tdesign/uniapp/button/button.vue';
import SkylineBehavior from '@tdesign/uniapp/mixins/skyline.js';

export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TBadge,
    TCell,
    TIcon,
    TButton,
  },
  mixins: [SkylineBehavior],
  data() {
    return {
    };
  },
  created() {},
  methods: {},
};
</script>
<style>
.demo-wrapper {
    display: flex;
    margin-left: 32rpx;
    margin-top: 28px;
    margin-bottom: 24px;
    align-items: center;
}

:deep(.t-class-cell) {
    overflow: hidden;
}
</style>
```


### 组件尺寸


```vue
<template>
  <view>
    <view class="demo-desc">
      Large
    </view>

    <view class="block">
      <t-avatar
        icon="user"
        size="large"
        :badge-props="{count: 8, size: 'large', offset: [7, 7]}"
      />
    </view>

    <view class="demo-desc">
      Medium
    </view>

    <view class="block">
      <t-avatar
        icon="user"
        :badge-props="{count: 8, offset: [5, 5]}"
      />
    </view>
  </view>
</template>

<script>
// import TBadge from '@tdesign/uniapp/badge/badge.vue';
import TAvatar from '@tdesign/uniapp/avatar/avatar.vue';
export default {
  components: {
    // TBadge,
    TAvatar,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style>
.block {
    padding: 32rpx 32rpx 48rpx;
}
</style>
```


## FAQ

### 如何处理由 ribbon 徽标溢出导致页面出现横向滚动？
角标溢出问题建议从父容器组件处理。如 <a href="https://github.com/Tencent/tdesign-miniprogram/issues/3063" title="如 #3063 " target="_blank" rel="noopener noreferrer"> #3063 </a>，可以给父容器 `cell` 组件添加 `overflow: hidden`，处理溢出造成页面出现横向滚动的问题。

## API

### Badge Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
custom-style | Object | - | 自定义样式 | N
color | String | - | 颜色 | N
content | String | - | 徽标内容，示例：`content='自定义内容'`。也可以使用默认插槽定义 | N
count | String / Number | 0 | 徽标右上角内容。可以是数字，也可以是文字。如：'new'/3/99+。特殊：值为空表示使用插槽渲染 | N
dot | Boolean | false | 是否为红点 | N
max-count | Number | 99 | 封顶的数字值 | N
offset | Array | - | 设置状态点的位置偏移，示例：[-10, 20] 或 ['10em', '8rem']。TS 类型：`Array<string \| number>` | N
shape | String | circle | 徽标形状，其中 ribbon 和 ribbon-right 等效。可选项：circle/square/bubble/ribbon/ribbon-right/ribbon-left/triangle-right/triangle-left | N
show-zero | Boolean | false | 当数值为 0 时，是否展示徽标 | N
size | String | medium | 尺寸。可选项：medium/large | N

### Badge Slots

名称 | 描述
-- | --
\- | 默认插槽，自定义内容区域内容
count | 徽标右上角内容

### Badge External Classes

类名 | 描述
-- | --
t-class | 根节点样式类
t-class-content | 内容样式类
t-class-count | 计数样式类

### CSS Variables

组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-badge-basic-height | 32rpx | -
--td-badge-basic-padding | 8rpx | -
--td-badge-basic-width | 32rpx | -
--td-badge-bg-color | @error-color | -
--td-badge-border-radius | 4rpx | -
--td-badge-bubble-border-radius | 20rpx 20rpx 20rpx 1px | -
--td-badge-content-text-color | @text-color-primary | -
--td-badge-dot-size | 16rpx | -
--td-badge-font | @font-mark-extraSmall | -
--td-badge-large-font | @font-mark-small | -
--td-badge-large-height | 40rpx | -
--td-badge-large-padding | 10rpx | -
--td-badge-text-color | @text-color-anti | -
--td-line-height-mark-extraSmall | 32rpx | -
--td-line-height-mark-small | 40rpx | -
