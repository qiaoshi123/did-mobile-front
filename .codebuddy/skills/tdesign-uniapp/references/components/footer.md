---
name: "footer"
description: "用于基础列表展示，可附带文字、品牌 logo、操作，常用商详、个人中心、设置等页面。"
url: "https://tdesign.tencent.com/uniapp/components/footer"
---



## 引入

可在 `main.ts` 或在需要使用的页面或组件中引入。

```js
import TFooter from '@tdesign/uniapp/footer/footer.vue';
```

### 类型

基础页脚


```vue
<template>
  <view>
    <!-- 基础页脚 只有版权信息 -->
    <t-footer :text="text" />
  </view>
</template>

<script>
import TFooter from '@tdesign/uniapp/footer/footer.vue';
export default {
  components: {
    TFooter,
  },
  data() {
    return {
      text: 'Copyright © 2021-2031 TD.All Rights Reserved.',
    };
  },
  created() {},
  methods: {},
};
</script>
<style>
</style>
```


基础加链接页脚


```vue
<template>
  <view>
    <!-- theme 为 text，含有底部链接 -->
    <view class="footer-example">
      <t-footer
        :text="text"
        :links="links[0]"
      />
    </view>

    <view class="footer-example">
      <t-footer
        :text="text"
        :links="links[1]"
      />
    </view>
  </view>
</template>

<script>
import TFooter from '@tdesign/uniapp/footer/footer.vue';
export default {
  components: {
    TFooter,
  },
  data() {
    return {
      text: 'Copyright © 2021-2031 TD.All Rights Reserved.',
      links: [[{
        name: '底部链接',
        url: '/pages/home/home',
        openType: 'navigate',
      }], [{
        name: '底部链接',
        url: '/pages/home/home',
        openType: 'navigate',
      }, {
        name: '底部链接',
        url: '',
        openType: 'navigateBack',
      }]],
    };
  },
  created() {},
  methods: {},
};
</script>
<style>
.footer-example {
  padding: 8rpx 0;
}

.footer-example:not(:last-child) {
  margin-bottom: 32rpx;
}

</style>
```


品牌页脚


```vue
<template>
  <view>
    <!-- theme 为 logo -->
    <view class="footer-example">
      <t-footer :logo="logo" />
    </view>

    <view class="footer-example">
      <t-footer
        :logo="{url:
          theme === 'dark'
            ? 'https://tdesign.gtimg.com/mobile/demos/footer-logo-dark.png'
            : 'https://tdesign.gtimg.com/mobile/demos/logo1.png'
        } "
      />
    </view>
  </view>
</template>

<script>
import TFooter from '@tdesign/uniapp/footer/footer.vue';
import { themeMixin } from '@tdesign/uniapp/mixins/theme-change';

const logo = {
  icon: 'https://tdesign.gtimg.com/mobile/demos/logo2.png',
  title: '品牌名称',
};


export default {
  components: {
    TFooter,
  },
  mixins: [
    themeMixin,
  ],
  data() {
    return {
      logo,
    };
  },
};

</script>
<style>
.footer-example {
    padding: 8rpx 0;
}

.footer-example:not(:last-child) {
    margin-bottom: 32rpx;
}
</style>
```


## API

### Footer Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
custom-style | Object | - | 自定义样式 | N
copyright | String | '' | 已废弃。版权信息，type 为`text`生效 | N
links | Array | [] | 链接列表。name 表示链接名称， url 表示链接 page 路径，目前只支持小程序内部跳转，openType 表示跳转方式。TS 类型：`Array<LinkObj>` `interface LinkObj { name: string; url?: string; openType?: 'navigate' \| 'redirect' \| 'relaunch' \| 'switchTab' \| 'navigateBack' }`。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/footer/type.ts) | N
logo | Object | - | 图标配置。`logo.icon` 表示图标链接地址，`logo.title` 表示标题文本，`logo.url` 表示链接。TS 类型：`FooterLogo` `interface FooterLogo { icon: string; title?: string; url?: string }`。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/footer/type.ts) | N
text | String | '' | 版权信息 | N
text-link-list | Array | [] | 已废弃。链接列表，type 为`text`生效。name 表示链接名称， url 表示链接 page 路径，目前只支持小程序内部跳转，openType 表示跳转方式。TS 类型：`Array<LinkObj>` `interface LinkObj { name: string; url?: string; openType?: 'navigate' \| 'redirect' \| 'relaunch' \| 'switchTab' \| 'navigateBack' }`。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/footer/type.ts) | N
theme | String | 'text' | 已废弃。页脚展示类型。可选项：text/logo | N

### CSS Variables

组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-footer-link-color | @brand-color | -
--td-footer-link-dividing-line-color | @text-color-placeholder | -
--td-footer-link-dividing-line-padding | @spacer-1 | -
--td-footer-link-font | @font-body-medium | -
--td-footer-logo-icon-height | 48rpx | -
--td-footer-logo-icon-margin-right | @spacer | -
--td-footer-logo-icon-width | 48rpx | -
--td-footer-logo-title-font | @font-title-medium | -
--td-footer-logo-title-url-width | 256rpx | -
--td-footer-text-color | @text-color-placeholder | -
--td-footer-text-font | @font-body-small | -
--td-footer-text-margin-top | 8rpx | -
