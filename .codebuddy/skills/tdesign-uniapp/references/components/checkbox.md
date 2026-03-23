---
name: "checkbox"
description: "用于预设的一组选项中执行多项选择，并呈现选择结果。"
url: "https://tdesign.tencent.com/uniapp/components/checkbox"
---



## 引入

可在 `main.ts` 或在需要使用的页面或组件中引入。

```js
import TCheckbox from '@tdesign/uniapp/checkbox/checkbox.vue';
import TCheckboxGroup from '@tdesign/uniapp/checkbox-group/checkbox-group.vue';
```

### 组件类型

纵向多选框


```vue
<template>
  <view>
    <t-checkbox-group
      :value="current"
      :options="options"
      :relation-key="relationKey"
      @change="handleGroupChange"
    />
  </view>
</template>

<script>
import TCheckboxGroup from '@tdesign/uniapp/checkbox-group/checkbox-group.vue';

export default {
  components: {
    TCheckboxGroup,
  },
  data() {
    return {
      relationKey: `${Math.random()}`,
      current: ['checkbox1', 'checkbox2'],
      options: [
        {
          label: '多选',
          value: 'checkbox1',
        },
        {
          label: '多选',
          value: 'checkbox2',
        },
        {
          label: '多选标题多行多选标题多行多选标题多行多选标题多行多选标题多行多选标题多行',
          value: 'checkbox3',
          maxLabelRow: 2,
        },
        {
          label: '多选',
          value: 'checkbox4',
          content: '描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息',
          maxContentRow: 2,
        },
      ],
    };
  },
  created() {},
  methods: {
    handleGroupChange(event) {
      console.log('change: ', event);
      const { value } = event;
      this.current = value;
    },
  },
};
</script>
<style>
</style>
```


横向多选框


```vue
<template>
  <view>
    <t-checkbox-group
      :custom-style="boxCustomStyle"
      borderless
      :value="current"
      @change="onChange"
    >
      <t-checkbox
        :block="false"
        value="checkbox1"
        label="多选标题"
      />
      <t-checkbox
        :block="false"
        value="checkbox2"
        label="多选标题"
      />
      <t-checkbox
        :block="false"
        value="checkbox3"
        label="上限四字"
      />
    </t-checkbox-group>
  </view>
</template>

<script>
import TCheckboxGroup from '@tdesign/uniapp/checkbox-group/checkbox-group.vue';
import TCheckbox from '@tdesign/uniapp/checkbox/checkbox.vue';
import tools from '@tdesign/uniapp/common/utils.wxs';

export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TCheckboxGroup,
    TCheckbox,
  },
  data() {
    return {
      current: ['checkbox1', 'checkbox2'],
    };
  },
  computed: {
    boxCustomStyle() {
      return tools._style({
        padding: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        backgroundColor: 'var(--td-bg-color-container, #fff)',
      });
    },
  },
  created() {},
  methods: {
    onChange(event) {
      console.log('checkbox', event.value);
      this.current =  event.value;
    },
  },
};
</script>
<style>
/* .box {
    padding: 32rpx;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    background-color: var(--td-bg-color-container, #fff);
} */
</style>
```


带全选多选框


```vue
<template>
  <view>
    <t-checkbox-group
      :options="options"
      :default-value="checkAllValues"
      :relation-key="relationKey"
      @change="onCheckAllChange"
    />
  </view>
</template>

<script>
import TCheckboxGroup from '@tdesign/uniapp/checkbox-group/checkbox-group.vue';
export default {
  components: {
    TCheckboxGroup,
  },
  data() {
    return {
      relationKey: `${Math.random()}`,
      options: [
        {
          label: '全选',
          checkAll: true,
        },
        {
          label: '多选',
          value: 1,
        },
        {
          label: '多选',
          value: 2,
        },
        {
          label: '多选',
          value: 3,
          content: '单选描述信息单选描述信息单选描述信息单选描述信息单选描述信息单选描述信息单选描述信息',
        },
      ],
      checkAllValues: [1, 2, 3, ''],
    };
  },
  created() {},
  methods: {
    onCheckAllChange(event) {
      console.log('change: ', event);
      this.checkAllValues = event.value;
    },
  },
};
</script>
<style>
</style>
```


### 组件状态

多选框状态


```vue
<template>
  <view>
    <t-checkbox-group
      :default-value="['checkbox1']"
      disabled
    >
      <t-checkbox
        value="checkbox1"
        label="选项禁用-已选"
      />
      <t-checkbox
        value="checkbox2"
        label="选项禁用-默认"
      />
    </t-checkbox-group>
  </view>
</template>

<script>
import TCheckboxGroup from '@tdesign/uniapp/checkbox-group/checkbox-group.vue';
import TCheckbox from '@tdesign/uniapp/checkbox/checkbox.vue';
export default {
  components: {
    TCheckboxGroup,
    TCheckbox,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style>
</style>
```


