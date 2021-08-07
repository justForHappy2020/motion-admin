<template>
  <div class="dashboard-container">
    <div class="dashboard-text">{{this.$store.state.user.nickName}},欢迎回来！</div>
  </div>
</template>

<script>
import store from '@/store/index'

export default {
  name: 'dashboard'
}

</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
