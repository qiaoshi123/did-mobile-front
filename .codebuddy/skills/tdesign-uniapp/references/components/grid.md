---
name: "grid"
description: "用于功能入口布局，将页面或特定区域切分成若干等大的区块，形成若干功能入口。"
url: "https://tdesign.tencent.com/uniapp/components/grid"
---



## 引入

可在 `main.ts` 或在需要使用的页面或组件中引入。

```js
import TGrid from '@tdesign/uniapp/grid/grid.vue';
import TGridItem from '@tdesign/uniapp/grid-item/grid-item.vue';
```

### 组件类型
基础宫格


```vue
<template>
  <view>
    <t-grid
      t-class="block"
      :column="5"
    >
      <t-grid-item
        t-class-image="image"
        text="标题文字"
        :image="img1"
      />
      <t-grid-item
        t-class-image="image"
        text="标题文字"
        :image="img2"
      />
      <t-grid-item
        t-class-image="image"
        text="标题文字"
        :image="img3"
      />
      <t-grid-item
        t-class-image="image"
        text="标题文字"
        :image="img2"
      />
      <t-grid-item
        t-class-image="image"
        text="最多四字"
        :image="img1"
      />
    </t-grid>

    <t-grid t-class="block">
      <t-grid-item
        t-class-image="image"
        text="标题文字"
        :image="img1"
      />
      <t-grid-item
        t-class-image="image"
        text="标题文字"
        :image="img2"
      />
      <t-grid-item
        t-class-image="image"
        text="标题文字"
        :image="img3"
      />
      <t-grid-item
        t-class-image="image"
        text="最多五个字"
        :image="img1"
      />
    </t-grid>

    <t-grid
      t-class="block"
      :column="3"
    >
      <t-grid-item
        t-class-image="image"
        text="标题文字"
        :image="img1"
      />
      <t-grid-item
        t-class-image="image"
        text="标题文字"
        :image="img2"
      />
      <t-grid-item
        t-class-image="image"
        text="最多六个文字"
        :image="img3"
      />
    </t-grid>
  </view>
</template>

<script>
import TGrid from '@tdesign/uniapp/grid/grid.vue';
import TGridItem from '@tdesign/uniapp/grid-item/grid-item.vue';
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TGrid,
    TGridItem,
  },
  data() {
    return {
      img1: 'https://tdesign.gtimg.com/mobile/demos/example1.png',
      img2: 'https://tdesign.gtimg.com/mobile/demos/example2.png',
      img3: 'https://tdesign.gtimg.com/mobile/demos/example3.png',
    };
  },
  created() {},
  methods: {},
};
</script>
<style>
:deep(.block) {
    display: block;
    margin-bottom: 32rpx;
}

:deep(.block .image) {
    position: inherit;
}

:deep(.block .image::before) {
    content: ' ';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    border-radius: 24rpx;
    border: 2rpx solid var(--td-gray-color-4);
    transform-origin: 0 0;
    transform: scale(0.5);
}
</style>
```


带说明的宫格


```vue
<template>
  <view>
    <view class="block">
      <t-grid :column="3">
        <t-grid-item
          t-class-image="image"
          text="标题文字"
          description="描述文字"
          :image="img1"
        />
        <t-grid-item
          t-class-image="image"
          text="标题文字"
          description="描述文字"
          :image="img2"
        />
        <t-grid-item
          t-class-image="image"
          text="标题文字"
          description="描述文字"
          :image="img3"
        />
      </t-grid>
    </view>

    <view class="block">
      <t-grid
        :column="2"
        align="left"
      >
        <t-grid-item
          t-class-image="image"
          text="标题文字"
          description="描述文字"
          layout="horizontal"
          :image="img1"
        />
        <t-grid-item
          t-class-image="image"
          text="标题文字"
          description="描述文字"
          layout="horizontal"
          :image="img2"
        />
      </t-grid>
    </view>
  </view>
</template>

<script>
import TGrid from '@tdesign/uniapp/grid/grid.vue';
import TGridItem from '@tdesign/uniapp/grid-item/grid-item.vue';
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TGrid,
    TGridItem,
  },
  data() {
    return {
      img1: 'https://tdesign.gtimg.com/mobile/demos/example1.png',
      img2: 'https://tdesign.gtimg.com/mobile/demos/example2.png',
      img3: 'https://tdesign.gtimg.com/mobile/demos/example3.png',
    };
  },
  created() {},
  methods: {},
};
</script>
<style>
.block {
    display: block;
    margin-bottom: 32rpx;
}

.block :deep(.image) {
    position: inherit;
}

.block :deep(.image)::before {
    content: ' ';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    border-radius: 24rpx;
    border: 2rpx solid var(--td-gray-color-4);
    transform-origin: 0 0;
    transform: scale(0.5);
}
</style>
```


