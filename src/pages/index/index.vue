<template>
  <view class="content">

    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <view class="container">
      <view>哈哈哈</view>
      <text class="title">{{ counter.count }}</text>
      <button @click="counter.increment">+1</button>
      <button @click="counter.decrement">-1</button>
      <button @click="counter.reset">reset</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { didappGetHealth } from '@/http'
import { useCounterStore } from '@/store'

const title = ref('Hello')
const counter = useCounterStore()

onLoad(async () => {
  const res = await didappGetHealth()
  if (res.ok) {
    console.log(res.data.version, res.data.personAuthEnable)
  }

  // 读取
  console.log(counter.count)       // 0
  console.log(counter.doubleCount) // 0

})
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
