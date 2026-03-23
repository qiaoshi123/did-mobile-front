---
name: "form"
description: "用以收集、校验和提交数据，一般由输入框、单选框、复选框、选择器等控件组成。"
url: "https://tdesign.tencent.com/uniapp/components/form"
---


## 引入

可在 `main.ts` 或在需要使用的页面或组件中引入。

```js
import TForm from '@tdesign/uniapp/form/form.vue';
import TFormItem from '@tdesign/uniapp/form-item/form-item.vue';
```

### 01 组件类型

基础表单


```vue
<template>
  <view>
    <t-form
      ref="form"
      class="form"
      :data="formData"
      :rules="rules"
      reset-type="initial"
      show-error-message
      label-align="left"
      required-mark
      @reset="onReset($event, { tagId: 'form' })"
      @submit="onSubmit($event, { tagId: 'form' })"
    >
      <t-form-item
        label="用户名"
        name="name"
        help="输入用户名"
      >
        <template #label>
          用户名
        </template>
        <t-input
          :value="formData.name"
          borderless
          placeholder="请输入用户名"
          data-field="name"
          style="flex: 1;"
          @update:value="formData.name = $event"
        />
      </t-form-item>

      <t-form-item
        label="密码"
        name="password"
      >
        <t-input
          :value="formData.password"
          borderless
          type="password"
          :clearable="false"
          placeholder="请输入密码"
          data-field="password"
          style="flex: 1;"
          @change="onInputChange($event, { field: 'password' })"
        />
      </t-form-item>

      <t-form-item
        label="性别"
        name="gender"
      >
        <t-radio-group
          :value="formData.gender"
          t-class="box"
          style="flex: 1;"
          borderless
          @change="onRadioChange"
        >
          <t-radio
            :block="false"
            name="radio"
            value="man"
            label="男"
          />
          <t-radio
            :block="false"
            name="radio"
            value="women"
            label="女"
          />
          <t-radio
            :block="false"
            name="radio"
            value="secret"
            label="保密"
          />
        </t-radio-group>
      </t-form-item>

      <t-form-item
        label="生日"
        name="birth"
        content-align="right"
      >
        <t-input
          :value="formData.birth"
          borderless
          align="right"
          placeholder="请输入生日"
          data-field="birth"
          style="flex: 1;"
          @change="onInputChange($event, { field: 'birth' })"
        />
      </t-form-item>

      <t-form-item
        arrow
        label="籍贯"
        name="place"
        content-align="right"
      >
        <t-input
          ref="input"
          :value="formData.place"
          borderless
          align="right"
          placeholder="请选择籍贯"
          :readonly="!isH5"
          style="flex: 1;"
          @click="showCascader"
        />

        <t-cascader
          :visible="visibleCascader"
          :value="address"
          title="选择地址"
          :options="options"
          @update:visible="visibleCascader = $event"
          @change="onChangeCascader"
          @visible-change="onCascaderVisibleChange"
        />
      </t-form-item>

      <t-form-item
        label="年限"
        name="age"
        content-align="right"
      >
        <t-stepper
          :value="formData.age"
          theme="filled"
          @change="onChangeStepper"
        />
      </t-form-item>

      <t-form-item
        label="自我评价"
        name="description"
        content-align="right"
      >
        <t-rate
          :value="formData.description"
          variant="filled"
          allow-half
          :gap="rateGap"
          @change="onRateChange"
        />
      </t-form-item>

      <t-form-item
        label="个人简介"
        name="resume"
      >
        <t-textarea
          :value="formData.resume"
          t-class="textarea"
          indicator
          :maxlength="50"
          placeholder="请输入个人简介"
          style="flex: 1;"
          @update:value="formData.resume = $event"
        />
      </t-form-item>

      <t-form-item
        label="上传照片"
        name="photo"
      >
        <t-upload
          t-class="upload"
          :files="formData.photo"
          multiple
          :max="6"
          :action="action"
          :grid-config="gridConfig"
          @fail="onFail"
          @progress="onProgress"
          @change="onChangeUpload"
          @preview="onPreview"
          @success="onSuccess"
          @remove="onRemove"
        />
      </t-form-item>

      <view class="button-group">
        <t-button
          theme="primary"
          form-type="submit"
          size="large"
          :style="!useVirtualHost ? 'flex: 1;display: flex;' : ''"
          custom-style="flex: 1;margin-right: 16px;height: 40px;"
          @click="submit"
        >
          提交
        </t-button>
        <t-button
          theme="default"
          variant="base"
          form-type="reset"
          size="large"
          :style="!useVirtualHost ? 'flex: 1;display: flex;' : ''"
          custom-style="flex: 1;height: 40px;"
          @click="reset"
        >
          重置
        </t-button>
      </view>
    </t-form>
  </view>
</template>

<script>
import TForm from '@tdesign/uniapp/form/form.vue';
import TFormItem from '@tdesign/uniapp/form-item/form-item.vue';
import TInput from '@tdesign/uniapp/input/input.vue';
import TRadioGroup from '@tdesign/uniapp/radio-group/radio-group.vue';
import TRadio from '@tdesign/uniapp/radio/radio.vue';
// import TPopup from '@tdesign/uniapp/popup/popup.vue';
import TCascader from '@tdesign/uniapp/cascader/cascader.vue';
import TStepper from '@tdesign/uniapp/stepper/stepper.vue';
import TRate from '@tdesign/uniapp/rate/rate.vue';
import TTextarea from '@tdesign/uniapp/textarea/textarea.vue';
import TUpload from '@tdesign/uniapp/upload/upload.vue';
import TButton from '@tdesign/uniapp/button/button.vue';
import { canUseVirtualHost } from '@tdesign/uniapp/common/version';

export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TForm,
    TFormItem,
    TInput,
    TRadioGroup,
    TRadio,
    // TPopup,
    TCascader,
    TStepper,
    TRate,
    TTextarea,
    TUpload,
    TButton,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      formData: {
        name: '',
        password: '',
        gender: '',
        birth: '',
        place: '',
        age: 3,
        description: 2,
        resume: '',
        photo: [
          {
            url: 'https://tdesign.gtimg.com/mobile/demos/example4.png',
            name: 'uploaded1.png',
            type: 'image',
          },
          {
            url: 'https://tdesign.gtimg.com/mobile/demos/example6.png',
            name: 'uploaded2.png',
            type: 'image',
          },
        ],
      },
      visibleCascader: false,
      address: '120119',
      rateGap: 8,
      action: 'https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo',
      gridConfig: {
        column: 3,
      },
      options: [
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
      rules: {
        name: [
          {
            required: true,
            message: '用户名不能为空',
          },
          {
            maxLength: 3,
            message: '用户名不能超过3个字符',
          },
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
          },
        ],
        gender: [
          {
            required: true,
            message: '性别不能为空',
          },
        ],
        birth: [
          {
            required: true,
            message: '生日不能为空',
          },
        ],
        age: [
          {
            required: true,
            message: '年限不能为空',
          },
        ],
        place: [
          {
            required: true,
            message: '籍贯不能为空',
          },
        ],
        description: [
          {
            required: true,
            message: '分数不能为空',
          },
        ],
        resume: [
          {
            required: true,
            message: '简介不能为空',
          },
        ],
        photo: [
          {
            required: true,
            message: '上传照片不能为空',
          },
        ],
      },
    };
  },
  computed: {
    useVirtualHost() {
      return canUseVirtualHost();
    },
  },
  created() {},
  methods: {
    onReset(e) {
      this.formData = e.formData;
    },
    onSubmit(e) {
      console.log('[onSubmit]: ', e);
    },
    submit() {
      const { form } = this.$refs;
      form.submit();

      // form.validate({
      //   fields: ['name', 'password', 'gender'],
      //   trigger: 'blur',
      // }).then((result) => {
      //   console.log('[submit] result: ', result);
      // });
    },
    reset() {
      const { form } = this.$refs;
      form.reset();

      // form.reset({
      //   resetType: 'initial',
      //   fields: ['name', 'password', 'gender'],
      // });
    },
    onInputChange(e, { field }) {
      this.formData[`${field}`] = e.value;
    },
    onRadioChange(e) {
      this.formData.gender = e.value;
    },
    onRateChange(e) {
      this.formData.description = e.value;
    },
    onTextareaChange(e) {
      this.formData.resume = e.value;
    },
    groupChangeFn(e) {
      console.log('groupChange:', e.value);
    },
    onCascaderVisibleChange(e) {
      this.formData.visibleCascader = e.value;
    },
    onChangeCascader(e) {
      const { selectedOptions } = e;
      const placeText = selectedOptions?.map(item => item.label).join('/');
      this.formData.place = placeText;
      this.visibleCascader = false;
    },
    showCascader() {
      this.visibleCascader = true;
      uni.hideKeyboard();
    },
    onChangeStepper(e) {
      this.formData.age = e.value;
    },
    onFail(e) {
      console.log('[onFail]: ', e);
    },
    onProgress(e) {
      console.log('[onProgress]: ', e);
    },
    onChangeUpload(e) {
      console.log('[onChange]: ', e);
    },
    onPreview(e) {
      console.log('[onPreview]: ', e);
    },
    onSuccess(e) {
      const { files } = e;
      this.formData.photo = [...files];
    },
    onRemove(e) {
      const { index } = e;
      const { photo } = this.formData;
      photo.splice(index, 1);
      this.formData.photo = photo;
    },
  },
};
</script>
<style scoped>
:deep(.box) {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.form {
}

:deep(.upload) {
    width: 100%;
}

/* .upload {
    width: 100%;
} */

:deep(.textarea) {
    height: 200rpx;
    width: 100%;
    --textarea-vertical-padding: 0;
    --td-textarea-horizontal-padding: 0;
    padding:0 !important;
}
:deep(.textarea .t-textarea) {
    padding: 0 !important;
}

.button-group {
    background-color: var(--bg-color-demo, #fff);
    box-sizing: border-box;
    padding: 32rpx;
    display: flex;
    justify-content: space-between;
    position: relative;
    border-bottom: 1rpx solid #e7e7e7;
}

/* .button-group :deep(.t-button) {
    height: 80rpx;
    flex: 1;
}

.button-group :deep(.t-button:not(:last-child)) {
    margin-right: 32rpx;
} */

</style>
```



