---
name: "guide"
description: "逐步骤进行指引或解释说明的组件，常用于用户不熟悉的或需进行特别强调的页面。"
url: "https://tdesign.tencent.com/uniapp/components/guide"
---




## 引入

可在 `main.ts` 或在需要使用的页面或组件中引入。

```js
import TGuide from '@tdesign/uniapp/guide/guide.vue';
```

### 01 组件类型

#### 基础按钮


```vue
<template>
  <view>
    <view>
      <view class="main-title">
        <view class="title-major">
          用户引导标题
        </view>
        <view class="title-sub">
          按钮用于开启一个闭环的操作任务，如“删除”对象、“购买”商品等。
        </view>
      </view>
      <view class="field label-field">
        <t-input
          label="标签文字"
          layout="vertical"
          placeholder="请输入文字"
        />
      </view>
      <view class="field">
        <t-input
          label="标签文字"
          layout="vertical"
          placeholder="请输入文字"
        />
      </view>
      <view class="action">
        <t-button
          block
          theme="light"
          size="large"
        >
          重置
        </t-button>
        <t-button
          block
          theme="primary"
          size="large"
        >
          确定
        </t-button>
      </view>
    </view>

    <t-guide
      :current="current"
      :steps="steps"
      @skip="close"
      @finish="close"
    >
      <template
        #body-2
      >
        <view
          class="slot-body"
        >
          slot展示 用户引导的说明文案
        </view>
      </template>
    </t-guide>
  </view>
</template>

<script>
import TGuide from '@tdesign/uniapp/guide/guide.vue';
import TInput from '@tdesign/uniapp/input/input.vue';
import TButton from '@tdesign/uniapp/button/button.vue';
import { getRect } from '@tdesign/uniapp/common/utils';

export default {
  components: {
    TGuide,
    TInput,
    TButton,
  },
  data() {
    return {
      current: -1,
      steps: [],
    };
  },
  mounted() {
    // 处理小程序 attached 生命周期
    setTimeout(() => {
      this.attached();
    }, 100);
  },
  created() {},
  methods: {
    attached() {
      this.current = 0;

      this.steps = [
        {
          element: () => getRect(this, '.main-title', false, true),
          title: '用户引导标题',
          body: '用户引导的说明文案',
          placement: 'center',
        },
        {
          element: () => getRect(this, '.label-field', false, true),
          title: '用户引导标题',
          body: '用户引导的说明文案',
          placement: 'bottom',
          highlightPadding: 0,
        },
        {
          element: () => getRect(this, '.action', false, true),
          title: '用户引导标题',

          // body: '用户引导的说明文案',
          placement: 'bottom-right',
        },
      ];
    },

    close() {
      this.$emit('close');
    },
  },
};
</script>
<style>
.main-title {
    margin: 32rpx;
    display: inline-block;
}

.title-major {
    font-size: 48rpx;
    font-weight: 600;
    line-height: 72rpx;
}

.title-sub {
    font-size: 32rpx;
    font-weight: 400;
    line-height: 48rpx;
    margin-top: 8rpx;
}

.action {
    margin: 64rpx;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 64rpx;
}

.slot-body {
    margin-top: 8rpx;
    text-align: left;
    color: var(--td-text-color-secondary);
    font-size: 28rpx;
    font-weight: 400;
    line-height: 44rpx;
}
</style>
```


#### 不带遮罩的引导


