---
name: "cascader"
description: "级联选择器适用于有清晰层级结构的数据集合，用户可以通过逐级查看并选择。"
url: "https://tdesign.tencent.com/uniapp/components/cascader"
---



## 引入

可在 `main.ts` 或在需要使用的页面或组件中引入。

```js
import TCascader from '@tdesign/uniapp/cascader/cascader.vue';
```

### 基础用法


```vue
<template>
  <view>
    <t-cell
      title="地址"
      :note="note"
      arrow
      @click="showCascader"
    />

    <t-cascader
      :visible="visible"
      :value="value"
      :options="options"
      title="请选择地址"
      @update:visible="visible = $event"
      @change="onChange"
      @pick="onPick"
    />
  </view>
</template>

<script>
import TCell from '@tdesign/uniapp/cell/cell.vue';
import TCascader from '@tdesign/uniapp/cascader/cascader.vue';
const data = {
  areaList: [
    {
      label: '北京市',
      value: '110000',
      children: [
        {
          value: '110100',
          label: '北京市',
          children: [
            {
              value: '110101',
              label: '东城区',
            },
            {
              value: '110102',
              label: '西城区',
            },
            {
              value: '110105',
              label: '朝阳区',
            },
            {
              value: '110106',
              label: '丰台区',
            },
            {
              value: '110107',
              label: '石景山区',
            },
            {
              value: '110108',
              label: '海淀区',
            },
            {
              value: '110109',
              label: '门头沟区',
            },
            {
              value: '110111',
              label: '房山区',
            },
            {
              value: '110112',
              label: '通州区',
            },
            {
              value: '110113',
              label: '顺义区',
            },
            {
              value: '110114',
              label: '昌平区',
            },
            {
              value: '110115',
              label: '大兴区',
            },
            {
              value: '110116',
              label: '怀柔区',
            },
            {
              value: '110117',
              label: '平谷区',
            },
            {
              value: '110118',
              label: '密云区',
            },
            {
              value: '110119',
              label: '延庆区',
            },
          ],
        },
      ],
    },
    {
      label: '天津市',
      value: '120000',
      children: [
        {
          value: '120100',
          label: '天津市',
          children: [
            {
              value: '120101',
              label: '和平区',
            },
            {
              value: '120102',
              label: '河东区',
            },
            {
              value: '120103',
              label: '河西区',
            },
            {
              value: '120104',
              label: '南开区',
            },
            {
              value: '120105',
              label: '河北区',
            },
            {
              value: '120106',
              label: '红桥区',
            },
            {
              value: '120110',
              label: '东丽区',
            },
            {
              value: '120111',
              label: '西青区',
            },
            {
              value: '120112',
              label: '津南区',
            },
            {
              value: '120113',
              label: '北辰区',
            },
            {
              value: '120114',
              label: '武清区',
            },
            {
              value: '120115',
              label: '宝坻区',
            },
            {
              value: '120116',
              label: '滨海新区',
            },
            {
              value: '120117',
              label: '宁河区',
            },
            {
              value: '120118',
              label: '静海区',
            },
            {
              value: '120119',
              label: '蓟州区',
            },
          ],
        },
      ],
    },
  ],
};
export default {
  components: {
    TCell,
    TCascader,
  },
  data() {
    return {
      options: data.areaList,
      note: '请选择地址',
      visible: false,
      value: '',
    };
  },
  created() {},
  methods: {
    showCascader() {
      this.visible = true;
    },
    onPick(e) {
      console.log('pick: ', e);
    },
    onChange(e) {
      console.log('change: ', e);
      const { selectedOptions, value } = e;
      this.value = value;
      this.note =  selectedOptions.map(item => item.label).join('/');
      this.visible = false;
    },
  },
};
</script>
<style>
</style>
```


### 选项卡风格


