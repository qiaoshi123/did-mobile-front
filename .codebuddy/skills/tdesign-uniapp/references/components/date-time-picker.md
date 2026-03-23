---
name: "datetimepicker"
description: "用于选择一个时间点或者一个时间段。"
url: "https://tdesign.tencent.com/uniapp/components/date-time-picker"
---



## 引入

可在 `main.ts` 或在需要使用的页面或组件中引入。

```js
import TDateTimePicker from '@tdesign/uniapp/date-time-picker/date-time-picker.vue';
```

### 组件类型

#### 年月日选择器


```vue
<template>
  <view>
    <t-cell
      title="选择日期"
      hover
      :note="dateText || ''"
      arrow
      data-mode="date"
      class="test"
      t-class="panel-item"
      @click="showPicker($event, { mode: 'date' })"
    />

    <!-- 年月日 -->
    <t-date-time-picker
      :visible="dateVisible"
      auto-close
      title="选择日期"
      show-week
      mode="date"
      :default-value="date"
      format="YYYY-MM-DD ddd"
      :filter="filter"
      :formatter="formatter"
      :popup-props="popupProps"
      @update:visible="dateVisible = $event"
      @change="onConfirm"
      @pick="onColumnChange"
      @cancel="hidePicker"
      @close="handleClose"
    />
  </view>
</template>

<script>
import TCell from '@tdesign/uniapp/cell/cell.vue';
import TDateTimePicker from '@tdesign/uniapp/date-time-picker/date-time-picker.vue';
const calendarMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export default {
  components: {
    TCell,
    TDateTimePicker,
  },
  data() {
    let usingCustomNavbar = true;
    // #ifdef MP-ALIPAY
    usingCustomNavbar = false;
    // #endif
    return {
      mode: '',
      dateVisible: false,
      date: new Date('2021-12-23').getTime(),
      // 支持时间戳传入
      dateText: '',
      filter(type, options) {
        if (type === 'year') {
          return options.sort((a, b) => b.value - a.value);
        }
        return options;
      },
      popupProps: {
        usingCustomNavbar,
      },
      formatter(item, index) {
        if (index === 1) {
          const label = item.label.slice(0, -1);
          return {
            value: item.value,
            label: calendarMonth[Number(label) - 1],
          };
        }
        if (index === 2) {
          const [dateValue, weekValue] = item.label.split(' ');
          const dateSuffixes = {
            1: 'st',
            2: 'nd',
            3: 'rd',
          };
          const weekMap = {
            周一: 'Mon.',
            周二: 'Tues.',
            周三: 'Wed.',
            周四: 'Thurs.',
            周五: 'Fri.',
            周六: 'Sat.',
            周日: 'Sun.',
          };
          const label = dateValue.slice(0, -1);
          return {
            value: item.value,
            label: `${label}${dateSuffixes[label] || 'th'} ${weekMap[weekValue]}`,
          };
        }
        return {
          value: item.value,
          label: item.label.slice(0, -1),
        };
      },
    };
  },
  methods: {
    showPicker(e, { mode }) {
      this.mode = mode;
      this[`${mode}Visible`] = true;
    },

    handleClose(e) {
      console.log('handleClose:', e);
    },

    onConfirm(e) {
      const { value } = e;
      const { mode } = this;
      console.log('confirm', value);
      this[mode] = value;
      this[`${mode}Text`] = value;
    },

    onColumnChange(e) {
      console.log('pick', e.value);
    },

    hidePicker() {
      console.log('占位：函数 hidePicker 未声明');
    },
  },
};
</script>
<style>
:deep(.panel-item) {
    margin-bottom: 32rpx;
}

:deep(.panel-item::after) {
    border: 0;
}
</style>
```


#### 年月选择器


