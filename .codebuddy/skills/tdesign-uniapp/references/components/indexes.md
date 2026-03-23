---
name: "indexes"
description: "用于页面中信息快速检索，可以根据目录中的页码快速找到所需的内容。"
url: "https://tdesign.tencent.com/uniapp/components/indexes"
---


## 引入

可在 `main.ts` 或在需要使用的页面或组件中引入。

```js
import TIndexes from '@tdesign/uniapp/indexes/indexes.vue';
import TIndexesAnchor from '@tdesign/uniapp/indexes-anchor/indexes-anchor.vue';
```

### 基础索引



```vue
<template>
  <view class="wrap">
    <view class="custom-navbar">
      <t-demo-navbar
        title="TDesign"
      />
    </view>
    <t-indexes
      :default-current="defaultCurrent"
      :index-list="indexList"
      :sticky-offset="stickyOffset"
      @select="onSelect"
      @change="onChange"
    >
      <block
        v-for="(item, index) in list"
        :key="index"
      >
        <t-indexes-anchor :index="item.index" />

        <t-cell-group>
          <t-cell
            v-for="(city, index1) in item.children"
            :key="index1"
            :title="city"
            aria-role="button"
          />
        </t-cell-group>
      </block>
    </t-indexes>
  </view>
</template>

<script>
import TIndexes from '@tdesign/uniapp/indexes/indexes.vue';
import TIndexesAnchor from '@tdesign/uniapp/indexes-anchor/indexes-anchor.vue';
import TCellGroup from '@tdesign/uniapp/cell-group/cell-group.vue';
import TCell from '@tdesign/uniapp/cell/cell.vue';
import { handlePageScroll } from '@tdesign/uniapp/mixins/page-scroll';

export default {
  components: {
    TIndexes,
    TIndexesAnchor,
    TCellGroup,
    TCell,
  },
  onPageScroll(e) {
    handlePageScroll(e);
  },
  data() {
    return {
      defaultCurrent: 'B',
      indexList: [],

      list: [
        {
          index: 'A',
          children: ['阿坝', '阿拉善', '阿里', '安康', '安庆', '鞍山', '安顺', '安阳', '澳门'],
        },
        {
          index: 'B',
          children: ['北京', '白银', '保定', '宝鸡', '保山', '包头', '巴中', '北海', '蚌埠', '本溪', '毕节', '滨州', '百色', '亳州'],
        },
        {
          index: 'C',
          children: [
            '重庆',
            '成都',
            '长沙',
            '长春',
            '沧州',
            '常德',
            '昌都',
            '长治',
            '常州',
            '巢湖',
            '潮州',
            '承德',
            '郴州',
            '赤峰',
            '池州',
            '崇左',
            '楚雄',
            '滁州',
            '朝阳',
          ],
        },
        {
          index: 'D',
          children: ['大连', '东莞', '大理', '丹东', '大庆', '大同', '大兴安岭', '德宏', '德阳', '德州', '定西', '迪庆', '东营'],
        },
        {
          index: 'E',
          children: ['鄂尔多斯', '恩施', '鄂州'],
        },
        {
          index: 'F',
          children: ['福州', '防城港', '佛山', '抚顺', '抚州', '阜新', '阜阳'],
        },
        {
          index: 'G',
          children: ['广州', '桂林', '贵阳', '甘南', '赣州', '甘孜', '广安', '广元', '贵港', '果洛'],
        },
        {
          index: 'J',
          children: ['揭阳', '吉林', '晋江', '吉安', '胶州', '嘉兴', '济南', '鸡西', '荆州', '江门', '基隆'],
        },
        {
          index: 'K',
          children: ['昆明', '开封', '康定', '喀什'],
        },
      ],

      stickyOffset: 0,
      city: '',
    };
  },
  mounted() {
    setTimeout(() => {
      this.getCustomNavbarHeight();
    }, 30);
    this.indexList = this.list.map(item => item.index);
  },
  methods: {
    onChange(e) {
      const { index } = e;
      console.log('change:', index);
    },

    onSelect(e) {
      const { index } = e;
      console.log('select:', index);
    },

    getCustomNavbarHeight() {
      const query = uni.createSelectorQuery().in(this);
      query.select('.custom-navbar').boundingClientRect();
      query.exec((res) => {
        const { height = 0 } = res[0] || {};
        this.stickyOffset = height;
      });
    },
  },
};
</script>
<style scoped>
/* #ifdef H5 */
.wrap {
  height: 100%;
  overflow: auto;
}
/* #endif */

</style>
```


