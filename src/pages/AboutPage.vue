<template>
  <div class="container-fluid about">
    <div class="profile-header" v-if="account">
      <div class="row cover-img" :style="{backgroundImage: `url(${account.coverImg})`}">
        <!-- TODO come put in profile info  -->
      </div>
    </div>
    <div v-else>
      <h4 class="text-light">
        ....Loading
      </h4>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  name: 'AboutPage',
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style lang="scss" scoped>
.cover-img{
  height: 30vh;
  background-position: center center;
}

</style>
