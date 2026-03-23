---
name: "radio"
description: "用于在预设的一组选项中执行单项选择，并呈现选择结果。"
url: "https://tdesign.tencent.com/uniapp/components/radio"
---




## 引入

可在 `main.ts` 或在需要使用的页面或组件中引入。

```js
import TRadio from '@tdesign/uniapp/radio/radio.vue';
import TRadioGroup from '@tdesign/uniapp/radio-group/radio-group.vue';
```

### 纵向单选框


```vue
<template>
  <view>
    <t-radio-group
      allow-uncheck
      :value="current"
      :options="options"
      :relation-key="relationKey"
      @change="onChange"
    />
  </view>
</template>

<script>
import TRadioGroup from '@tdesign/uniapp/radio-group/radio-group.vue';

export default {
  components: {
    TRadioGroup,
  },
  data() {
    return {
      relationKey: `${Math.random()}`,
      current: 1,
      options: [
        {
          value: 0,
          label: '单选',
        },
        {
          value: 1,
          label: '单选',
        },
        {
          value: 2,
          label: '单选单选单选单选单选单选单选单选单选单选单选单选单选单选',
        },
        {
          value: 3,
          label: '单选',
          content: '描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息',
        },
      ],
    };
  },
  created() {},
  methods: {
    onChange(event) {
      console.log('[onChange]', event);
      const { value } = event;
      this.current = value;
      console.log('[current]', this.current);
    },
  },
};
</script>
<style>
</style>
```


### 横向单选框


```vue
<template>
  <view>
    <t-radio-group
      default-value="0"
      borderless
      :custom-style="boxCustomStyle"
    >
      <t-radio
        :block="false"
        label="单选标题"
        value="0"
      />
      <t-radio
        :block="false"
        label="单选标题"
        value="1"
      />
      <t-radio
        :block="false"
        label="上限四字"
        value="2"
      />
    </t-radio-group>
  </view>
</template>

<script>
import TRadioGroup from '@tdesign/uniapp/radio-group/radio-group.vue';
import TRadio from '@tdesign/uniapp/radio/radio.vue';
import tools from '@tdesign/uniapp/common/utils.wxs';


export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TRadioGroup,
    TRadio,
  },
  data() {
    return {
      checked: false,
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
  methods: {
    handleChange(e) {
      console.log('handleChange', e);
      this.checked = e.checked;
    },
  },
};
</script>
<style>
.box {
    padding: 32rpx;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    background-color: var(--td-bg-color-container, #fff);
}
</style>
```


### 单选框状态


```vue
<template>
  <view>
    <t-radio-group
      default-value="radio1"
      :disabled="true"
    >
      <t-radio
        value="radio1"
        label="单选"
      />
      <t-radio
        value="radio2"
        label="单选"
      />
    </t-radio-group>
  </view>
</template>

<script>
import TRadioGroup from '@tdesign/uniapp/radio-group/radio-group.vue';
import TRadio from '@tdesign/uniapp/radio/radio.vue';
export default {
  components: {
    TRadioGroup,
    TRadio,
  },
  /**
     * 组件的属性列表
     */
  props: {},
  data() {
    return {};
  },
  created() {},
  /**
     * 组件的方法列表
     */
  methods: {},
};
</script>
<style>
</style>
```


### 勾选样式


```vue
<template>
  <view>
    <t-radio
      :default-checked="true"
      allow-uncheck
      icon="line"
      label="单选"
      relation-key="-1"
    />

    <view
      class="gutter"
      style="height: 32rpx"
      relation-key="-1"
    />

    <t-radio
      :default-checked="true"
      allow-uncheck
      icon="dot"
      label="单选"
      relation-key="-1"
    />
  </view>
</template>

<script>
import TRadio from '@tdesign/uniapp/radio/radio.vue';
export default {
  components: {
    TRadio,
  },
  /**
     * 组件的属性列表
     */
  props: {},
  data() {
    return {};
  },
  created() {},
  /**
     * 组件的方法列表
     */
  methods: {},
};
</script>
<style>
</style>
```


### 勾选显示位置


