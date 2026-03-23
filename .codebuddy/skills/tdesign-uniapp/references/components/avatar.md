---
name: "avatar"
description: "用于展示用户头像信息，除了纯展示也可点击进入个人详情等操作。"
url: "https://tdesign.tencent.com/uniapp/components/avatar"
---



## 引入

可在 `main.ts` 或在需要使用的页面或组件中引入。

```js
import TAvatar from '@tdesign/uniapp/avatar/avatar.vue';
import TAvatarGroup from '@tdesign/uniapp/avatar-group/avatar-group.vue';
```

### 头像类型

图片头像


```vue
<template>
  <view>
    <t-avatar
      t-class="avatar-example"
      :image="image"
    />
    <t-avatar
      t-class="avatar-example"
      shape="round"
      :image="image"
    />
  </view>
</template>

<script>
import TAvatar from '@tdesign/uniapp/avatar/avatar.vue';
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TAvatar,
  },
  data() {
    return {
      image: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
    };
  },
  created() {},
  methods: {},
};
</script>
<style>
:deep(.avatar-example) {
    margin-right: 64rpx;
}
</style>
```


字符头像


```vue
<template>
  <view>
    <t-avatar
      t-class="avatar-example"
      t-class-content="external-class-content"
      aria-label="字符头像"
    >
      A
    </t-avatar>
    <t-avatar
      t-class="avatar-example"
      t-class-content="external-class-content"
      shape="round"
    >
      A
    </t-avatar>
  </view>
</template>

<script>
import TAvatar from '@tdesign/uniapp/avatar/avatar.vue';
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TAvatar,
  },
  data() {
    return {
      image: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
    };
  },
  created() {},
  methods: {},
};
</script>
<style>
.avatar-example:not(:last-child) {
  margin-right: 64rpx;
}

:deep(.external-class-content) {
  color: #fff;
  background-color: var(--td-brand-color, #0052d9);
  font-weight: 400;
}
</style>
```


图标头像


```vue
<template>
  <view>
    <t-avatar
      t-class="avatar-example"
      icon="user"
    />
    <t-avatar
      t-class="avatar-example"
      shape="round"
      icon="user"
    />
  </view>
</template>

<script>
import TAvatar from '@tdesign/uniapp/avatar/avatar.vue';
export default {
  components: {
    TAvatar,
  },
  data() {
    return {
      image: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
    };
  },
  created() {},
  methods: {},
};
</script>
<style>
.avatar-example:not(:last-child) {
    margin-right: 64rpx;
}
</style>
```


徽标头像


```vue
<template>
  <view>
    <t-avatar
      t-class="avatar-example"
      :image="image"
      :badge-props="{dot: true, offset: [0, 4] }"
    />
    <t-avatar
      t-class="avatar-example"
      t-class-content="external-class-content"
      :badge-props="{count: 8, offset: [-6, 6] }"
    >
      A
    </t-avatar>
    <t-avatar
      t-class="avatar-example"
      icon="user"
      :badge-props="{count: 12, offset: [-6, 6] }"
    />
  </view>
</template>

<script>
import TAvatar from '@tdesign/uniapp/avatar/avatar.vue';
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TAvatar,
  },
  data() {
    return {
      image: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
    };
  },
  created() {},
  methods: {},
};
</script>
<style>
.avatar-example:not(:last-child) {
  margin-right: 64rpx;
}

:deep(.external-class-content) {
  color: #fff;
  background-color: var(--td-brand-color, #0052d9);
  font-weight: 400;
}
</style>
```



### 组合头像

纯展示


```vue
<template>
  <view>
    <t-avatar-group
      :max="5"
      collapse-avatar="+5"
    >
      <t-avatar
        v-for="(pic, index) in pics"
        :key="index"
        :image="pic"
      />
    </t-avatar-group>
  </view>
</template>

<script>
import TAvatar from '@tdesign/uniapp/avatar/avatar.vue';
import TAvatarGroup from '@tdesign/uniapp/avatar-group/avatar-group.vue';
export default {
  components: {
    TAvatar,
    TAvatarGroup,
  },
  data() {
    return {
      pics: [
        'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
        'https://tdesign.gtimg.com/mobile/demos/avatar2.png',
        'https://tdesign.gtimg.com/mobile/demos/avatar3.png',
        'https://tdesign.gtimg.com/mobile/demos/avatar4.png',
        'https://tdesign.gtimg.com/mobile/demos/avatar5.png',
        'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
      ],
      pic: '',
    };
  },
  created() {},
  methods: {},
};
</script>
<style>
</style>
```