```vue
<template>
  <view>
    <t-cell
      title="地址"
      :note="note"
      arrow
      @click="showCascader"
    />

    <t-cascader
      :visible="visible"
      theme="tab"
      :options="options"
      title="请选择地址"
      @update:visible="visible = $event"
      @change="onChange"
    />
  </view>
</template>

<script>
import TCell from '@tdesign/uniapp/cell/cell.vue';
import TCascader from '@tdesign/uniapp/cascader/cascader.vue';
const data = {
  areaList: [
    {
      label: '北京市',
      value: '110000',
      children: [
        {
          value: '110100',
          label: '北京市',
          children: [
            {
              value: '110101',
              label: '东城区',
            },
            {
              value: '110102',
              label: '西城区',
            },
            {
              value: '110105',
              label: '朝阳区',
            },
            {
              value: '110106',
              label: '丰台区',
            },
            {
              value: '110107',
              label: '石景山区',
            },
            {
              value: '110108',
              label: '海淀区',
            },
            {
              value: '110109',
              label: '门头沟区',
            },
            {
              value: '110111',
              label: '房山区',
            },
            {
              value: '110112',
              label: '通州区',
            },
            {
              value: '110113',
              label: '顺义区',
            },
            {
              value: '110114',
              label: '昌平区',
            },
            {
              value: '110115',
              label: '大兴区',
            },
            {
              value: '110116',
              label: '怀柔区',
            },
            {
              value: '110117',
              label: '平谷区',
            },
            {
              value: '110118',
              label: '密云区',
            },
            {
              value: '110119',
              label: '延庆区',
            },
          ],
        },
      ],
    },
    {
      label: '天津市',
      value: '120000',
      children: [
        {
          value: '120100',
          label: '天津市',
          children: [
            {
              value: '120101',
              label: '和平区',
            },
            {
              value: '120102',
              label: '河东区',
            },
            {
              value: '120103',
              label: '河西区',
            },
            {
              value: '120104',
              label: '南开区',
            },
            {
              value: '120105',
              label: '河北区',
            },
            {
              value: '120106',
              label: '红桥区',
            },
            {
              value: '120110',
              label: '东丽区',
            },
            {
              value: '120111',
              label: '西青区',
            },
            {
              value: '120112',
              label: '津南区',
            },
            {
              value: '120113',
              label: '北辰区',
            },
            {
              value: '120114',
              label: '武清区',
            },
            {
              value: '120115',
              label: '宝坻区',
            },
            {
              value: '120116',
              label: '滨海新区',
            },
            {
              value: '120117',
              label: '宁河区',
            },
            {
              value: '120118',
              label: '静海区',
            },
            {
              value: '120119',
              label: '蓟州区',
            },
          ],
        },
      ],
    },
  ],
};
export default {
  components: {
    TCell,
    TCascader,
  },
  data() {
    return {
      options: data.areaList,
      note: '请选择地址',
      visible: false,
    };
  },
  created() {},
  methods: {
    showCascader() {
      this.visible = true;
    },
    onChange(e) {
      const { selectedOptions } = e;
      this.note = selectedOptions.map(item => item.label).join('/');
      this.visible = false;
    },
  },
};
</script>
<style>
</style>
```


### 进阶

#### 带初始值


