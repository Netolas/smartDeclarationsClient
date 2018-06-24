<template>
  <section class="column app-main has-background-light">
    <transition name="fade" mode="out-in">
      <div class="container column">
        <div class="section">
      <!-- <router-view :key="key"></router-view> -->
          <router-view></router-view>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
}
</script>