### 组件样式

勾选样式


```vue
<template>
  <view>
    <t-checkbox
      label="多选"
      icon="line"
      default-checked
      relation-key="-1"
    />

    <view
      style="height: 32rpx"
    />

    <t-checkbox
      label="多选"
      icon="rectangle"
      default-checked
      relation-key="-1"
    />

    <view
      style="height: 32rpx"
    />

    <t-checkbox
      value="checkbox1"
      label="图片图标"
      :icon="[activeImage, inActiveImage]"
      relation-key="-1"
    />
  </view>
</template>

<script>
import TCheckbox from '@tdesign/uniapp/checkbox/checkbox.vue';
export default {
  components: {
    TCheckbox,
  },
  data() {
    return {
      demoCheckbox2: ['checkbox2', 'checkbox3'],
      activeImage: 'https://tdesign.gtimg.com/mobile/demos/checkbox-checked.png',
      inActiveImage: 'https://tdesign.gtimg.com/mobile/demos/checkbox.png',
    };
  },
  created() {},
  /**
     * 组件的方法列表
     */
  methods: {
    onChange(event) {
      console.log('checkbox', event.value);
    },
  },
};
</script>
<style>
</style>
```


勾选显示位置


```vue
<template>
  <view>
    <t-checkbox
      value="1"
      label="多选"
      default-checked
      relation-key="-1"
    />

    <view
      style="height: 32rpx"
    />

    <t-checkbox
      value="2"
      label="多选"
      placement="right"
      default-checked
      relation-key="-1"
    />
  </view>
</template>

<script>
import TCheckbox from '@tdesign/uniapp/checkbox/checkbox.vue';
export default {
  components: {
    TCheckbox,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style>
</style>
```


非通栏多选样式


```vue
<template>
  <view>
    <t-checkbox-group
      t-class="theme-card"
      :custom-style="cardCustomStyle"
      :default-value="['1', '2']"
    >
      <t-checkbox
        value="1"
        label="多选"
      />
      <t-checkbox
        value="2"
        label="多选"
      />
      <t-checkbox
        value="3"
        label="多选标题多行多选标题多行多选标题多行多选标题多行多选标题多行多选标题"
      />
    </t-checkbox-group>
  </view>
</template>

<script>
import TCheckboxGroup from '@tdesign/uniapp/checkbox-group/checkbox-group.vue';
import TCheckbox from '@tdesign/uniapp/checkbox/checkbox.vue';
import tools from '@tdesign/uniapp/common/utils.wxs';


export default {
  components: {
    TCheckboxGroup,
    TCheckbox,
  },
  data() {
    return {
      checked: true,
    };
  },
  computed: {
    cardCustomStyle() {
      return tools._style({
        borderRadius: '24rpx',
        margin: '16px',
        overflow: 'hidden',
      });
    },
  },
  methods: {
    changeChecked(e) {
      this.checked = e.checked;
    },
  },
};
</script>
<style>
/* .theme-card {
    border-radius: 24rpx;
    margin: 32rpx;
    overflow: hidden;
} */
</style>
```


### 组件规格

多选框尺寸规格