```vue
<template>
  <view>
    <t-form
      ref="form"
      :data="formData"
      :rules="rules"
      reset-type="empty"
      show-error-message
      label-align="top"
      required-mark
      @reset="onReset($event, { tagId: 'form' })"
      @submit="onSubmit($event, { tagId: 'form' })"
    >
      <t-form-item
        label="用户名"
        name="name"
        help="输入用户名"
      >
        <t-input
          :value="formData.name"
          borderless
          placeholder="请输入用户名"
          data-field="name"
          style="flex: 1;"
          @change="onInputChange($event, { field: 'name' })"
        />
      </t-form-item>

      <t-form-item
        label="密码"
        name="password"
      >
        <t-input
          :value="formData.password"
          borderless
          type="password"
          :clearable="false"
          placeholder="请输入密码"
          data-field="password"
          style="flex: 1;"
          @change="onInputChange($event, { field: 'password' })"
        />
      </t-form-item>

      <t-form-item
        label="性别"
        name="gender"
      >
        <t-radio-group
          :value="formData.gender"
          t-class="box"
          borderless
          style="flex: 1;"
          @change="onRadioChange"
        >
          <t-radio
            :block="false"
            name="radio"
            value="man"
            label="男"
          />
          <t-radio
            :block="false"
            name="radio"
            value="women"
            label="女"
          />
          <t-radio
            :block="false"
            name="radio"
            value="secret"
            label="保密"
          />
        </t-radio-group>
      </t-form-item>

      <t-form-item
        label="生日"
        name="birth"
      >
        <t-input
          :value="formData.birth"
          borderless
          placeholder="请输入生日"
          data-field="birth"
          style="flex: 1;"
          @change="onInputChange($event, { field: 'birth' })"
        />
      </t-form-item>

      <t-form-item
        arrow
        label="籍贯"
        name="place"
      >
        <t-input
          :value="formData.place"
          borderless
          placeholder="请选择籍贯"
          :readonly="true"
          style="flex: 1;"
          @click="showCascader"
        />
        <t-cascader
          :visible="visibleCascader"
          :value="address"
          title="选择地址"
          :options="options"
          @update:visible="visibleCascader = $event"
          @change="onChangeCascader"
          @visible-change="onCascaderVisibleChange"
        />
      </t-form-item>

      <t-form-item
        label="年限"
        name="age"
      >
        <t-stepper
          :value="formData.age"
          theme="filled"
          @change="onChangeStepper"
        />
      </t-form-item>

      <t-form-item
        label="自我评价"
        name="description"
      >
        <t-rate
          :value="formData.description"
          variant="filled"
          allow-half
          :gap="rateGap"
          @change="onRateChange"
        />
      </t-form-item>

      <t-form-item
        label="个人简介"
        name="resume"
      >
        <t-textarea
          :value="formData.resume"
          t-class="textarea"
          indicator
          :maxlength="50"
          placeholder="请输入个人简介"
          style="flex: 1;"
          @change="onTextareaChange"
        />
      </t-form-item>

      <t-form-item
        label="上传照片"
        name="photo"
      >
        <t-upload
          :files="formData.photo"
          multiple
          :max="8"
          :action="action"
          t-class="upload"
          :grid-config="gridConfig"
          style="flex: 1;"
          @fail="onFail"
          @progress="onProgress"
          @change="onChangeUpload"
          @preview="onPreview"
          @success="onSuccess"
          @remove="onRemove"
        />
      </t-form-item>

      <view class="button-group">
        <t-button
          theme="primary"
          type="submit"
          size="large"
          :style="!useVirtualHost ? 'flex: 1;display: flex;' : ''"
          custom-style="flex: 1;margin-right: 16px;height: 40px;"
          @click="submit"
        >
          提交
        </t-button>
        <t-button
          theme="default"
          variant="base"
          type="reset"
          size="large"
          :style="!useVirtualHost ? 'flex: 1;display: flex;' : ''"
          custom-style="flex: 1;height: 40px;"
          @click="reset"
        >
          重置
        </t-button>
      </view>
    </t-form>
  </view>
</template>

<script>
import TForm from '@tdesign/uniapp/form/form.vue';
import TFormItem from '@tdesign/uniapp/form-item/form-item.vue';
import TInput from '@tdesign/uniapp/input/input.vue';
import TRadioGroup from '@tdesign/uniapp/radio-group/radio-group.vue';
import TRadio from '@tdesign/uniapp/radio/radio.vue';
import TCascader from '@tdesign/uniapp/cascader/cascader.vue';
import TStepper from '@tdesign/uniapp/stepper/stepper.vue';
import TRate from '@tdesign/uniapp/rate/rate.vue';
import TTextarea from '@tdesign/uniapp/textarea/textarea.vue';
import TUpload from '@tdesign/uniapp/upload/upload.vue';
import TButton from '@tdesign/uniapp/button/button.vue';
import { canUseVirtualHost } from '@tdesign/uniapp/common/version';


export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    TForm,
    TFormItem,
    TInput,
    TRadioGroup,
    TRadio,
    TCascader,
    TStepper,
    TRate,
    TTextarea,
    TUpload,
    TButton,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      formData: {
        name: '',
        password: '',
        gender: '',
        birth: '',
        place: '',
        age: 3,
        description: 2,
        resume: '',
        photo: [
          {
            url: 'https://tdesign.gtimg.com/mobile/demos/example4.png',
            name: 'uploaded1.png',
            type: 'image',
          },
          {
            url: 'https://tdesign.gtimg.com/mobile/demos/example6.png',
            name: 'uploaded2.png',
            type: 'image',
          },
        ],
      },
      visibleCascader: false,
      address: '120119',
      rateGap: 8,
      action: 'https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo',
      gridConfig: {
        column: 4,
      },
      options: [
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
      rules: {
        name: [
          {
            required: true,
            message: '用户名不能为空',
          },
          {
            maxLength: 3,
            message: '用户名不能超过3个字符',
          },
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
          },
        ],
        gender: [
          {
            required: true,
            message: '性别不能为空',
          },
        ],
        birth: [
          {
            required: true,
            message: '生日不能为空',
          },
        ],
        age: [
          {
            required: true,
            message: '年限不能为空',
          },
        ],
        place: [
          {
            required: true,
            message: '籍贯不能为空',
          },
        ],
        description: [
          {
            required: true,
            message: '分数不能为空',
          },
        ],
        resume: [
          {
            required: true,
            message: '简介不能为空',
          },
        ],
        photo: [
          {
            required: true,
            message: '上传照片不能为空',
          },
        ],
      },
    };
  },
  computed: {
    useVirtualHost() {
      return canUseVirtualHost();
    },
  },
  created() {},
  methods: {
    onReset(e) {
      this.formData = e.formData;
    },
    onSubmit(e) {
      console.log('[onSubmit]: ', e);
    },
    submit() {
      const { form } = this.$refs;
      form.submit();
    },
    reset() {
      const { form } = this.$refs;
      form.reset();
    },
    onInputChange(e, { field }) {
      this.formData[`${field}`] = e.value;
    },
    onRadioChange(e) {
      this.formData.gender = e.value;
    },
    onRateChange(e) {
      this.formData.description = e.value;
    },
    onTextareaChange(e) {
      this.formData.resume = e.value;
    },
    groupChangeFn(e) {
      console.log('groupChange:', e.value);
    },
    onCascaderVisibleChange(e) {
      this.formData.visibleCascader = e.value;
    },
    onChangeCascader(e) {
      const { selectedOptions } = e;
      const placeText = selectedOptions?.map(item => item.label).join('/');
      this.formData.place = placeText;
      this.visibleCascader = false;
    },
    showCascader() {
      this.visibleCascader = true;
      uni.hideKeyboard();
    },
    onChangeStepper(e) {
      this.formData.age = e.value;
    },
    onFail(e) {
      console.log('[onFail]: ', e);
    },
    onProgress(e) {
      console.log('[onProgress]: ', e);
    },
    onChangeUpload(e) {
      console.log('[onChange]: ', e);
    },
    onPreview(e) {
      console.log('[onPreview]: ', e);
    },
    onSuccess(e) {
      const { files } = e;
      this.formData.photo = [...files];
    },
    onRemove(e) {
      const { index } = e;
      const { photo } = this.formData;
      photo.splice(index, 1);
      this.formData.photo = photo;
    },
  },
};
</script>
<style scoped>
:deep(.box) {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

:deep(.textarea) {
    height: 200rpx;
    width: 100%;
    --textarea-vertical-padding: 0;
    --td-textarea-horizontal-padding: 0;
    padding:0 !important;
}
:deep(.textarea .t-textarea) {
    padding: 0 !important;
}

.button-group {
    background-color: var(--bg-color-demo, #fff);
    box-sizing: border-box;
    padding: 32rpx;
    display: flex;
    justify-content: space-between;
    position: relative;
    border-bottom: 1rpx solid #e7e7e7;
}

:deep(.upload) {
    width: 100%;
}

/* .button-group :deep(.t-button) {
    height: 80rpx;
    flex: 1;
}

.button-group :deep(.t-button:not(:last-child)) {
    margin-right: 32rpx;
} */
</style>
```


