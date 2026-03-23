---
name: "popup"
description: "由其他控件触发，屏幕滑出或弹出一块自定义内容区域。"
url: "https://tdesign.tencent.com/uniapp/components/popup"
---




## 引入

可在 `main.ts` 或在需要使用的页面或组件中引入。

```js
import TPopup from '@tdesign/uniapp/popup/popup.vue';
```

### 组件类型

基础弹出层


```vue
<template>
  <view>
    <t-popup
      :visible="visible"
      :using-custom-navbar="!isMPAlipay"
      :placement="cur.value || 'top'"
      @update:visible="visible = $event"
    >
      <view :class="'block block--' + cur.value">
        {{ cur.text }}
      </view>
    </t-popup>

    <t-button
      v-for="(item, index) in position"
      :key="index"
      block
      size="large"
      variant="outline"
      theme="primary"
      :data-item="item"
      :custom-style="index === item.length - 1 ? '' : 'margin-bottom: 16px;'"
      @click="handlePopup($event, { item })"
    >
      {{ item.text }}
    </t-button>
  </view>
</template>

<script>
import TPopup from '@tdesign/uniapp/popup/popup.vue';
import TButton from '@tdesign/uniapp/button/button.vue';
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TPopup,
    TButton,
  },
  data() {
    return {
      cur: {
        value: '',
        text: '',
      },

      position: [
        {
          value: 'top',
          text: '顶部弹出',
        },
        {
          value: 'left',
          text: '左侧弹出',
        },
        {
          value: 'center',
          text: '中间弹出',
        },
        {
          value: 'bottom',
          text: '底部弹出',
        },
        {
          value: 'right',
          text: '右侧弹出',
        },
      ],

      visible: false,
    };
  },
  created() {},
  methods: {
    handlePopup(e, { item }) {
      this.cur = item;

      setTimeout(() => {
        this.visible = true;
      });
    },
  },
};
</script>
<style scoped>
.block {
    color: var(--td-text-color-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
}

.block--top,
.block--bottom {
    width: 100vw;
    height: 240px;
}

.block--left,
.block--right {
    width: 280px;
    height: 100%;
}

.block--center {
    width: 240px;
    height: 240px;
}
</style>
```


### 组件示例

应用示例


```vue
<template>
  <view>
    <t-popup
      :visible="visible"
      placement="bottom"
      @visible-change="onVisibleChange"
    >
      <view class="block">
        <view class="header">
          <view
            class="btn btn--cancel"
            aria-role="button"
          >
            取消
          </view>
          <view class="title">
            标题文字
          </view>
          <view
            class="btn btn--confirm"
            aria-role="button"
          >
            确定
          </view>
        </view>
      </view>
    </t-popup>

    <t-button
      block
      size="large"
      variant="outline"
      theme="primary"
      @click="handlePopup"
    >
      底部弹出层-带标题及操作
    </t-button>
  </view>
</template>

<script>
import TPopup from '@tdesign/uniapp/popup/popup.vue';
import TButton from '@tdesign/uniapp/button/button.vue';
export default {
  components: {
    TPopup,
    TButton,
  },
  data() {
    return {
      cur: {},

      position: [
        {
          value: 'top',
          text: '顶部弹出',
        },
        {
          value: 'left',
          text: '左侧弹出',
        },
        {
          value: 'center',
          text: '中间弹出',
        },
        {
          value: 'bottom',
          text: '底部弹出',
        },
        {
          value: 'right',
          text: '右侧弹出',
        },
      ],

      visible: false,
    };
  },
  created() {},
  methods: {
    handlePopup() {
      this.visible = true;
    },
    onVisibleChange({ visible }) {
      this.visible = visible;
    },
  },
};
</script>
<style lang="less" scoped>
.block {
  width: 100vw;
  height: 240px;
  background: var(--td-bg-color-container);
  border-top-left-radius: 16rpx;
  border-top-right-radius: 16rpx;
  .header {
    display: flex;
    align-items: center;
    height: 116rpx;
  }

  .title {
    flex: 1;
    text-align: center;
    font-weight: 600;
    font-size: 36rpx;
    color: var(--td-text-color-primary);
  }

  .btn {
    font-size: 32rpx;
    padding: 32rpx;
  }

  .btn--cancel {
    color: var(--td-text-color-secondary);
  }

  .btn--confirm {
    color: #0052d9;
  }
}
</style>
```



