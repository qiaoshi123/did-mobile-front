---
name: "image"
description: "用于展示效果，主要为上下左右居中裁切、拉伸、平铺等方式。"
url: "https://tdesign.tencent.com/uniapp/components/image"
---




## 引入

可在 `main.ts` 或在需要使用的页面或组件中引入。

```js
import TImage from '@tdesign/uniapp/image/image.vue';
```

### 裁切样式


```vue
<template>
  <view>
    <view class="tr">
      <view class="col">
        <view class="text">
          裁切
        </view>
        <t-image
          :src="imageSrc"
          mode="aspectFill"
          width="72"
          height="72"
          aria-label="一个放置在墙角的黄色行李箱"
        />
      </view>
      <view class="col">
        <view class="text">
          适应高
        </view>
        <t-image
          :src="imageSrc"
          mode="heightFix"
          width="72"
          height="72"
          aria-label="一个放置在墙角的黄色行李箱"
        />
      </view>
      <view class="col">
        <view class="text">
          拉伸
        </view>
        <t-image
          :src="imageSrc"
          width="72"
          height="72"
          aria-label="一个放置在墙角的黄色行李箱"
        />
      </view>
    </view>

    <view class="tr">
      <view class="col">
        <view class="text">
          方形
        </view>
        <t-image
          :src="imageSrc"
          mode="aspectFill"
          width="72"
          height="72"
          aria-label="一个放置在墙角的黄色行李箱"
        />
      </view>
      <view class="col">
        <view class="text">
          圆角方形
        </view>
        <t-image
          :src="imageSrc"
          width="72"
          height="72"
          shape="round"
          aria-label="一个放置在墙角的黄色行李箱"
        />
      </view>
      <view class="col">
        <view class="text">
          圆形
        </view>
        <t-image
          :src="imageSrc"
          width="72"
          height="72"
          shape="circle"
          aria-label="一个放置在墙角的黄色行李箱"
        />
      </view>
    </view>
  </view>
</template>

<script>
import TImage from '@tdesign/uniapp/image/image.vue';
export default {
  components: {
    TImage,
  },
  data() {
    return {
      imageSrc: 'https://tdesign.gtimg.com/mobile/demos/image1.jpeg',
    };
  },
  created() {},
  methods: {},
};
</script>
<style>
.tr {
    display: flex;
}

.col {
    margin: 0 32rpx;
    flex: 1;
}

.tr + .tr {
    margin-top: 48rpx;
}

.text {
    font-size: 28rpx;
    color: var(--td-text-color-secondary);
    line-height: 44rpx;
    margin-bottom: 32rpx;
}
</style>
```


### 加载状态


```vue
<template>
  <view>
    <view class="tr">
      <view class="col">
        <view class="text">
          加载默认提示
        </view>
        <t-image
          ref="loading-img"
          shape="round"
          width="72"
          height="72"
        />
      </view>
      <view class="col">
        <view class="text">
          加载自定义提示
        </view>
        <t-image
          ref="loading-img-custom"
          shape="round"
          loading="slot"
          width="72"
          height="72"
        >
          <template #loading>
            <t-loading
              theme="spinner"
              size="40rpx"
              loading
            />
          </template>
        </t-image>
      </view>
    </view>

    <view class="tr">
      <view class="col">
        <view class="text">
          失败默认提示
        </view>
        <t-image
          id="loading-img"
          shape="round"
          src="a"
          width="72"
          height="72"
        />
      </view>
      <view class="col">
        <view class="text">
          失败自定义提示
        </view>
        <t-image
          src="a"
          shape="round"
          error="slot"
          width="72"
          height="72"
        >
          <template #error>
            <text
              class="error-text"
            >
              加载失败
            </text>
          </template>
        </t-image>
      </view>
    </view>
  </view>
</template>

<script>
import TImage from '@tdesign/uniapp/image/image.vue';
import TLoading from '@tdesign/uniapp/loading/loading.vue';
export default {
  components: {
    TImage,
    TLoading,
  },
  data() {
    return {
      isLoading: false,
      isFailed: false,
    };
  },
  pageLifetimes: {
    show() {
      this.handlePageShow();
    },
  },
  created() {},
  methods: {
    handlePageShow() {
      const $ele1 = this.$refs['#loading-img'];
      const $ele2 = this.$refs['#loading-img-custom'];
      this.setLoadingStatus($ele1);
      this.setLoadingStatus($ele2);
    },

    setLoadingStatus(ele) {
      ele.onLoadError = null;
      ele.onLoaded = null;

      ele.isLoading = true;
      ele.isFailed = false;
    },
  },
};
</script>
<style>
.tr {
    display: flex;
}

.col {
    margin: 0 32rpx;
}

.tr + .tr {
    margin-top: 48rpx;
}

.text {
    font-size: 28rpx;
    color: var(--td-text-color-secondary);
    line-height: 44rpx;
    margin-bottom: 32rpx;
}

.error-text {
    font-size: 20rpx;
    font-weight: 400;
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

### Image Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
custom-style | Object | - | 自定义样式 | N
error | String | 'default' | 加载失败时显示的内容。值为 `default` 则表示使用默认加载失败风格；值为空或者 `slot` 表示使用插槽渲染，插槽名称为 `error`；值为其他则表示普通文本内容，如“加载失败” | N
height | String / Number | - | 高度，默认单位为`px` | N
lazy | Boolean | false | 是否开启图片懒加载 | N
loading | String | 'default' | 加载态内容。值为 `default` 则表示使用默认加载中风格；值为其他则表示普通文本内容，如“加载中” | N
mode | String | scaleToFill | 图片裁剪、缩放的模式；[小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/component/image.html)。可选项：scaleToFill/aspectFit/aspectFill/widthFix/heightFix/top/bottom/center/left/right/top left/top right/bottom left/bottom right | N
shape | String | square | 图片圆角类型。可选项：circle/round/square | N
show-menu-by-longpress | Boolean | false | 长按图片显示发送给朋友、收藏、保存图片、搜一搜、打开名片/前往群聊/打开小程序（若图片中包含对应二维码或小程序码）的菜单 | N
src | String | - | 图片链接 | N
t-id | String | - | 图片标签id | N
webp | Boolean | false | 默认不解析 webP 格式，只支持网络资源 | N
width | String / Number | - | 宽度，默认单位为`px` | N

### Image Events

名称 | 参数 | 描述
-- | -- | --
error | `(context: { e: ImageEvent })` | 图片加载失败时触发。[通用类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/common/common.ts)
load | `(context: { e: ImageEvent })` | 图片加载完成时触发。[通用类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/common/common.ts)

### Image Slots

名称 | 描述
-- | --
error | 自定义 `error` 显示内容
loading | 自定义 `loading` 显示内容

### Image External Classes

类名 | 描述
-- | --
t-class | 根节点样式类
t-class-load | 加载样式类

### CSS Variables

组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-image-color | @text-color-placeholder | -
--td-image-loading-bg-color | @bg-color-secondarycontainer | -
--td-image-loading-color | @text-color-placeholder | -
--td-image-round-radius | @radius-default | -