### 自定义索引


```vue
<template>
  <view class="wrap">
    <view class="custom-navbar">
      <t-demo-navbar
        title="TDesign"
      />
    </view>
    <view class="indexes">
      <t-indexes
        :index-list="indexList"
        :sticky-offset="stickyOffset + 8"
        t-class="wrapper"
        @change="onChange"
        @select="onSelect"
      >
        <view
          v-for="(item, index) in list"
          :key="index"
        >
          <t-indexes-anchor
            :index="item.index"
            t-class="anchor-wrapper"
          >
            <view :class="'capsule' + (curIndex == item.index ? ' capsule--active' : '')">
              {{ item.index }}
            </view>
          </t-indexes-anchor>

          <t-cell-group>
            <t-cell
              v-for="(city, index1) in item.children"
              :key="index1"
              :title="city"
              :bordered="item.children.length - 1 != index"
            />
          </t-cell-group>
        </view>
      </t-indexes>
    </view>
  </view>
</template>

<script>
import TIndexes from '@tdesign/uniapp/indexes/indexes.vue';
import TIndexesAnchor from '@tdesign/uniapp/indexes-anchor/indexes-anchor.vue';
import TCellGroup from '@tdesign/uniapp/cell-group/cell-group.vue';
import TCell from '@tdesign/uniapp/cell/cell.vue';
import { handlePageScroll } from '@tdesign/uniapp/mixins/page-scroll';

const children = new Array(5).fill('列表内容');

const list = [
  {
    index: 1,
    children,
  },
  {
    index: 3,
    children,
  },
  {
    index: 5,
    children,
  },
  {
    index: 7,
    children,
  },
  {
    index: 8,
    children,
  },
  {
    index: 10,
    children,
  },
  {
    index: '#',
    children,
  },
];
export default {
  options: {
    styleIsolation: 'shared',
  },
  onPageScroll(e) {
    handlePageScroll(e);
  },
  components: {
    TIndexes,
    TIndexesAnchor,
    TCellGroup,
    TCell,
  },
  data() {
    return {
      list,
      indexList: list.map(item => item.index),
      curIndex: '',
      stickyOffset: 0,
      city: '',
    };
  },
  mounted() {
    setTimeout(() => {
      this.getCustomNavbarHeight();
    }, 30);
  },
  methods: {
    onChange(e) {
      const { index } = e;
      console.log('change:', index);
      this.curIndex = index;
    },

    onSelect(e) {
      const { index } = e;
      console.log('select:', index);
      this.curIndex = index;
    },

    getCustomNavbarHeight() {
      const query = uni.createSelectorQuery().in(this);
      query.select('.custom-navbar').boundingClientRect();
      query.exec((res) => {
        const { height = 0 } = res[0] || {};
        this.stickyOffset = height;
      });
    },
  },
};
</script>
<style scoped>
/* #ifdef H5 */
/* .wrap {
  height: 100%;
  overflow: auto;
} */
/* #endif */


.capsule {
    margin: 0 8px;
    height: 30px;
    border-radius: 15px;
    background-color: var(--td-bg-color-secondarycontainer, #f3f3f3);
    padding-left: 32rpx;
    display: flex;
    align-items: center;
    font-size: 14px;
    box-sizing: border-box;
}

.capsule--active {
    border: 1px solid var(--td-border-level-1-color, #e7e7e7);
}

:deep(.wrapper) {
    padding-top: 8px;
    /* height: 100%; */
}

.indexes,
.capsule--active,
:deep(.anchor-wrapper) {
    background: var(--td-bg-color-container, #ffffff);
}
</style>
```


