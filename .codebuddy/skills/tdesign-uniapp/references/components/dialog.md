---
name: "dialog"
description: "用于显示重要提示或请求用户进行重要操作，一种打断当前操作的模态视图。"
url: "https://tdesign.tencent.com/uniapp/components/dialog"
---



## 引入

可在 `main.ts` 或在需要使用的页面或组件中引入。

```js
import TDialog from '@tdesign/uniapp/dialog/dialog.vue';
```

### 组件类型

按钮的样式，默认使用 `variant = text`，如果任意按钮改变了 `variant`，那么全部按钮都改变成这个。

#### 反馈类对话框


```vue
<template>
  <view>
    <t-button
      t-class="wrapper"
      theme="primary"
      size="large"
      variant="outline"
      data-key="showTextAndTitle"
      block
      @click="showDialog($event, { key: 'showTextAndTitle' })"
    >
      反馈类-带标题
    </t-button>
    <t-dialog
      :visible="showTextAndTitle"
      title="对话框标题"
      content="告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内"
      :confirm-btn="confirmBtn"
      @confirm="closeDialog"
    />

    <t-button
      t-class="wrapper"
      theme="primary"
      size="large"
      variant="outline"
      data-key="showContentOnly"
      block
      @click="showDialog($event, { key: 'showContentOnly' })"
    >
      反馈类-无标题
    </t-button>
    <t-dialog
      :visible="showContentOnly"
      content="告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内"
      :confirm-btn="confirmBtn"
      @confirm="closeDialog"
    />

    <t-button
      t-class="wrapper"
      theme="primary"
      size="large"
      variant="outline"
      data-key="showTitleOnly"
      block
      @click="showDialog($event, { key: 'showTitleOnly' })"
    >
      反馈类-纯标题
    </t-button>
    <t-dialog
      :visible="showTitleOnly"
      title="对话框标题"
      :confirm-btn="confirmBtn"
      @confirm="closeDialog"
    />

    <t-button
      t-class="wrapper"
      theme="primary"
      size="large"
      variant="outline"
      data-key="showMultiTextAndTitle"
      block
      @click="showDialog($event, { key: 'showMultiTextAndTitle' })"
    >
      反馈类-内容超长
    </t-button>
    <t-dialog
      :visible="showMultiTextAndTitle"
      title="对话框标题"
      :confirm-btn="confirmBtn"
      @confirm="closeDialog"
    >
      <template
        #content
      >
        <!-- 适配skyline，增加type="list" -->
        <scroll-view
          type="list"
          scroll-y
          class="long-content"
        >
          <view class="content-container">
            这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案 这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案
            这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案 这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案
            这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案 这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案
            这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案 这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案
            这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案 这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案
          </view>
        </scroll-view>
      </template>
    </t-dialog>
  </view>
</template>

<script>
import TButton from '@tdesign/uniapp/button/button.vue';
import TDialog from '@tdesign/uniapp/dialog/dialog.vue';
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TButton,
    TDialog,
  },
  data() {
    return {
      confirmBtn: {
        content: '知道了',
        variant: 'base',
      },

      dialogKey: '',
      showText: false,
      showMultiText: false,
      showTextAndTitle: false,
      showTitleOnly: false,
      showMultiTextAndTitle: false,
      showContentOnly: false,
    };
  },
  created() {},
  methods: {
    showDialog(e, { key }) {
      this[key] = true;
      this.dialogKey = key;
    },
    closeDialog() {
      const { dialogKey } = this;
      this[dialogKey] = false;
    },
  },
};
</script>
<style>
.wrapper {
    margin-bottom: 32rpx;
}

.long-content {
    height: 576rpx;
    margin-top: 16rpx;
    font-size: 32rpx;
    color: #888;
}

.long-content .content-container {
    white-space: pre-line;
}

.long-content ::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
}
</style>
```


> 使用这种方式，对话框的 `visible` 是受控的，需要手动设置额 `visible` 为 `false` 才会关闭对话框。

#### 确认类对话框


