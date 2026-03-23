---
name: "picker"
description: "用于一组预设数据中的选择。"
url: "https://tdesign.tencent.com/uniapp/components/picker"
---



## 引入

可在 `main.ts` 或在需要使用的页面或组件中引入。

```js
import TPicker from '@tdesign/uniapp/picker/picker.vue';
import TPickerItem from '@tdesign/uniapp/picker-item/picker-item.vue';
```

### 组件类型

#### 基础选择器

单项和多选选择


```vue
<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
  <view>
    <t-cell
      t-class="mb-16"
      title="选择城市"
      arrow
      hover
      :note="cityText"
      @click="onCityPicker"
    />

    <t-cell
      t-class="mb-16"
      title="选择时间"
      arrow
      hover
      :note="dateText"
      @click="onSeasonPicker"
    />

    <t-picker
      :visible="cityVisible"
      :value="cityValue"
      data-key="city"
      title="选择城市"
      cancel-btn="取消"
      confirm-btn="确认"
      :using-custom-navbar="!isMPAlipay"
      @update:visible="cityVisible = $event"
      @change="onPickerChange($event, { key: 'city' })"
      @pick="onColumnChange($event, { key: 'city' })"
      @cancel="onPickerCancel($event, { key: 'city' })"
    >
      <t-picker-item
        :options="citys"
        :format="formatter"
      >
        <block
          v-for="(option, index) in citys"
          :key="index"
        >
          <view
            v-if="option.tag"
            :slot="'label-suffix--' + index"
            class="label-suffix"
          >
            <t-tag
              size="small"
              theme="primary"
            >
              {{ option.tag }}
            </t-tag>
          </view>
        </block>
      </t-picker-item>
    </t-picker>

    <t-picker
      :value="dateValue"
      :visible="dateVisible"
      data-key="date"
      title="选择时间"
      cancel-btn="取消"
      confirm-btn="确认"
      :using-custom-navbar="!isMPAlipay"
      @update:visible="dateVisible = $event"
      @change="onPickerChange($event, { key: 'date' })"
      @pick="onColumnChange($event, { key: 'date' })"
      @cancel="onPickerCancel($event, { key: 'date' })"
    >
      <t-picker-item :options="years" />
      <t-picker-item :options="seasons" />
    </t-picker>
  </view>
</template>

<script>
import TCell from '@tdesign/uniapp/cell/cell.vue';
import TPicker from '@tdesign/uniapp/picker/picker.vue';
import TPickerItem from '@tdesign/uniapp/picker-item/picker-item.vue';
import TTag from '@tdesign/uniapp/tag/tag.vue';
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TCell,
    TPicker,
    TPickerItem,
    TTag,
  },
  data() {
    return {
      cityText: '',
      cityValue: [],
      dateText: '',
      dateValue: [],

      citys: [
        {
          label: '北京市',
          value: '北京市',
          tag: '合',
        },
        {
          label: '上海市',
          value: '上海市',
          tag: '合',
        },
        {
          label: '广州市',
          value: '广州市',
        },
        {
          label: '深圳市',
          value: '深圳市',
        },
        {
          label: '成都市',
          value: '成都市',
        },
      ],

      years: [
        {
          label: '2021年',
          value: '2021',
        },
        {
          label: '2020年',
          value: '2020',
        },
        {
          label: '2019年',
          value: '2019',
        },
      ],

      seasons: [
        {
          label: '春',
          value: '春',
        },
        {
          label: '夏',
          value: '夏',
        },
        {
          label: '秋',
          value: '秋',
        },
        {
          label: '冬',
          value: '冬',
        },
      ],

      formatter(item) {
        const { value, label } = item;
        if (value === '北京市') {
          return {
            value,
            label: label.substring(0, 2),
          };
        }
        return item;
      },

      cityVisible: false,
      dateVisible: false,

      option: {
        tag: '',
      },
    };
  },
  created() {},
  methods: {
    onColumnChange(e, { key }) {
      console.log('picker pick:', { e, key });
    },
    onPickerChange(e, { key }) {
      console.log('picker change:', { e, key });
      const { value } = e;
      this[`${key}Visible`] = false;
      this[`${key}Value`] = value;
      this[`${key}Text`] = value.join(' ');
    },
    onPickerCancel(e, { key }) {
      console.log(e, '取消');
      console.log('picker cancel: ', { e, key });

      this[`${key}Visible`] = false;
    },
    onCityPicker() {
      this.cityVisible = true;
    },
    onSeasonPicker() {
      this.dateVisible = true;
    },
  },
};
</script>
<style>
:deep(.mb-16) {
    margin-bottom: 32rpx;
}

.label-suffix {
    --td-tag-small-height: 32rpx;

    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 12rpx;
}
</style>
```


