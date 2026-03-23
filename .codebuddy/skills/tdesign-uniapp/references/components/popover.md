---
name: "popover"
description: "用于文字提示的气泡框。"
url: "https://tdesign.tencent.com/uniapp/components/popover"
---



## 引入

可在 `main.ts` 或在需要使用的页面或组件中引入。

```js
import TPopover from '@tdesign/uniapp/popover/popover.vue';
```

### 组件类型

#### 带箭头的弹出气泡


```vue
<template>
  <view class="row">
    <view class="demo-block__header-desc">
      带箭头的弹出气泡
    </view>
    <t-popover
      :visible="visible.normal"
      placement="top"
      theme="dark"
      data-target="normal"
      :close-on-click-outside="false"
      @update:visible="visible.normal = $event"
    >
      <template #content>
        <view>
          弹出气泡内容
        </view>
      </template>

      <view class="popover-example__content">
        <t-button
          theme="primary"
          variant="outline"
          size="large"
          data-target="normal"
          @click="showPopover($event, { target: 'normal' })"
        >
          带箭头
        </t-button>
      </view>
    </t-popover>

    <view
      class="demo-block__header-desc"
      style="margin-top: 32rpx"
    >
      不带箭头的弹出气泡
    </view>
    <t-popover
      :visible="visible.noArrow"
      placement="top"
      theme="dark"
      content="弹出气泡内容"
      :show-arrow="false"
      data-target="noArrow"
      @update:visible="visible.noArrow = $event"
    >
      <view class="popover-example__content">
        <t-button
          theme="primary"
          variant="outline"
          size="large"
          data-target="noArrow"
          @click="showPopover($event, { target: 'noArrow' })"
        >
          不带箭头
        </t-button>
      </view>
    </t-popover>

    <view
      class="demo-block__header-desc"
      style="margin-top: 32rpx"
    >
      自定义内容弹出气泡
    </view>
    <view class="custom">
      <t-popover
        :visible="visible.custom"
        placement="top"
        theme="dark"
        data-target="custom"
        @update:visible="visible.custom = $event"
      >
        <template #content>
          <view class="custom__list">
            <view
              v-for="(item, index) in 3"
              :key="index"
              class="custom__item"
            >
              选项{{ index + 1 }}
            </view>
          </view>
        </template>


        <view class="popover-example__content">
          <t-button
            theme="primary"
            variant="outline"
            size="large"
            data-target="custom"
            @click="showPopover($event, { target: 'custom' })"
          >
            自定义内容
          </t-button>
        </view>
      </t-popover>
    </view>
  </view>
</template>

<script>
import TPopover from '@tdesign/uniapp/popover/popover.vue';
import TButton from '@tdesign/uniapp/button/button.vue';

export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TPopover,
    TButton,
  },
  data() {
    return {
      visible: {
        normal: false,
        noArrow: false,
        custom: false,
      },
    };
  },
  created() {},
  methods: {
    showPopover(e, { target }) {
      this.visible[target] = !this.visible[target];
    },
  },
};
</script>
<style lang="less" scoped>
.row {
    display: flex;
    flex-direction: column;

  :deep(.t-popover__wrapper) {
      width: 100%;
  }
}

.demo-block__header-desc {
    margin-top: var(--td-spacer, 16rpx);
    margin-bottom: 32rpx;
    font-size: var(--td-font-size-base, 28rpx);
    white-space: pre-line;
    color: var(--bg-color-demo-desc);
    line-height: 22px;
}

.popover-example__content {
    display: flex;
    justify-content: center;
}

.custom {
    display: flex;
    justify-content: center;
    --td-popover-padding: 0;
}

.custom__list {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
}

.custom__item {
    width: 105px;
    line-height: 24px;
    text-align: center;
    padding: 12px;
}

.custom__item:not(:last-child) {
    border-bottom: 1px solid #fff;
}

</style>
```


### 组件样式

#### 气泡主题