```vue
<template>
  <view>
    <t-button
      t-class="wrapper"
      theme="primary"
      size="large"
      variant="outline"
      data-key="showConfirm"
      block
      @click="showDialog($event, { key: 'showConfirm' })"
    >
      确认类-带标题
    </t-button>
    <t-dialog
      :visible="showConfirm"
      title="对话框标题"
      content="告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内"
      :confirm-btn="confirmBtn"
      cancel-btn="取消"
      @confirm="closeDialog"
      @cancel="closeDialog"
    />

    <t-button
      t-class="wrapper"
      theme="primary"
      size="large"
      variant="outline"
      data-key="showWarnConfirm"
      block
      @click="showDialog($event, { key: 'showWarnConfirm' })"
    >
      确认类-无标题
    </t-button>
    <t-dialog
      :visible="showWarnConfirm"
      content="告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内"
      :confirm-btn="{ content: '警示操作', variant: 'base', theme: 'danger' }"
      cancel-btn="取消"
      @confirm="closeDialog"
      @cancel="closeDialog"
    />

    <t-button
      t-class="wrapper"
      theme="primary"
      size="large"
      variant="outline"
      data-key="showLightConfirm"
      block
      @click="showDialog($event, { key: 'showLightConfirm' })"
    >
      确认类-纯标题
    </t-button>
    <t-dialog
      :visible="showLightConfirm"
      title="对话框标题"
      :confirm-btn="{ content: '确定', variant: 'base', theme: 'light' }"
      cancel-btn="取消"
      @confirm="closeDialog"
      @cancel="closeDialog"
    />
  </view>
</template>

<script>
import TButton from '@tdesign/uniapp/button/button.vue';
import TDialog from '@tdesign/uniapp/dialog/dialog.vue';
export default {
  components: {
    TButton,
    TDialog,
  },
  data() {
    return {
      confirmBtn: {
        content: '确定',
        variant: 'base',
      },
      dialogKey: '',
      showConfirm: false,
      showWarnConfirm: false,
      showLightConfirm: false,
    };
  },
  created() {},
  methods: {
    showDialog(e, { key }) {
      this[key] = true;
      this.dialogKey = key;
    },
    closeDialog() {
      const { dialogKey } = this;
      this[dialogKey] = false;
    },
  },
};
</script>
<style>
.wrapper {
    margin-bottom: 32rpx;
}
</style>
```


#### 输入类对话框


```vue
<template>
  <view>
    <t-button
      t-class="wrapper"
      size="large"
      theme="primary"
      variant="outline"
      data-key="showWithInput"
      block
      @click="showDialog($event, { key: 'showWithInput' })"
    >
      输入类-无描述
    </t-button>
    <t-dialog
      :visible="showWithInput"
      :custom-style="dialogCustomStyle"
      title="带输入框对话框"
      confirm-btn="确定"
      cancel-btn="取消"
      @confirm="closeDialog"
      @cancel="closeDialog"
    >
      <template
        #content
      >
        <t-input
          borderless
          t-class="dialog-input"
          clearable
          placeholder="输入12文案"
          placeholder-class="placeholder"
          :custom-style="inputStyle"
          :placeholder-style="placeholderStyle"
        />
      </template>
    </t-dialog>

    <t-button
      t-class="wrapper"
      theme="primary"
      size="large"
      variant="outline"
      data-key="showTextAndTitleWithInput"
      block
      @click="showDialog($event, { key: 'showTextAndTitleWithInput' })"
    >
      输入类-带描述
    </t-button>
    <t-dialog
      :visible="showTextAndTitleWithInput"
      title="带输入框对话框"
      :custom-style="dialogCustomStyle"
      content="告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内"
      confirm-btn="确定"
      cancel-btn="取消"
      @confirm="closeDialog"
      @cancel="closeDialog"
    >
      <template
        #content
      >
        <t-input
          borderless
          t-class="dialog-input"
          :custom-style="inputStyle"
          clearable
          placeholder="输入12文案"
          placeholder-class="placeholder"
          :placeholder-style="placeholderStyle"
        />
      </template>
    </t-dialog>
  </view>
</template>

<script>
import TButton from '@tdesign/uniapp/button/button.vue';
import TInput from '@tdesign/uniapp/input/input.vue';
import TDialog from '@tdesign/uniapp/dialog/dialog.vue';
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TButton,
    TInput,
    TDialog,
  },
  data() {
    let dialogCustomStyle = '';
    // #ifdef MP-WEIXIN
    dialogCustomStyle = 'transition: none';
    // #endif
    return {
      dialogKey: '',
      showWithInput: false,
      showTextAndTitleWithInput: false,
      dialogCustomStyle,

      inputStyle: 'background-color: var(--td-bg-color-page);padding-top: 12px;padding-bottom: 12px;',
      placeholderStyle: 'color: var(--td-text-color-placeholder);height: 24px;line-height: 24px;display: flex;align-items: center;',
    };
  },
  created() {},
  methods: {
    showDialog(e, { key }) {
      this[key] = true;
      this.dialogKey = key;
    },
    closeDialog() {
      const { dialogKey } = this;
      this[dialogKey] = false;
    },
  },
};
</script>
<style>
.wrapper {
  margin-bottom: 32rpx;
}

:deep(.dialog-input) {
  text-align: left;
  margin-top: 32rpx;
  border-radius: 8rpx;
  background-color: var(--td-bg-color-page);
  box-sizing: border-box;
}
</style>
```