```vue
<template>
  <view>
    <t-popup
      :visible="visible"
      placement="center"
      @visible-change="onVisibleChange"
    >
      <view class="block">
        <t-icon
          name="close-circle"
          :custom-style="closeIconCustomStyle"
          size="64rpx"
          color="#fff"
          @click="onClose"
        />
      </view>
    </t-popup>

    <t-button
      block
      size="large"
      variant="outline"
      theme="primary"
      custom-style="display: block; margin-top: 32rpx"
      @click="handlePopup"
    >
      居中弹出层-带自定义关闭按钮
    </t-button>
  </view>
</template>

<script>
import TPopup from '@tdesign/uniapp/popup/popup.vue';
import TIcon from '@tdesign/uniapp/icon/icon.vue';
import TButton from '@tdesign/uniapp/button/button.vue';
import tools from '@tdesign/uniapp/common/utils.wxs';

export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TPopup,
    TIcon,
    TButton,
  },
  data() {
    return {
      cur: {},

      position: [
        {
          value: 'top',
          text: '顶部弹出',
        },
        {
          value: 'left',
          text: '左侧弹出',
        },
        {
          value: 'center',
          text: '中间弹出',
        },
        {
          value: 'bottom',
          text: '底部弹出',
        },
        {
          value: 'right',
          text: '右侧弹出',
        },
      ],

      visible: false,

      closeIconCustomStyle: tools._style({
        position: 'absolute',
        left: '50%',
        marginLeft: '-16px',
        bottom: 'calc(-1 * (24px + 32px))',
      }),
    };
  },
  created() {},
  methods: {
    handlePopup() {
      this.visible = true;
    },
    onVisibleChange({ visible }) {
      this.visible = visible;
    },
    onClose() {
      this.visible = false;
    },
  },
};
</script>
<style scoped>
.block {
    position: relative;
    width: 240px;
    height: 240px;
    background: var(--td-bg-color-container);
    border-radius: 16rpx;
}
</style>
```


## API

### Popup Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
custom-style | Object | - | 自定义样式 | N
close-btn | Boolean | - | 关闭按钮，值类型为 Boolean 时表示是否显示关闭按钮。也可以自定义关闭按钮 | N
close-on-overlay-click | Boolean | true | 点击遮罩层是否关闭 | N
content | String | - | 浮层里面的内容 | N
duration | Number | 240 | 动画过渡时间 | N
overlay-props | Object | {} | 遮罩层的属性，透传至 overlay。TS 类型：`OverlayProps`，[Overlay API Documents](./overlay?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/popup/type.ts) | N
placement | String | top | 浮层出现位置。可选项：top/left/right/bottom/center | N
prevent-scroll-through | Boolean | true | 是否阻止背景滚动 | N
show-overlay | Boolean | true | 是否显示遮罩层 | N
using-custom-navbar | Boolean | false | 是否使用了自定义导航栏 | N
visible | Boolean | - | 是否显示浮层。支持语法糖 `v-model:visible`。TS 类型：`boolean` | N
default-visible | Boolean | - | 是否显示浮层。非受控属性。TS 类型：`boolean` | N
z-index | Number | 11500 | 组件层级，Web 侧样式默认为 5500，移动端样式默认为 1500，小程序样式默认为11500 | N

### Popup Events

名称 | 参数 | 描述
-- | -- | --
visible-change | `(context: { visible: boolean, trigger: PopupSource }) ` | 当浮层隐藏时触发。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/popup/type.ts)。<br/>`type PopupSource = 'close-btn' \| 'overlay'`<br/>

### Popup Slots

名称 | 描述
-- | --
\- | 默认插槽，作用同 `content` 插槽
close-btn | 自定义 `close-btn` 显示内容
content | 自定义 `content` 显示内容

### Popup External Classes

类名 | 描述
-- | --
t-class | 根节点样式类
t-class-content | 内容样式类

### CSS Variables

组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-popup-bg-color | @bg-color-container | -
--td-popup-border-radius | @radius-extraLarge | -
--td-popup-close-btn-color | @text-color-primary | -
--td-popup-distance-top | 0 | -
--td-popup-transition | all 300ms ease | -
