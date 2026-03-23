---
name: "swipecell"
description: "用于承载列表中的更多操作，通过左右滑动来展示，按钮的宽度固定高度根据列表高度而变化。"
url: "https://tdesign.tencent.com/uniapp/components/swipe-cell"
---




## 引入

可在 `main.ts` 或在需要使用的页面或组件中引入。

```js
import TSwipeCell from '@tdesign/uniapp/swipe-cell/swipe-cell.vue';
```

### 组件类型

左滑单操作


```vue
<template>
  <view>
    <t-swipe-cell>
      <t-cell
        title="左滑单操作"
        note="辅助信息"
        :bordered="false"
      />
      <template #right>
        <view
          class="btn delete-btn"
          @click="onDelete"
        >
          删除
        </view>
      </template>
    </t-swipe-cell>

    <t-swipe-cell>
      <t-cell
        :bordered="false"
        title="左滑大列表"
        description="一段很长很长的内容文字"
        note="辅助信息"
        image="https://tdesign.gtimg.com/mobile/demos/avatar1.png"
      />
      <template #right>
        <view
          class="btn delete-btn"
          @click="onDelete"
        >
          删除
        </view>
      </template>
    </t-swipe-cell>

    <t-swipe-cell
      :right="right"
      @click="onActionClick"
    >
      <t-cell
        title="左滑双操作"
        note="辅助信息"
        :bordered="false"
      />
    </t-swipe-cell>

    <t-swipe-cell>
      <t-cell
        title="左滑多操作"
        note="辅助信息"
        :bordered="false"
      />
      <template #right>
        <view
          class="btn-wrapper"
        >
          <view
            class="btn favor-btn"
            @click="onFavor"
          >
            收藏
          </view>
          <view
            class="btn edit-btn"
            @click="onEdit"
          >
            编辑
          </view>
          <view
            class="btn delete-btn"
            @click="onDelete"
          >
            删除
          </view>
        </view>
      </template>
    </t-swipe-cell>
  </view>
</template>

<script>
import TSwipeCell from '@tdesign/uniapp/swipe-cell/swipe-cell.vue';
import TCell from '@tdesign/uniapp/cell/cell.vue';
export default {
  components: {
    TSwipeCell,
    TCell,
  },
  data() {
    return {
      right: [
        {
          text: '编辑',
          className: 'btn edit-btn',
        },
        {
          text: '删除',
          className: 'btn delete-btn',
        },
      ],
    };
  },
  created() {},
  methods: {
    onActionClick(action) {
      uni.showToast({
        title: `你点击了${action.text}`,
        icon: 'none',
      });
    },
    onDelete() {
      uni.showToast({
        title: '你点击了删除',
        icon: 'none',
      });
    },
    onEdit() {
      uni.showToast({
        title: '你点击了编辑',
        icon: 'none',
      });
    },
    onFavor() {
      uni.showToast({
        title: '你点击了收藏',
        icon: 'none',
      });
    },
    onChoice() {
      uni.showToast({
        title: '你点击了选择',
        icon: 'none',
      });
    },
  },
};
</script>
<style>
.btn-wrapper {
    height: 100%;
}

.btn {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 120rpx;
    height: 100%;
    color: white;
}

.delete-btn {
    background-color: #e34d59;
}

.edit-btn {
    background-color: #ed7b2f;
}

.favor-btn {
    background-color: var(--td-brand-color, #0052d9);
}
</style>
```


右滑单操作


```vue
<template>
  <view>
    <t-swipe-cell>
      <t-cell
        title="右滑单操作"
        note="辅助信息"
        :bordered="false"
      />
      <template
        #left
      >
        <view
          class="btn favor-btn"
          @click="onChoice"
        >
          选择
        </view>
      </template>
    </t-swipe-cell>
  </view>
</template>

<script>
import TSwipeCell from '@tdesign/uniapp/swipe-cell/swipe-cell.vue';
import TCell from '@tdesign/uniapp/cell/cell.vue';
export default {
  components: {
    TSwipeCell,
    TCell,
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    onChoice() {
      uni.showToast({
        title: '你点击了选择',
        icon: 'none',
      });
    },
  },
};
</script>
<style>
.btn {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 120rpx;
    height: 100%;
    color: white;
}

.favor-btn {
    background-color: var(--td-brand-color, #0052d9);
}
</style>
```


左右滑操作


```vue
<template>
  <view>
    <t-swipe-cell
      :right="right"
      :left="left"
      @click="onActionClick"
    >
      <t-cell
        title="左右滑操作"
        note="辅助信息"
        :bordered="false"
      />
    </t-swipe-cell>
  </view>
</template>

<script>
import TSwipeCell from '@tdesign/uniapp/swipe-cell/swipe-cell.vue';
import TCell from '@tdesign/uniapp/cell/cell.vue';
export default {
  components: {
    TSwipeCell,
    TCell,
  },
  data() {
    return {
      right: [
        {
          text: '删除',
          className: 'btn delete-btn',
        },
      ],
      left: [
        {
          text: '选择',
          className: 'btn favor-btn',
        },
      ],
    };
  },
  created() {},
  methods: {
    onActionClick(detail) {
      uni.showToast({
        title: `你点击了${detail.text}`,
        icon: 'none',
      });
    },
  },
};
</script>
<style>
.btn {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 120rpx;
    height: 100%;
    color: white;
}

.favor-btn {
    background-color: var(--td-brand-color, #0052d9);
}

.delete-btn {
    background-color: #e34d59;
}
</style>
```