```vue
<template>
  <view>
    <t-checkbox-group
      :value="value"
      @change="onChange"
    >
      <view
        v-for="(item, index) in 3"
        :key="index"
        :class="'card ' + (contain(value, index) ? 'card--active' : '')"
      >
        <t-icon
          v-if="contain(value, index)"
          name="check"
          :t-class="cardIconTClass"
          :class="cardIconClass"
          :aria-hidden="true"
        />

        <t-checkbox
          :value="index"
          label="多选"
          content="描述信息描述信息描述信息描述信息描述信息"
          icon="none"
          borderless
        />
      </view>
    </t-checkbox-group>

    <view
      class="demo-desc"
      style="margin: 48rpx 32rpx 32rpx"
    >
      横向卡片多选框
    </view>

    <t-checkbox-group
      :t-class="horBoxTClass"
      :class="horBoxClass"
      :custom-style="horBoxCustomStyle"
      :value="value1"
      @change="onChange1"
    >
      <view
        v-for="(item, index) in 3"
        :key="index"
        :class="'card ' + (contain(value1, index) ? 'card--active' : '')"
      >
        <t-icon
          v-if="contain(value1, index)"
          name="check"
          :t-class="cardIconTClass"
          :class="cardIconClass"
          custom-style="font-size: 12px;"
          :aria-hidden="true"
        />

        <t-checkbox
          :value="index"
          label="多选"
          icon="none"
          borderless
        />
      </view>
    </t-checkbox-group>
  </view>
</template>
<script>
import TCheckboxGroup from '@tdesign/uniapp/checkbox-group/checkbox-group.vue';
import TCheckbox from '@tdesign/uniapp/checkbox/checkbox.vue';
import TIcon from '@tdesign/uniapp/icon/icon.vue';
import { canUseVirtualHost } from '@tdesign/uniapp/common/version';
import tools from '@tdesign/uniapp/common/utils.wxs';

export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TCheckboxGroup,
    TCheckbox,
    TIcon,
  },
  data() {
    return {
      value: [0, 1],
      value1: [0, 1],
    };
  },
  computed: {
    cardIconTClass() {
      return canUseVirtualHost() ? this.cardIconRealClass : '';
    },
    cardIconClass() {
      return !canUseVirtualHost() ? this.cardIconRealClass : '';
    },
    cardIconRealClass() {
      return 'card__icon';
    },
    horBoxTClass() {
      return canUseVirtualHost() ? this.horBoxRealClass : '';
    },
    horBoxClass() {
      return !canUseVirtualHost() ? this.horBoxRealClass : '';
    },
    horBoxRealClass() {
      return 'horizontal-box';
    },
    horBoxCustomStyle() {
      return tools._style({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        margin: '16px',
      });
    },
  },
  created() {},
  methods: {
    contain(arr, key) {
      return arr.indexOf(key) > -1;
    },
    onChange(e) {
      this.value = e.value;
      console.log('[change] e:', e);
    },
    onChange1(e) {
      this.value1 = e.value;
      console.log('[change] e:', e);
    },
  },
};
</script>
<style>
.card {
    position: relative;
    margin: 32rpx;
    border-radius: 12rpx;
    overflow: hidden;
    box-sizing: border-box;
    border: 3rpx solid var(--td-bg-color-container, #fff);
}

.card--active {
    border-color: var(--td-brand-color, #0052d9);
}

.card--active::after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    height: 0;
    border-width: 28px 28px 28px 0;
    border-style: solid;
    border-color: #0052d9 transparent transparent transparent;
    border: 14px solid var(--td-brand-color, #0052d9);
    border-bottom-color: transparent;
    border-right-color: transparent;
}

.card__icon {
    color: var(--td-bg-color-container, #fff);
    position: absolute;
    left: 1.5px;
    top: 1.5px;
    z-index: 1;
    font-size: 16px;
}

/* 横向布局 */
/* .horizontal-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 32rpx;
} */

.horizontal-box .card {
    flex: 0 0 calc(33.33% - 12rpx);
    margin: 0 0 24rpx 0;
}

.horizontal-box .card::after {
    border-width: 48rpx 48rpx 48rpx 0;
}

/* .horizontal-box .card__icon {
    font-size: 24rpx;
} */
</style>
```


## API