```vue
<template>
  <view>
    <t-cell
      title="选择日期"
      hover
      :note="monthText"
      arrow
      data-mode="month"
      t-class="panel-item"
      @click="showPicker($event, { mode: 'month' })"
    />

    <!-- 年月 -->
    <t-date-time-picker
      :visible="monthVisible"
      title="选择日期"
      mode="month"
      :value="month"
      format="YYYY-MM"
      :start="start"
      :end="end"
      @update:visible="monthVisible = $event"
      @change="onConfirm"
      @pick="onColumnChange"
      @cancel="hidePicker"
    />
  </view>
</template>

<script>
import TCell from '@tdesign/uniapp/cell/cell.vue';
import TDateTimePicker from '@tdesign/uniapp/date-time-picker/date-time-picker.vue';
export default {
  components: {
    TCell,
    TDateTimePicker,
  },
  data() {
    return {
      mode: '',
      monthVisible: false,
      month: '2021-09',
      monthText: '',
      // 指定选择区间起始值
      start: '2000-01-01 00:00:00',
      end: '2030-09-09 12:12:12',
    };
  },
  methods: {
    showPicker(e, { mode }) {
      this.mode = mode;
      this[`${mode}Visible`] = true;
    },

    hidePicker() {
      const { mode } = this;
      this[`${mode}Visible`] = false;
    },

    onConfirm(e) {
      const { value } = e;
      const { mode } = this;
      console.log('confirm', value);
      this[mode] = value;
      this[`${mode}Text`] = value;
      this.hidePicker();
    },

    onColumnChange(e) {
      console.log('pick', e.value);
    },
  },
};
</script>
<style>
.panel-item {
    margin-bottom: 32rpx;
}
</style>
```


### 时间选择器

包括：`时分秒`、`时分`两个示例


```vue
<template>
  <view>
    <view class="demo-desc">
      时分秒选择器
    </view>
    <t-cell
      title="选择时间"
      hover
      :note="secondText || ''"
      arrow
      data-mode="second"
      t-class="panel-item"
      @click="showPicker($event, { mode: 'second' })"
    />

    <view class="demo-desc">
      时分选择器
    </view>
    <t-cell
      title="选择时间"
      hover
      :note="minuteText || ''"
      arrow
      data-mode="minute"
      t-class="panel-item"
      @click="showPicker($event, { mode: 'minute' })"
    />

    <!-- 时分 -->
    <t-date-time-picker
      :visible="secondVisible"
      title="选择时间"
      :mode="['null', 'second']"
      :value="second"
      format="HH:mm:ss"
      @update:visible="secondVisible = $event"
      @change="onConfirm"
      @pick="onColumnChange"
      @cancel="hidePicker"
    />

    <!-- 时分 -->
    <t-date-time-picker
      :visible="minuteVisible"
      title="选择时间"
      :mode="['null', 'minute']"
      :start="start"
      :value="minute"
      format="HH:mm"
      @update:visible="minuteVisible = $event"
      @change="onConfirm"
      @pick="onColumnChange"
      @cancel="hidePicker"
    />
  </view>
</template>

<script>
import TCell from '@tdesign/uniapp/cell/cell.vue';
import TDateTimePicker from '@tdesign/uniapp/date-time-picker/date-time-picker.vue';
export default {
  components: {
    TCell,
    TDateTimePicker,
  },
  data() {
    return {
      mode: '',
      second: '10:00:00',
      minute: '23:59',
      start: '2025-04-29 00:00:00',
      secondText: '',
      minuteText: '',
      secondVisible: false,
      minuteVisible: false,
    };
  },
  created() {},
  methods: {
    showPicker(e, { mode }) {
      this.mode = mode;
      this[`${mode}Visible`] = true;
    },
    hidePicker() {
      const { mode } = this;
      this[`${mode}Visible`] = false;
    },
    onConfirm(e) {
      const { value } = e;
      const { mode } = this;
      console.log('confirm', value);
      this[mode] = value;
      this[`${mode}Text`] = value;
      this.hidePicker();
    },
    onColumnChange(e) {
      console.log('pick', e.value);
    },
  },
};
</script>
<style>
.panel-item {
    margin: 32rpx 0;
}
</style>
```


#### 年月日时分秒选择器