带边框的宫格


```vue
<template>
  <view>
    <view class="block">
      <t-grid
        :border="border"
        :column="3"
      >
        <t-grid-item
          t-class-image="image"
          text="标题文字"
          :image="img1"
        />
        <t-grid-item
          t-class-image="image"
          text="标题文字"
          :image="img2"
        />
        <t-grid-item
          t-class-image="image"
          text="标题文字"
          :image="img3"
        />
      </t-grid>
    </view>

    <view class="block">
      <t-grid
        :border="border"
        :column="2"
        align="left"
      >
        <t-grid-item
          t-class-image="image"
          text="标题文字"
          description="描述文字"
          layout="horizontal"
          :image="img1"
        />
        <t-grid-item
          t-class-image="image"
          text="标题最多六字"
          description="描述文字"
          layout="horizontal"
          :image="img2"
        />
      </t-grid>
    </view>
  </view>
</template>

<script>
import TGrid from '@tdesign/uniapp/grid/grid.vue';
import TGridItem from '@tdesign/uniapp/grid-item/grid-item.vue';
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TGrid,
    TGridItem,
  },
  data() {
    return {
      img1: 'https://tdesign.gtimg.com/mobile/demos/example1.png',
      img2: 'https://tdesign.gtimg.com/mobile/demos/example2.png',
      img3: 'https://tdesign.gtimg.com/mobile/demos/example3.png',
      border: {
        color: 'var(--td-border-level-1-color, #E7E7E7)',
      },
    };
  },
  created() {},
  methods: {},
};
</script>
<style>
.block {
    display: block;
    margin-bottom: 32rpx;
}

.block :deep(.image) {
    position: inherit;
}

.block :deep(.image)::before {
    content: ' ';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    border-radius: 24rpx;
    border: 2rpx solid var(--td-gray-color-4);
    transform-origin: 0 0;
    transform: scale(0.5);
}
</style>
```


带徽章的宫格


```vue
<template>
  <view>
    <t-grid class="t-grid badge">
      <t-grid-item
        t-class-image="image"
        text="标题文字"
        :image="img1"
        :badge-props="{ dot: true }"
      />
      <t-grid-item
        t-class-image="image"
        text="标题文字"
        :image="img2"
        :badge-props=" { count: 8 } "
      />
      <t-grid-item
        t-class-image="image"
        text="标题文字"
        :image="img3"
        :badge-props="{ count: 13 } "
      />
      <t-grid-item
        t-class-image="image"
        text="标题文字"
        :image="img3"
        :badge-props="{ count: 'NEW' } "
      />
    </t-grid>
  </view>
</template>

<script>
import TGrid from '@tdesign/uniapp/grid/grid.vue';
import TGridItem from '@tdesign/uniapp/grid-item/grid-item.vue';
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TGrid,
    TGridItem,
  },
  data() {
    return {
      img1: 'https://tdesign.gtimg.com/mobile/demos/example1.png',
      img2: 'https://tdesign.gtimg.com/mobile/demos/example2.png',
      img3: 'https://tdesign.gtimg.com/mobile/demos/example3.png',
    };
  },
  created() {},
  methods: {},
};
</script>
<style>
.external-class-content {
    padding: 32rpx 0 !important;
}

.text {
    font-size: 24rpx !important;
    line-height: 40rpx !important;
    padding-top: 20rpx !important;
}
:deep(.image) {
    width: 64rpx !important;
    height: 64rpx !important;
}
.image-icon {
    width: 64rpx;
    height: 64rpx;
}

.badge-circle {
    display: flex;
    justify-content: center;
    background-color: #e34d59;
    border-radius: 15rpx;
    width: 36rpx;
    height: 32rpx;
    align-items: center;
    position: absolute;
    top: -15rpx;
    left: 46rpx;
}

.circle {
    width: 4rpx;
    height: 4rpx;
    border-radius: 2rpx;
    background-color: white;
    margin-left: 4rpx;
}

.badge-circle-container {
    margin-left: -4rpx;
    display: flex;
}

.badge :deep(.image) {
    position: inherit;
}

.badge :deep(.image)::before {
    content: ' ';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    border-radius: 24rpx;
    border: 2rpx solid var(--td-gray-color-4);
    transform-origin: 0 0;
    transform: scale(0.5);
}
</style>
```