```vue
<template>
  <view>
    <view>
      <view class="main-title">
        <view class="title-major">
          用户引导标题
        </view>
        <view class="title-sub">
          按钮用于开启一个闭环的操作任务，如“删除”对象、“购买”商品等。
        </view>
      </view>
      <view class="field label-field">
        <t-input
          label="标签文字"
          layout="vertical"
          placeholder="请输入文字"
        />
      </view>
      <view class="field">
        <t-input
          label="标签文字"
          layout="vertical"
          placeholder="请输入文字"
        />
      </view>
      <view class="action">
        <t-button
          block
          theme="light"
          size="large"
        >
          重置
        </t-button>
        <t-button
          block
          theme="primary"
          size="large"
        >
          确定
        </t-button>
      </view>
    </view>

    <t-guide
      :current="current"
      :steps="steps"
      :show-overlay="false"
      @skip="close"
      @finish="close"
    />
  </view>
</template>

<script>
import TGuide from '@tdesign/uniapp/guide/guide.vue';
import TInput from '@tdesign/uniapp/input/input.vue';
import TButton from '@tdesign/uniapp/button/button.vue';
import { getRect } from '@tdesign/uniapp/common/utils';

export default {
  components: {
    TGuide,
    TInput,
    TButton,
  },
  data() {
    return {
      current: -1,
      steps: [],
    };
  },
  mounted() {
    // 处理小程序 attached 生命周期
    setTimeout(() => {
      this.attached();
    }, 33);
  },
  created() {},
  methods: {
    attached() {
      this.current = 0;

      this.steps = [
        {
          element: () => getRect(this, '.main-title', false, true),

          title: '用户引导标题',
          body: '用户引导的说明文案',
          placement: 'center',
        },
        {
          element: () => getRect(this, '.label-field', false, true),

          title: '用户引导标题',
          body: '用户引导的说明文案',
          placement: 'bottom',
          highlightPadding: 0,
        },
        {
          element: () => getRect(this, '.action', false, true),
          title: '用户引导标题',
          body: '用户引导的说明文案',
          placement: 'top-right',
        },
      ];
    },

    close() {
      this.$emit('close');
    },
  },
};
</script>
<style>
.main-title {
    margin: 32rpx;
    display: inline-block;
}

.title-major {
    font-size: 48rpx;
    font-weight: 600;
    line-height: 72rpx;
}

.title-sub {
    font-size: 32rpx;
    font-weight: 400;
    line-height: 48rpx;
    margin-top: 8rpx;
}

.action {
    margin: 64rpx;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 64rpx;
}
</style>
```


#### 弹窗形式的引导


```vue
<template>
  <view>
    <view>
      <view class="main-title">
        <view class="title-major">
          用户引导标题
        </view>
        <view class="title-sub">
          按钮用于开启一个闭环的操作任务，如“删除”对象、“购买”商品等。
        </view>
      </view>
      <view class="field label-field">
        <t-input
          label="标签文字"
          layout="vertical"
          placeholder="请输入文字"
        />
      </view>
      <view class="field">
        <t-input
          label="标签文字"
          layout="vertical"
          placeholder="请输入文字"
        />
      </view>
      <view class="action">
        <t-button
          block
          theme="light"
          size="large"
        >
          重置
        </t-button>
        <t-button
          block
          theme="primary"
          size="large"
        >
          确定
        </t-button>
      </view>
    </view>

    <t-guide
      :current="current"
      :steps="steps"
      mode="dialog"
      @skip="close"
      @finish="close"
    >
      <template
        #body-0
      >
        <view
          class="slot-body"
        >
          <p>用户引导的说明文案 0</p>
          <t-image
            t-class="guide-demo-image"
            src="https://tdesign.gtimg.com/demo/demo-image-1.png"
            mode="scaleToFill"
            width="100%;height:380rpx"
          />
        </view>
      </template>
      <template
        #body-1
      >
        <view
          class="slot-body"
        >
          <p>用户引导的说明文案 1</p>
          <t-image
            t-class="guide-demo-image"
            src="https://tdesign.gtimg.com/demo/demo-image-1.png"
            mode="scaleToFill"
            width="100%;height:380rpx"
          />
        </view>
      </template>

      <template
        #body-2
      >
        <view
          class="slot-body"
        >
          <p>用户引导的说明文案 2</p>
          <t-image
            t-class="guide-demo-image"
            src="https://tdesign.gtimg.com/demo/demo-image-1.png"
            mode="scaleToFill"
            width="100%;height:380rpx"
          />
        </view>
      </template>
    </t-guide>
  </view>
</template>

<script>
import TGuide from '@tdesign/uniapp/guide/guide.vue';
import TInput from '@tdesign/uniapp/input/input.vue';
import TButton from '@tdesign/uniapp/button/button.vue';
import TImage from '@tdesign/uniapp/image/image.vue';
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TGuide,
    TInput,
    TButton,
    TImage,
  },
  data() {
    return {
      current: -1,
      steps: [],
    };
  },
  mounted() {
    // 处理小程序 attached 生命周期
    setTimeout(() => {
      this.attached();
    }, 33);
  },
  created() {},
  methods: {
    attached() {
      this.current = 0;

      this.steps = [
        {
          title: '用户引导标题',
          placement: 'center',
        },
        {
          title: '用户引导标题',
          placement: 'bottom',
          highlightPadding: 0,
        },
        {
          title: '用户引导标题',
          placement: 'bottom-right',
        },
      ];
    },

    close() {
      this.$emit('close');
    },
  },
};
</script>
<style>
.main-title {
    margin: 32rpx;
    display: inline-block;
}

.title-major {
    font-size: 48rpx;
    font-weight: 600;
    line-height: 72rpx;
}

.title-sub {
    font-size: 32rpx;
    font-weight: 400;
    line-height: 48rpx;
    margin-top: 8rpx;
}

.action {
    margin: 64r px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 64rpx;
}

.slot-body {
    margin-top: 8rpx;
    text-align: center;
    color: var(--td-text-color-secondary);
    font-size: 32rpx;
    font-weight: 400;
    line-height: 48rpx;
}

.slot-body :deep(.guide-demo-image) {
    margin-top: 48rpx;
    width: 100%;
}
</style>
```