```vue
<template>
  <view>
    <t-cell
      title="选择日期时间"
      hover
      :note="datetimeText"
      arrow
      data-mode="datetime"
      t-class="panel-item"
      @click="showPicker($event, { mode: 'datetime' })"
    />

    <!-- 年月日时分 -->
    <t-date-time-picker
      :visible="datetimeVisible"
      title="选择日期和时间"
      mode="second"
      :value="datetime"
      format="YYYY-MM-DD HH:mm:ss"
      @update:visible="datetimeVisible = $event"
      @change="onConfirm"
      @pick="onColumnChange"
      @cancel="hidePicker"
    />
  </view>
</template>

<script>
import TCell from '@tdesign/uniapp/cell/cell.vue';
import TDateTimePicker from '@tdesign/uniapp/date-time-picker/date-time-picker.vue';
export default {
  components: {
    TCell,
    TDateTimePicker,
  },
  data() {
    return {
      mode: '',
      datetimeVisible: false,
      datetime: new Date('2021-12-23').getTime(),
      datetimeText: '',
    };
  },
  methods: {
    showPicker(e, { mode }) {
      this.mode = mode;
      this[`${mode}Visible`] = true;
    },

    hidePicker() {
      const { mode } = this;
      this[`${mode}Visible`] = false;
    },

    onConfirm(e) {
      const { value } = e;
      const { mode } = this;
      console.log('confirm', value);

      this[mode] = value;
      this[`${mode}Text`] = value;

      this.hidePicker();
    },

    onColumnChange(e) {
      console.log('pick', e.value);
    },
  },
};
</script>
<style>
.panel-item {
    margin-bottom: 32rpx;
}
</style>
```


### 组件用法

#### 调整步数


```vue
<template>
  <view>
    <t-cell
      title="选择时间"
      hover
      :note="text || ''"
      arrow
      t-class="panel-item"
      @click="showPicker"
    />

    <t-date-time-picker
      :visible="visible"
      title="选择时间"
      :value="value"
      format="HH:mm:ss"
      :mode="['null', 'second']"
      :steps="{ minute: 5 }"
      @update:visible="visible = $event"
      @change="onConfirm"
      @pick="onColumnChange"
      @cancel="hidePicker"
    />
  </view>
</template>

<script>
import TCell from '@tdesign/uniapp/cell/cell.vue';
import TDateTimePicker from '@tdesign/uniapp/date-time-picker/date-time-picker.vue';
export default {
  components: {
    TCell,
    TDateTimePicker,
  },
  data() {
    return {
      text: '',
      value: '10:00:00',
      visible: false,
    };
  },
  created() {},
  methods: {
    showPicker() {
      this.visible = true;
    },
    hidePicker() {
      this.visible = false;
    },
    onConfirm(e) {
      const { value } = e;
      console.log('confirm', value);
      this.value = value;
      this.text = value;
      this.hidePicker();
    },
    onColumnChange(e) {
      console.log('pick', e.value);
    },
  },
};
</script>
<style>
.panel-item {
    margin: 32rpx 0;
}
</style>
```


#### 不使用 Popup


```vue
<template>
  <view>
    <t-date-time-picker
      :use-popup="false"
      title="选择日期"
      :visible="dateVisible"
      mode="date"
      :default-value="date"
      format="YYYY-MM-DD"
      :start="start"
      :end="end"
      @change="onConfirm"
      @pick="onColumnChange"
      @cancel="hidePicker"
    />
  </view>
</template>

<script>
import TDateTimePicker from '@tdesign/uniapp/date-time-picker/date-time-picker.vue';
export default {
  components: {
    TDateTimePicker,
  },
  data() {
    return {
      mode: '',
      dateVisible: false,
      date: new Date('2021-12-23').getTime(),
      // 支持时间戳传入

      // 指定选择区间起始值
      start: '2000-01-01 00:00:00',
      end: '2030-09-09 12:12:12',
    };
  },
  methods: {
    hidePicker() {
      const { mode } = this;
      this[`${mode}Visible`] = false;
    },

    onConfirm(e) {
      const { value } = e;
      const { mode } = this;
      console.log('confirm', value);
      this[mode] = value;
      this[`${mode}Text`] = value;
      this.hidePicker();
    },

    onColumnChange(e) {
      console.log('pick', e.value);
    },
  },
};
</script>
<style>
</style>
```