可滑动的宫格


```vue
<template>
  <view
    class="block"
  >
    <t-grid
      :column="0"
    >
      <t-grid-item
        v-for="(item, index) in gridItemList"
        :key="index"
        t-class-image="image"
        :text="item.text"
        :image="item.img"
      />
    </t-grid>
  </view>
</template>

<script>
import TGrid from '@tdesign/uniapp/grid/grid.vue';
import TGridItem from '@tdesign/uniapp/grid-item/grid-item.vue';
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TGrid,
    TGridItem,
  },
  data() {
    return {
      gridItemList: [
        {
          text: '标题文字',
          img: 'https://tdesign.gtimg.com/mobile/demos/example1.png',
        },
        {
          text: '标题文字',
          img: 'https://tdesign.gtimg.com/mobile/demos/example2.png',
        },
        {
          text: '标题文字',
          img: 'https://tdesign.gtimg.com/mobile/demos/example3.png',
        },
        {
          text: '最多五个字',
          img: 'https://tdesign.gtimg.com/mobile/demos/example1.png',
        },
        {
          text: '最多五个字',
          img: 'https://tdesign.gtimg.com/mobile/demos/example2.png',
        },
        {
          text: '最多五个字',
          img: 'https://tdesign.gtimg.com/mobile/demos/example3.png',
        },
      ],
    };
  },
  created() {},
  methods: {},
};
</script>
<style>
.block {
    display: block;
    margin-bottom: 32rpx;
}

.block :deep(.image) {
    position: inherit;
}

.block :deep(.image)::before {
    content: ' ';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    border-radius: 24rpx;
    border: 2rpx solid var(--td-gray-color-4);
    transform-origin: 0 0;
    transform: scale(0.5);
}
</style>
```


### 组件样式

可传图标的宫格


```vue
<template>
  <view class="block">
    <t-grid>
      <t-grid-item
        text="分享"
        image="slot"
      >
        <template
          #image
        >
          <view
            class="grid-item__image"
          >
            <t-button
              variant="text"
              icon="share"
              open-type="share"
            />
          </view>
        </template>
      </t-grid-item>
      <t-grid-item
        text="收藏"
        icon="star"
        @click="onClick"
      />
      <t-grid-item
        text="保存"
        icon="download"
        @click="onClick"
      />
      <t-grid-item
        text="编辑"
        icon="edit-1"
        @click="onClick"
      />
    </t-grid>
  </view>
</template>

<script>
import TGrid from '@tdesign/uniapp/grid/grid.vue';
import TGridItem from '@tdesign/uniapp/grid-item/grid-item.vue';
import TButton from '@tdesign/uniapp/button/button.vue';
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TGrid,
    TGridItem,
    TButton,
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    onClick() {
      console.log('click grid-item');
    },
  },
};
</script>
<style>
.block {
    display: block;
    margin-bottom: 32rpx;
}

:deep(.grid-item__image) {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-color: var(--td-bg-color-secondarycontainer);
    border-radius: 12rpx;
}
</style>
```


