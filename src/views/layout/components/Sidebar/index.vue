<template>
  <aside class="hero column is-fullheight sidebar" :class="{'fix-180':isCollapse, 'is-narrow':!isCollapse}">
    <nav class="menu">
      <sidebar-item :routes="permission_routers"></sidebar-item>
    </nav>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    routes () {
      return this.$router.options.routes
    },
    isCollapse () {
      return !this.sidebar.opened
    }
  }
}
</script>
<style lang="scss" scoped>
.fix-180{
  width: 250px !important;
  max-width: 250px !important;
  min-width: 250px !important;
}
aside{
  &.sidebar {
    background-color: $sidebar-bg;
    color: white;
    padding: 0.75rem 0 0.75rem 0.75rem;
  }
}
</style>
