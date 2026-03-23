---
name: "slider"
description: "用于选择横轴上的数值、区间、档位。"
url: "https://tdesign.tencent.com/uniapp/components/slider"
---



## 引入

可在 `main.ts` 或在需要使用的页面或组件中引入。

```js
import TSlider from '@tdesign/uniapp/slider/slider.vue';
```

### 组件类型

单游标滑块


```vue
<template>
  <view class="wrapper">
    <t-slider
      :default-value="23"
      :step="0.1"
      @change="handleChange"
    />
  </view>
</template>

<script>
import TSlider from '@tdesign/uniapp/slider/slider.vue';
export default {
  components: {
    TSlider,
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    handleChange(e) {
      console.log(e.value);
    },
  },
};
</script>
<style>
.wrapper {
    background: var(--bg-color-demo);
    padding: 0 12rpx;
}
</style>
```


双游标滑块


```vue
<template>
  <view class="wrapper">
    <t-slider
      range
      :default-value="[35, 65]"
      @dragstart="onDragstart"
      @dragend="onDragend"
    />
  </view>
</template>

<script>
import TSlider from '@tdesign/uniapp/slider/slider.vue';
export default {
  components: {
    TSlider,
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    onDragstart(e) {
      console.log('dragstart', e);
    },
    onDragend(e) {
      console.log('dragend', e);
    },
  },
};
</script>
<style>
.wrapper {
    background: var(--bg-color-demo);
    padding: 0 12rpx;
}
</style>
```


带数值滑动选择器


```vue
<template>
  <view>
    <view class="wrapper">
      <t-slider
        :value="value"
        label="${value}"
        @change="handleChange"
      />
    </view>

    <view class="demo-desc">
      带数值双游标滑块
    </view>

    <view class="wrapper">
      <t-slider
        show-extreme-value
        label="${value}"
        :default-value="[40, 60]"
        range
      />
    </view>
  </view>
</template>

<script>
import TSlider from '@tdesign/uniapp/slider/slider.vue';
export default {
  components: {
    TSlider,
  },
  data() {
    return {
      value: 35,
    };
  },
  created() {},
  methods: {
    handleChange(e) {
      this.value = e.value;
    },
  },
};
</script>
<style>
.demo-desc {
    margin-top: 24rpx;
    margin-bottom: 16rpx;
}

.wrapper {
    background: var(--bg-color-demo);
    padding: 40rpx 12rpx 0;
}
</style>
```


带刻度滑动选择器


```vue
<template>
  <view>
    <view class="wrapper">
      <t-slider
        :default-value="60"
        :marks="marks"
        :step="20"
        @change="handleChange"
      />
    </view>

    <view class="demo-desc">
      带刻度双游标滑块
    </view>

    <view class="wrapper">
      <t-slider
        range
        :default-value="[20, 60]"
        :marks="marks"
        :step="20"
      />
    </view>
  </view>
</template>

<script>
import TSlider from '@tdesign/uniapp/slider/slider.vue';
export default {
  components: {
    TSlider,
  },
  data() {
    return {
      marks: {
        0: '0',
        20: '20',
        40: '40',
        60: '60',
        80: '80',
        100: '100',
      },
    };
  },
  created() {},
  methods: {
    handleChange(e) {
      console.log(e);
    },
  },
};
</script>
<style>
.demo-desc {
    margin-top: 24rpx;
    margin-bottom: 16rpx;
}

.wrapper {
    background: var(--bg-color-demo);
    padding: 40rpx 12rpx 0;
}
</style>
```


### 组件状态

滑块禁用状态


```vue
<template>
  <view>
    <t-slider
      :value="35"
      disabled
    />

    <view class="wrapper">
      <t-slider
        show-extreme-value
        label="${value}"
        :value="[40, 60]"
        range
        disabled
      />
    </view>

    <view class="wrapper">
      <t-slider
        range
        :value="[20, 60]"
        :marks="marks"
        :step="20"
        disabled
      />
    </view>
  </view>
</template>

<script>
import TSlider from '@tdesign/uniapp/slider/slider.vue';
export default {
  components: {
    TSlider,
  },
  data() {
    return {
      marks: {
        0: '0',
        20: '20',
        40: '40',
        60: '60',
        80: '80',
        100: '100',
      },
    };
  },
  created() {},
  methods: {},
};
</script>
<style>
.wrapper {
    margin-top: 32rpx;
    background: var(--bg-color-demo);
    padding: 40rpx 12rpx 0;
}
</style>
```


#### 特殊样式

胶囊型滑块


```vue
<template>
  <view class="wrapper">
    <t-slider
      :default-value="30"
      theme="capsule"
    />

    <t-slider
      :default-value="[40, 60]"
      range
      theme="capsule"
    />

    <t-slider
      :default-value="[40, 60]"
      range
      label="${value}"
      theme="capsule"
    />

    <t-slider
      :default-value="60"
      :marks="marks"
      :step="20"
      theme="capsule"
    />

    <t-slider
      :default-value="[20, 80]"
      range
      :marks="marks"
      :step="20"
      theme="capsule"
    />
  </view>
</template>

<script>
import TSlider from '@tdesign/uniapp/slider/slider.vue';
export default {
  components: {
    TSlider,
  },
  data() {
    return {
      marks: {
        0: '0',
        20: '20',
        40: '40',
        60: '60',
        80: '80',
        100: '100',
      },
    };
  },
  created() {},
  methods: {},
};
</script>
<style>
.label {
    display: flex;
    align-items: center;
    width: 718rpx;
    padding-left: 32rpx;
}

.label-class {
    flex-grow: 1;
}

.wrapper {
    background: var(--bg-color-demo);
    padding: 0 12rpx;
}
</style>
```