多行宫格


```vue
<template>
  <view class="block">
    <t-grid
      :column="4"
    >
      <t-grid-item
        t-class-image="image"
        text="标题文字"
        :image="img1"
      />
      <t-grid-item
        t-class-image="image"
        text="标题文字"
        :image="img2"
      />
      <t-grid-item
        t-class-image="image"
        text="标题文字"
        :image="img3"
      />
      <t-grid-item
        t-class-image="image"
        text="最多五个字"
        :image="img1"
      />
      <t-grid-item
        t-class-image="image"
        text="标题文字"
        :image="img1"
      />
      <t-grid-item
        t-class-image="image"
        text="标题文字"
        :image="img3"
      />
      <t-grid-item
        t-class-image="image"
        text="标题文字"
        :image="img1"
      />
      <t-grid-item
        t-class-image="image"
        text="最多五个字"
        :image="img2"
      />
    </t-grid>
  </view>
</template>

<script>
import TGrid from '@tdesign/uniapp/grid/grid.vue';
import TGridItem from '@tdesign/uniapp/grid-item/grid-item.vue';
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TGrid,
    TGridItem,
  },
  data() {
    return {
      img1: 'https://tdesign.gtimg.com/mobile/demos/example1.png',
      img2: 'https://tdesign.gtimg.com/mobile/demos/example2.png',
      img3: 'https://tdesign.gtimg.com/mobile/demos/example3.png',
    };
  },
  created() {},
  methods: {},
};
</script>
<style>
.block {
    display: block;
    margin-bottom: 32rpx;
}

.block :deep(.image) {
    position: inherit;
}

.block :deep(.image)::before {
    content: ' ';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    border-radius: 24rpx;
    border: 2rpx solid var(--td-gray-color-4);
    transform-origin: 0 0;
    transform: scale(0.5);
}
</style>
```


卡片宫格


```vue
<template>
  <view>
    <view class="block">
      <t-grid
        :column="4"
        theme="card"
      >
        <t-grid-item
          t-class-image="image"
          text="标题文字"
          :image="img1"
        />
        <t-grid-item
          t-class-image="image"
          text="标题文字"
          :image="img2"
        />
        <t-grid-item
          t-class-image="image"
          text="标题文字"
          :image="img3"
        />
        <t-grid-item
          t-class-image="image"
          text="最多五个字"
          :image="img1"
        />
        <t-grid-item
          t-class-image="image"
          text="标题文字"
          :image="img1"
        />
        <t-grid-item
          t-class-image="image"
          text="标题文字"
          :image="img3"
        />
        <t-grid-item
          t-class-image="image"
          text="标题文字"
          :image="img2"
        />
        <t-grid-item
          t-class-image="image"
          text="最多五个字"
          :image="img2"
        />
      </t-grid>
    </view>

    <view class="block">
      <t-grid
        :column="2"
        theme="card"
        align="left"
      >
        <t-grid-item
          t-class-image="image"
          text="标题文字"
          description="描述文字"
          layout="horizontal"
          :image="img1"
        />
        <t-grid-item
          t-class-image="image"
          text="标题最多六字"
          description="描述文字"
          layout="horizontal"
          :image="img2"
        />
      </t-grid>
    </view>
  </view>
</template>

<script>
import TGrid from '@tdesign/uniapp/grid/grid.vue';
import TGridItem from '@tdesign/uniapp/grid-item/grid-item.vue';
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TGrid,
    TGridItem,
  },
  data() {
    return {
      img1: 'https://tdesign.gtimg.com/mobile/demos/example1.png',
      img2: 'https://tdesign.gtimg.com/mobile/demos/example2.png',
      img3: 'https://tdesign.gtimg.com/mobile/demos/example3.png',
      border: '',
    };
  },
  created() {},
  methods: {},
};
</script>
<style>
.block {
    display: block;
    margin-bottom: 32rpx;
}

.block :deep(.image) {
    position: inherit;
}

.block :deep(.image)::before {
    content: ' ';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    border-radius: 24rpx;
    border: 2rpx solid var(--td-gray-color-4);
    transform-origin: 0 0;
    transform: scale(0.5);
}
</style>
```