## API

### Form Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
custom-style | Object | - | 自定义样式 | N
colon | Boolean | false | 是否在表单标签字段右侧显示冒号 | N
content-align | String | left | 表单内容对齐方式：左对齐、右对齐。可选项：left/right | N
data | Object | {} | 表单数据。TS 类型：`FormData` | N
disabled | Boolean | undefined | 是否禁用整个表单 | N
error-message | Object | - | 表单错误信息配置，示例：`{ idcard: '请输入正确的身份证号码', max: '字符长度不能超过 ${max}' }`。TS 类型：`FormErrorMessage` | N
label-align | String | right | 表单字段标签对齐方式：左对齐、右对齐、顶部对齐。可选项：left/right/top | N
label-width | String / Number | '81px' | 可以整体设置label标签宽度，默认为81px | N
readonly | Boolean | undefined | 是否整个表单只读 | N
required-mark | Boolean | undefined | 是否显示必填符号（*），默认显示 | N
required-mark-position | String | - | 表单必填符号（*）显示位置。可选项：left/right | N
reset-type | String | empty | 重置表单的方式，值为 empty 表示重置表单为空，值为 initial 表示重置表单数据为初始值。可选项：empty/initial | N
rules | Object | - | 表单字段校验规则。TS 类型：`FormRules<FormData>` `type FormRules<T extends Data = any> = { [field in keyof T]?: Array<FormRule> }`。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/form/type.ts) | N
scroll-to-first-error | String | - | 表单校验不通过时，是否自动滚动到第一个校验不通过的字段，平滑滚动或是瞬间直达。值为空则表示不滚动。可选项：''/smooth/auto | N
show-error-message | Boolean | true | 校验不通过时，是否显示错误提示信息，统一控制全部表单项。如果希望控制单个表单项，请给 FormItem 设置该属性 | N
submit-with-warning-message | Boolean | false | 【讨论中】当校验结果只有告警信息时，是否触发 `submit` 提交事件 | N

