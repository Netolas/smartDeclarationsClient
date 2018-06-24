<template>
  <ul class="menu-list">
    <template v-for="item in routes" v-if="!item.hidden&&item.children">
        <li :key="item.children[0].name" v-if="item.children[0].role== role && hasOneShowingChildren(item.children) && !item.children[0].children&&!item.alwaysShow">
          <router-link :to="item.path+'/'+item.children[0].path" :class="{'is-active':isCurrentRoute(item.path+'/'+item.children[0].path)}">
            <span>
              <b-icon
                pack="fas"
                :icon="item.children[0].meta.icon"
                size="is-medium">
              </b-icon>
              </span>
            <span class="is-size-6 cut-text" v-if="isCollapse">{{item.children[0].meta.title}}</span>
          </router-link>
        </li>
    </template>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'role'
    ]),
    isCollapse () {
      return !this.sidebar.opened
    }
  },
  methods: {
    hasOneShowingChildren (children) {
      const showingChildren = children.filter(item => {
        return !item.hidden
      })
      if (showingChildren.length === 1) {
        return true
      }
      return false
    },
    isCurrentRoute (route) {
      console.log(route);
      console.log(this.$route.path);      
      if (route === this.$route.path+'/' || route === this.$route.path) {
        console.log('true');
        
        return true
      }
      return false
    }
  }
}
</script>
<style lang="scss" scoped>
  a {
    color: lighten($sidebar-bg, 20%);
    text-align:left;
    padding: 0.75rem;
    span:nth-child(2) {
      &.cut-text {
        width: 160px;
        overflow: hidden;
        display: inline-flex;
        text-overflow: ellipsis;
        padding: 0;
        white-space: nowrap;
        padding-left: 10px;
      }
    }
    &:hover {
      background: linear-gradient(90deg,  lighten($primary, 20%) 0.1rem, lighten($sidebar-bg, 5%) 0.3rem);
      color: lighten($primary, 10%);
    }
    &.is-active {
      background: linear-gradient(90deg,  $primary 0.1rem, lighten($sidebar-bg, 5%) 0.3rem);
      color: #ffffff;
      i{
        color: $primary;
      }
    }
  }
</style>