```vue
<template>
  <view>
    <t-cell
      title="地址"
      :note="note"
      arrow
      @click="showCascader"
    />

    <t-cascader
      :visible="visible"
      value="120119"
      :options="options"
      title="请选择地址"
      @update:visible="visible = $event"
      @change="onChange"
    />
  </view>
</template>

<script>
import TCell from '@tdesign/uniapp/cell/cell.vue';
import TCascader from '@tdesign/uniapp/cascader/cascader.vue';
const data = {
  areaList: [
    {
      label: '北京市',
      value: '110000',
      children: [
        {
          value: '110100',
          label: '北京市',
          children: [
            {
              value: '110101',
              label: '东城区',
            },
            {
              value: '110102',
              label: '西城区',
            },
            {
              value: '110105',
              label: '朝阳区',
            },
            {
              value: '110106',
              label: '丰台区',
            },
            {
              value: '110107',
              label: '石景山区',
            },
            {
              value: '110108',
              label: '海淀区',
            },
            {
              value: '110109',
              label: '门头沟区',
            },
            {
              value: '110111',
              label: '房山区',
            },
            {
              value: '110112',
              label: '通州区',
            },
            {
              value: '110113',
              label: '顺义区',
            },
            {
              value: '110114',
              label: '昌平区',
            },
            {
              value: '110115',
              label: '大兴区',
            },
            {
              value: '110116',
              label: '怀柔区',
            },
            {
              value: '110117',
              label: '平谷区',
            },
            {
              value: '110118',
              label: '密云区',
            },
            {
              value: '110119',
              label: '延庆区',
            },
          ],
        },
      ],
    },
    {
      label: '天津市',
      value: '120000',
      children: [
        {
          value: '120100',
          label: '天津市',
          children: [
            {
              value: '120101',
              label: '和平区',
            },
            {
              value: '120102',
              label: '河东区',
            },
            {
              value: '120103',
              label: '河西区',
            },
            {
              value: '120104',
              label: '南开区',
            },
            {
              value: '120105',
              label: '河北区',
            },
            {
              value: '120106',
              label: '红桥区',
            },
            {
              value: '120110',
              label: '东丽区',
            },
            {
              value: '120111',
              label: '西青区',
            },
            {
              value: '120112',
              label: '津南区',
            },
            {
              value: '120113',
              label: '北辰区',
            },
            {
              value: '120114',
              label: '武清区',
            },
            {
              value: '120115',
              label: '宝坻区',
            },
            {
              value: '120116',
              label: '滨海新区',
            },
            {
              value: '120117',
              label: '宁河区',
            },
            {
              value: '120118',
              label: '静海区',
            },
            {
              value: '120119',
              label: '蓟州区',
            },
          ],
        },
      ],
    },
  ],
};
export default {
  components: {
    TCell,
    TCascader,
  },
  data() {
    return {
      options: data.areaList,
      note: '请选择地址',
      visible: false,
    };
  },
  created() {},
  methods: {
    showCascader() {
      this.visible = true;
    },
    onChange(e) {
      const { selectedOptions } = e;
      this.note = selectedOptions.map(item => item.label).join('/');
      this.visible = false;
    },
  },
};
</script>
<style>
</style>
```


#### 自定义 keys