#### 带图片对话框


```vue
<template>
  <view>
    <t-button
      t-class="wrapper"
      size="large"
      theme="primary"
      variant="outline"
      data-key="imageOnTop"
      block
      @click="showDialog($event, { key: 'imageOnTop' })"
    >
      图片置顶-带标题描述
    </t-button>
    <t-dialog
      :visible="imageOnTop"
      title="对话框标题"
      content="告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内"
      :confirm-btn="{ content: '确定', variant: 'base' }"
      cancel-btn="取消"
      @confirm="closeDialog"
      @cancel="closeDialog"
    >
      <template
        #top
      >
        <t-image
          t-class="dialog-image"
          src="https://tdesign.gtimg.com/mobile/demos/dialog1.png"
        />
      </template>
    </t-dialog>

    <t-button
      t-class="wrapper"
      size="large"
      theme="primary"
      variant="outline"
      data-key="imageOnTopWithContent"
      block
      @click="showDialog($event, { key: 'imageOnTopWithContent' })"
    >
      图片置顶-无标题
    </t-button>
    <t-dialog
      :visible="imageOnTopWithContent"
      content="告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内"
      :confirm-btn="{ content: '确定', variant: 'base' }"
      cancel-btn="取消"
      @confirm="closeDialog"
      @cancel="closeDialog"
    >
      <template
        #top
      >
        <t-image
          t-class="dialog-image"
          src="https://tdesign.gtimg.com/mobile/demos/dialog1.png"
        />
      </template>
    </t-dialog>

    <t-button
      t-class="wrapper"
      size="large"
      theme="primary"
      variant="outline"
      data-key="imageOnTopWithTitle"
      block
      @click="showDialog($event, { key: 'imageOnTopWithTitle' })"
    >
      图片置顶-纯标题
    </t-button>
    <t-dialog
      :visible="imageOnTopWithTitle"
      title="对话框标题"
      :confirm-btn="{ content: '确定', variant: 'base' }"
      cancel-btn="取消"
      @confirm="closeDialog"
      @cancel="closeDialog"
    >
      <template
        #top
      >
        <t-image
          t-class="dialog-image"
          src="https://tdesign.gtimg.com/mobile/demos/dialog1.png"
        />
      </template>
    </t-dialog>

    <t-button
      t-class="wrapper"
      theme="primary"
      size="large"
      variant="outline"
      data-key="imageOnMiddleWithImage"
      block
      @click="showDialog($event, { key: 'imageOnMiddleWithImage' })"
    >
      图片置顶-纯图片
    </t-button>
    <t-dialog
      :visible="imageOnMiddleWithImage"
      :confirm-btn="{ content: '确定', variant: 'base' }"
      cancel-btn="取消"
      @confirm="closeDialog"
      @cancel="closeDialog"
    >
      <template
        #top
      >
        <t-image
          t-class="dialog-image"
          src="https://tdesign.gtimg.com/mobile/demos/dialog1.png"
        />
      </template>
    </t-dialog>

    <t-button
      t-class="wrapper"
      theme="primary"
      size="large"
      variant="outline"
      data-key="imageOnMiddle"
      block
      @click="showDialog($event, { key: 'imageOnMiddle' })"
    >
      图片居中-带标题描述
    </t-button>
    <t-dialog
      :visible="imageOnMiddle"
      title="对话框标题"
      content="告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内"
      :confirm-btn="{ content: '确定', variant: 'base' }"
      cancel-btn="取消"
      @confirm="closeDialog"
      @cancel="closeDialog"
    >
      <template
        #middle
      >
        <t-image
          t-class="image-host dialog-image"
          src="https://tdesign.gtimg.com/mobile/demos/dialog1.png"
        />
      </template>
    </t-dialog>

    <t-button
      t-class="wrapper"
      theme="primary"
      size="large"
      variant="outline"
      data-key="imageOnMiddleWithTitle"
      block
      @click="showDialog($event, { key: 'imageOnMiddleWithTitle' })"
    >
      图片居中-纯标题
    </t-button>
    <t-dialog
      :visible="imageOnMiddleWithTitle"
      title="对话框标题"
      :confirm-btn="{ content: '确定', variant: 'base' }"
      cancel-btn="取消"
      @confirm="closeDialog"
      @cancel="closeDialog"
    >
      <template
        #middle
      >
        <t-image
          t-class="image-host dialog-image"
          src="https://tdesign.gtimg.com/mobile/demos/dialog1.png"
        />
      </template>
    </t-dialog>
  </view>
</template>

<script>
import TButton from '@tdesign/uniapp/button/button.vue';
import TImage from '@tdesign/uniapp/image/image.vue';
import TDialog from '@tdesign/uniapp/dialog/dialog.vue';
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TButton,
    TImage,
    TDialog,
  },
  data() {
    return {
      dialogKey: '',
      imageOnTop: false,
      imageOnTopWithContent: false,
      imageOnTopWithTitle: false,
      imageOnMiddle: false,
      imageOnMiddleWithTitle: false,
      imageOnMiddleWithImage: false,
    };
  },
  created() {},
  methods: {
    showDialog(e, { key }) {
      this[key] = true;
      this.dialogKey = key;
    },
    closeDialog() {
      const { dialogKey } = this;
      this[dialogKey] = false;
    },
  },
};
</script>
<style>
.wrapper {
    margin-bottom: 32rpx;
}

.dialog-image {
    width: 100%;
    height: 160px;
}

.image-host {
    display: block;
    margin-top: 48rpx;
}
</style>
```