### Checkbox Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
custom-style | Object | - | 自定义样式 | N
block | Boolean | true | 是否为块级元素 | N
borderless | Boolean | undefined | 是否开启无边框模式 | N
check-all | Boolean | false | 用于标识是否为「全选选项」。单独使用无效，需在 CheckboxGroup 中使用 | N
checked | Boolean | - | 是否选中。支持语法糖 `v-model:checked` | N
default-checked | Boolean | - | 是否选中。非受控属性 | N
content | String | - | 多选框内容 | N
content-disabled | Boolean | - | 是否禁用组件内容（content）触发选中 | N
disabled | Boolean | undefined | 是否禁用组件。如果父组件存在 CheckboxGroup，默认值由 CheckboxGroup.disabled 控制。优先级：Checkbox.disabled > CheckboxGroup.disabled > Form.disabled | N
icon | String / Array | 'circle' | 自定义选中图标和非选中图标。使用 Array 时表示：`[选中态图标，非选中态图标，半选中态图标]`。使用 String 时，值为 circle 表示填充圆形图标、值为 line 表示描边型图标、值为 rectangle 表示填充矩形图标。TS 类型：`CheckboxIconType` `type CheckboxIconType = 'circle' \| 'line' \| 'rectangle' \| string[];`。[详细类型定义](https://github.com/tencent/tdesign-miniprogram/blob/develop/packages/uniapp-components/checkbox/type.ts) | N
indeterminate | Boolean | false | 是否为半选 | N
label | String | - | 主文案 | N
max-content-row | Number | 5 | 内容最大行数限制 | N
max-label-row | Number | 3 | 主文案最大行数限制 | N
name | String | - | HTML 元素原生属性 | N
placement | String | left | 多选框和内容相对位置。可选项：left/right | N
readonly | Boolean | undefined | 只读状态 | N
relation-key | String | - | -1 时代表独立，不再寻找 parent，用于头条小程序 | N
value | String / Number / Boolean | - | 多选框的值。TS 类型：`string \| number \| boolean` | N

### Checkbox Events

名称 | 参数 | 描述
-- | -- | --
change | `(context: { checked: boolean, context: { value: boolean\|number\|string, label: boolean\|number\|string }})` | 值变化时触发。`context` 表示当前点击项内容

### Checkbox Slots

名称 | 描述
-- | --
\- | 默认插槽，主文案
content | 自定义 `content` 显示内容
label | 自定义 `label` 显示内容

### Checkbox External Classes

类名 | 描述
-- | --
t-class | 根节点样式类
t-class-border | 边框样式类
t-class-content | 内容样式类
t-class-icon | 图标样式类
t-class-label | 标签样式类


### CheckboxGroup Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
custom-style | Object | - | 自定义样式 | N
borderless | Boolean | false | 是否开启无边框模式。优先级低于 Checkbox.borderless | N
disabled | Boolean | undefined | 是否禁用组件。优先级：Form.disabled < CheckboxGroup.disabled < Checkbox.disabled | N
keys | Object | - | 用来定义 value / label / disabled 在 `options` 中对应的字段别名。TS 类型：`KeysType`。[通用类型定义](https://github.com/tencent/tdesign-miniprogram/blob/develop/packages/uniapp-components/common/common.ts) | N
max | Number | undefined | 支持最多选中的数量 | N
name | String | - | 统一设置内部复选框 HTML 属性 | N
options | Array | [] | 以配置形式设置子元素。示例1：`['北京', '上海']` ，示例2: `[{ label: '全选', checkAll: true }, { label: '上海', value: 'shanghai' }]`。checkAll 值为 true 表示当前选项为「全选选项」。TS 类型：`Array<CheckboxOption>` `type CheckboxOption = string \| number \| CheckboxOptionObj` `interface CheckboxOptionObj { label?: string; value?: string \| number; disabled?: boolean;icon?:CheckboxIconType; checkAll?: true }`，[Checkbox API Documents](./checkbox?tab=api)。[详细类型定义](https://github.com/tencent/tdesign-miniprogram/blob/develop/packages/uniapp-components/checkbox-group/type.ts) | N
readonly | Boolean | undefined | 只读状态 | N
relation-key | String | - | -1 时代表独立，不再寻找 parent，用于头条小程序 | N
value | Array | - | 选中值。支持语法糖 `v-model:value`。TS 类型：`T` `type CheckboxGroupValue = Array<string \| number \| boolean>`。[详细类型定义](https://github.com/tencent/tdesign-miniprogram/blob/develop/packages/uniapp-components/checkbox-group/type.ts) | N
default-value | Array | - | 选中值。非受控属性。TS 类型：`T` `type CheckboxGroupValue = Array<string \| number \| boolean>`。[详细类型定义](https://github.com/tencent/tdesign-miniprogram/blob/develop/packages/uniapp-components/checkbox-group/type.ts) | N

### CheckboxGroup Events

名称 | 参数 | 描述
-- | -- | --
change | `(context: { value: CheckboxGroupValue, context: { value: boolean\|number\|string, label: boolean\|number\|string }})` | 值变化时触发。`context` 表示当前点击项内容

### CheckboxGroup Slots

名称 | 描述
-- | --
\- | 默认插槽，多选框组内容

### CSS Variables

组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-checkbox-bg-color | @bg-color-container | -
--td-checkbox-border-color | @component-stroke | -
--td-checkbox-description-color | @text-color-secondary | -
--td-checkbox-description-disabled-color | @text-color-disabled | -
--td-checkbox-description-font | @font-body-medium | -
--td-checkbox-icon-checked-color | @brand-color | -
--td-checkbox-icon-color | @component-border | -
--td-checkbox-icon-disabled-bg-color | @bg-color-component-disabled | -
--td-checkbox-icon-disabled-color | @brand-color-disabled | -
--td-checkbox-icon-size | 48rpx | -
--td-checkbox-tag-active-bg-color | @brand-color-light | -
--td-checkbox-tag-active-color | @brand-color | -
--td-checkbox-title-color | @text-color-primary | -
--td-checkbox-title-disabled-color | @text-color-disabled | -
--td-checkbox-title-font | @font-body-large | -
--td-checkbox-title-line-height | 48rpx | -
--td-checkbox-vertical-padding | @spacer-2 | -