#### 垂直状态

垂直方向的滑块


```vue
<template>
  <view>
    <view class="demo-desc">
      单游标垂直滑块
    </view>
    <view class="wrapper">
      <t-slider
        vertical
        :value="singlevalue"
        label="${singlevalue}"
        @change="handleSingleChange"
      />
    </view>
    <view class="demo-desc">
      带刻度的双游标垂直滑块
    </view>
    <view class="wrapper">
      <t-slider
        vertical
        range
        :default-value="[20, 60]"
        :marks="marks"
        :step="20"
      />
    </view>
    <view class="demo-desc">
      胶囊型垂直滑块
    </view>
    <view class="wrapper">
      <t-slider
        vertical
        :value="capsuleValue"
        label="${capsuleValue}"
        theme="capsule"
        @change="handleCapsuleChange"
      />
    </view>
    <view class="demo-desc">
      带刻度的胶囊型垂直滑块
    </view>
    <view class="wrapper">
      <t-slider
        vertical
        :default-value="[20, 80]"
        range
        :marks="marks"
        :step="20"
        theme="capsule"
      />
    </view>
  </view>
</template>

<script>
import TSlider from '@tdesign/uniapp/slider/slider.vue';
export default {
  components: {
    TSlider,
  },
  data() {
    return {
      singlevalue: 35,
      capsuleValue: 35,
      marks: {
        0: '0',
        20: '20',
        40: '40',
        60: '60',
        80: '80',
        100: '100',
      },
    };
  },
  created() {},
  methods: {
    handleSingleChange(e) {
      this.singlevalue = e.value;
    },
    handleCapsuleChange(e) {
      this.capsuleValue = e.value;
    },
  },
};
</script>
<style>
.demo-desc {
    margin-top: 24rpx;
    margin-bottom: 16rpx;
}

.wrapper {
    background: var(--bg-color-demo);
    padding-top: 40rpx;
}
</style>
```


## FAQ

当 slider 外层使用 `hidden` 包裹，需要在 `hidden = false` 时，重新调用组件的 `init` 方法，才能正常渲染（在t-popup/t-dialog中同理）。如下：

```html
<t-slider id="slider" />
```

```js
const $slider = this.selectComponent('#slider');

$slider.init();
```

## API

### Slider Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
custom-style | Object | - | 自定义样式 | N
colors | Array | [] | 已废弃。颜色，[已选择, 未选择]。TS 类型：`Array<string>` | N
disabled | Boolean | undefined | 是否禁用组件 | N
disabled-color | Array | [] | 已废弃。禁用状态滑动条的颜色，[已选, 未选]。TS 类型：`Array<string>` | N
label | String / Boolean / Function | false | 滑块当前值文本。<br />值为 true 显示默认文案；值为 false 不显示滑块当前值文本；<br />值为 `${value}%` 则表示组件会根据占位符渲染文案；<br />值类型为函数时，参数 `value` 标识滑块值，参数 `position=start` 表示范围滑块的起始值，参数 `position=end` 表示范围滑块的终点值。TS 类型：`string \| boolean` | N
marks | Object / Array | {} | 刻度标记，示例：`[0, 10, 40, 200]` 或者 `{ 5:  '5¥', 10: '10%' }`。TS 类型：`Record<number, string> \| Array<number>` | N
max | Number | 100 | 滑块范围最大值 | N
min | Number | 0 | 滑块范围最小值 | N
range | Boolean | false | 双游标滑块 | N
show-extreme-value | Boolean | false | 是否边界值 | N
step | Number | 1 | 步长 | N
theme | String | default | 滑块风格。可选项：default/capsule | N
value | Number / Array | 0 | 滑块值。支持语法糖 `v-model:value`。TS 类型：`SliderValue` `type SliderValue = number \| Array<number>`。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/slider/type.ts) | N
default-value | Number / Array | 0 | 滑块值。非受控属性。TS 类型：`SliderValue` `type SliderValue = number \| Array<number>`。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/slider/type.ts) | N
vertical | Boolean | false | 是否是垂直的滑块（渲染垂直滑块时，默认高度为400rpx，可通过修改`--td-slider-bar-height`来自定义高度） | N

### Slider Events

名称 | 参数 | 描述
-- | -- | --
change | `(context: { value: SliderValue })` | 滑块值变化时触发
dragend | `(context: { value: SliderValue, e: TouchEvent })` | 结束拖动时触发
dragstart | `(context: { e: TouchEvent })` | 开始拖动时触发

### Slider External Classes

类名 | 描述
-- | --
t-class | 根节点样式类
t-class-bar | 滑道底部样式类
t-class-bar-active | 滑道激活态样式类
t-class-bar-disabled | 滑道禁用态样式类
t-class-cursor | 游标样式类

### CSS Variables

组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-slider-active-color | @brand-color | -
--td-slider-bar-height | 8rpx | -
--td-slider-bar-width | 8rpx | -
--td-slider-capsule-bar-color | @bg-color-component | -
--td-slider-capsule-bar-heihgt | 48rpx | -
--td-slider-capsule-bar-width | 48rpx | -
--td-slider-capsule-line-heihgt | 36rpx | -
--td-slider-default-color | @bg-color-component | -
--td-slider-disabled-color | @brand-color-disabled | -
--td-slider-disabled-text-color | @text-color-disabled | -
--td-slider-dot-bg-color | #fff | -
--td-slider-dot-color | @component-border | -
--td-slider-dot-disabled-bg-color | #fff | -
--td-slider-dot-disabled-border-color | #f3f3f3 | -
--td-slider-dot-size | 40rpx | -
--td-slider-text-color | @text-color-primary | -