#### 气泡与弹窗混合的引导


```vue
<template>
  <view>
    <view>
      <view class="main-title">
        <view class="title-major">
          用户引导标题
        </view>
        <view class="title-sub">
          按钮用于开启一个闭环的操作任务，如“删除”对象、“购买”商品等。
        </view>
      </view>
      <view class="field label-field">
        <t-input
          label="标签文字"
          layout="vertical"
          placeholder="请输入文字"
        />
      </view>
      <view class="field">
        <t-input
          label="标签文字"
          layout="vertical"
          placeholder="请输入文字"
        />
      </view>
      <view class="action">
        <t-button
          block
          theme="light"
          size="large"
        >
          重置
        </t-button>
        <t-button
          block
          theme="primary"
          size="large"
        >
          确定
        </t-button>
      </view>
    </view>

    <t-guide
      :current="current"
      :steps="steps"
      @skip="close"
      @finish="close"
    >
      <template
        #body-1
      >
        <view
          class="slot-body"
        >
          <p>用户引导的说明文案 1</p>
          <t-image
            t-class="guide-demo-image"
            src="https://tdesign.gtimg.com/demo/demo-image-1.png"
            mode="scaleToFill"
            width="100%;height:380rpx"
          />
        </view>
      </template>
    </t-guide>
  </view>
</template>

<script>
import TGuide from '@tdesign/uniapp/guide/guide.vue';
import TInput from '@tdesign/uniapp/input/input.vue';
import TButton from '@tdesign/uniapp/button/button.vue';
import TImage from '@tdesign/uniapp/image/image.vue';
import { getRect } from '@tdesign/uniapp/common/utils';

export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TGuide,
    TInput,
    TButton,
    TImage,
  },
  data() {
    return {
      current: -1,
      steps: [],
    };
  },
  mounted() {
    // 处理小程序 attached 生命周期
    setTimeout(() => {
      this.attached();
    }, 33);
  },
  created() {},
  methods: {
    attached() {
      this.current = 0;

      this.steps = [
        {
          element: () => getRect(this, '.main-title', false, true),

          title: '用户引导标题',
          body: '用户引导的说明文案',
          placement: 'center',
        },
        {
          element: () => getRect(this, '.label-field', false, true),

          title: '用户引导标题',
          placement: 'bottom',
          mode: 'dialog',
        },
        {
          element: () => getRect(this, '.action', false, true),

          title: '用户引导标题',
          body: '用户引导的说明文案',
          placement: 'bottom-right',
        },
      ];
    },

    close() {
      this.$emit('close');
    },
  },
};
</script>
<style>
.main-title {
    margin: 32rpx;
    display: inline-block;
}

.title-major {
    font-size: 48rpx;
    font-weight: 600;
    line-height: 72rpx;
}

.title-sub {
    font-size: 32rpx;
    font-weight: 400;
    line-height: 48rpx;
    margin-top: 8rpx;
}

.action {
    margin: 63rpx;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 63rpx;
}

.slot-body {
    margin-top: 8rpx;
    text-align: center;
    color: var(--td-text-color-secondary);
    font-size: 32rpx;
    font-weight: 400;
    line-height: 48rpx;
}

.slot-body :deep(.guide-demo-image) {
    margin-top: 48rpx;
    width: 100%;
}
</style>
```