#### 地区选择器

支持省市区切换，支持数据联动


```vue
<template>
  <view>
    <t-cell
      title="选择地区"
      arrow
      hover
      :note="areaText"
      @click="onAreaPicker"
    />

    <t-picker
      :visible="areaVisible"
      :value="areaValue"
      title="选择地区"
      cancel-btn="取消"
      confirm-btn="确认"
      :using-custom-navbar="!isMPAlipay"
      @update:visible="areaVisible = $event"
      @change="onPickerChange"
      @pick="onColumnChange"
      @cancel="onPickerCancel"
    >
      <t-picker-item :options="provinces" />
      <t-picker-item :options="cities" />
      <t-picker-item :options="counties" />
    </t-picker>
  </view>
</template>

<script>
import TCell from '@tdesign/uniapp/cell/cell.vue';
import TPicker from '@tdesign/uniapp/picker/picker.vue';
import TPickerItem from '@tdesign/uniapp/picker-item/picker-item.vue';
import { areaList } from './helper';

const getOptions = (obj, filter) => {
  const res = Object.keys(obj).map(key => ({
    value: key,
    label: obj[key],
  }));
  if (filter) {
    return res.filter(filter);
  }
  return res;
};
const match = (v1, v2, size) => v1.toString().slice(0, size) === v2.toString().slice(0, size);
export default {
  components: {
    TCell,
    TPicker,
    TPickerItem,
  },
  data() {
    return {
      areaText: '',
      areaValue: [],
      provinces: getOptions(areaList.provinces),
      cities: [],
      counties: [],
      areaVisible: false,
    };
  },
  mounted() {
    // 处理小程序 ready 生命周期
    this.$nextTick(() => this.ready());
  },
  created() {},
  methods: {
    ready() {
      this.init();
    },

    init() {
      const { provinces } = this;
      const { cities, counties } = this.getCities(provinces[0].value);
      this.cities = cities;
      this.counties = counties;
    },

    onColumnChange(e) {
      console.log('pick:', e);
      const { column, index } = e;
      const { provinces, cities } = this;
      if (column === 0) {
        // 更改省份
        const { cities, counties } = this.getCities(provinces[index].value);
        this.cities = cities;
        this.counties = counties;
      }
      if (column === 1) {
        // 更改城市
        const counties = this.getCounties(cities[index].value);
        this.counties = counties;
      }
      if (column === 2) {
        // 更改区县
      }
    },

    getCities(provinceValue) {
      const cities = getOptions(areaList.cities, city => match(city.value, provinceValue, 2));
      const counties = this.getCounties(cities[0].value);
      return {
        cities,
        counties,
      };
    },

    getCounties(cityValue) {
      return getOptions(areaList.counties, county => match(county.value, cityValue, 4));
    },

    onPickerChange(e) {
      const { value, label } = e;
      console.log('picker confirm:', e);
      this.areaVisible = false;
      this.areaValue = value;
      this.areaText =  label.join(' ');
    },

    onPickerCancel(e) {
      console.log('picker cancel', e);
      this.areaVisible = false;
      if (this.areaValue.length) {
        return;
      }
      this.init();
    },

    onAreaPicker() {
      this.areaVisible = true;
    },
  },
};
</script>
<style>
</style>
```