## API

### Grid Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
custom-style | Object | - | 自定义样式 | N
align | String | center | 内容对齐方式。可选项：left/center | N
border | Boolean / Object | false | 边框，默认不显示。值为 true 则显示默认边框，值类型为 object 则表示自定义边框样式。TS 类型：`boolean \| { color?: string; width?: string; style?: 'solid' \| 'dashed' \| 'dotted' \| 'double' \| 'groove' \| 'inset' \| 'outset' }` | N
column | Number | 4 | 每一行的列数量；为 0 时等于固定大小 | N
gutter | Number | - | 间隔大小 | N
hover | Boolean | false | 是否开启点击反馈 | N
theme | String | default | 宫格的风格。可选项：default/card | N

### Grid Slots

名称 | 描述
-- | --
\- | 默认插槽，自定义内容区域内容

### Grid External Classes

类名 | 描述
-- | --
t-class | 根节点样式类


### GridItem Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
custom-style | Object | - | 自定义样式 | N
badge-props | Object | {} | 透传至 Badge 属性。TS 类型：`BadgeProps`，[Badge API Documents](./badge?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/grid-item/type.ts) | N
description | String | - | 文本以外的更多描述，辅助信息。可以通过 Props 传入文本，也可以自定义标题节点 | N
icon | String / Object | - | 图标名称。值为字符串表示图标名称，值为 `Object` 类型，表示透传至 `icon` | N
image | String | - | 图片，可以是图片地址，也可以自定义图片节点，值为 slot 的时候才能使用插槽 | N
image-props | Object | {} | 透传至 Image 组件。TS 类型：`ImageProps`，[Image API Documents](./image?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/grid-item/type.ts) | N
jump-type | String | navigate-to | 链接跳转类型。可选项：redirect-to/switch-tab/relaunch/navigate-to | N
layout | String | vertical | 内容布局方式。可选项：vertical/horizontal | N
text | String | - | 文本，可以通过 Props 传入文本，也可以自定义标题节点 | N
url | String | - | 点击后的跳转链接 | N

### GridItem Events

名称 | 参数 | 描述
-- | -- | --
click | \- | 点击子项后触发

### GridItem Slots

名称 | 描述
-- | --
\- | 默认插槽，自定义内容区域内容
description | 自定义 `description` 模块内容
image | 自定义 `image` 模块内容
text | 自定义 `text` 模块内容

### GridItem External Classes

类名 | 描述
-- | --
t-class | 根节点样式类
t-class-content | 内容样式类
t-class-description | 描述样式类
t-class-image | 图片样式类
t-class-text | 文本样式类

### CSS Variables

组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-grid-bg-color | @bg-color-container | -
--td-grid-card-radius | @radius-large | -
--td-grid-item-bg-color | @bg-color-container | -
--td-grid-item-description-color | @text-color-placeholder | -
--td-grid-item-description-font | @font-body-small | -
--td-grid-item-description-padding-top | 0 | -
--td-grid-item-horizontal-text-description-top | 0 | -
--td-grid-item-horizontal-text-padding-left | 0 | -
--td-grid-item-hover-bg-color | @bg-color-secondarycontainer | -
--td-grid-item-image-middle-width | 80rpx | -
--td-grid-item-image-small-width | 64rpx | -
--td-grid-item-image-width | 96rpx | -
--td-grid-item-padding | 32rpx | -
--td-grid-item-text-color | @text-color-primary | -
--td-grid-item-text-font | @font-body-medium | -
--td-grid-item-text-middle-font | @font-body-small | -
--td-grid-item-text-padding-top | 16rpx | -
--td-grid-item-text-small-font | @font-body-extraSmall | -
