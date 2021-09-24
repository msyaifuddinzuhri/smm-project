<template>
  <section class="section">
    <div class="container mt-5">
      <div class="row">
        <div
          class="
            col-12 col-sm-8
            offset-sm-2
            col-md-6
            offset-md-3
            col-lg-6
            offset-lg-3
            col-xl-4
            offset-xl-4
          "
        >
          <div class="login-brand">
            <h1>Social Media Management</h1>
          </div>

          <div class="card card-primary">
            <div class="card-header"><h4>Login</h4></div>

            <div class="card-body">
              <form @submit.prevent="handleSubmit" novalidate="">
                <div class="form-group">
                  <label for="username">Username</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="item.username"
                    tabindex="1"
                    required
                    autofocus
                  />
                  <small class="text-danger" v-if="errors && errors.username">{{
                    errors.username[0]
                  }}</small>
                </div>
                <div class="form-group">
                  <div class="d-block">
                    <label for="password" class="control-label">Password</label>
                  </div>
                  <input
                    type="password"
                    class="form-control"
                    v-model="item.password"
                    tabindex="2"
                    required
                  />
                  <small class="text-danger" v-if="errors && errors.password">{{
                    errors.password[0]
                  }}</small>
                </div>
                <div class="form-group">
                  <button
                    v-if="loading"
                    class="btn btn-secondary btn-lg btn-icon icon-right"
                    tabindex="4"
                    disabled
                  >
                    <div class="spinner-border spinner-border-sm" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                    Loading...
                  </button>
                  <button
                    v-else
                    type="submit"
                    class="btn text-white btn-primary btn-lg btn-icon icon-right"
                    tabindex="4"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div class="mt-5 text-muted text-center">
            Login sebagai <a href="/auth/member"> Member</a>
          </div>
          <div class="simple-footer">Copyright &copy; Stisla 2018</div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data: () => ({
    item: {
      username: null,
      password: null,
    },
    loading: false,
    errors: null,
  }),
  methods: {
    async handleSubmit() {
      try {
        this.errors = null;
        let payload = {
          username: this.item.username,
          password: this.item.password,
        };
        this.loading = true;
        await this.$store
          .dispatch("auth/adminLogin", payload)
          .then((response) => {
            this.$notify({
              group: "foo",
              type: "success",
              title: response.data.message,
            });
            this.$router.push({ name: "home" });
          })
          .catch((error) => {
            if (Array.isArray(error.response.data.errors)) {
              this.$notify({
                group: "foo",
                type: "error",
                title: "Login gagal",
                text: error.response.data.message,
              });
            } else {
              this.errors = error.response.data.errors;
            }
          });
        this.loading = false;
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
