---
name: "sidebar"
description: "用于信息分类后的展示切换或锚点，位于页面左侧。"
url: "https://tdesign.tencent.com/uniapp/components/side-bar"
---



## 引入

可在 `main.ts` 或在需要使用的页面或组件中引入。

```js
import TSideBar from '@tdesign/uniapp/side-bar/side-bar.vue';
import TSideBarItem from '@tdesign/uniapp/side-bar-item/side-bar-item.vue';
```

### 锚点用法


```vue
<template>
  <view>
    <view class="custom-navbar">
      <t-demo-navbar
        custom-class="demo-navbar"
        title="TDesign"
      />
    </view>

    <view
      class="side-bar-wrapper"
      :style="'height: calc(100vh - ' + navbarHeight + 'px)'"
    >
      <t-side-bar
        :value="sideBarIndex"
        @change="onSideBarChange"
      >
        <t-side-bar-item
          v-for="(item, index) in categories"
          :key="index"
          :value="item.value || index"
          :label="item.label"
          :badge-props="item.badgeProps"
        />
      </t-side-bar>
      <scroll-view
        class="content"
        scroll-y
        scroll-with-animation
        :scroll-top="scrollTop"
        @scroll="onScroll"
      >
        <view
          v-for="(item, index) in categories"
          :key="index"
          class="section"
        >
          <view class="title">
            {{ item.title || item.label }}
          </view>

          <t-grid
            :column="3"
            :border="false"
          >
            <block
              v-for="(cargo, index1) in item.items"
              :key="index1"
            >
              <t-grid-item
                t-class-image="image"
                :text="cargo.label"
                :image="cargo.image"
                :image-props="{ shape: 'round', lazy: true }"
              />
            </block>
          </t-grid>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import TSideBar from '@tdesign/uniapp/side-bar/side-bar.vue';
import TSideBarItem from '@tdesign/uniapp/side-bar-item/side-bar-item.vue';
import TGrid from '@tdesign/uniapp/grid/grid.vue';
import TGridItem from '@tdesign/uniapp/grid-item/grid-item.vue';

const image = 'https://tdesign.gtimg.com/mobile/demos/example2.png';
const items = new Array(12).fill()
  .map((_, index) => ({
    label: index % 3 === 2 ? '最多六个文字' : '标题文字',
    image,
  }));

export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TSideBar,
    TSideBarItem,
    TGrid,
    TGridItem,
  },
  data() {
    return {
      sideBarIndex: 1,
      scrollTop: 0,

      categories: [
        {
          label: '选项一',
          title: '标题一',
          badgeProps: {},
          items,
        },
        {
          label: '选项二',
          title: '标题二',
          badgeProps: {
            dot: true,
          },
          items: items.slice(0, 9),
        },
        {
          label: '选项三',
          title: '标题三',
          badgeProps: {},
          items: items.slice(0, 9),
        },
        {
          label: '选项四',
          title: '标题四',
          badgeProps: {
            count: 6,
          },
          items: items.slice(0, 6),
        },
        {
          label: '选项五',
          title: '标题五',
          badgeProps: {},
          items: items.slice(0, 3),
        },
      ],

      navbarHeight: 0,
      offsetTopList: [],
      lastScrollTop: 0,

      cargo: {
        label: '',
        image: '',
      },
    };
  },
  mounted() {
    setTimeout(() => {
      this.getCustomNavbarHeight();
    }, 30);
  },
  methods: {
    getCustomNavbarHeight() {
      let query = uni.createSelectorQuery().in(this);
      // #ifdef MP-ALIPAY
      query = uni.createSelectorQuery();
      // #endif

      const { sideBarIndex } = this;
      query.selectAll('.title').boundingClientRect();
      query.select('.custom-navbar').boundingClientRect();
      query.exec((res) => {
        const [rects, { height: navbarHeight }] = res;
        this.offsetTopList = rects.map(item => item.top - navbarHeight);

        this.navbarHeight = navbarHeight;
        this.scrollTop = this.offsetTopList[sideBarIndex];
      });
    },
    onSideBarChange(e) {
      const { value } = e;
      console.log('change: ', value);

      this.sideBarIndex = value;
      this.scrollTop = this.offsetTopList[value];
    },

    onScroll(e) {
      const { scrollTop } = e.detail;
      const threshold = 50; // 下一个标题与顶部的距离
      const direction = scrollTop > this.lastScrollTop ? 'down' : 'up';
      this.lastScrollTop = scrollTop;

      // 动态调整阈值：向下滚动时增大阈值，向上时减小
      const dynamicThreshold = direction === 'down' ? threshold * 1.5 : threshold * 0.8;

      // 使用二分查找优化查找效率
      const findNearestIndex = (arr, target) => {
        let left = 0;
        let right = arr.length - 1;
        let result = 0;
        while (left <= right) {
          const mid = Math.floor((left + right) / 2);
          if (arr[mid] <= target + dynamicThreshold) {
            result = mid;
            left = mid + 1;
          } else {
            right = mid - 1;
          }
        }
        return result;
      };
      const newIndex = findNearestIndex(this.offsetTopList, scrollTop);
      if (newIndex !== this.sideBarIndex) {
        this.sideBarIndex = newIndex;
      }
    },
  },
};
</script>
<style>
page {
    background-color: var(--td-bg-color-container);
}

page .round-image {
    border-radius: 12rpx;
}

.side-bar-wrapper {
    display: flex;
    height: 100vh;

    --td-grid-item-text-font: var(--td-font-body-small);
}

.side-bar-wrapper .content {
    flex: 1;
}

.side-bar-wrapper .section {
    padding: 32rpx 0;
}

.side-bar-wrapper .title {
    padding-left: 40rpx;
    margin-bottom: 8rpx;
    font-size: 28rpx;
    line-height: 44rpx;
    color: var(--td-text-color-primary);
}

.side-bar-wrapper :deep(.image) {
    width: 96rpx;
    height: 96rpx;
    position: relative;
}

.side-bar-wrapper :deep(.image)::before {
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


### 切页用法


```vue
<template>
  <view>
    <view class="custom-navbar">
      <t-demo-navbar
        custom-class="demo-navbar"
        title="TDesign"
      />
    </view>

    <view
      class="side-bar-wrapper"
      :style="'height: calc(100vh - ' + navbarHeight + 'px)'"
    >
      <t-side-bar
        :value="sideBarIndex"
        @change="onSideBarChange"
      >
        <t-side-bar-item
          v-for="(item, index) in categories"
          :key="index"
          :value="item.value || index"
          :label="item.label"
          :disabled="item.disabled"
          :badge-props="item.badgeProps"
        />
      </t-side-bar>
      <view
        class="content"
        :style="'transform: translateY(-' + sideBarIndex * 100 + '%)'"
      >
        <scroll-view
          v-for="(item, index) in categories"
          :key="index"
          class="section"
          scroll-y
          :scroll-top="scrollTop"
          scroll-with-animation
          :show-scrollbar="false"
        >
          <view class="title">
            {{ item.title || item.label }}
          </view>

          <t-cell-group>
            <block
              v-for="(cargo, index1) in item.items"
              :key="index1"
            >
              <t-cell
                t-class-left="cell"
                :title="cargo.label + index"
              >
                <template
                  #image
                >
                  <t-image
                    shape="round"
                    :src="cargo.image"
                    lazy
                    t-class="image"
                  />
                </template>
              </t-cell>
            </block>
          </t-cell-group>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script>