```vue
<template>
  <view>
    <t-cell
      title="地址"
      :note="note"
      arrow
      @click="showCascader"
    />

    <t-cascader
      :visible="visible"
      class="demo"
      :keys="keys"
      :options="options"
      title="请选择地址"
      placeholder="未选中时的提示文案"
      @update:visible="visible = $event"
      @change="onChange"
    />
  </view>
</template>

<script>
import TCell from '@tdesign/uniapp/cell/cell.vue';
import TCascader from '@tdesign/uniapp/cascader/cascader.vue';
const data = {
  areaList: [
    {
      name: '北京市',
      id: '110000',
      sub: [
        {
          id: '110100',
          name: '北京市',
          sub: [
            {
              id: '110101',
              name: '东城区',
            },
            {
              id: '110102',
              name: '西城区',
            },
            {
              id: '110105',
              name: '朝阳区',
            },
            {
              id: '110106',
              name: '丰台区',
            },
            {
              id: '110107',
              name: '石景山区',
            },
            {
              id: '110108',
              name: '海淀区',
            },
            {
              id: '110109',
              name: '门头沟区',
            },
            {
              id: '110111',
              name: '房山区',
            },
            {
              id: '110112',
              name: '通州区',
            },
            {
              id: '110113',
              name: '顺义区',
            },
            {
              id: '110114',
              name: '昌平区',
            },
            {
              id: '110115',
              name: '大兴区',
            },
            {
              id: '110116',
              name: '怀柔区',
            },
            {
              id: '110117',
              name: '平谷区',
            },
            {
              id: '110118',
              name: '密云区',
            },
            {
              id: '110119',
              name: '延庆区',
            },
          ],
        },
      ],
    },
    {
      name: '天津市',
      id: '120000',
      sub: [
        {
          id: '120100',
          name: '天津市',
          sub: [
            {
              id: '120101',
              name: '和平区',
            },
            {
              id: '120102',
              name: '河东区',
            },
            {
              id: '120103',
              name: '河西区',
            },
            {
              id: '120104',
              name: '南开区',
            },
            {
              id: '120105',
              name: '河北区',
            },
            {
              id: '120106',
              name: '红桥区',
            },
            {
              id: '120110',
              name: '东丽区',
            },
            {
              id: '120111',
              name: '西青区',
            },
            {
              id: '120112',
              name: '津南区',
            },
            {
              id: '120113',
              name: '北辰区',
            },
            {
              id: '120114',
              name: '武清区',
            },
            {
              id: '120115',
              name: '宝坻区',
            },
            {
              id: '120116',
              name: '滨海新区',
            },
            {
              id: '120117',
              name: '宁河区',
            },
            {
              id: '120118',
              name: '静海区',
            },
            {
              id: '120119',
              name: '蓟州区',
            },
          ],
        },
      ],
    },
  ],
};
export default {
  components: {
    TCell,
    TCascader,
  },
  data() {
    return {
      options: data.areaList,
      note: '请选择地址',
      visible: false,
      keys: {
        label: 'name',
        value: 'id',
        children: 'sub',
      },
    };
  },
  created() {},
  methods: {
    showCascader() {
      this.visible = true;
    },
    onChange(e) {
      const { selectedOptions } = e;
      this.note = selectedOptions.map(item => item.name).join('/');
      this.visible = false;
    },
  },
};
</script>
<style>
page .demo {
    --td-cascader-active-color: green;
}
</style>
```


#### 使用次级标题


```vue
<template>
  <view>
    <t-cell
      title="地址"
      :note="note"
      arrow
      @click="showCascader"
    />

    <t-cascader
      :visible="visible"
      :options="options"
      title="请选择地址"
      :sub-titles="subTitles"
      @update:visible="visible = $event"
      @change="onChange"
    />
  </view>
</template>

<script>
import TCell from '@tdesign/uniapp/cell/cell.vue';
import TCascader from '@tdesign/uniapp/cascader/cascader.vue';
const data = {
  areaList: [
    {
      label: '北京市',
      value: '110000',
      children: [
        {
          value: '110100',
          label: '北京市',
          children: [
            {
              value: '110101',
              label: '东城区',
            },
            {
              value: '110102',
              label: '西城区',
            },
            {
              value: '110105',
              label: '朝阳区',
            },
            {
              value: '110106',
              label: '丰台区',
            },
            {
              value: '110107',
              label: '石景山区',
            },
            {
              value: '110108',
              label: '海淀区',
            },
            {
              value: '110109',
              label: '门头沟区',
            },
            {
              value: '110111',
              label: '房山区',
            },
            {
              value: '110112',
              label: '通州区',
            },
            {
              value: '110113',
              label: '顺义区',
            },
            {
              value: '110114',
              label: '昌平区',
            },
            {
              value: '110115',
              label: '大兴区',
            },
            {
              value: '110116',
              label: '怀柔区',
            },
            {
              value: '110117',
              label: '平谷区',
            },
            {
              value: '110118',
              label: '密云区',
            },
            {
              value: '110119',
              label: '延庆区',
            },
          ],
        },
      ],
    },
    {
      label: '天津市',
      value: '120000',
      children: [
        {
          value: '120100',
          label: '天津市',
          children: [
            {
              value: '120101',
              label: '和平区',
            },
            {
              value: '120102',
              label: '河东区',
            },
            {
              value: '120103',
              label: '河西区',
            },
            {
              value: '120104',
              label: '南开区',
            },
            {
              value: '120105',
              label: '河北区',
            },
            {
              value: '120106',
              label: '红桥区',
            },
            {
              value: '120110',
              label: '东丽区',
            },
            {
              value: '120111',
              label: '西青区',
            },
            {
              value: '120112',
              label: '津南区',
            },
            {
              value: '120113',
              label: '北辰区',
            },
            {
              value: '120114',
              label: '武清区',
            },
            {
              value: '120115',
              label: '宝坻区',
            },
            {
              value: '120116',
              label: '滨海新区',
            },
            {
              value: '120117',
              label: '宁河区',
            },
            {
              value: '120118',
              label: '静海区',
            },
            {
              value: '120119',
              label: '蓟州区',
            },
          ],
        },
      ],
    },
  ],
};
export default {
  components: {
    TCell,
    TCascader,
  },
  data() {
    return {
      options: data.areaList,
      note: '请选择地址',
      visible: false,
      subTitles: ['请选择省份', '请选择城市', '请选择区/县'],
    };
  },
  created() {},
  methods: {
    showCascader() {
      this.visible = true;
    },
    onChange(e) {
      const { selectedOptions } = e;
      this.note = selectedOptions.map(item => item.label).join('/');
    },
  },
};
</script>
<style>
</style>
```