```vue
<template>
  <view>
    <t-radio
      value="radio1"
      allow-uncheck
      label="单选"
      default-checked
      relation-key="-1"
    />

    <view class="block" />

    <t-radio
      value="radio2"
      allow-uncheck
      label="单选"
      placement="right"
      default-checked
      relation-key="-1"
    />
  </view>
</template>

<script>
import TRadio from '@tdesign/uniapp/radio/radio.vue';
export default {
  components: {
    TRadio,
  },
  /**
     * 组件的属性列表
     */
  props: {},
  data() {
    return {};
  },
  created() {},
  /**
     * 组件的方法列表
     */
  methods: {
    onChange(event) {
      console.log('radio', event);
    },
  },
};
</script>
<style>
.block {
    height: 32rpx;
}
</style>
```


### 非通栏单选样式


```vue
<template>
  <view>
    <t-radio-group
      t-class="theme-card"
      :custom-style="cardCustomStyle"
      default-value="radio1"
    >
      <t-radio
        label="单选"
        value="radio1"
        default-checked
      />
      <t-radio
        label="单选"
        value="radio2"
      />
      <t-radio
        label="单选标题多行单选标题多行单选标题多行单选标题多行单选标题多行"
        value="radio3"
      />
    </t-radio-group>
  </view>
</template>

<script>
import TRadioGroup from '@tdesign/uniapp/radio-group/radio-group.vue';
import TRadio from '@tdesign/uniapp/radio/radio.vue';
import tools from '@tdesign/uniapp/common/utils.wxs';

export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TRadioGroup,
    TRadio,
  },
  /**
     * 组件的属性列表
     */
  props: {},
  data() {
    return {};
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
  created() {},
  methods: {
    onChange() {},
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


### 特殊样式


```vue
<template>
  <view>
    <t-radio-group
      :value="value"
      allow-uncheck
      @change="onChange"
    >
      <view
        v-for="(item, index) in 3"
        :key="index"
        :class="'card ' + (value == index ? 'card--active' : '')"
      >
        <t-icon
          v-if="value == index"
          name="check"
          :t-class="cardIconTClass"
          :class="cardIconClass"
        />

        <t-radio
          :value="index"
          label="单选"
          content="描述信息描述信息描述信息描述信息描述信息"
          icon="none"
          borderless
        />
      </view>
    </t-radio-group>

    <view
      class="demo-desc"
      style="margin: 48rpx 32rpx 32rpx"
    >
      横向卡片单选框
    </view>

    <t-radio-group
      :t-class="horBoxTClass"
      :class="horBoxClass"
      :custom-style="horBoxCustomStyle"
      :value="value1"
      @change="onChange1"
    >
      <view
        v-for="(item, index) in 3"
        :key="index"
        :class="'card ' + (value1 == index ? 'card--active' : '')"
      >
        <t-icon
          v-if="value1 == index"
          name="check"
          :t-class="cardIconTClass"
          :class="cardIconClass"
          custom-style="font-size: 12px;"
        />

        <t-radio
          :value="index"
          label="单选"
          icon="none"
          borderless
        />
      </view>
    </t-radio-group>
  </view>
</template>

<script>
import TRadioGroup from '@tdesign/uniapp/radio-group/radio-group.vue';
import TRadio from '@tdesign/uniapp/radio/radio.vue';
import TIcon from '@tdesign/uniapp/icon/icon.vue';
import { canUseVirtualHost } from '@tdesign/uniapp/common/version';
import tools from '@tdesign/uniapp/common/utils.wxs';