import TSideBar from '@tdesign/uniapp/side-bar/side-bar.vue';
import TSideBarItem from '@tdesign/uniapp/side-bar-item/side-bar-item.vue';
import TCellGroup from '@tdesign/uniapp/cell-group/cell-group.vue';
import TCell from '@tdesign/uniapp/cell/cell.vue';
import TImage from '@tdesign/uniapp/image/image.vue';

const image = 'https://tdesign.gtimg.com/mobile/demos/example2.png';
const items = new Array(12).fill(
  {
    label: '标题文字',
    image,
  },
  0,
  12,
);

export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TSideBar,
    TSideBarItem,
    TCellGroup,
    TCell,
    TImage,
  },
  data() {
    return {
      sideBarIndex: 1,
      scrollTop: 0,

      categories: [
        {
          label: '选项一',
          title: '标题一',
          badgeProps: {},
          items,
        },
        {
          label: '选项二',
          title: '标题二',
          badgeProps: {
            dot: true,
          },
          items: items.slice(0, 10),
        },
        {
          label: '选项三',
          title: '标题三',
          badgeProps: {},
          items: items.slice(0, 6),
        },
        {
          label: '选项四',
          title: '标题四',
          badgeProps: {
            count: 8,
          },
          items: items.slice(0, 8),
        },
        {
          label: '选项五',
          title: '标题五',
          badgeProps: {},
          disabled: true,
          items: items.slice(0, 8),
        },
      ],

      navbarHeight: 0,
      offsetTopList: [],

      cargo: {
        label: '',
        image: '',
      },
    };
  },
  mounted() {
    setTimeout(() => {
      this.getCustomNavbarHeight();
    }, 30);
  },
  methods: {
    getCustomNavbarHeight() {
      const query = uni.createSelectorQuery().in(this);
      query.select('.custom-navbar').boundingClientRect();
      query.exec((res) => {
        const { height = 0 } = res[0] || {};
        this.navbarHeight = height;
      });
    },

    onSideBarChange(e) {
      const { value } = e;
      console.log('change: ', value);
      this.sideBarIndex = value;
      this.scrollTop = 0;
    },
  },
};
</script>
<style>
page {
    background-color: var(--td-bg-color-container);
}