```vue
<template>
  <view>
    <view class="row">
      <view class="popover-example__content">
        <t-popover
          :visible="visible.dark"
          placement="top"
          theme="dark"
          content="弹出气泡内容"
          data-target="dark"
          @update:visible="visible.dark = $event"
        >
          <t-button
            class="button-width--small"
            theme="primary"
            variant="outline"
            size="large"
            data-target="dark"
            @click="showPopover($event, { target: 'dark' })"
          >
            深色
          </t-button>
        </t-popover>
      </view>
      <view class="popover-example__content">
        <t-popover
          :visible="visible.light"
          placement="top"
          theme="light"
          content="弹出气泡内容"
          data-target="light"
          @update:visible="visible.light = $event"
        >
          <t-button
            class="button-width--small"
            theme="primary"
            variant="outline"
            size="large"
            data-target="light"
            @click="showPopover($event, { target: 'light' })"
          >
            浅色
          </t-button>
        </t-popover>
      </view>
      <view class="popover-example__content">
        <t-popover
          :visible="visible.brand"
          placement="top"
          theme="brand"
          content="弹出气泡内容"
          data-target="brand"
          @update:visible="visible.brand = $event"
        >
          <t-button
            class="button-width--small"
            theme="primary"
            variant="outline"
            size="large"
            data-target="brand"
            @click="showPopover($event, { target: 'brand' })"
          >
            品牌色
          </t-button>
        </t-popover>
      </view>
    </view>
    <view
      class="row"
      style="margin-top: 32rpx"
    >
      <view class="popover-example__content">
        <t-popover
          :visible="visible.success"
          placement="top"
          theme="success"
          content="弹出气泡内容"
          data-target="success"
          @update:visible="visible.success = $event"
        >
          <t-button
            class="button-width--small"
            theme="primary"
            variant="outline"
            size="large"
            data-target="success"
            @click="showPopover($event, { target: 'success' })"
          >
            成功色
          </t-button>
        </t-popover>
      </view>
      <view class="popover-example__content">
        <t-popover
          :visible="visible.warning"
          placement="top"
          theme="warning"
          content="弹出气泡内容"
          data-target="warning"
          @update:visible="visible.warning = $event"
        >
          <t-button
            class="button-width--small"
            theme="primary"
            variant="outline"
            size="large"
            data-target="warning"
            @click="showPopover($event, { target: 'warning' })"
          >
            警告色
          </t-button>
        </t-popover>
      </view>
      <view class="popover-example__content">
        <t-popover
          :visible="visible.error"
          placement="top"
          theme="error"
          content="弹出气泡内容"
          data-target="error"
          @update:visible="visible.error = $event"
        >
          <t-button
            class="button-width--small"
            theme="primary"
            variant="outline"
            size="large"
            data-target="error"
            @click="showPopover($event, { target: 'error' })"
          >
            错误色
          </t-button>
        </t-popover>
      </view>
    </view>
  </view>
</template>

<script>
import TPopover from '@tdesign/uniapp/popover/popover.vue';
import TButton from '@tdesign/uniapp/button/button.vue';
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TPopover,
    TButton,
  },
  data() {
    return {
      visible: {
        dark: false,
        light: false,
        success: false,
        brand: false,
        warning: false,
        error: false,
      },
    };
  },
  created() {},
  methods: {
    showPopover(e, { target }) {
      this.visible[target] = !this.visible[target];
    },
  },
};
</script>
<style scoped lang="less">
.row {
    display: flex;
    padding: 0 32rpx;
    gap: 32rpx;
}

.demo-block__header-desc {
    margin-top: var(--td-spacer, 16rpx);
    margin-bottom: 32rpx;
    font-size: var(--td-font-size-base, 28rpx);
    white-space: pre-line;
    color: var(--bg-color-demo-desc);
    line-height: 22px;
}

.popover-example__content {
    flex: 1;
}

.button-width--small {
    width: 204rpx;
}

</style>
```


#### 气泡位置


