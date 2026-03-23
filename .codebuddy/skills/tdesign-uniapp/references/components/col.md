---
name: "layout"
description: "以规则的网格阵列来指导和规范页面中的版面布局以及信息分布，提高界面内布局的一致性，节约成本。"
url: "https://tdesign.tencent.com/uniapp/components/col"
---



## 引入

可在 `main.ts` 或在需要使用的页面或组件中引入。


```js
import TRow from '@tdesign/uniapp/row/row.vue';
import TCol from '@tdesign/uniapp/col/col.vue';
```

### 组件类型

基础


```vue
<template>
  <view>
    <t-row>
      <t-col
        span="8"
        t-class="dark"
      >
        col-8
      </t-col>
      <t-col
        span="8"
        t-class="light"
      >
        col-8
      </t-col>
      <t-col
        span="8"
        t-class="dark"
      >
        col-8
      </t-col>
    </t-row>

    <t-row>
      <t-col
        span="4"
        t-class="dark"
      >
        col-4
      </t-col>
      <t-col
        span="16"
        offset="4"
        t-class="light"
      >
        col-16 col-offset-4
      </t-col>
    </t-row>

    <t-row>
      <t-col
        offset="12"
        span="12"
        t-class="dark"
      >
        col-12 col-offset-12
      </t-col>
    </t-row>
  </view>
</template>

<script>
import TCol from '@tdesign/uniapp/col/col.vue';
import TRow from '@tdesign/uniapp/row/row.vue';
export default {
  components: {
    TCol,
    TRow,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style scoped>
.dark {
    background-color: #0052d9;
}
.light {
    background-color: #366ef4;
}
.dark,
.light {
    background-clip: content-box;
    color: #fff;
    font-size: 28rpx;
    line-height: 96rpx;
    margin-bottom: 32rpx;
    text-align: center;
}
</style>
```



增加间距


```vue
<template>
  <view>
    <t-row gutter="16">
      <t-col span="8">
        <view class="dark">
          col-8
        </view>
      </t-col>
      <t-col span="8">
        <view class="dark">
          col-8
        </view>
      </t-col>
      <t-col span="8">
        <view class="dark">
          col-8
        </view>
      </t-col>
    </t-row>
  </view>
</template>

<script>
import TCol from '@tdesign/uniapp/col/col.vue';
import TRow from '@tdesign/uniapp/row/row.vue';
export default {
  components: {
    TCol,
    TRow,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style scoped>
.dark {
    background-color: #0052d9;
}

.light {
    background-color: #366ef4;
}

.dark,
.light {
    color: #fff;
    font-size: 28rpx;
    line-height: 96rpx;
    margin-bottom: 32rpx;
    text-align: center;
}
</style>
```




## API

### Col Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
custom-style | Object | - | 自定义样式 | N
offset | String / Number | - | 列的偏移量（默认单位px） | N
span | String / Number | - | 列的宽度（默认单位px） | N

### Col Slots

名称 | 描述
-- | --
\- | 默认插槽，列内容


### Row Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
custom-style | Object | - | 自定义样式 | N
gutter | String / Number | - | 列之间的间距（默认单位px） | N

### Row Slots

名称 | 描述
-- | --
\- | 默认插槽，行内容