page .round-image {
    border-radius: 12rpx;
}

.side-bar-wrapper {
    display: flex;
    height: 100vh;
    overflow: hidden;
}

.side-bar-wrapper .content {
    flex: 1;
    transition: transform 0.3s ease;
}

.side-bar-wrapper .section {
    padding: 32rpx 0;
    box-sizing: border-box;
    height: 100%;
}

.side-bar-wrapper .title {
    padding-left: 40rpx;
    margin-bottom: 8rpx;
    font: var(--td-font-body-medium);
    color: var(--td-text-color-primary);
}

.side-bar-wrapper :deep(.image) {
    width: 96rpx;
    height: 96rpx;

    position: relative;
}

.side-bar-wrapper .cell {
    margin-right: 32rpx !important;
}

.side-bar-wrapper :deep(.image)::before {
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


### 带图标侧边导航


```vue
<template>
  <view>
    <view class="custom-navbar">
      <t-demo-navbar
        custom-class="demo-navbar"
        title="TDesign"
      />
    </view>

    <view
      class="side-bar-wrapper"
      :style="'height: calc(100vh - ' + navbarHeight + 'px)'"
    >
      <t-side-bar
        :value="sideBarIndex"
        @change="onSideBarChange"
      >
        <t-side-bar-item
          v-for="(item, index) in categories"
          :key="index"
          :value="item.value || index"
          :label="item.label"
          :icon="item.icon"
          :badge-props="item.badgeProps"
        />
      </t-side-bar>
      <scroll-view
        class="content"
        scroll-y
        scroll-with-animation
        :scroll-top="scrollTop"
        @scroll="onScroll"
      >
        <view
          v-for="(item, index) in categories"
          :key="index"
          class="section"
        >
          <view class="title">
            {{ item.title || item.label }}
          </view>

          <t-grid
            :column="3"
            :border="false"
          >
            <block
              v-for="(cargo, index1) in item.items"
              :key="index1"
            >
              <t-grid-item
                t-class-image="image"
                :text="cargo.label"
                :image="cargo.image"
                :image-props="{ shape: 'round', lazy: true }"
              />
            </block>
          </t-grid>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import TSideBar from '@tdesign/uniapp/side-bar/side-bar.vue';
import TSideBarItem from '@tdesign/uniapp/side-bar-item/side-bar-item.vue';
import TGrid from '@tdesign/uniapp/grid/grid.vue';
import TGridItem from '@tdesign/uniapp/grid-item/grid-item.vue';
const image = 'https://tdesign.gtimg.com/mobile/demos/example2.png';
const items = new Array(12).fill()
  .map((_, index) => ({
    label: index % 3 === 2 ? '最多六个文字' : '标题文字',
    image,
  }));
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TSideBar,
    TSideBarItem,
    TGrid,
    TGridItem,
  },
  data() {
    return {
      sideBarIndex: 1,
      scrollTop: 0,

      categories: [
        {
          label: '选项一',
          title: '标题一',
          icon: 'app',
          badgeProps: {},
          items,
        },
        {
          label: '选项二',
          title: '标题二',
          icon: 'app',
          badgeProps: {
            dot: true,
          },
          items: items.slice(0, 9),
        },
        {
          label: '选项三',
          title: '标题三',
          icon: 'app',
          badgeProps: {},
          items: items.slice(0, 9),
        },
        {
          label: '选项四',
          title: '标题四',
          icon: 'app',
          badgeProps: {
            count: 6,
          },
          items: items.slice(0, 6),
        },
        {
          label: '选项五',
          title: '标题五',
          icon: 'app',
          badgeProps: {},
          items: items.slice(0, 3),
        },
      ],

      navbarHeight: 0,
      offsetTopList: [],
      lastScrollTop: 0,

      cargo: {
        label: '',
        image: '',
      },
    };
  },
  mounted() {
    setTimeout(() => {
      this.getCustomNavbarHeight();
    }, 30);
  },
  methods: {
    getCustomNavbarHeight() {
      let query = uni.createSelectorQuery().in(this);
      // #ifdef MP-ALIPAY
      query = uni.createSelectorQuery();
      // #endif
      const { sideBarIndex } = this;
      query.selectAll('.title').boundingClientRect();
      query.select('.custom-navbar').boundingClientRect();
      query.exec((res) => {
        const [rects, { height: navbarHeight = 0 }] = res;
        this.offsetTopList = rects.map(item => item.top - navbarHeight);

        this.navbarHeight = navbarHeight;
        this.scrollTop = this.offsetTopList[sideBarIndex];
      });
    },
    onSideBarChange(e) {
      const { value } = e;

      this.sideBarIndex = value;
      this.scrollTop = this.offsetTopList[value];
    },

    onScroll(e) {
      const { scrollTop } = e.detail;
      const threshold = 50; // 下一个标题与顶部的距离
      const direction = scrollTop > this.lastScrollTop ? 'down' : 'up';
      this.lastScrollTop = scrollTop;

      // 动态调整阈值：向下滚动时增大阈值，向上时减小
      const dynamicThreshold = direction === 'down' ? threshold * 1.5 : threshold * 0.8;

      // 使用二分查找优化查找效率
      const findNearestIndex = (arr, target) => {
        let left = 0;
        let right = arr.length - 1;
        let result = 0;
        while (left <= right) {
          const mid = Math.floor((left + right) / 2);
          if (arr[mid] <= target + dynamicThreshold) {
            result = mid;
            left = mid + 1;
          } else {
            right = mid - 1;
          }
        }
        return result;
      };
      const newIndex = findNearestIndex(this.offsetTopList, scrollTop);
      if (newIndex !== this.sideBarIndex) {
        this.sideBarIndex = newIndex;
      }
    },
  },
};
</script>
<style>
page {
    background-color: var(--td-bg-color-container);
}

page .round-image {
    border-radius: 12rpx;
}

.side-bar-wrapper {
    display: flex;
    height: 100vh;

    --td-grid-item-text-font: var(--td-font-body-small);
}

.side-bar-wrapper .content {
    flex: 1;
}

.side-bar-wrapper .section {
    padding: 32rpx 0;
}

.side-bar-wrapper .title {
    padding-left: 40rpx;
    margin-bottom: 8rpx;
    font: var(--td-font-body-medium);
    color: var(--td-text-color-primary);
}

.side-bar-wrapper :deep(.image) {
    width: 96rpx;
    height: 96rpx;
    position: relative;
}

.side-bar-wrapper :deep(.image)::before {
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


### 自定义样式


```vue
<template>
  <view>
    <view class="custom-navbar">
      <t-demo-navbar
        custom-class="demo-navbar"
        title="TDesign"
      />
    </view>

    <view
      class="side-bar-wrapper"
      :style="'height: calc(100vh - ' + navbarHeight + 'px)'"
    >
      <t-side-bar
        :value="sideBarIndex"
        @change="onSideBarChange"
      >
        <t-side-bar-item
          v-for="(item, index) in categories"
          :key="index"
          :value="item.value || index"
          :label="item.label"
          :badge-props="item.badgeProps"
        />
      </t-side-bar>
      <scroll-view
        class="content"
        scroll-y
        scroll-with-animation
        :scroll-top="scrollTop"
        @scroll="onScroll"
      >
        <view
          v-for="(item, index) in categories"
          :key="index"
          class="section"
        >
          <view class="title">
            {{ item.title || item.label }}
          </view>

          <t-grid
            :column="3"
            :border="false"
          >
            <block
              v-for="(cargo, index1) in item.items"
              :key="index1"
            >
              <t-grid-item
                t-class-image="image"
                :text="cargo.label"
                :image="cargo.image"
                :image-props="{ shape: 'round', lazy: true }"
              />
            </block>
          </t-grid>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import TSideBar from '@tdesign/uniapp/side-bar/side-bar.vue';
import TSideBarItem from '@tdesign/uniapp/side-bar-item/side-bar-item.vue';
import TGrid from '@tdesign/uniapp/grid/grid.vue';
import TGridItem from '@tdesign/uniapp/grid-item/grid-item.vue';
const image = 'https://tdesign.gtimg.com/mobile/demos/example1.png';
const items = new Array(12).fill()
  .map((_, index) => ({
    label: index % 3 === 2 ? '最多六个文字' : '标题文字',
    image,
  }));
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TSideBar,
    TSideBarItem,
    TGrid,
    TGridItem,
  },
  data() {
    return {
      sideBarIndex: 1,
      scrollTop: 0,

      categories: [
        {
          label: '选项一',
          title: '标题一',
          badgeProps: {},
          items,
        },
        {
          label: '选项二',
          title: '标题二',
          badgeProps: {
            dot: true,
          },
          items: items.slice(0, 9),
        },
        {
          label: '选项三',
          title: '标题三',
          badgeProps: {},
          items: items.slice(0, 9),
        },
        {
          label: '选项四',
          title: '标题四',
          badgeProps: {
            count: 6,
          },
          items: items.slice(0, 6),
        },
        {
          label: '选项五',
          title: '标题五',
          badgeProps: {},
          items: items.slice(0, 3),
        },
      ],

      navbarHeight: 0,
      offsetTopList: [],
      lastScrollTop: 0,

      cargo: {
        label: '',
        image: '',
      },
    };
  },
  mounted() {
    setTimeout(() => {
      this.getCustomNavbarHeight();
    }, 30);
  },
  methods: {
    getCustomNavbarHeight() {
      let query = uni.createSelectorQuery().in(this);
      // #ifdef MP-ALIPAY
      query = uni.createSelectorQuery();
      // #endif
      const { sideBarIndex } = this;
      query.selectAll('.title').boundingClientRect();
      query.select('.custom-navbar').boundingClientRect();
      query.exec((res) => {
        const [rects, { height: navbarHeight }] = res;
        this.offsetTopList = rects.map(item => item.top - navbarHeight);

        this.navbarHeight = navbarHeight;
        this.scrollTop = this.offsetTopList[sideBarIndex];
      });
    },
    onSideBarChange(e) {
      const { value } = e;

      this.sideBarIndex = value;
      this.scrollTop = this.offsetTopList[value];
    },

    onScroll(e) {
      const { scrollTop } = e.detail;
      const threshold = 50; // 下一个标题与顶部的距离
      const direction = scrollTop > this.lastScrollTop ? 'down' : 'up';
      this.lastScrollTop = scrollTop;

      // 动态调整阈值：向下滚动时增大阈值，向上时减小
      const dynamicThreshold = direction === 'down' ? threshold * 1.5 : threshold * 0.8;

      // 使用二分查找优化查找效率
      const findNearestIndex = (arr, target) => {
        let left = 0;
        let right = arr.length - 1;
        let result = 0;
        while (left <= right) {
          const mid = Math.floor((left + right) / 2);
          if (arr[mid] <= target + dynamicThreshold) {
            result = mid;
            left = mid + 1;
          } else {
            right = mid - 1;
          }
        }
        return result;
      };
      const newIndex = findNearestIndex(this.offsetTopList, scrollTop);
      if (newIndex !== this.sideBarIndex) {
        this.sideBarIndex = newIndex;
      }
    },
  },
};
</script>
<style>
page {
    background-color: var(--td-bg-color-container);
}

