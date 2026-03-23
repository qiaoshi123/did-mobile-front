---
name: "navbar"
description: "用于不同页面之间切换或者跳转，位于内容区的上方，系统状态栏的下方。"
url: "https://tdesign.tencent.com/uniapp/components/navbar"
---



## 引入

可在 `main.ts` 或在需要使用的页面或组件中引入。

```js
import TNavbar from '@tdesign/uniapp/navbar/navbar.vue';
```


### 基础导航栏


```vue
<template>
  <view>
    <view class="block">
      <t-navbar
        title="标题文字"
        t-class-title="nav-title"
        :fixed="false"
      />
    </view>

    <view class="block">
      <t-navbar
        class="block"
        title="标题文字"
        left-arrow
        :fixed="false"
        @go-back="handleBack"
      />
    </view>
  </view>
</template>

<script>
import TNavbar from '@tdesign/uniapp/navbar/navbar.vue';
export default {
  components: {
    TNavbar,
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    handleBack() {
      console.log('go back');
    },
  },
};
</script>
<style scoped>
</style>
```


### 胶囊样式导航栏


```vue
<template>
  <view>
    <t-navbar
      title="标题文字"
      :fixed="false"
    >
      <template
        #capsule
      >
        <view
          class="custom-capsule"
        >
          <t-icon
            size="40rpx"
            aria-role="button"
            aria-label="返回"
            name="chevron-left"
            :t-class="getIconTClass('back')"
            :class="getIconClass('back')"
            @click="onBack"
          />
          <t-icon
            size="40rpx"
            aria-role="button"
            aria-label="首页"
            name="home"
            :t-class="getIconTClass('home')"
            :class="getIconClass('home')"
            @click="onGoHome"
          />
        </view>
      </template>
    </t-navbar>
  </view>
</template>

<script>
import TNavbar from '@tdesign/uniapp/navbar/navbar.vue';
import TIcon from '@tdesign/uniapp/icon/icon.vue';
import { canUseVirtualHost } from '@tdesign/uniapp/common/version';


export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TNavbar,
    TIcon,
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    onBack() {
      uni.navigateBack();
    },
    onGoHome() {
      uni.reLaunch({
        url: '/pages/home/home',
      });
    },
    getIconTClass(name) {
      return canUseVirtualHost() ? this.getIconRealClass(name) : '';
    },
    getIconClass(name) {
      return !canUseVirtualHost() ? this.getIconRealClass(name) : '';
    },
    getIconRealClass(name) {
      return `custom-capsule__icon ${name}`;
    },
  },
};
</script>
<style scoped>
.custom-capsule {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

:deep(.custom-capsule__icon) {
    flex: 1;
    position: relative;
}

:deep(.custom-capsule__icon.home:before) {
    content: '';
    display: block;
    position: absolute;
    left: -1px;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 18px;
    background: #e7e7e7;
}
</style>
```


### 带搜索导航栏


```vue
<template>
  <view>
    <t-navbar
      left-icon="slot"
      :fixed="false"
    >
      <template
        #left
      >
        <view
          class="search-box"
        >
          <t-search
            shape="round"
            placeholder="搜索内容"
          />
        </view>
      </template>
    </t-navbar>
  </view>
</template>

<script>
import TNavbar from '@tdesign/uniapp/navbar/navbar.vue';
import TSearch from '@tdesign/uniapp/search/search.vue';
export default {
  components: {
    TNavbar,
    TSearch,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style scoped>
.search-box {
    --td-search-height: 32px;
    width: 252px;
}

page {
    --td-search-font-size: 18px;
}
</style>
```


### 带图片导航栏


```vue
<template>
  <view>
    <t-navbar
      :fixed="false"
    >
      <template #left>
        <view>
          <t-image
            t-class="custom-image"
            :src="theme === 'dark' ? 'https://tdesign.gtimg.com/mobile/demos/image-dark.png' : 'https://tdesign.gtimg.com/mobile/demos/logo-light.png'"
            aria-label="导航栏图片"
            custom-style="width: 87px;height: 24px;"
          />
        </view>
      </template>
    </t-navbar>
  </view>
</template>

<script>
import TNavbar from '@tdesign/uniapp/navbar/navbar.vue';
import TImage from '@tdesign/uniapp/image/image.vue';
import { themeMixin } from '@tdesign/uniapp/mixins/theme-change';

export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TNavbar,
    TImage,
  },
  mixins: [themeMixin],
  data() {
    return {};
  },
  computed: {
  },
};
</script>
<style scoped>
/* :deep(.custom-image) {
    height: 24px;
    width: 87px;
} */
</style>
```


### 组件样式


