---
name: "empty"
description: "用于空状态时的占位提示。"
url: "https://tdesign.tencent.com/uniapp/components/empty"
---



## 引入

可在 `main.ts` 或在需要使用的页面或组件中引入。

```js
import TEmpty from '@tdesign/uniapp/empty/empty.vue';
```

### 类型

图标空状态


```vue
<template>
  <view>
    <t-empty
      icon="info-circle-filled"
      description="描述文字"
    />
  </view>
</template>

<script>
import TEmpty from '@tdesign/uniapp/empty/empty.vue';
export default {
  components: {
    TEmpty,
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


自定义图片空状态


```vue
<template>
  <view>
    <t-empty
      t-class="empty-cls"
      t-class-image="t-empty__image"
      :image="image"
      description="描述文字"
    />
  </view>
</template>

<script>
import TEmpty from '@tdesign/uniapp/empty/empty.vue';

export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TEmpty,
  },
  data() {
    return {
      image: 'https://tdesign.gtimg.com/mobile/demos/empty1.png',
    };
  },
  created() {},
  methods: {},
};
</script>
<style>
:deep(.t-empty__image) {
    width: 240rpx !important;
    height: 240rpx !important;
}
</style>
```


带操作空状态


```vue
<template>
  <view>
    <t-empty
      icon="info-circle-filled"
      description="描述文字"
    >
      <template
        #action
      >
        <t-button
          theme="primary"
          size="large"
        >
          操作按钮
        </t-button>
      </template>
    </t-empty>
  </view>
</template>

<script>
import TEmpty from '@tdesign/uniapp/empty/empty.vue';
import TButton from '@tdesign/uniapp/button/button.vue';


export default {
  components: {
    TEmpty,
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
</style>
```




## API

### Empty Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
custom-style | Object | - | 自定义样式 | N
description | String | - | 描述文字 | N
icon | String / Object | - | 图标名称。值为字符串表示图标名称，值为 `Object` 类型，表示透传至 `icon` | N
image | String | - | 图片地址 | N

### Empty Slots

名称 | 描述
-- | --
action | 操作按钮
description | 自定义 `description` 显示内容
image | 自定义 `image` 显示内容

### Empty External Classes

类名 | 描述
-- | --
t-class | 根节点样式类
t-class-description | 描述样式类
t-class-image | 图片样式类

### CSS Variables

组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-empty-action-margin-top | @spacer-4 | -
--td-empty-description-color | @text-color-placeholder | -
--td-empty-description-font | @font-body-medium | -
--td-empty-description-margin-top | @spacer-2 | -
--td-empty-icon-color | @text-color-placeholder | -