page .round-image {
    border-radius: 12rpx;
}

.side-bar-wrapper {
    display: flex;
    height: 100vh;

    --td-grid-item-text-font: var(--td-font-body-small);
}

.side-bar-wrapper .content {
    flex: 1;
}

.side-bar-wrapper .section {
    padding: 32rpx 0;
}

.side-bar-wrapper .title {
    padding-left: 40rpx;
    margin-bottom: 8rpx;
    font-size: 28rpx;
    line-height: 44rpx;
    color: var(--td-text-color-primary);
}

.side-bar-wrapper :deep(.image) {
    width: 96rpx;
    height: 96rpx;
    position: relative;
}

.side-bar-wrapper :deep(.image)::before {
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

page .side-bar-wrapper {
    --td-side-bar-border-radius: 6px;
    --td-side-bar-active-color: green;
}
</style>
```


## API

### SideBar Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
custom-style | Object | - | 自定义样式 | N
value | String / Number | - | 选项值。支持语法糖 `v-model:value` | N
default-value | String / Number | - | 选项值。非受控属性 | N

### SideBar Events

名称 | 参数 | 描述
-- | -- | --
change | `(context: { value: number \| string, label: string })` | 选项值发生变化时触发
click | `(context: { value: number \| string; label: string })` | 点击选项时触发

### SideBar Slots

名称 | 描述
-- | --
\- | 默认插槽，自定义侧边导航栏内容


### SideBarItem Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
custom-style | Object | - | 自定义样式 | N
badge-props | Object | - | 透传至 Badge 组件。TS 类型：`BadgeProps`，[Badge API Documents](./badge?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/side-bar-item/type.ts) | N
disabled | Boolean | false | 是否禁用 | N
icon | String / Object | - | 图标，传对象则透传至 Icon | N
label | String | - | 展示的标签 | N
value | String / Number | - | 当前选项的值 | N

### SideBarItem Slots

名称 | 描述
-- | --
\- | 默认插槽，自定义侧边导航项内容

### CSS Variables

组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-side-bar-bg-color | @bg-color-secondarycontainer | -
--td-side-bar-height | 100% | -
--td-side-bar-width | 206rpx | -
--td-side-bar-active-color | @brand-color | -
--td-side-bar-border-radius | 18rpx | -
--td-side-bar-color | @text-color-primary | -
--td-side-bar-disabled-color | @text-color-disabled | -
--td-side-bar-font | @font-body-large | -
--td-side-bar-icon-size | 40rpx | -
--td-side-bar-item-height | auto | -