#### 选择任意一项


```vue
<template>
  <view>
    <t-cell
      title="地址"
      :note="note"
      arrow
      @click="showCascader"
    />

    <t-cascader
      :visible="visible"
      :close-btn="false"
      :check-strictly="true"
      :value="value"
      :options="options"
      title="请选择地址"
      @update:visible="visible = $event"
      @change="onChange"
      @pick="onPick"
    >
      <template
        #close-btn
      >
        <text
          class="confirm-btn"
        >
          确定
        </text>
      </template>
    </t-cascader>
  </view>
</template>

<script>
import TCell from '@tdesign/uniapp/cell/cell.vue';
import TCascader from '@tdesign/uniapp/cascader/cascader.vue';
const data = {
  areaList: [
    {
      label: '北京市',
      value: '110000',
      children: [
        {
          value: '110100',
          label: '北京市',
          children: [
            {
              value: '110101',
              label: '东城区',
            },
            {
              value: '110102',
              label: '西城区',
            },
            {
              value: '110105',
              label: '朝阳区',
            },
            {
              value: '110106',
              label: '丰台区',
            },
            {
              value: '110107',
              label: '石景山区',
            },
            {
              value: '110108',
              label: '海淀区',
            },
            {
              value: '110109',
              label: '门头沟区',
            },
            {
              value: '110111',
              label: '房山区',
            },
            {
              value: '110112',
              label: '通州区',
            },
            {
              value: '110113',
              label: '顺义区',
            },
            {
              value: '110114',
              label: '昌平区',
            },
            {
              value: '110115',
              label: '大兴区',
            },
            {
              value: '110116',
              label: '怀柔区',
            },
            {
              value: '110117',
              label: '平谷区',
            },
            {
              value: '110118',
              label: '密云区',
            },
            {
              value: '110119',
              label: '延庆区',
            },
          ],
        },
      ],
    },
    {
      label: '天津市',
      value: '120000',
      children: [
        {
          value: '120100',
          label: '天津市',
          children: [
            {
              value: '120101',
              label: '和平区',
            },
            {
              value: '120102',
              label: '河东区',
            },
            {
              value: '120103',
              label: '河西区',
            },
            {
              value: '120104',
              label: '南开区',
            },
            {
              value: '120105',
              label: '河北区',
            },
            {
              value: '120106',
              label: '红桥区',
            },
            {
              value: '120110',
              label: '东丽区',
            },
            {
              value: '120111',
              label: '西青区',
            },
            {
              value: '120112',
              label: '津南区',
            },
            {
              value: '120113',
              label: '北辰区',
            },
            {
              value: '120114',
              label: '武清区',
            },
            {
              value: '120115',
              label: '宝坻区',
            },
            {
              value: '120116',
              label: '滨海新区',
            },
            {
              value: '120117',
              label: '宁河区',
            },
            {
              value: '120118',
              label: '静海区',
            },
            {
              value: '120119',
              label: '蓟州区',
            },
          ],
        },
      ],
    },
  ],
};
export default {
  components: {
    TCell,
    TCascader,
  },
  data() {
    return {
      options: data.areaList,
      note: '请选择地址',
      visible: false,
      value: '',
    };
  },
  created() {},
  methods: {
    showCascader() {
      this.visible = true;
    },
    onPick(e) {
      console.log(e);
    },
    onChange(e) {
      const { selectedOptions, value } = e;
      console.log('change', value);
      this.value = value;
      this.note = selectedOptions.map(item => item.label).join('/');
      this.visible = false;
    },
  },
};
</script>
<style>
.confirm-btn {
    color: #0052d9;
    font-size: 16px;
}
</style>
```