### Form Events

名称 | 参数 | 描述
-- | -- | --
reset | `(context: { e?: FormResetEvent })` | 表单重置时触发。[通用类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/common/common.ts)
submit | `(context: SubmitContext<FormData>)` | 表单提交时触发。其中 `context.validateResult` 表示校验结果，`context.firstError` 表示校验不通过的第一个规则提醒。`context.validateResult` 值为 `true` 表示校验通过；如果校验不通过，`context.validateResult` 值为校验结果列表。<br />【注意】⚠️ 默认情况，输入框按下 Enter 键会自动触发提交事件，如果希望禁用这个默认行为，可以给输入框添加  enter 事件，并在事件中设置 `e.preventDefault()`。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/form/type.ts)。<br/>`interface SubmitContext<T extends Data = Data> { e?: FormSubmitEvent; validateResult: FormValidateResult<T>; firstError?: string; fields?: any }`<br/><br/>`type FormValidateResult<T> = boolean \| ValidateResultObj<T>`<br/><br/>`type ValidateResultObj<T> = { [key in keyof T]: boolean \| ValidateResultList }`<br/><br/>`type ValidateResultList = Array<AllValidateResult>`<br/><br/>`type AllValidateResult = CustomValidateObj \| ValidateResultType`<br/><br/>`interface ValidateResultType extends FormRule { result: boolean }`<br/><br/>`type ValidateResult<T> = { [key in keyof T]: boolean \| ErrorList }`<br/><br/>`type ErrorList = Array<FormRule>`<br/>
validate | `(result: ValidateResultContext<FormData>)` | 校验结束后触发，result 值为 true 表示校验通过；如果校验不通过，result 值为校验结果列表。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/form/type.ts)。<br/>`type ValidateResultContext<T extends Data> = Omit<SubmitContext<T>, 'e'>`<br/>