### 组件状态


```vue
<template>
  <view>
    <view class="demo-desc">
      文字按钮
    </view>
    <t-button
      t-class="wrapper"
      theme="primary"
      size="large"
      variant="outline"
      data-key="showConfirm"
      block
      @click="showDialog($event, { key: 'showConfirm' })"
    >
      文字按钮
    </t-button>
    <t-dialog
      :visible="showConfirm"
      title="对话框标题"
      content="告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内"
      confirm-btn="确定"
      cancel-btn="取消"
      @confirm="closeDialog"
      @cancel="closeDialog"
    />

    <view class="demo-desc">
      水平基础按钮
    </view>
    <t-button
      t-class="wrapper"
      theme="primary"
      size="large"
      variant="outline"
      data-key="showWarnConfirm"
      block
      @click="showDialog($event, { key: 'showWarnConfirm' })"
    >
      水平基础按钮
    </t-button>
    <t-dialog
      :visible="showWarnConfirm"
      content="告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内"
      :confirm-btn="{ content: '确定', variant: 'base' }"
      cancel-btn="取消"
      @confirm="closeDialog"
      @cancel="closeDialog"
    />

    <view class="demo-desc">
      垂直基础按钮
    </view>
    <t-button
      t-class="wrapper"
      theme="primary"
      size="large"
      variant="outline"
      data-key="showTooLongBtnContent"
      block
      @click="showDialog($event, { key: 'showTooLongBtnContent' })"
    >
      垂直基础按钮
    </t-button>
    <t-dialog
      :visible="showTooLongBtnContent"
      title="对话框标题"
      content="告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内"
      :confirm-btn="confirmBtn"
      cancel-btn="取消"
      button-layout="vertical"
      @confirm="closeDialog"
      @cancel="closeDialog"
    />

    <view class="demo-desc">
      多按钮
    </view>
    <t-button
      t-class="wrapper"
      theme="primary"
      size="large"
      variant="outline"
      data-key="showMultiBtn"
      block
      @click="showDialog($event, { key: 'showMultiBtn' })"
    >
      多按钮
    </t-button>
    <t-dialog
      :visible="showMultiBtn"
      title="对话框标题"
      content="告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内"
      button-layout="vertical"
      :actions="multiBtnList"
      @action="closeDialog"
    />

    <view class="demo-desc">
      带关闭按钮的对话框
    </view>
    <t-button
      t-class="wrapper"
      theme="primary"
      size="large"
      variant="outline"
      data-key="showCloseBtn"
      block
      @click="showDialog($event, { key: 'showCloseBtn' })"
    >
      带关闭按钮的对话框
    </t-button>
    <t-dialog
      :visible="showCloseBtn"
      title="对话框标题"
      content="告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内"
      close-btn
      :confirm-btn="{ content: '警示操作', variant: 'base', theme: 'danger' }"
      cancel-btn="取消"
      @confirm="closeDialog"
      @cancel="closeDialog"
    />
  </view>
</template>

<script>
import TButton from '@tdesign/uniapp/button/button.vue';
import TDialog from '@tdesign/uniapp/dialog/dialog.vue';
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TButton,
    TDialog,
  },
  data() {
    return {
      confirmBtn: {
        content: '确定',
        variant: 'base',
      },

      dialogKey: '',
      showConfirm: false,
      showWarnConfirm: false,
      showTooLongBtnContent: false,
      showMultiBtn: false,
      showCloseBtn: false,

      multiBtnList: [
        {
          content: '次要按钮',
          theme: 'light',
        },
        {
          content: '次要按钮',
          theme: 'light',
        },
        {
          content: '主要按钮',
          theme: 'primary',
        },
      ],

    };
  },
  created() {},
  methods: {
    showDialog(e, { key }) {
      this[key] = true;
      this.dialogKey = key;
    },
    closeDialog(e) {
      console.log('close: ', e);
      const { dialogKey } = this;
      this[dialogKey] = false;
    },
  },
};
</script>
<style scoped>
.demo-desc {
    margin: 0 0 32rpx;
}

.wrapper {
    margin-bottom: 32rpx;
}
</style>
```