```vue
<template>
  <view>
    <view class="block">
      <t-navbar
        left-arrow
        title="标题居中"
        :fixed="false"
      />
    </view>

    <t-navbar
      left-arrow
      :fixed="false"
    >
      <template
        #left
      >
        <view
          class="custom-title"
        >
          标题左对齐
        </view>
      </template>
    </t-navbar>

    <view class="demo-desc">
      标题尺寸
    </view>

    <t-navbar
      left-arrow
      :fixed="false"
    >
      <template
        #left
      >
        <text
          class="left-text"
          @click="onBack"
        >
          返回
        </text>
      </template>
    </t-navbar>
    <view class="header-title">
      大标题尺寸
    </view>
  </view>
</template>

<script>
import TNavbar from '@tdesign/uniapp/navbar/navbar.vue';
export default {
  components: {
    TNavbar,
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    onBack() {
      uni.navigateBack();
    },
  },
};
</script>
<style scoped>
.custom-title {
    margin-left: 8px;
    font-size: 18px;
    font-weight: 600;
}

.block {
    display: block;
    margin-bottom: 48rpx;
}

.demo-desc {
    margin-top: 48rpx;
    margin-bottom: 32rpx;
}

.left-text {
    display: block;
    margin-left: 4px;
    font-size: 16px;
}

.header-title {
    font-size: 28px;
    line-height: 36px;
    padding: 8rpx 32rpx 16rpx;
    background-color: var(--td-bg-color-container);
    font-weight: 600;
    color: var(--td-text-color-primary);
}
</style>
```


### 自定义颜色


```vue
<template>
  <view>
    <t-navbar
      t-class="custom-navbar"
      left-arrow
      title="标题文字"
      :fixed="false"
      @right-click="handleRightClick"
    >
      <template #right>
        <div>右侧内容</div>
      </template>
    </t-navbar>
  </view>
</template>

<script>
import TNavbar from '@tdesign/uniapp/navbar/navbar.vue';


export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TNavbar,
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    handleRightClick() {
      console.log('right click');
    },
  },
};
</script>
<style>
.custom-navbar {
    --td-navbar-color: #fff;
    --td-navbar-bg-color: #0052d9;
}
</style>
```


### FAQ

#### 高度说明

`navbar` 组件可由 `--td-navbar-height` 控制。在 H5 或 APP-PLUS 平台下，`--td-navbar-height` 变量需要业务自己设置，小程序平台则会根据 `statusBarHeight` 等变量计算得到。

## API

### Navbar Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
custom-style | Object | - | 自定义样式 | N
animation | Boolean | true | 是否添加动画效果 | N
background | String | - | 已废弃。背景 | N
delta | Number | 1 | 后退按钮后退层数，含义参考 [wx.navigateBack](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateBack.html)，特殊的，传入 0 不会发生执行 wx.navigateBack | N
fixed | Boolean | true | 是否固定在顶部 | N
home-icon | String | - | 已废弃。首页图标地址。值为 '' 或者 undefined 则表示不显示返回图标，值为 'circle' 表示显示默认图标，值为 'slot' 表示使用插槽渲染，值为其他则表示图标地址 | N
left-arrow | Boolean | false | 是否展示左侧箭头 | N
left-icon | String | - | 已废弃。左侧图标地址，值为 '' 或者 undefined 则表示不显示返回图标，值为 'arrow-left' 表示显示返回图标，值为 'slot' 表示使用插槽渲染，值为其他则表示图标地址 | N
placeholder | Boolean | false | 固定在顶部时是否开启占位 | N
safe-area-inset-top | Boolean | true | 是否开启顶部安全区适配 | N
title | String | - | 页面标题 | N
title-max-length | Number | - | 标题文字最大长度，超出的范围使用 `...` 表示 | N
visible | Boolean | true | 是否显示 | N
z-index | Number | 1 | 导航栏栏层级 | N

### Navbar Events

名称 | 参数 | 描述
-- | -- | --
complete | \- | navigateBack 执行完成后触发（失败或成功均会触发）
fail | \- | navigateBack 执行失败后触发
go-back | \- | 点击左侧箭头时触发
go-home | \- | 已废弃。点击 Home 触发
right-click | \- | 点击右侧图标时触发
success | \- | navigateBack 执行成功后触发

### Navbar Slots

名称 | 描述
-- | --
capsule | 左侧胶囊区域
left | 左侧内容区域
right | 右侧内容区域
title | 自定义 `title` 显示内容

### Navbar External Classes

类名 | 描述
-- | --
t-class | 根节点样式类
t-class-capsule | 左侧胶囊区域样式类
t-class-center | 中间内容样式类
t-class-home-icon | 首页图标样式类
t-class-left | 左侧内容样式类
t-class-left-icon | 左侧图标样式类
t-class-nav-btn | 导航按钮样式类
t-class-title | 标题样式类

### CSS Variables

组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-navbar-padding-top | 20px | -
--td-navbar-right | 95px | -
--td-navbar-background | @navbar-bg-color | -
--td-navbar-bg-color | @bg-color-container | -
--td-navbar-capsule-border-color | @border-level-1-color | -
--td-navbar-capsule-border-radius | 16px | -
--td-navbar-capsule-height | 32px | -
--td-navbar-capsule-width | 88px | -
--td-navbar-center-left | @navbar-right | -
--td-navbar-center-width | 187px | -
--td-navbar-color | @text-color-primary | -
--td-navbar-height | 48px | -
--td-navbar-left-arrow-size | 24px | -
--td-navbar-left-max-width | --td-navbar-left-max-width | -
--td-navbar-title-font | @font-title-large | -
