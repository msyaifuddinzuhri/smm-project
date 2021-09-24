<template>
  <div>
    <div class="navbar-bg"></div>
    <nav class="navbar navbar-expand-lg main-navbar">
      <ul class="navbar-nav mr-3">
        <li>
          <a href="#" data-toggle="sidebar" class="nav-link nav-link-lg"
            ><i class="fas fa-bars"></i
          ></a>
        </li>
      </ul>
      <ul class="navbar-nav navbar-right ml-auto">
        <li class="dropdown">
          <a
            href="#"
            data-toggle="dropdown"
            class="nav-link dropdown-toggle nav-link-lg nav-link-user"
          >
            <img
              alt="image"
              src="/assets/img/avatar/avatar-1.png"
              class="rounded-circle mr-1"
            />
            <div class="d-sm-none d-lg-inline-block">Hi, {{ $store.state.auth.user.username }}</div></a
          >
          <div class="dropdown-menu dropdown-menu-right">
            <a
              href="#"
              v-on:click="logout"
              class="dropdown-item has-icon text-danger"
            >
              <i class="fas fa-sign-out-alt"></i> Logout
            </a>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>


<script>
export default {
  methods: {
    async logout() {
      try {
          if(this.$store.state.auth.isAdmin){

              await this.$store
                .dispatch("auth/adminLogout")
                .then((response) => {
                  this.$notify({
                    group: "foo",
                    type: "success",
                    title: response.data.message,
                  });
                  this.$router.push({name: 'auth-admin'})
                })
                .catch((error) => {
                  this.$notify({
                    group: "foo",
                    type: "error",
                    title: "Logout gagal",
                    text: error.response.data.errors,
                  });
                });
          } else {

              await this.$store
                .dispatch("auth/memberLogout")
                .then((response) => {
                  this.$notify({
                    group: "foo",
                    type: "success",
                    title: response.data.message,
                  });
                  this.$router.replace({ name: "auth-member" }, () => {
                    this.$router.go(0);
                  });
                })
                .catch((error) => {
                  this.$notify({
                    group: "foo",
                    type: "error",
                    title: "Logout gagal",
                    text: error.response.data.errors,
                  });
                });
          }
      } catch (error) {
        this.$notify({
          group: "foo",
          type: "error",
          title: "Error",
          text: error,
        });
      }
    },
  },
};
</script>