### FormInstanceFunctions 组件实例方法

名称 | 参数 | 返回值 | 描述
-- | -- | -- | --
clear-validate | `(fields?: Array<keyof FormData>)` | \- | 必需。清空校验结果。可使用 fields 指定清除部分字段的校验结果，fields 值为空则表示清除所有字段校验结果。清除邮箱校验结果示例：`clearValidate(['email'])`
reset | `(params?: FormResetParams<FormData>)` | \- | 必需。重置表单，表单里面没有重置按钮`<button type=\"reset\" />`时可以使用该方法，默认重置全部字段为空，该方法会触发 `reset` 事件。<br />如果表单属性 `resetType='empty'` 或者 `reset.type='empty'` 会重置为空；<br />如果表单属性 `resetType='initial'` 或者 `reset.type='initial'` 会重置为表单初始值。<br />`reset.fields` 用于设置具体重置哪些字段，示例：`reset({ type: 'initial', fields: ['name', 'age'] })`。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/form/type.ts)。<br/>`interface FormResetParams<FormData> { type?: 'initial' \| 'empty'; fields?: Array<keyof FormData> }`<br/>
set-validate-message | `(message: FormValidateMessage<FormData>)` | \- | 必需。设置自定义校验结果，如远程校验信息直接呈现。注意需要在组件挂载结束后使用该方法。`FormData` 指表单数据泛型。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/form/type.ts)。<br/>`type FormValidateMessage<FormData> = { [field in keyof FormData]: FormItemValidateMessage[] }`<br/><br/>`interface FormItemValidateMessage { type: 'warning' \| 'error'; message: string }`<br/>
submit | `(params?: { showErrorMessage?: boolean })` | \- | 必需。提交表单，表单里面没有提交按钮`<button type=\"submit\" />`时可以使用该方法。`showErrorMessage` 表示是否在提交校验不通过时显示校验不通过的原因，默认显示。该方法会触发 `submit` 事件
validate | `(params?: FormValidateParams)` | `Promise<FormValidateResult<FormData>>` | 必需。校验函数，包含错误文本提示等功能。泛型 `FormData` 表示表单数据 TS 类型。<br/>【关于参数】`params.fields` 表示校验字段，如果设置了 `fields`，本次校验将仅对这些字段进行校验。`params.trigger` 表示本次触发校验的范围，'params.trigger = blur' 表示只触发校验规则设定为 trigger='blur' 的字段，'params.trigger = change' 表示只触发校验规则设定为 trigger='change' 的字段，默认触发全范围校验。`params.showErrorMessage` 表示校验结束后是否显示错误文本提示，默认显示。<br />【关于返回值】返回值为 true 表示校验通过；如果校验不通过，返回值为校验结果列表。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/form/type.ts)。<br/>`interface FormValidateParams { fields?: Array<string>; showErrorMessage?: boolean; trigger?: ValidateTriggerType }`<br/><br/>`type ValidateTriggerType = 'blur' \| 'change' \| 'submit' \| 'all'`<br/>


