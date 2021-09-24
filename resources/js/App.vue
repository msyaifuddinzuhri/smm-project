<template>
  <div>
      <notifications classes="my-style" group="foo" />
    <div v-if="$route.meta.loginLayout || $route.meta.Error404">
      <router-view></router-view>
    </div>
    <div class="main-wrapper" v-else>
      <navbar></navbar>
      <sidebar></sidebar>
      <div class="main-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/layouts/Navbar.vue";
import Sidebar from "./components/layouts/Sidebar.vue";
export default {
  components: {
    Navbar,
    Sidebar,
  },
};
</script>

<style lang="scss">
.my-style {
  padding: 10px;
  margin: 10px;

  font-size: 12px;

  color: #ffffff;
  background: #44A4FC;
  border-left: 5px solid #187FE7;

  &.warn {
    background: #ffb648;
    border-left-color: #f48a06;
  }

  &.error {
    background: #E54D42;
    border-left-color: #B82E24;
  }

  &.success {
    background: #68CD86;
    border-left-color: #42A85F;
  }
}
</style>