#### 自定义气泡


```vue
<template>
  <view>
    <view>
      <view class="main-title">
        <view class="title-major">
          用户引导标题
        </view>
        <view class="title-sub">
          按钮用于开启一个闭环的操作任务，如“删除”对象、“购买”商品等。
        </view>
      </view>
      <view class="field label-field">
        <t-input
          label="标签文字"
          layout="vertical"
          placeholder="请输入文字"
        />
      </view>
      <view class="field">
        <t-input
          label="标签文字"
          layout="vertical"
          placeholder="请输入文字"
        />
      </view>
      <view class="action">
        <t-button
          block
          theme="light"
          size="large"
        >
          重置
        </t-button>
        <t-button
          block
          theme="primary"
          size="large"
        >
          确定
        </t-button>
      </view>
    </view>

    <t-guide
      :current="current"
      :steps="steps"
      @skip="close"
      @finish="close"
    >
      <template
        #content-0
      >
        <view
          class="content"
        >
          <t-icon
            name="arrow-up"
            size="64rpx"
            color="#fff"
            t-class="icon"
          />
          <p class="text">
            1、自定义的图形或说明文案，用来解释或指导该功能使用。
          </p>
          <view class="footer">
            <t-button
              v-if="current < steps.length - 1"
              theme="light"
              content="跳过"
              size="extra-small"
              :t-class="useVirtualHost ? btn : ''"
              :class="!useVirtualHost ? btn : ''"
              @click="skip"
            />
            <t-button
              v-else
              theme="light"
              content="返回"
              size="extra-small"
              :t-class="useVirtualHost ? btn : ''"
              :class="!useVirtualHost ? btn : ''"
              @click="back"
            />
            <t-button
              v-if="current < steps.length - 1"
              theme="primary"
              content="下一步"
              size="extra-small"
              :t-class="useVirtualHost ? btn : ''"
              :class="!useVirtualHost ? btn : ''"
              @click="next"
            />
            <t-button
              v-else
              theme="primary"
              content="完成"
              size="extra-small"
              :t-class="useVirtualHost ? btn : ''"
              :class="!useVirtualHost ? btn : ''"
              @click="finish"
            />
          </view>
        </view>
      </template>
      <template
        #content-1
      >
        <view
          class="content"
        >
          <t-icon
            name="arrow-up"
            size="64rpx"
            color="#fff"
            t-class="icon"
          />
          <p class="text">
            2、自定义的图形或说明文案，用来解释或指导该功能使用。
          </p>
          <view class="footer">
            <t-button
              v-if="current < steps.length - 1"
              theme="light"
              content="跳过"
              size="extra-small"
              :t-class="useVirtualHost ? btn : ''"
              :class="!useVirtualHost ? btn : ''"
              @click="skip"
            />
            <t-button
              v-else
              theme="light"
              content="返回"
              size="extra-small"
              :t-class="useVirtualHost ? btn : ''"
              :class="!useVirtualHost ? btn : ''"
              @click="back"
            />
            <t-button
              v-if="current < steps.length - 1"
              theme="primary"
              content="下一步"
              size="extra-small"
              :t-class="useVirtualHost ? btn : ''"
              :class="!useVirtualHost ? btn : ''"
              @click="next"
            />
            <t-button
              v-else
              theme="primary"
              content="完成"
              size="extra-small"
              :t-class="useVirtualHost ? btn : ''"
              :class="!useVirtualHost ? btn : ''"
              @click="finish"
            />
          </view>
        </view>
      </template>

      <template
        #content-2
      >
        <view
          class="content"
        >
          <t-icon
            name="arrow-up"
            size="64rpx"
            color="#fff"
            t-class="icon"
          />
          <p class="text">
            3、自定义的图形或说明文案，用来解释或指导该功能使用。
          </p>
          <view class="footer">
            <t-button
              v-if="current < steps.length - 1"
              theme="light"
              content="跳过"
              size="extra-small"
              :t-class="useVirtualHost ? btn : ''"
              :class="!useVirtualHost ? btn : ''"
              @click="skip"
            />
            <t-button
              v-else
              theme="light"
              content="返回"
              size="extra-small"
              :t-class="useVirtualHost ? btn : ''"
              :class="!useVirtualHost ? btn : ''"
              @click="back"
            />
            <t-button
              v-if="current < steps.length - 1"
              theme="primary"
              content="下一步"
              size="extra-small"
              :t-class="useVirtualHost ? btn : ''"
              :class="!useVirtualHost ? btn : ''"
              @click="next"
            />
            <t-button
              v-else
              :t-class="useVirtualHost ? btn : ''"
              :class="!useVirtualHost ? btn : ''"
              theme="primary"
              content="完成"
              size="extra-small"
              @click="finish"
            />
          </view>
        </view>
      </template>
    </t-guide>
  </view>
</template>

<script>
import TGuide from '@tdesign/uniapp/guide/guide.vue';
import TInput from '@tdesign/uniapp/input/input.vue';
import TIcon from '@tdesign/uniapp/icon/icon.vue';
import TButton from '@tdesign/uniapp/button/button.vue';
import { getRect } from '@tdesign/uniapp/common/utils';
import { canUseVirtualHost } from '@tdesign/uniapp/common/version';


export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TGuide,
    TInput,
    TButton,
    TIcon,
  },
  data() {
    return {
      current: -1,
      steps: [],

      ml12: 'margin-left: 12px;',
      useVirtualHost: canUseVirtualHost(),
      btn: 'guide-demo-button',
    };
  },
  mounted() {
    // 处理小程序 attached 生命周期
    setTimeout(() => {
      this.attached();
    }, 33);
  },
  created() {},
  methods: {
    attached() {
      this.current = 0;

      this.steps = [
        {
          element: () => getRect(this, '.main-title', false, true),

          placement: 'center',
        },
        {
          element: () => getRect(this, '.label-field', false, true),
          placement: 'bottom',
          highlightPadding: 0,
        },
        {
          element: () => getRect(this, '.action', false, true),
          placement: 'bottom-right',
        },
      ];
    },

    close() {
      this.$emit('close');
    },

    skip() {
      this.current = -1;
      this.close();
    },

    back() {
      this.current = 0;
    },

    next() {
      this.current = this.current + 1;
    },

    finish() {
      this.current = -1;
      this.close();
    },
  },
};
</script>
<style>
.main-title {
    margin: 32rpx;
    display: inline-block;
}

.title-major {
    font-size: 48rpx;
    font-weight: 600;
    line-height: 72rpx;
}

.title-sub {
    font-size: 32rpx;
    font-weight: 400;
    line-height: 48rpx;
    margin-top: 8rpx;
}

.action {
    margin: 64rpx;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 64rpx;
}

.content {
    width: 480rpx;
}

.content :deep(.icon) {
    font-weight: 700;
    width: 64rpx;
}

.content .text {
    margin-top: 32rpx;
    color: #fff;
    font-size: 32rpx;
    font-weight: 600;
    text-align: left;
    line-height: 48rpx;
}

.content .footer {
    text-align: right;
    margin-top: 32rpx;
}

.content .footer :deep(.guide-demo-button + .guide-demo-button){
    margin-left: 24rpx;
}
</style>
```