## API

### Cascader Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
custom-style | Object | - | 自定义样式 | N
check-strictly | Boolean | false | 父子节点选中状态不再关联，可各自选中或取消 | N
close-btn | Boolean | true | 关闭按钮 | N
keys | Object | - | 用来定义 value / label / children / disabled 在 `options` 中对应的字段别名。TS 类型：`CascaderKeysType` `type CascaderKeysType = TreeKeysType`。[通用类型定义](https://github.com/tencent/tdesign-miniprogram/blob/develop/packages/uniapp-components/common/common.ts)。[详细类型定义](https://github.com/tencent/tdesign-miniprogram/blob/develop/packages/uniapp-components/cascader/type.ts) | N
options | Array | [] | 可选项数据源。TS 类型：`Array<CascaderOption>` | N
placeholder | String | 选择选项 | 未选中时的提示文案 | N
popup-props | Object | {} | 透传 Popup 组件全部属性。TS 类型：`PopupProps`，[Popup API Documents](./popup?tab=api)。[详细类型定义](https://github.com/tencent/tdesign-miniprogram/blob/develop/packages/uniapp-components/cascader/type.ts) | N
sub-titles | Array | [] | 每级展示的次标题。TS 类型：`Array<string>` | N
theme | String | step | 展示风格。可选项：step/tab | N
title | String | - | 标题 | N
value | String / Number | - | 选项值。支持语法糖 `v-model:value` | N
default-value | String / Number | - | 选项值。非受控属性 | N
visible | Boolean | false | 是否展示 | N

### Cascader Events

名称 | 参数 | 描述
-- | -- | --
change | `(context: { value: string \| number, selectedOptions: string[] })` | 值发生变更时触发
close | `(context: { trigger: CascaderTriggerSource })` | 关闭时触发。[详细类型定义](https://github.com/tencent/tdesign-miniprogram/blob/develop/packages/uniapp-components/cascader/type.ts)。<br/>`type CascaderTriggerSource = 'overlay' \| 'close-btn' \| 'finish'`<br/>
pick | `(context: { value: string \| number, label: string, index: number, level: number })` | 选择后触发

### Cascader Slots

名称 | 描述
-- | --
close-btn | 自定义 `close-btn` 显示内容
header | 头部
middle-content | 中间内容
title | 自定义 `title` 显示内容

### CSS Variables

组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-cascader-active-color | @brand-color | -
--td-cascader-bg-color | @bg-color-container | -
--td-cascader-border-color | @component-stroke | -
--td-cascader-content-height | 78vh | -
--td-cascader-disabled-color | @text-color-disabled | -
--td-cascader-options-height | calc(100% - @cascader-step-height) | -
--td-cascader-options-title-color | @text-color-placeholder | -
--td-cascader-step-arrow-color | @text-color-placeholder | -
--td-cascader-step-dot-size | 16rpx | -
--td-cascader-step-height | 88rpx | -
--td-cascader-title-color | @text-color-primary | -
--td-cascader-title-font | @font-title-large | -
--td-cascader-title-padding | @spacer-2 | -