带图标的滑动操作


```vue
<template>
  <view>
    <t-swipe-cell
      :right="right"
      opened
      @click="onActionClick"
    >
      <t-cell
        title="左滑-带图标文本双操作"
        note="辅助信息"
        :bordered="false"
      />
    </t-swipe-cell>

    <t-swipe-cell :right="rightIcon">
      <t-cell
        title="左滑-仅带图标双操作"
        note="辅助信息"
        :bordered="false"
      />
    </t-swipe-cell>

    <t-swipe-cell>
      <t-cell
        :bordered="false"
        title="左滑大列表-仅带图标双操作"
        description="一段很长很长的内容文字"
        note="辅助信息"
        image="https://tdesign.gtimg.com/mobile/demos/avatar1.png"
      />
      <template
        #right
      >
        <view
          class="btn-wrapper"
        >
          <view
            class="btn edit-btn column"
            @click="onEdit"
          >
            <t-icon
              t-class="padding-bottom"
              name="edit"
              size="32rpx"
            />
            编辑
          </view>
          <view
            class="btn delete-btn column"
            @click="onDelete"
          >
            <t-icon
              t-class="padding-bottom"
              name="delete"
              size="32rpx"
            />
            删除
          </view>
        </view>
      </template>
    </t-swipe-cell>
  </view>
</template>

<script>
import TSwipeCell from '@tdesign/uniapp/swipe-cell/swipe-cell.vue';
import TCell from '@tdesign/uniapp/cell/cell.vue';
import TIcon from '@tdesign/uniapp/icon/icon.vue';
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TSwipeCell,
    TCell,
    TIcon,
  },
  data() {
    return {
      right: [
        {
          text: '编辑',
          icon: {
            name: 'edit',
            size: 16,
          },
          className: 'btn edit-btn',
        },
        {
          text: '删除',
          icon: {
            name: 'delete',
            size: 16,
          },
          className: 'btn delete-btn',
        },
      ],
      rightIcon: [
        {
          icon: 'edit',
          className: 'btn edit-btn',
        },
        {
          icon: 'delete',
          className: 'btn delete-btn',
        },
      ],
    };
  },
  created() {},
  methods: {
    onActionClick(detail) {
      uni.showToast({
        title: `你点击了${detail.text}`,
        icon: 'none',
      });
    },
    onDelete() {
      uni.showToast({
        title: '你点击了删除',
        icon: 'none',
      });
    },
    onEdit() {
      uni.showToast({
        title: '你点击了编辑',
        icon: 'none',
      });
    },
    onFavor() {
      uni.showToast({
        title: '你点击了收藏',
        icon: 'none',
      });
    },
    onChoice() {
      uni.showToast({
        title: '你点击了选择',
        icon: 'none',
      });
    },
  },
};
</script>
<style>
.btn-wrapper {
    height: 100%;
}

.btn {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 120rpx;
    height: 100%;
    color: white;
}

.delete-btn {
    background-color: #e34d59;
}

.edit-btn {
    background-color: #ed7b2f;
}

.favor-btn {
    background-color: var(--td-brand-color, #0052d9);
}

.column {
    flex-direction: column;
}

.padding-bottom {
    padding-bottom: 8rpx;
}
</style>
```


## FAQ
### `SwipeCell` 组件在真机上无法滑动？
移除全局配置项: "componentFramework": "glass-easel"，详情见： [issue 2524](https://github.com/Tencent/tdesign-miniprogram/issues/2524)。如需使用 `skyline render`，建议页面级粒度开启。

## API

### SwipeCell Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
custom-style | Object | - | 自定义样式 | N
disabled | Boolean | - | 是否禁用滑动 | N
left | Array | - | 左侧滑动操作项。所有行为同 `right`。TS 类型：`Array<SwipeActionItem>` | N
opened | Boolean / Array | false | 操作项是否呈现为打开态，值为数组时表示分别控制左右滑动的展开和收起状态。TS 类型：`boolean \| Array<boolean>` | N
right | Array | - | 右侧滑动操作项。有两种定义方式，一种是使用数组，二种是使用插槽。`right.text` 表示操作文本，`right.className` 表示操作项类名，`right.style` 表示操作项样式，`right.onClick` 表示点击操作项后执行的回调函数。示例：`[{ text: '删除', icon: 'delete', style: 'background-color: red', onClick: () => {} }]`。TS 类型：`Array<SwipeActionItem>` `interface SwipeActionItem {text?: string; icon?: string \| object, className?: string; style?: string; onClick?: () => void; [key: string]: any }`。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/swipe-cell/type.ts) | N

### SwipeCell Events

名称 | 参数 | 描述
-- | -- | --
click | `(action: SwipeActionItem, source: SwipeSource)` | 操作项点击时触发（插槽写法组件不触发，业务侧自定义内容和事件）。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/swipe-cell/type.ts)。<br/>`type SwipeSource = 'left' \| 'right'`<br/>
dragend | \- | 滑动结束事件
dragstart | \- | 滑动开始事件

### SwipeCell Slots

名称 | 描述
-- | --
\- | 默认插槽，自定义内容区域内容
left | 左侧滑动操作项
right | 右侧滑动操作项
