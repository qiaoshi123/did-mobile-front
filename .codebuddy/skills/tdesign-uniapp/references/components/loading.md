---
name: "loading"
description: "用于表示页面或操作的加载状态，给予用户反馈的同时减缓等待的焦虑感，由一个或一组反馈动效组成。"
url: "https://tdesign.tencent.com/uniapp/components/loading"
---



## 引入

可在 `main.ts` 或在需要使用的页面或组件中引入。


```js
import TLoading from '@tdesign/uniapp/loading/loading.vue';
```

### 纯icon


```vue
<template>
  <view class="loading-container-flex">
    <t-loading
      v-if="!skylineRender"
      theme="circular"
      size="40rpx"
      t-class="wrapper"
    />
    <t-loading
      theme="spinner"
      size="40rpx"
      t-class="wrapper"
    />
    <t-loading
      theme="dots"
      size="80rpx"
      t-class="wrapper"
    />
    <t-loading
      theme="custom"
      t-class="wrapper"
    >
      <template
        #indicator
      >
        <t-image
          custom-style="width: 100%; height: 100%"
          src="https://tdesign.gtimg.com/mobile/demos/logo2.png"
        />
      </template>
    </t-loading>
  </view>
</template>

<script>
import TLoading from '@tdesign/uniapp/loading/loading.vue';
import TImage from '@tdesign/uniapp/image/image.vue';
import SkylineBehavior from '@tdesign/uniapp/mixins/skyline.js';
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TLoading,
    TImage,
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
.loading-container-flex {
    display: flex;
    align-items: center;
}

:deep(.wrapper) {
    margin-right: 40px;
}
</style>
```


### icon加文字横向


```vue
<template>
  <view class="loading-container-flex">
    <t-loading
      v-if="!skylineRender"
      theme="circular"
      size="40rpx"
      text="加载中..."
      t-class="wrapper"
    />
    <t-loading
      theme="spinner"
      size="40rpx"
      text="加载中..."
      inherit-color
      t-class="wrapper"
    />
  </view>
</template>

<script>
import TLoading from '@tdesign/uniapp/loading/loading.vue';
import SkylineBehavior from '@tdesign/uniapp/mixins/skyline.js';
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TLoading,
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
.loading-container-flex {
    display: flex;
    align-items: center;
    color: #000;
}

.wrapper {
    display: flex;
    margin-right: 64px;
}
</style>
```


### icon加文字竖向


```vue
<template>
  <view>
    <div class="box">
      <t-loading
        :theme="skylineRender ? 'spinner' : 'circular'"
        size="40rpx"
        text="加载中"
        layout="vertical"
        t-class="wrapper"
      />
      <t-loading
        theme="spinner"
        size="40rpx"
        text="加载中"
        layout="vertical"
        t-class="wrapper"
      />
    </div>
  </view>
</template>

<script>
import TLoading from '@tdesign/uniapp/loading/loading.vue';
import SkylineBehavior from '@tdesign/uniapp/mixins/skyline.js';
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TLoading,
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
.box {
    display: flex;
}

.wrapper {
    margin-right: 64px;
}
</style>
```


### 纯文字


```vue
<template>
  <view>
    <t-loading
      :indicator="false"
      text="加载中..."
    />
  </view>
</template>

<script>
import TLoading from '@tdesign/uniapp/loading/loading.vue';
export default {
  components: {
    TLoading,
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


### 加载失败

{{ error }}

### 状态

{{ status }}

### 加载速度


```vue
<template>
  <view>
    <t-loading
      :theme="skylineRender ? 'spinner' : 'circular'"
      size="52rpx"
      text="加载中..."
      t-class-text="text-l"
      :duration="2000 - duration"
    />
    <view class="slider-container">
      <t-slider
        t-class="slider-class"
        style="flex-grow: 1;"
        :value="duration"
        :min="100"
        :max="1500"
        label
        @change="durationChange"
      />
    </view>
  </view>
</template>

<script>
import TLoading from '@tdesign/uniapp/loading/loading.vue';
import TSlider from '@tdesign/uniapp/slider/slider.vue';
import SkylineBehavior from '@tdesign/uniapp/mixins/skyline.js';


export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TLoading,
    TSlider,
  },
  mixins: [SkylineBehavior],
  data() {
    return {
      duration: 800,
    };
  },
  created() {},
  methods: {
    durationChange(e) {
      this.duration = e.value;
    },
  },
};
</script>
<style>
.slider-container {
    display: flex;
    align-items: center;
    width: 718rpx;
}

:deep(.slider-class) {
    flex-grow: 1;
}
</style>
```


### 规格


```vue
<template>
  <view class="loading-size-demo">
    <t-loading
      :theme="skylineRender ? 'spinner' : 'circular'"
      size="64rpx"
      text="加载中..."
      t-class="large"
    />

    <view class="demo-desc">
      中尺寸
    </view>

    <t-loading
      :theme="skylineRender ? 'spinner' : 'circular'"
      size="56rpx"
      text="加载中..."
      t-class="medium"
    />

    <view class="demo-desc">
      小尺寸
    </view>

    <t-loading
      :theme="skylineRender ? 'spinner' : 'circular'"
      size="48rpx"
      text="加载中..."
    />
  </view>
</template>

<script>
import TLoading from '@tdesign/uniapp/loading/loading.vue';
import SkylineBehavior from '@tdesign/uniapp/mixins/skyline.js';
export default {
  components: {
    TLoading,
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
.large {
  --td-loading-text-font: var(--td-font-body-large);
}

.medium {
  --td-loading-text-font: var(--td-font-body-medium);
}

.loading-size-demo .demo-desc {
    margin: 48rpx 0 32rpx;
}
</style>
```


## API

### Loading Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
custom-style | Object | - | 自定义样式 | N
delay | Number | 0 | 延迟显示加载效果的时间，用于防止请求速度过快引起的加载闪烁，单位：毫秒 | N
duration | Number | 800 | 加载动画执行完成一次的时间，单位：毫秒 | N
fullscreen | Boolean | false | 是否显示为全屏加载 | N
indicator | Boolean | true | 加载指示符，值为 true 显示默认指示符，值为 false 则不显示，也可以自定义指示符 | N
inherit-color | Boolean | false | 是否继承父元素颜色 | N
layout | String | horizontal | 对齐方式。可选项：horizontal/vertical | N
loading | Boolean | true | 是否处于加载状态 | N
pause | Boolean | false | 是否暂停动画 | N
progress | Number | - | 加载进度 | N
reverse | Boolean | - | 加载动画是否反向 | N
size | String | '20px' | 尺寸，示例：20px | N
text | String | - | 加载提示文案 | N
theme | String | circular | 加载组件类型。可选项：circular/spinner/dots/custom | N

### Loading Slots

名称 | 描述
-- | --
\- | 默认插槽，作用同 `text` 插槽
indicator | 自定义 `indicator` 显示内容
text | 自定义 `text` 显示内容

### Loading External Classes

类名 | 描述
-- | --
t-class | 根节点样式类
t-class-indicator | 指示符样式类
t-class-text | 文本样式类

### CSS Variables

组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-loading-color | @brand-color | -
--td-loading-full-bg-color | rgba(255, 255, 255, 0.6) | -
--td-loading-text-color | @text-color-primary | -
--td-loading-text-font | @font-body-small | -
--td-loading-z-index | 3500 | -
