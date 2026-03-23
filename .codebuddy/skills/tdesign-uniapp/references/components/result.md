---
name: "result"
description: "反馈结果状态。"
url: "https://tdesign.tencent.com/uniapp/components/result"
---




## 引入

可在 `main.ts` 或在需要使用的页面或组件中引入。

```js
import TResult from '@tdesign/uniapp/result/result.vue';
```

### 组件类型

基础结果


```vue
<template>
  <view>
    <view
      v-for="(item, index) in resultList"
      :key="index"
    >
      <view class="demo-section__content">
        <t-result
          :theme="item.theme"
          :title="item.title"
        />
      </view>
    </view>
  </view>
</template>

<script>
import TResult from '@tdesign/uniapp/result/result.vue';
export default {
  components: {
    TResult,
  },
  data() {
    return {
      resultList: [
        {
          title: '成功状态',
          theme: 'success',
        },
        {
          title: '失败状态',
          theme: 'error',
        },
        {
          title: '警示状态',
          theme: 'warning',
        },
        {
          title: '默认状态',
          theme: 'default',
        },
      ],
    };
  },
  created() {},
  methods: {},
};
</script>
<style>
.demo-section__content {
    margin-bottom: 96rpx;
}
</style>
```


带描述的结果


```vue
<template>
  <view>
    <view
      v-for="(item, index) in resultList"
      :key="index"
    >
      <view class="demo-section__content">
        <t-result
          :theme="item.theme"
          :title="item.title"
          :description="item.description"
        />
      </view>
    </view>
  </view>
</template>

<script>
import TResult from '@tdesign/uniapp/result/result.vue';
export default {
  components: {
    TResult,
  },
  data() {
    return {
      resultList: [
        {
          title: '成功状态',
          theme: 'success',
          description: '描述文字',
        },
        {
          title: '失败状态',
          theme: 'error',
          description: '描述文字',
        },
        {
          title: '警示状态',
          theme: 'warning',
          description: '描述文字',
        },
        {
          title: '默认状态',
          theme: 'default',
          description: '描述文字',
        },
      ],
    };
  },
  created() {},
  methods: {},
};
</script>
<style>
.demo-section__content {
    margin-bottom: 96rpx;
}
</style>
```


自定义结果


```vue
<template>
  <view>
    <t-result
      t-class-image="external-class-image"
      image="https://tdesign.gtimg.com/mobile/demos/result1.png"
    >
      <template #title>
        <view>
          自定义结果
        </view>
      </template>
      <template #description>
        <view>
          描述文字
        </view>
      </template>
    </t-result>
  </view>
</template>

<script>
import TResult from '@tdesign/uniapp/result/result.vue';
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TResult,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style>
:deep(.external-class-image) {
    width: 100px;
    height: 80px;
}
</style>
```


## 常见问题

<details>
  <summary>
    本地图片无法正确引用?
    <span class="icon">👇</span>
  </summary>
  <p style="margin-top: 10px; color: rgba(0, 0, 0, .6)">
    建议使用绝对路径，而不是相对路径。绝对路径以 app.json 所在位置为基准。
  </p>
</details>

## API

### Result Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
custom-style | Object | - | 自定义样式 | N
description | String | - | 描述文字 | N
icon | String / Boolean / Object | true | 图标名称。值为字符串表示图标名称，值为 `false` 表示不显示图标，值为 `Object` 类型，表示透传至 `icon`，不传表示使用主题图标 | N
image | String | - | 图片地址 | N
theme | String | default | 内置主题。可选项：default/success/warning/error | N
title | String | '' | 标题 | N

### Result Slots

名称 | 描述
-- | --
description | 自定义 `description` 显示内容
image | 自定义 `image` 显示内容
title | 自定义 `title` 显示内容

### Result External Classes

类名 | 描述
-- | --
t-class | 根节点样式类
t-class-description | 描述样式类
t-class-image | 图片样式类
t-class-title | 标题样式类

### CSS Variables

组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-result-description-color | @text-color-secondary | -
--td-result-description-font | @font-body-medium | -
--td-result-description-margin-top | @spacer | -
--td-result-icon-default-color | @brand-color | -
--td-result-icon-error-color | @error-color | -
--td-result-icon-success-color | @success-color | -
--td-result-icon-warning-color | @warning-color | -
--td-result-title-color | @text-color-primary | -
--td-result-title-font | @font-title-extraLarge | -
--td-result-title-margin-top | @spacer-1 | -