## API

### Guide Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
custom-style | Object | - | 自定义样式 | N
back-button-props | Object | - | 透传 返回按钮 的全部属性，示例：`{ content: '返回', theme: 'default' }`。TS 类型：`ButtonProps` | N
counter | String / Function | - | 用于自定义渲染计数部分。TS 类型：`string \| ((params: { total: number; current: number }) => string)` | N
current | Number | - | 当前步骤，即整个引导的进度。-1 则不展示，用于需要中断展示的场景。支持语法糖 `v-model:current` | N
default-current | Number | - | 当前步骤，即整个引导的进度。-1 则不展示，用于需要中断展示的场景。非受控属性 | N
finish-button-props | Object | - | 透传 完成按钮 的全部属性，示例：`{ content: '完成', theme: 'primary' }`。TS 类型：`ButtonProps` | N
hide-back | Boolean | false | 是否隐藏返回按钮 | N
hide-counter | Boolean | false | 是否隐藏计数 | N
hide-skip | Boolean | false | 是否隐藏跳过按钮 | N
highlight-padding | Number | 16 | 高亮框的内边距，单位rpx | N
mode | String | popover | 引导框的类型。可选项：popover/dialog | N
next-button-props | Object | - | 透传 下一步按钮 的全部属性，示例：{ content: '下一步', theme: 'primary' }。TS 类型：`ButtonProps`，[Button API Documents](./button?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/guide/type.ts) | N
show-overlay | Boolean | true | 是否出现遮罩层 | N
skip-button-props | Object | - | 透传 跳过按钮 的全部属性，{ content: '跳过', theme: 'default' }。TS 类型：`ButtonProps` | N
steps | Array | - | 用于定义每个步骤的内容，包括高亮的节点、相对位置和具体的文案内容等。TS 类型：`Array<GuideStep>` | N
using-custom-navbar | Boolean | false | 是否使用了自定义导航栏 | N
z-index | Number | 999999 | 提示框的层级 | N