### 组件用法
#### 命令调用


```vue
<template>
  <view>
    <t-button
      size="large"
      variant="outline"
      theme="primary"
      block
      @click="showDialog"
    >
      命令行操作
    </t-button>
    <t-dialog
      ref="t-dialog"
    />
  </view>
</template>

<script>
import TButton from '@tdesign/uniapp/button/button.vue';
import TDialog from '@tdesign/uniapp/dialog/dialog.vue';
import Dialog from '@tdesign/uniapp/dialog/index';
export default {
  components: {
    TButton,
    TDialog,
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    showDialog() {
      const dialogConfig = {
        context: this,
        title: '弹窗标题',
        closeOnOverlayClick: true,
        content: '告知当前状态、信息和解决方法等内容。',
        confirmBtn: '确定',
        cancelBtn: '取消',
      };
      Dialog.confirm(dialogConfig)
        .then(data => console.log('点击了确定', data))
        .catch(data => console.log('点击了取消', data));
    },
  },
};
</script>
<style>
</style>
```


#### 开放能力按钮

当传入的按钮类型为对象时，整个对象都将透传至 `t-button`，因此按钮可以直接使用开放能力


```vue
<template>
  <view>
    <t-button
      size="large"
      theme="primary"
      variant="outline"
      data-type="hasCancelBtn"
      block
      @click="showDialog($event, { type: 'hasCancelBtn' })"
    >
      开放能力按钮
    </t-button>
    <t-dialog
      ref="t-dialog"
    />
  </view>
</template>

<script>
import TButton from '@tdesign/uniapp/button/button.vue';
import TDialog from '@tdesign/uniapp/dialog/dialog.vue';
import Dialog from '@tdesign/uniapp/dialog/index';
export default {
  components: {
    TButton,
    TDialog,
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    showDialog() {
      const dialogConfig = {
        context: this,
        title: '弹窗标题',
        content: '告知当前状态、信息和解决方法等内容。',
        cancelBtn: '取消',
        confirmBtn: {
          openType: 'share',
          content: '分享给朋友',
          bindgetphonenumber({ detail }) {
            console.log(detail);
            if (detail.errMsg.includes('fail')) {
              console.log('获取失败');
              return false; // 不关闭弹窗
            }
            return true; // 关闭弹窗
          },
        },
      };
      Dialog.confirm(dialogConfig)
        .then(() => {
          console.log('点击确定');
        })
        .catch(() => {
          console.log('点击取消');
        });
    },
  },
};
</script>
<style>
</style>
```