### 组件样式

是否带标题


```vue
<template>
  <view>
    <t-cell
      t-class="mb-16"
      title="带标题选择器"
      arrow
      hover
      :note="cityText"
      @click="onTitlePicker"
    />

    <t-cell
      title="无标题选择器"
      arrow
      hover
      :note="city2Text"
      @click="onWithoutTitlePicker"
    />

    <t-picker
      :visible="cityVisible"
      :value="cityValue"
      data-key="city"
      :title="cityTitle"
      cancel-btn="取消"
      confirm-btn="确认"
      :using-custom-navbar="!isMPAlipay"
      @update:visible="cityVisible = $event"
      @change="onPickerChange($event, { key: 'city' })"
      @pick="onColumnChange($event, { key: 'city' })"
      @cancel="onPickerCancel($event, { key: 'city' })"
    >
      <t-picker-item :options="citys" />
    </t-picker>

    <t-picker
      :visible="city2Visible"
      :value="city2Value"
      data-key="city2"
      :title="city2Title"
      cancel-btn="取消"
      confirm-btn="确认"
      :using-custom-navbar="!isMPAlipay"
      @update:visible="city2Visible = $event"
      @change="onPickerChange($event, { key: 'city2' })"
      @pick="onColumnChange($event, { key: 'city2' })"
      @cancel="onPickerCancel($event, { key: 'city2' })"
    >
      <t-picker-item :options="citys" />
    </t-picker>
  </view>
</template>

<script>
import TCell from '@tdesign/uniapp/cell/cell.vue';
import TPicker from '@tdesign/uniapp/picker/picker.vue';
import TPickerItem from '@tdesign/uniapp/picker-item/picker-item.vue';
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TCell,
    TPicker,
    TPickerItem,
  },
  data() {
    return {
      cityText: '',
      city2Text: '',
      cityValue: [],
      city2Value: [],
      cityTitle: '',
      city2Title: '',

      citys: [
        {
          label: '北京市',
          value: '北京市',
        },
        {
          label: '上海市',
          value: '上海市',
        },
        {
          label: '广州市',
          value: '广州市',
        },
        {
          label: '深圳市',
          value: '深圳市',
        },
        {
          label: '成都市',
          value: '成都市',
        },
      ],

      cityVisible: false,
      city2Visible: false,
    };
  },
  created() {},
  methods: {
    onColumnChange(e, { key }) {
      console.log('picker pick:', { e, key });
    },
    onPickerChange(e, { key }) {
      const { value } = e;
      console.log('picker change:', e);

      this[`${key}Visible`] = false;
      this[`${key}Value`] = value;
      this[`${key}Text`] = value.join(' ');
    },
    onPickerCancel(e, { key }) {
      console.log('picker1 cancel:', e, key);
      this[`${key}Visible`] = false;
    },
    onTitlePicker() {
      this.cityVisible = true;
      this.cityTitle =  '选择城市';
    },
    onWithoutTitlePicker() {
      this.city2Visible = true;
      this.city2Title = '';
    },
  },
};
</script>
<style>
:deep(.mb-16) {
    margin-bottom: 32rpx;
}
</style>
```


## API