## FAQ

### 在滚动元素中， Indexes 索引组件失效（[#3746](https://github.com/Tencent/tdesign-miniprogram/issues/3746)）？

`Indexes` 组件自 `0.32.0` 版本开始移除了对 `scroll-view` 的依赖，组件内部使用 [wx.pageScrollTo](https://developers.weixin.qq.com/miniprogram/dev/api/ui/scroll/wx.pageScrollTo.html) 滚动到指定位置，因此只支持页面级滚动，不支持在滚动元素中嵌套使用，包括 overflow: scroll、 scroll-view 等。

### API

### Indexes Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
custom-style | Object | - | 自定义样式 | N
current | String / Number | - | 索引列表的激活项，默认首项。支持语法糖 `v-model:current` | N
default-current | String / Number | - | 索引列表的激活项，默认首项。非受控属性 | N
index-list | Array | - | 索引字符列表。不传默认 `A-Z`。TS 类型：`Array<string \| number>` | N
list | Array | [] | 已废弃。索引列表的列表数据。每个元素包含三个子元素，index(string)：索引值，例如1，2，3，...或A，B，C等；title(string): 索引标题，可不填将默认设为索引值；children(Array<{title: string}>): 子元素列表，title为子元素的展示文案。TS 类型：`ListItem[] ` `interface ListItem { title: string;  index: string;  children: { title: string; [key: string]: any} [] }`。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/indexes/type.ts) | N
sticky | Boolean | true | 索引是否吸顶，默认为true。TS 类型：`Boolean` | N
sticky-offset | Number | 0 | 锚点吸顶时与顶部的距离	 | N

### Indexes Events

名称 | 参数 | 描述
-- | -- | --
change | `(context: { index: string \| number })` | 索引发生变更时触发事件
select | `(context: { index: string \| number })` | 点击侧边栏时触发事件

### Indexes Slots

名称 | 描述
-- | --
\- | 默认插槽，自定义内容区域内容


### IndexesAnchor Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
custom-style | Object | - | 自定义样式 | N
index | String / Number | - | 索引字符 | N

### IndexesAnchor Slots

名称 | 描述
-- | --
\- | 默认插槽，自定义内容区域内容

### IndexesAnchor External Classes

类名 | 描述
-- | --
t-class | 根节点样式类
t-class-sidebar | 侧边栏样式类
t-class-sidebar-item | 侧边栏选项样式类

### CSS Variables

组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-indexes-sidebar-active-bg-color | @brand-color | -
--td-indexes-sidebar-active-color | @text-color-anti | -
--td-indexes-sidebar-color | @text-color-primary | -
--td-indexes-sidebar-font | @font-body-small | -
--td-indexes-sidebar-item-size | 40rpx | -
--td-indexes-sidebar-right | 16rpx | -
--td-indexes-sidebar-tips-bg-color | @brand-color-light | -
--td-indexes-sidebar-tips-color | @brand-color | -
--td-indexes-sidebar-tips-font | @font-title-extraLarge | -
--td-indexes-sidebar-tips-right | calc(100% + 32rpx) | -
--td-indexes-sidebar-tips-size | 96rpx | -
--td-indexes-anchor-active-bg-color | @bg-color-container | -
--td-indexes-anchor-active-color | @brand-color | -
--td-indexes-anchor-active-font-weight | 600 | -
--td-indexes-anchor-bg-color | @bg-color-secondarycontainer | -
--td-indexes-anchor-border-color | @component-border | -
--td-indexes-anchor-color | @text-color-primary | -
--td-indexes-anchor-font | @font-body-medium | -
--td-indexes-anchor-padding | 8rpx 32rpx | -
--td-indexes-anchor-top | 0 | -