### Guide Events

名称 | 参数 | 描述
-- | -- | --
back | `(context: { e: MouseEvent, current: number, total: number  })` | 点击返回按钮时触发
change | `(current: number, context?: { e: MouseEvent,  total: number })` | 当前步骤发生变化时触发
finish | `(context: { e: MouseEvent, current: number, total: number  })` | 点击完成按钮时触发
next-step-click | `(context: { e: MouseEvent, next: number, current: number, total: number  })` | 点击下一步时触发
skip | `(context: { e: MouseEvent, current: number, total: number  })` | 点击跳过按钮时触发

### Guide External Classes

类名 | 描述
-- | --
t-class | 根节点样式类
t-class-back | 返回按钮样式类
t-class-body | 高亮框提示内容主体样式类
t-class-finish | 结束按钮样式类
t-class-footer | 高亮框底部操作区域样式类
t-class-next | 下一步按钮样式类
t-class-popover | 引导框样式类
t-class-reference | 高亮框样式类
t-class-skip | 跳过按钮样式类
t-class-title | 高亮框提示内容标题样式类
t-class-tooltip | 高亮框提示内容区域样式类

### GuideStep

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
back-button-props | Object | - | 用于自定义当前引导框的返回按钮的内容。TS 类型：`ButtonProps` | N
body | String | - | 当前步骤提示框的内容，支持插槽：slot="body-{{index}}" (1、当要显示body-{{index}}插槽时，请将body设置为空；2、当要显示content-{{index}}插槽完全自定义内容时，请将body和title都设置为空) | N
element | Function | - | 必需。高亮的节点。示例： `() => new Promise((resolve) => this.createSelectorQuery().select('#tdesign').boundingClientRect((rect) => resolve(rect)).exec())`。TS 类型：`StepElement` `type StepElement = () => Promise<WechatMiniprogram.BoundingClientRectCallbackResult>`。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/guide/type.ts) | Y
finish-button-props | Object | - | 透传 完成 的全部属性，示例：`{ content: '完成', theme: 'primary' }`。TS 类型：`ButtonProps` | N
highlight-padding | Number | - | 高亮框的内边距，单位rpx | N
mode | String | - | 引导框的类型。可选项：popover/dialog | N
next-button-props | Object | - | 用于自定义当前引导框的下一步按钮的内容。TS 类型：`ButtonProps` | N
offset | Array | - | 相对于 placement 的偏移量[left, top]，默认单位rpx，示例：[-10, 20] 或 ['10px', '8px'] 或 ['20rpx', '16rpx'] (仅当 `mode` 为 `popover` 时生效)。TS 类型：`Array<string \| number>` | N
placement | String | 'top' | 引导框相对于高亮元素出现的位置，(仅当 `mode` 为 `popover` 时生效)。TS 类型：`StepPopoverPlacement ` `type StepPopoverPlacement = 'top'\|'left'\|'right'\|'bottom'\|'top-left'\|'top-right'\|'bottom-left'\|'bottom-right'\|'left-top'\|'left-bottom'\|'right-top'\|'right-bottom'\|'center'`。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/guide/type.ts) | N
show-overlay | Boolean | true | 是否出现遮罩层 | N
skip-button-props | Object | - | 用于自定义当前步骤引导框的跳过按钮的内容。TS 类型：`ButtonProps` | N
title | String | - | 当前步骤的标题内容，支持插槽：slot="title-{{index}}" (1、当要显示body-{{index}}插槽时，请将title设置为空；2、当要显示content-{{index}}插槽完全自定义内容时，请将body和title都设置为空) | N

