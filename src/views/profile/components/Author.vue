<template>
  <div class="author-container">
    <div class="header">
      <PanThurmb
        image="https://img4.sycdn.imooc.com/61110c2b0001152907400741-140-140.jpg"
        height="60px"
        width="60px"
      >
        {{ $t('msg.profile.name') }}
      </PanThurmb>
      <div class="header-desc">
        <h3>{{ $t('msg.profile.name') }}</h3>
        <span>{{ $t('msg.profile.job') }}</span>
      </div>
    </div>
  </div>
  <div class="info">
    {{ $t('msg.profile.Introduction') }}
  </div>
</template>

<script setup>
import {} from 'vue'
import PanThurmb from '@/components/PanThurmb/index'
</script>

<style lang="scss" scoped>
.author-container {
  .header {
    display: flex;
    .header-desc {
      margin-left: 12px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      span {
        font-size: 14px;
      }
    }
  }
  .info {
    margin-top: 16px;
    line-height: 22px;
    font-size: 14px;
    text-indent: 26px;
  }
}
</style>