```vue
<template>
  <view>
    <view class="popover-example-row">
      <view class="demo-block__header-desc">
        顶部弹出气泡
      </view>
      <view class="row">
        <view class="popover-example__content">
          <t-popover
            :visible="visible.topLeft"
            placement="top-left"
            theme="dark"
            data-target="topLeft"
            @update:visible="visible.topLeft = $event"
          >
            <template #content>
              <view>
                弹出气泡内容
              </view>
            </template>

            <view class="popover-example__content">
              <t-button
                t-class="button-width--small"
                theme="primary"
                variant="outline"
                size="large"
                data-target="topLeft"
                @click="showPopover($event, { target: 'topLeft' })"
              >
                顶部左
              </t-button>
            </view>
          </t-popover>
        </view>
        <view class="popover-example__content">
          <t-popover
            :visible="visible.top"
            placement="top"
            theme="dark"
            data-target="top"
            @update:visible="visible.top = $event"
          >
            <template #content>
              <view>
                弹出气泡内容
              </view>
            </template>

            <view class="popover-example__content">
              <t-button
                t-class="button-width--small"
                theme="primary"
                variant="outline"
                size="large"
                data-target="top"
                @click="showPopover($event, { target: 'top' })"
              >
                顶部中
              </t-button>
            </view>
          </t-popover>
        </view>
        <view class="popover-example__content">
          <t-popover
            :visible="visible.topRight"
            placement="top-right"
            theme="dark"
            data-target="topRight"
            @update:visible="visible.topRight = $event"
          >
            <template #content>
              <view>
                弹出气泡内容
              </view>
            </template>

            <view class="popover-example__content">
              <t-button
                t-class="button-width--small"
                theme="primary"
                variant="outline"
                size="large"
                data-target="topRight"
                @click="showPopover($event, { target: 'topRight' })"
              >
                顶部右
              </t-button>
            </view>
          </t-popover>
        </view>
      </view>
    </view>

    <view class="popover-example-row">
      <view class="demo-block__header-desc">
        底部弹出气泡
      </view>
      <view class="row">
        <view class="popover-example__content">
          <t-popover
            :visible="visible.bottomLeft"
            placement="bottom-left"
            theme="dark"
            data-target="bottomLeft"
            @update:visible="visible.bottomLeft = $event"
          >
            <template #content>
              <view>
                弹出气泡内容
              </view>
            </template>

            <view class="popover-example__content">
              <t-button
                t-class="button-width--small"
                theme="primary"
                variant="outline"
                size="large"
                data-target="bottomLeft"
                @click="showPopover($event, { target: 'bottomLeft' })"
              >
                底部左
              </t-button>
            </view>
          </t-popover>
        </view>
        <view class="popover-example__content">
          <t-popover
            :visible="visible.bottom"
            placement="bottom"
            theme="dark"
            data-target="bottom"
            @update:visible="visible.bottom = $event"
          >
            <template #content>
              <view>
                弹出气泡内容
              </view>
            </template>

            <view class="popover-example__content">
              <t-button
                t-class="button-width--small"
                theme="primary"
                variant="outline"
                size="large"
                data-target="bottom"
                @click="showPopover($event, { target: 'bottom' })"
              >
                底部中
              </t-button>
            </view>
          </t-popover>
        </view>

        <view class="popover-example__content">
          <t-popover
            :visible="visible.bottomRight"
            placement="bottom-right"
            theme="dark"
            data-target="bottomRight"
            @update:visible="visible.bottomRight = $event"
          >
            <template #content>
              <view>
                弹出气泡内容
              </view>
            </template>


            <view class="popover-example__content">
              <t-button
                t-class="button-width--small"
                theme="primary"
                variant="outline"
                size="large"
                data-target="bottomRight"
                @click="showPopover($event, { target: 'bottomRight' })"
              >
                底部右
              </t-button>
            </view>
          </t-popover>
        </view>
      </view>
    </view>

    <view class="popover-example-row">
      <view class="demo-block__header-desc">
        右侧弹出气泡
      </view>
      <view class="column">
        <view class="popover-example__content">
          <t-popover
            :visible="visible.rightTop"
            placement="right-top"
            theme="dark"
            data-target="rightTop"
            @update:visible="visible.rightTop = $event"
          >
            <template #content>
              <view>
                气泡内容
              </view>
            </template>


            <view class="popover-example__content">
              <t-button
                t-class="button-width--large"
                theme="primary"
                variant="outline"
                size="large"
                data-target="rightTop"
                @click="showPopover($event, { target: 'rightTop' })"
              >
                右侧上
              </t-button>
            </view>
          </t-popover>
        </view>
        <view class="popover-example__content">
          <t-popover
            :visible="visible.right"
            placement="right"
            theme="dark"
            data-target="right"
            @update:visible="visible.right = $event"
          >
            <template #content>
              <view>
                气泡内容
              </view>
            </template>
            <view class="popover-example__content">
              <t-button
                t-class="button-width--large"
                theme="primary"
                variant="outline"
                size="large"
                data-target="right"
                @click="showPopover($event, { target: 'right' })"
              >
                右侧中
              </t-button>
            </view>
          </t-popover>
        </view>
        <view class="popover-example__content">
          <t-popover
            :visible="visible.rightBottom"
            placement="right-bottom"
            theme="dark"
            data-target="rightBottom"
            @update:visible="visible.rightBottom = $event"
          >
            <template #content>
              <view>
                气泡内容
              </view>
            </template>
            <view class="popover-example__content">
              <t-button
                t-class="button-width--large"
                theme="primary"
                variant="outline"
                size="large"
                data-target="rightBottom"
                @click="showPopover($event, { target: 'rightBottom' })"
              >
                右侧下
              </t-button>
            </view>
          </t-popover>
        </view>
      </view>
    </view>

    <view class="flex-end popover-example-row">
      <view class="demo-block__header-desc">
        左侧弹出气泡
      </view>
      <view class="column">
        <view class="popover-example__content">
          <t-popover
            :visible="visible.leftTop"
            placement="left-top"
            theme="dark"
            data-target="leftTop"
            @update:visible="visible.leftTop = $event"
          >
            <template #content>
              <view>
                气泡内容
              </view>
            </template>
            <view class="popover-example__content">
              <t-button
                t-class="button-width--large"
                theme="primary"
                variant="outline"
                size="large"
                data-target="leftTop"
                @click="showPopover($event, { target: 'leftTop' })"
              >
                左侧上
              </t-button>
            </view>
          </t-popover>
        </view>
        <view class="popover-example__content">
          <t-popover
            :visible="visible.left"
            placement="left"
            theme="dark"
            data-target="left"
            @update:visible="visible.left = $event"
          >
            <template #content>
              <view>
                气泡内容
              </view>
            </template>
            <view class="popover-example__content">
              <t-button
                t-class="button-width--large"
                theme="primary"
                variant="outline"
                size="large"
                data-target="left"
                @click="showPopover($event, { target: 'left' })"
              >
                左侧中
              </t-button>
            </view>
          </t-popover>
        </view>
        <view class="popover-example__content">
          <t-popover
            :visible="visible.leftBottom"
            placement="left-bottom"
            theme="dark"
            data-target="leftBottom"
            @update:visible="visible.leftBottom = $event"
          >
            <template #content>
              <view>
                气泡内容
              </view>
            </template>
            <view class="popover-example__content">
              <t-button
                t-class="button-width--large"
                theme="primary"
                variant="outline"
                size="large"
                data-target="leftBottom"
                @click="showPopover($event, { target: 'leftBottom' })"
              >
                左侧下
              </t-button>
            </view>
          </t-popover>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import TPopover from '@tdesign/uniapp/popover/popover.vue';
import TButton from '@tdesign/uniapp/button/button.vue';
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TPopover,
    TButton,
  },
  data() {
    return {
      visible: {
        topLeft: false,
        top: false,
        topRight: false,
        bottomLeft: false,
        bottom: false,
        bottomRight: false,
        leftTop: false,
        left: false,
        leftBottom: false,
        rightTop: false,
        right: false,
        rightBottom: false,
      },
    };
  },
  created() {},
  methods: {
    showPopover(e, { target }) {
      this.visible[target] = !this.visible[target];
    },
  },
};
</script>
<style scoped lang="less">
.popover-example-row {
    display: flex;
    flex-direction: column;
    padding: 0 32rpx;
    margin-bottom: 48rpx;
}

.row {
    display: flex;
    flex-direction: row;
    gap: 32rpx;
}

.column {
    display: flex;
    flex-direction: column;
    gap: 32rpx;
}

.flex-end .column {
    align-items: flex-end;
}

.demo-block__header-desc {
    margin-top: var(--td-spacer, 16rpx);
    margin-bottom: 32rpx;
    font-size: var(--td-font-size-base, 28rpx);
    white-space: pre-line;
    color: var(--bg-color-demo-desc);
    line-height: 22px;
}

.popover-example__content {
    flex: 1;
}

:deep(.button-width--small) {
    width: 204rpx;
}

:deep(.button-width--large) {
    width: 446rpx;
}

</style>
```