带操作


```vue
<template>
  <view>
    <t-avatar-group
      cascading="right-up"
      :max="5"
      @collapsed-item-click="onClickCollapsedAvatar"
    >
      <t-avatar
        v-for="(pic, index) in pics"
        :key="index"
        :image="pic"
      />
    </t-avatar-group>
  </view>
</template>

<script>
import TAvatar from '@tdesign/uniapp/avatar/avatar.vue';
import TAvatarGroup from '@tdesign/uniapp/avatar-group/avatar-group.vue';
export default {
  components: {
    TAvatar,
    TAvatarGroup,
  },
  data() {
    return {
      pics: [
        'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
        'https://tdesign.gtimg.com/mobile/demos/avatar2.png',
        'https://tdesign.gtimg.com/mobile/demos/avatar3.png',
        'https://tdesign.gtimg.com/mobile/demos/avatar4.png',
        'https://tdesign.gtimg.com/mobile/demos/avatar5.png',
        'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
      ],
      pic: '',
    };
  },
  created() {},
  methods: {
    onAddTap() {
      uni.showToast({
        title: '您按下了添加',
        icon: 'none',
        duration: 1000,
      });
    },
    onClickCollapsedAvatar() {
      console.log('click collapsed avatar');
    },
  },
};
</script>
<style>
</style>
```


### 头像尺寸

头像 large/medium/small 尺寸


```vue
<template>
  <view>
    <view class="avatar-example">
      <t-avatar
        t-class="avatar-example--large"
        :image="image"
        size="large"
      />
      <t-avatar
        t-class="avatar-example--large"
        t-class-content="external-class-content"
        size="large"
      >
        A
      </t-avatar>
      <t-avatar
        t-class="avatar-example--large"
        icon="user"
        size="large"
      />
    </view>

    <view class="avatar-example">
      <t-avatar
        t-class="avatar-example--medium"
        :image="image"
      />
      <t-avatar
        t-class="avatar-example--medium"
        t-class-content="external-class-content"
        size="medium"
      >
        A
      </t-avatar>
      <t-avatar
        t-class="avatar-example--medium"
        icon="user"
        size="medium"
      />
    </view>

    <view class="avatar-example">
      <t-avatar
        t-class="avatar-example--small"
        :image="image"
        size="small"
      />
      <t-avatar
        t-class="avatar-example--small"
        t-class-content="external-class-content"
        size="small"
      >
        A
      </t-avatar>
      <t-avatar
        t-class="avatar-example--small"
        icon="user"
        size="small"
      />
    </view>
  </view>
</template>

<script>
import TAvatar from '@tdesign/uniapp/avatar/avatar.vue';
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TAvatar,
  },
  data() {
    return {
      image: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
    };
  },
  created() {},
  methods: {},
};
</script>
<style>
.avatar-example {
    display: flex;
    margin-bottom: 32rpx;
}

:deep(.external-class-content) {
    color: #fff;
    background-color: var(--td-brand-color, #0052d9);
    font-weight: 400;
}

.avatar-example--small:not(:last-child) {
    margin-right: 112rpx;
}

.avatar-example--medium:not(:last-child) {
    margin-right: 96rpx;
}

.avatar-example--large:not(:last-child) {
    margin-right: 64rpx;
}
</style>
```


## API