### CSS Variables

组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-guide-body-color | @text-color-secondary | -
--td-guide-dialog-body-font | @font-body-large | -
--td-guide-dialog-body-margin-top | 16rpx | -
--td-guide-dialog-body-text-align | center | -
--td-guide-dialog-border-radius | @radius-extraLarge | -
--td-guide-dialog-footer-button-padding | 0 @spacer-3 | -
--td-guide-dialog-padding | @spacer-3 0 | -
--td-guide-dialog-title-font | @font-title-large | -
--td-guide-dialog-title-text-align | center | -
--td-guide-dialog-width | 622rpx | -
--td-guide-footer-button-space | @spacer-1 | -
--td-guide-footer-margin-top | @spacer-3 | -
--td-guide-footer-text-align | right | -
--td-guide-popover-bg-color | @bg-color-container | -
--td-guide-popover-body-font | @font-body-medium | -
--td-guide-popover-body-margin-top | 8rpx | -
--td-guide-popover-body-text-align | left | -
--td-guide-popover-border | 2rpx solid @component-border | -
--td-guide-popover-border-radius | @radius-large | -
--td-guide-popover-max-width | 540rpx | -
--td-guide-popover-min-width | 480rpx | -
--td-guide-popover-padding | @spacer-2 | -
--td-guide-popover-shadow | @shadow-3 | -
--td-guide-popover-title-font | @font-title-medium | -
--td-guide-popover-title-text-align | left | -
--td-guide-reference-border | 4rpx solid @brand-color | -
--td-guide-reference-border-radius | @radius-default | -
--td-guide-reference-mask-color | @font-gray-2 | -
--td-guide-title-color | @text-color-primary | -