### FormItem Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
custom-style | Object | - | 自定义样式 | N
arrow | Boolean | false | 是否显示右侧箭头 | N
content-align | String | - | 表单内容对齐方式，优先级高于 Form.contentAlign。可选项：left/right | N
for | String | - | label 原生属性 | N
help | String | - | 表单项说明内容 | N
label | String | '' | 字段标签名称 | N
label-align | String | - | 表单字段标签对齐方式：左对齐、右对齐、顶部对齐。默认使用 Form 的对齐方式，优先级高于 Form.labelAlign。可选项：left/right/top | N
label-width | String / Number | - | 可以整体设置标签宽度，优先级高于 Form.labelWidth | N
name | String | - | 表单字段名称 | N
required-mark | Boolean | undefined | 是否显示必填符号（*），优先级高于 Form.requiredMark | N
rules | Array | - | 表单字段校验规则。TS 类型：`Array<FormRule>` | N
show-error-message | Boolean | undefined | 校验不通过时，是否显示错误提示信息，优先级高于 `Form.showErrorMessage` | N

### FormItem Slots

名称 | 描述
-- | --
help | 自定义 `help` 显示内容
label | 自定义 `label` 显示内容

### FormRule

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
boolean | Boolean | - | 内置校验方法，校验值类型是否为布尔类型，示例：`{ boolean: true, message: '数据类型必须是布尔类型' }` | N
date | Boolean / Object | - | 内置校验方法，校验值是否为日期格式，[参数文档](https://github.com/validatorjs/validator.js)，示例：`{ date: { delimiters: '-' }, message: '日期分隔线必须是短横线（-）' }`。TS 类型：`boolean \| IsDateOptions` `interface IsDateOptions { format: string; strictMode: boolean; delimiters: string[] }`。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/form/type.ts) | N
email | Boolean / Object | - | 内置校验方法，校验值是否为邮件格式，[参数文档](https://github.com/validatorjs/validator.js)，示例：`{ email: { ignore_max_length: true }, message: '请输入正确的邮箱地址' }`。TS 类型：`boolean \| IsEmailOptions` `import type { IsEmailOptions } from '../common/common'`。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/form/type.ts) | N
enum | Array | - | 内置校验方法，校验值是否属于枚举值中的值。示例：`{ enum: ['primary', 'info', 'warning'], message: '值只能是 primary/info/warning 中的一种' }`。TS 类型：`Array<string>` | N
idcard | Boolean | - | 内置校验方法，校验值是否为身份证号码，组件校验正则为 `/^(\\d{18,18}\|\\d{15,15}\|\\d{17,17}x)$/i`，示例：`{ idcard: true, message: '请输入正确的身份证号码' }` | N
len | Number / Boolean | - | 内置校验方法，校验值固定长度，如：len: 10 表示值的字符长度只能等于 10 ，中文表示 2 个字符，英文为 1 个字符。示例：`{ len: 10, message: '内容长度不对' }`。<br />如果希望字母和中文都是同样的长度，示例：`{ validator: (val) => val.length === 10, message: '内容文本长度只能是 10 个字' }` | N
max | Number / Boolean | - | 内置校验方法，校验值最大长度，如：max: 100 表示值最多不能超过 100 个字符，中文表示 2 个字符，英文为 1 个字符。示例：`{ max: 10, message: '内容超出' }`。<br />如果希望字母和中文都是同样的长度，示例：`{ validator: (val) => val.length <= 10, message: '内容文本长度不能超过 10 个字' }`<br />如果数据类型数字（Number），则自动变为数字大小的比对 | N
message | String | - | 校验未通过时呈现的错误信息，值为空则不显示 | N
min | Number / Boolean | - | 内置校验方法，校验值最小长度，如：min: 10 表示值最多不能少于 10 个字符，中文表示 2 个字符，英文为 1 个字符。示例：`{ min: 10, message: '内容长度不够' }`。<br />如果希望字母和中文都是同样的长度，示例：`{ validator: (val) => val.length >= 10, message: '内容文本长度至少为 10 个字' }`。<br />如果数据类型数字（Number），则自动变为数字大小的比对 | N
number | Boolean | - | 内置校验方法，校验值是否为数字（1.2 、 1e5  都算数字），示例：`{ number: true, message: '请输入数字' }` | N
pattern | String / Object | - | 内置校验方法，校验值是否符合正则表达式匹配结果，示例：`{ pattern: /@qq.com/, message: '请输入 QQ 邮箱' }`。TS 类型：`RegExp \| string` | N
required | Boolean | - | 内置校验方法，校验值是否已经填写。该值为 true，默认显示必填标记，可通过设置 `requiredMark: false` 隐藏必填标记 | N
telnumber | Boolean | - | 内置校验方法，校验值是否为手机号码，校验正则为 `/^1[3-9]\d{9}$/`，示例：`{ telnumber: true, message: '请输入正确的手机号码' }` | N
trigger | String | change | 校验触发方式。TS 类型：`ValidateTriggerType` | N
type | String | error | 校验未通过时呈现的错误信息类型，有 告警信息提示 和 错误信息提示 等两种。可选项：error/warning | N
url | Boolean / Object | - | 内置校验方法，校验值是否为网络链接地址，[参数文档](https://github.com/validatorjs/validator.js)，示例：`{ url: { protocols: ['http','https','ftp'] }, message: '请输入正确的 Url 地址' }`。TS 类型：`boolean \| IsURLOptions` `import type { IsURLOptions } from '../common/common'`。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/form/type.ts) | N
validator | Function | - | 自定义校验规则，示例：`{ validator: (val) => val.length > 0, message: '请输入内容'}`。TS 类型：`CustomValidator` `type CustomValidator = (val: ValueType) => CustomValidateResolveType \| Promise<CustomValidateResolveType>` `type CustomValidateResolveType = boolean \| CustomValidateObj` `interface CustomValidateObj { result: boolean; message: string; type?: 'error' \| 'warning' \| 'success' }` `type ValueType = any`。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/packages/uniapp-components/form/type.ts) | N
whitespace | Boolean | - | 内置校验方法，校验值是否为空格。示例：`{ whitespace: true, message: '值不能为空' }` | N

### FormErrorMessage

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
boolean | String | - | 布尔类型校验不通过时的表单项显示文案，全局配置默认是：`'${name}数据类型必须是布尔类型'` | N
date | String | - | 日期校验规则不通过时的表单项显示文案，全局配置默认是：`'请输入正确的${name}'` | N
enum | String | - | 枚举值校验规则不通过时的表单项显示文案，全局配置默认是：`${name}只能是${validate}等` | N
idcard | String | - | 身份证号码校验不通过时的表单项显示文案，全局配置默认是：`'请输入正确的${name}'` | N
len | String | - | 值长度校验不通过时的表单项显示文案，全局配置默认是：`'${name}字符长度必须是 ${validate}'` | N
max | String | - | 值的长度太长或值本身太大时，校验不通过的表单项显示文案，全局配置默认是：`'${name}字符长度不能超过 ${validate} 个字符，一个中文等于两个字符'` | N
min | String | - | 值的长度太短或值本身太小时，校验不通过的表单项显示文案，全局配置默认是：`'${name}字符长度不能少于 ${validate} 个字符，一个中文等于两个字符'` | N
number | String | - | 数字类型校验不通过时的表单项显示文案，全局配置默认是：`'${name}必须是数字'` | N
pattern | String | - | 正则表达式校验不通过时的表单项显示文案，全局配置默认是：`'请输入正确的${name}'` | N
required | String | - | 没有填写必填项时的表单项显示文案，全局配置默认是：`'${name}必填'` | N
telnumber | String | - | 手机号号码校验不通过时的表单项显示文案，全局配置默认是：`'请输入正确的${name}'` | N
url | String | - | 链接校验规则不通过时的表单项显示文案，全局配置默认是：`'请输入正确的${name}'` | N
validator | String | - | 自定义校验规则校验不通过时的表单项显示文案，全局配置默认是：'${name}不符合要求' | N
whitespace | String | - | 值为空格校验不通过时表单项显示文案，全局配置默认是：`'${name}不能为空` | N

### CSS Variables

组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-form-bg-color | @bg-color-container | -
--td-form-border-radius | 0 | -
--td-form-padding | 0 | -
--td-form-readonly-bg-color | @bg-color-secondarycontainer | -
--td-form-item-horizontal-padding | 32rpx | -
--td-form-item-justify-content | space-between | -
--td-form-item-label-width | 160rpx | -
--td-form-item-vertical-padding | 32rpx | -