## API

### Popover Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
custom-style | Object | - | 自定义样式 | N
close-on-click-outside | Boolean | true | 是否在点击外部元素后关闭菜单  | N
content | String | - | 确认框内容 | N
fixed | Boolean | false | 如果触发元素为 `fixed` 场景，需要显示指定 `fixed` 属性为 `true`，同时需在触发元素层添加 `t-popover-wrapper--fixed` 类，用于定位触发元素  | N
placement | String | top | 浮层出现位置。可选项：top/left/right/bottom/top-left/top-right/bottom-left/bottom-right/left-top/left-bottom/right-top/right-bottom | N
show-arrow | Boolean | true | 是否显示浮层箭头 | N
theme | String | dark | 弹出气泡主题。可选项：dark/light/brand/success/warning/error | N
visible | Boolean | undefined | 是否显示气泡确认框。支持语法糖 `v-model:visible` | N

### Popover Events

名称 | 参数 | 描述
-- | -- | --
visible-change | `(visible: boolean)` | 确认框显示或隐藏时触发

### Popover Slots

名称 | 描述
-- | --
\- | 默认插槽，用于自定义触发元素
content | 自定义 `content` 显示内容

### Popover External Classes

类名 | 描述
-- | --
t-class | 根节点样式类
t-class-content | 内容样式类

### CSS Variables

组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-popover-brand-bg-color | @primary-color-1 | -
--td-popover-brand-color | @primary-color-7 | -
--td-popover-dark-bg-color | @font-gray-1 | -
--td-popover-dark-color | @text-color-anti | -
--td-popover-error-bg-color | @error-color-1 | -
--td-popover-error-color | @error-color-6 | -
--td-popover-light-bg-color | @bg-color-container | -
--td-popover-light-color | @text-color-primary | -
--td-popover-padding | 24rpx | -
--td-popover-success-bg-color | @success-color-1 | -
--td-popover-success-color | @success-color-5 | -
--td-popover-warning-bg-color | @warning-color-1 | -
--td-popover-warning-color | @warning-color-5 | -