### Avatar Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
custom-style | Object | - | 自定义样式 | N
alt | String | - | 头像替换文本，仅当图片加载失败时有效 | N
badge-props | Object | {} | 头像右上角提示信息，继承 Badge 组件的全部特性。如：小红点，或者数字。TS 类型：`BadgeProps`，[Badge API Documents](./badge?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/avatar/type.ts) | N
bordered | Boolean | false | 已废弃。是否显示外边框 | N
hide-on-load-failed | Boolean | false | 加载失败时隐藏图片 | N
icon | String / Object | - | 图标。值为字符串表示图标名称，值为 `Object` 类型，表示透传至 `icon` | N
image | String | - | 图片地址 | N
image-props | Object | - | 透传至 Image 组件。TS 类型：`ImageProps`，[Image API Documents](./image?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/avatar/type.ts) | N
shape | String | - | 形状。优先级高于 AvatarGroup.shape 。Avatar 单独存在时，默认值为 circle。如果父组件 AvatarGroup 存在，默认值便由 AvatarGroup.shape 决定。可选项：circle/round。TS 类型：`ShapeEnum`。[通用类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/common/common.ts) | N
size | String | - | 尺寸，示例值：small/medium/large/24px/38px 等。优先级高于 AvatarGroup.size 。Avatar 单独存在时，默认值为 medium。如果父组件 AvatarGroup 存在，默认值便由 AvatarGroup.size 决定 | N

### Avatar Events

名称 | 参数 | 描述
-- | -- | --
error | `(e: Event)` | 图片加载失败时触发

### Avatar Slots

名称 | 描述
-- | --
\- | 默认插槽，自定义内容区域内容

### Avatar External Classes

类名 | 描述
-- | --
t-class | 根节点样式类
t-class-alt | 替代文本样式类
t-class-content | 内容样式类
t-class-icon | 图标样式类
t-class-image | 图片样式类


### AvatarGroup Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
custom-style | Object | - | 自定义样式 | N
cascading | String | 'left-up' | 图片之间的层叠关系，可选值：左侧图片在上和右侧图片在上。可选项：left-up/right-up。TS 类型：`CascadingValue` `type CascadingValue = 'left-up' \| 'right-up'`。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/avatar-group/type.ts) | N
collapse-avatar | String | - | 头像数量超出时，会出现一个头像折叠元素。该元素内容可自定义。默认为 `+N`。示例：`+5`，`...`, `更多` | N
max | Number | - | 能够同时显示的最多头像数量 | N
shape | String | - | 形状。优先级低于 Avatar.shape。可选项：circle/round。TS 类型：`ShapeEnum`。[通用类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/common/common.ts) | N
size | String | - | 尺寸，示例值：small/medium/large/24px/38px 等。优先级低于 Avatar.size | N

### AvatarGroup Events

名称 | 参数 | 描述
-- | -- | --
collapsed-item-click | `(e: MouseEvent)` | 点击头像折叠元素触发

### AvatarGroup Slots

名称 | 描述
-- | --
\- | 默认插槽，自定义内容区域内容
collapse-avatar | 自定义 `collapse-avatar` 显示内容

### AvatarGroup External Classes

类名 | 描述
-- | --
t-class | 根节点样式类
t-class-content | 内容样式类
t-class-image | 图片样式类

### CSS Variables

组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-avatar-group-init-z-index | @avatar-group-init-zIndex | -
--td-avatar-group-line-spacing | 4rpx | -
--td-avatar-group-margin-left-large | -16rpx | -
--td-avatar-group-margin-left-medium | -16rpx | -
--td-avatar-group-margin-left-small | -16rpx | -
--td-avatar-bg-color | @brand-color-light-active | -
--td-avatar-border-color | #fff | -
--td-avatar-border-width-large | 6rpx | -
--td-avatar-border-width-medium | 4rpx | -
--td-avatar-border-width-small | 2rpx | -
--td-avatar-circle-border-radius | @radius-circle | -
--td-avatar-content-color | @brand-color | -
--td-avatar-icon-large-font-size | 64rpx | -
--td-avatar-icon-medium-font-size | 48rpx | -
--td-avatar-icon-small-font-size | 40rpx | -
--td-avatar-large-width | 128rpx | -
--td-avatar-margin-left | 0 | -
--td-avatar-medium-width | 96rpx | -
--td-avatar-round-border-radius | @radius-default | -
--td-avatar-small-width | 80rpx | -
--td-avatar-text-large-font-size | @font-size-xl | -
--td-avatar-text-medium-font-size | @font-size-m | -
--td-avatar-text-small-font-size | @font-size-base | -