## API

### DateTimePicker Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
custom-style | Object | - | 自定义样式 | N
auto-close | Boolean | false | 自动关闭；在确认、取消、点击遮罩层自动关闭，不需要手动设置 visible | N
cancel-btn | String | 取消 | 取消按钮文字 | N
confirm-btn | String | - | 确定按钮文字 | N
custom-locale | String | zh |  组件国际化语言，目前支持: 简体中文(zh)、(tc)、英文(en)、日语(ja)、韩语(ko)、俄语(ru)等六种语言 | N
end | String / Number | - | 选择器的最大可选时间，默认为当前时间+10年 | N
filter | Function | - | 列选项过滤函数，支持自定义列内容。(type 值可为: year, month, date, hour, minute, second)。TS 类型：`(type: TimeModeValues, columns: DateTimePickerColumn) => DateTimePickerColumn` `type DateTimePickerColumn = DateTimePickerColumnItem[]` `interface DateTimePickerColumnItem { label: string,value: string}`。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/date-time-picker/type.ts) | N
format | String | 'YYYY-MM-DD HH:mm:ss' | 用于格式化 pick、change、confirm 事件返回的值，[详细文档](https://day.js.org/docs/en/display/format) | N
formatter | Function | - | 格式化标签。TS 类型：`(option: DateTimePickerColumnItem, columnIndex: number) => DateTimePickerColumnItem` | N
header | Boolean | true | 头部内容。值为 true 显示空白头部，值为 false 不显示任何内容 | N
mode | String / Array | 'date' | year = 年；month = 年月；date = 年月日；hour = 年月日时； minute = 年月日时分；当类型为数组时，第一个值控制年月日，第二个值控制时分秒。TS 类型：`DateTimePickerMode` `type DateTimePickerMode = TimeModeValues \| Array<TimeModeValues> ` `type TimeModeValues = 'year' \| 'month' \| 'date' \| 'hour' \| 'minute' \| 'second' \| 'null'`。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/date-time-picker/type.ts) | N
popup-props | Object | {} | 透传 Popup 组件全部属性。TS 类型：`PopupProps`，[Popup API Documents](./popup?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/date-time-picker/type.ts) | N
show-week | Boolean | false | 是否在日期旁边显示周几（如周一，周二，周日等） | N
start | String / Number | - | 选择器的最小可选时间，默认为当前时间-10年 | N
steps | Object | {} | 时间间隔步数，示例：`{ minute: 5 }`。TS 类型：`{ [key in TimeModeValues]?: number }` | N
title | String | - | 标题 | N
use-popup | Boolean | true | 是否使用弹出层包裹 | N
value | String / Number | - | 选中值。支持语法糖 `v-model:value`。TS 类型：`DateValue` `type DateValue = string \| number`。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/date-time-picker/type.ts) | N
default-value | String / Number | - | 选中值。非受控属性。TS 类型：`DateValue` `type DateValue = string \| number`。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/date-time-picker/type.ts) | N
visible | Boolean | false | 是否显示 | N

### DateTimePicker Events

名称 | 参数 | 描述
-- | -- | --
cancel | \- | 取消按钮点击时触发
change | `(context: { value: DateValue })` | 确认按钮点击时触发
close | `(context: { trigger: DateTimePickerTriggerSource })` | 关闭时触发。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/date-time-picker/type.ts)。<br/>`type DateTimePickerTriggerSource = 'overlay' \| 'cancel-btn' \| 'confirm-btn'`<br/>
confirm | `(context: { value: DateValue })` | 确认按钮点击时触发
pick | `(context: { value: DateValue })` | 选中值发生变化时触发

### DateTimePicker Slots

名称 | 描述
-- | --
footer | 底部内容
header | 自定义 `header` 显示内容

### DateTimePicker External Classes

类名 | 描述
-- | --
t-class | 根节点样式类
t-class-cancel | 取消样式类
t-class-confirm | 确认样式类
t-class-title | 标题样式类

### CSS Variables

组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-data-time-picker-year-width | 128rpx | -