### Picker Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
custom-style | Object | - | 自定义样式 | N
auto-close | Boolean | true | 自动关闭；在确认、取消、点击遮罩层自动关闭，不需要手动设置 visible | N
cancel-btn | String / Boolean | true | 取消按钮文字。TS 类型：`boolean \| string` | N
confirm-btn | String / Boolean | true | 确定按钮文字。TS 类型：`boolean \| string` | N
header | Boolean | true | 头部内容。值为 true 显示空白头部，值为 false 不显示任何内容 | N
item-height | Number | 40 | PickerItem 的子项高度，单位 `px` | N
keys | Object | - | 用来定义 value / label / icon 在 `options` 中对应的字段别名。TS 类型：`KeysType`。[通用类型定义](https://github.com/tencent/tdesign-miniprogram/blob/develop/packages/uniapp-components/common/common.ts) | N
popup-props | Object | {} | 透传 Popup 组件全部属性。TS 类型：`PopupProps`，[Popup API Documents](./popup?tab=api)。[详细类型定义](https://github.com/tencent/tdesign-miniprogram/blob/develop/packages/uniapp-components/picker/type.ts) | N
title | String | '' | 标题 | N
use-popup | Boolean | true | 是否使用弹出层包裹 | N
using-custom-navbar | Boolean | false | 是否使用了自定义导航栏 | N
value | Array | - | 选中值。支持语法糖 `v-model:value`。TS 类型：`Array<PickerValue>` `type PickerValue = string \| number`。[详细类型定义](https://github.com/tencent/tdesign-miniprogram/blob/develop/packages/uniapp-components/picker/type.ts) | N
default-value | Array | - | 选中值。非受控属性。TS 类型：`Array<PickerValue>` `type PickerValue = string \| number`。[详细类型定义](https://github.com/tencent/tdesign-miniprogram/blob/develop/packages/uniapp-components/picker/type.ts) | N
visible | Boolean | false | 是否显示。支持语法糖 `v-model:visible` | N
visible-item-count | Number | 5 | 可视区域 PickerItem 的子项个数 | N

### Picker Events

名称 | 参数 | 描述
-- | -- | --
cancel | \- | 点击取消按钮时触发
change | `(context: { value: Array<PickerValue>, label: string, columns: Array<{ column: number; index: number; disabled?: boolean; }> } )` | 选中变化时候触发，即确认变化时触发
close | `(context: { trigger: TriggerSource })` | 关闭时触发。[详细类型定义](https://github.com/tencent/tdesign-miniprogram/blob/develop/packages/uniapp-components/picker/type.ts)。<br/>`type TriggerSource = 'overlay' \| 'cancel-btn' \| 'confirm-btn'`<br/>
confirm | `(context: { value: Array<PickerValue>, label: string, columns: Array<{ column: number; index: number; disabled?: boolean; }> } )` | 点击确认按钮时触发
pick | `(context: { value: Array<PickerValue>, label: string, column: number, index: number })` | 任何一列选中都会触发，不同的列参数不同。`column` 表示第几列变化，`index` 表示变化那一列的选中项下标

### Picker Slots

名称 | 描述
-- | --
\- | 默认插槽，自定义内容
content | 中间内容，介于头部跟内容之间
footer | 底部内容
header | 自定义 `header` 显示内容


### PickerItem Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
custom-style | Object | - | 自定义样式 | N
format | Function | - | 格式化标签。TS 类型：`(option: PickerItemOption, columnIndex: number) => PickerItemOption` | N
options | Array | [] | 数据源。TS 类型：`PickerItemOption[]` `interface PickerItemOption { label: string; value: string \| number; icon?: string }`。[详细类型定义](https://github.com/tencent/tdesign-miniprogram/blob/develop/packages/uniapp-components/picker-item/type.ts) | N

### PickerItem Slots

名称 | 描述
-- | --
label-suffix-index | 列表子项后置插槽，用于自定义标签文本之后的内容。

### CSS Variables

组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-picker-bg-color | @bg-color-container | -
--td-picker-border-radius | 24rpx | -
--td-picker-button-font | @font-body-large | -
--td-picker-cancel-color | @text-color-secondary | -
--td-picker-confirm-color | @brand-color | -
--td-picker-indicator-bg-color | @bg-color-secondarycontainer | -
--td-picker-indicator-border-radius | 12rpx | -
--td-picker-title-color | @text-color-primary | -
--td-picker-title-font | @font-title-large | -
--td-picker-toolbar-height | 116rpx | -
--td-picker-transparent-color | --td-picker-transparent-color | -
--td-picker-item-active-color | @text-color-primary | -
--td-picker-item-color | @text-color-secondary | -
--td-picker-item-font-size | @font-size-m | -