export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TRadioGroup,
    TRadio,
    TIcon,
  },
  data() {
    return {
      value: 0,
      value1: 0,
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
    border-width: 28px 28px 28px 0;
    border-style: solid;
    border-color: var(--td-brand-color, #0052d9) transparent transparent transparent;
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
</style>
```


## API

### Radio Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
custom-style | Object | - | 自定义样式 | N
allow-uncheck | Boolean | false | 是否允许取消选中 | N
block | Boolean | true | 是否为块级元素 | N
checked | Boolean | false | 是否选中。支持语法糖 `v-model:checked` | N
default-checked | Boolean | false | 是否选中。非受控属性 | N
content | String | - | 单选内容 | N
content-disabled | Boolean | false | 是否禁用组件内容（content）触发选中 | N
disabled | Boolean | undefined | 是否为禁用态 | N
icon | String / Array | 'circle' | 自定义选中图标和非选中图标。使用 Array 时表示：`[选中态图标，非选中态图标]`。使用 String 时，值为 circle 表示填充型图标、值为 line 表示描边型图标、值为 dot 表示圆点图标，值为 slot 时使用插槽。TS 类型：`'circle' \| 'line' \| 'dot' \| Array<string>` | N
label | String | - | 主文案 | N
max-content-row | Number | 5 | 内容最大行数限制 | N
max-label-row | Number | 3 | 主文案最大行数限制 | N
name | String | - | HTML 元素原生属性 | N
placement | String | - | 复选框和内容相对位置。优先级高于 RadioGroup.placement。Radio 单独存在时，默认值为 left。如果父组件存在 RadioGroup，默认值便由 RadioGroup.placement 决定。可选项：left/right | N
readonly | Boolean | undefined | 只读状态 | N
relation-key | String | - | -1 时代表独立，不再寻找 parent，用于头条小程序 | N
value | String / Number / Boolean | false | 单选按钮的值。TS 类型：`T` `type RadioValue = string \| number \| boolean`。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/radio/type.ts) | N

### Radio Events

名称 | 参数 | 描述
-- | -- | --
change | `(context: { checked: boolean })` | 值变化时触发

### Radio Slots

名称 | 描述
-- | --
\- | 默认插槽，主文案
content | 自定义 `content` 显示内容
icon | 自定义选中图标和非选中图标
label | 自定义 `label` 显示内容

### Radio External Classes

类名 | 描述
-- | --
t-class | 根节点样式类
t-class-border | 边框样式类
t-class-content | 内容样式类
t-class-icon | 图标样式类
t-class-label | 标签样式类


### RadioGroup Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
custom-style | Object | - | 自定义样式 | N
allow-uncheck | Boolean | false | 是否允许取消选中 | N
borderless | Boolean | false | 是否开启无边框模式 | N
disabled | Boolean | undefined | 是否禁用全部子单选框 | N
icon | String / Array | 'circle' | 自定义选中图标和非选中图标。示例：[选中态图标，非选中态图标]。使用 String 时，值为 circle 表示填充型图标、值为 line 表示描边型图标、值为 dot 表示圆点图标；仅在使用 options 时生效。TS 类型：`'circle' \| 'line' \| 'dot' \| Array<string>` | N
keys | Object | - | 用来定义 value / label / disabled 在 `options` 中对应的字段别名。TS 类型：`KeysType`。[通用类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/common/common.ts) | N
name | String | - | HTML 元素原生属性 | N
options | Array | - | 单选组件按钮形式。RadioOption 数据类型为 string 或 number 时，表示 label 和 value 值相同。TS 类型：`Array<RadioOption>` `type RadioOption = string \| number \| RadioOptionObj` `interface RadioOptionObj { label?: string; value?: string \| number; readonly?: boolean; disabled?: boolean; allowUncheck?: boolean; }`。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/radio-group/type.ts) | N
placement | String | left | 复选框和内容相对位置。优先级低于 Radio.placement。可选项：left/right | N
readonly | Boolean | undefined | 只读状态 | N
relation-key | String | - | -1 时代表独立，不再寻找 parent，用于头条小程序 | N
value | String / Number / Boolean | - | 选中的值。支持语法糖 `v-model:value`。TS 类型：`T`，[Radio API Documents](./radio?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/radio-group/type.ts) | N
default-value | String / Number / Boolean | - | 选中的值。非受控属性。TS 类型：`T`，[Radio API Documents](./radio?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/radio-group/type.ts) | N

### RadioGroup Events

名称 | 参数 | 描述
-- | -- | --
change | `(context: { value: RadioValue })` | 选中值发生变化时触发

### RadioGroup Slots

名称 | 描述
-- | --
\- | 默认插槽，单选框组内容

### CSS Variables

组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-radio-bg-color | @bg-color-container | -
--td-radio-border-color | @component-stroke | -
--td-radio-content-checked-color | @text-color-secondary | -
--td-radio-content-color | @text-color-secondary | -
--td-radio-content-disabled-color | @text-color-disabled | -
--td-radio-content-font | @font-body-medium | -
--td-radio-font | @font-body-large | -
--td-radio-icon-checked-color | @brand-color | -
--td-radio-icon-color | @component-border | -
--td-radio-icon-disabled-bg-color | @bg-color-component-disabled | -
--td-radio-icon-disabled-color | @brand-color-disabled | -
--td-radio-icon-size | 48rpx | -
--td-radio-label-checked-color | @text-color-primary | -
--td-radio-label-color | @text-color-primary | -
--td-radio-label-disabled-color | @text-color-disabled | -
--td-radio-label-line-height | 48rpx | -
--td-radio-vertical-padding | 32rpx | -