## API

### Dialog Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
custom-style | Object | - | 自定义样式 | N
actions | Array | - | 操作栏。TS 类型：`Array<ButtonProps>`，[Button API Documents](./button?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/dialog/type.ts) | N
button-layout | String | horizontal | 多按钮排列方式。可选项：horizontal/vertical | N
cancel-btn | String / Object | - | 取消按钮，可自定义。值为 null 则不显示取消按钮。值类型为字符串，则表示自定义按钮文本，值类型为 Object 则表示透传 Button 组件属性。使用 Slot 自定义按钮时，需自行控制取消事件。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/dialog/type.ts) | N
close-btn | Boolean / Object | false | 是否展示关闭按钮，值为 `true` 显示默认关闭按钮；值为 `false` 则不显示关闭按钮；使用 Object 时透传至图标组件。TS 类型：`boolean \| ButtonProps \| null`，[Button API Documents](./button?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/dialog/type.ts) | N
close-on-overlay-click | Boolean | false | 点击蒙层时是否触发关闭事件 | N
confirm-btn | String / Object | - | 确认按钮。值为 null 则不显示确认按钮。值类型为字符串，则表示自定义按钮文本，值类型为 Object 则表示透传 Button 组件属性。使用 Slot 自定义按钮时，需自行控制确认事件 | N
content | String | - | 内容 | N
overlay-props | Object | {} | 透传至 Overlay 组件。TS 类型：`OverlayProps`，[Overlay API Documents](./overlay?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/dialog/type.ts) | N
prevent-scroll-through | Boolean | true | 防止滚动穿透 | N
show-overlay | Boolean | true | 是否显示遮罩层 | N
title | String | - | 标题 | N
using-custom-navbar | Boolean | false | 是否使用了自定义导航栏 | N
visible | Boolean | - | 控制对话框是否显示 | N
z-index | Number | 11500 | 对话框层级，Web 侧样式默认为 2500，移动端样式默认 2500，小程序样式默认为 11500 | N

### Dialog Events

名称 | 参数 | 描述
-- | -- | --
action | `(context: { index: number })` | 点击多按钮中的其中一个时触发
cancel | `(context: { e: MouseEvent })` | 如果“取消”按钮存在，则点击“取消”按钮时触发，同时触发关闭事件
close | `(context: { trigger: DialogEventSource })` | 关闭事件，点击 取消按钮 或 点击蒙层 时触发。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/dialog/type.ts)。<br/>`type DialogEventSource = 'cancel' \| 'overlay' \| 'close-btn'`<br/>
confirm | `(context: { e: MouseEvent })` | 如果“确认”按钮存在，则点击“确认”按钮时触发
overlay-click | `(context: { e: MouseEvent })` | 如果蒙层存在，点击蒙层时触发

### Dialog Slots

名称 | 描述
-- | --
actions | 自定义 `actions` 显示内容
cancel-btn | 自定义 `cancel-btn` 显示内容
confirm-btn | 自定义 `confirm-btn` 显示内容
content | 自定义 `content` 显示内容
middle | 中间自定义内容
title | 自定义 `title` 显示内容
top | 顶部自定义内容

### Dialog External Classes

类名 | 描述
-- | --
t-class | 根节点样式类
t-class-action | 操作样式类
t-class-cancel | 取消样式类
t-class-confirm | 确认样式类
t-class-content | 内容样式类

### CSS Variables

组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-dialog-body-max-height | 912rpx | -
--td-dialog-border-radius | @radius-extraLarge | -
--td-dialog-close-color | @text-color-placeholder | -
--td-dialog-content-color | @text-color-secondary | -
--td-dialog-content-font | @font-body-large | -
--td-dialog-title-color | @text-color-primary | -
--td-dialog-title-font | @font-title-large | -
--td-dialog-width | 622rpx | -
