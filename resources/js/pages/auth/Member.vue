<template>
  <section class="section">
    <div class="d-flex flex-wrap align-items-stretch">
      <div
        class="col-lg-4 col-md-6 col-12 order-lg-1 min-vh-100 order-2 bg-white"
      >
        <div class="p-4 m-3">
          <div class="row mb-5">
            <div class="col-12 text-center">
              <h1>SOCIAL MEDIA MANAGEMENT</h1>
              <div class="d-flex justify-content-center mt-4">
                <button
                  class="btn"
                  v-bind:class="{ 'btn-danger': login }"
                  v-on:click="login = !login"
                >
                  Login
                </button>
                <button
                  class="btn"
                  v-bind:class="{ 'btn-danger': !login }"
                  v-on:click="login = !login"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
          <div class="alert alert-danger" v-if="$route.query.is_login == false">
            Silahkan login terlebih dahulu
          </div>
          <div v-if="login">
            <form @submit.prevent="handleSubmit">
              <div class="form-group">
                <label for="username">Username</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="item_login.username"
                  tabindex="1"
                  required
                  autofocus
                />
                <small class="text-danger" v-if="errors_login && errors_login.username">{{
                  errors_login.username[0]
                }}</small>
              </div>

              <div class="form-group">
                <div class="d-block">
                  <label for="password" class="control-label">Password</label>
                </div>
                <input
                  type="password"
                  class="form-control"
                  v-model="item_login.password"
                  tabindex="2"
                  required
                />
                <small class="text-danger" v-if="errors_login && errors_login.password">{{
                  errors_login.password[0]
                }}</small>
              </div>

              <div class="form-group text-left">
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
                  class="btn btn-primary text-white btn-lg btn-icon icon-right"
                  tabindex="4"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
          <div v-else>
            <form @submit.prevent="handleSubmit">
              <div class="form-group">
                <label for="username">Username</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="item_register.username"
                  tabindex="1"
                  required
                  autofocus
                />
                <small class="text-danger" v-if="errors_register && errors_register.username">{{
                  errors_register.username[0]
                }}</small>
              </div>

              <div class="form-group">
                <div class="d-block">
                  <label for="password" class="control-label">Password</label>
                </div>
                <input
                  type="password"
                  class="form-control"
                  v-model="item_register.password"
                  tabindex="2"
                  required
                />
                <small class="text-danger" v-if="errors_register && errors_register.password">{{
                  errors_register.password[0]
                }}</small>
              </div>
              <div class="form-group">
                <div class="d-block">
                  <label for="password_confirmation" class="control-label"
                    >Konfirmasi Password</label
                  >
                </div>
                <input
                  type="password"
                  class="form-control"
                  v-model="item_register.password_confirmation"
                  tabindex="2"
                  required
                />
                <small
                  class="text-danger"
                  v-if="errors_register && errors_register.password_confirmation"
                  >{{ errors_register.password_confirmation[0] }}</small
                >
              </div>

              <div class="form-group text-left">
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
                  class="btn btn-primary text-white btn-lg btn-icon icon-right"
                  tabindex="4"
                >
                  Register
                </button>
              </div>
            </form>
          </div>

          <div class="text-center mt-5 text-small">
            Copyright &copy; Social Media Management. Made with 💙 by Stisla
          </div>
        </div>
      </div>
      <div
        class="
          col-lg-8 col-12
          order-lg-2 order-1
          min-vh-100
          background-walk-y
          position-relative
          overlay-gradient-bottom
        "
        data-background="/assets/img/login-bg.jpg"
      >
        <div class="absolute-bottom-left index-2">
          <div class="text-light p-5 pb-2">
            <div class="mb-5 pb-3">
              <h1 class="mb-2 display-4 font-weight-bold">
                Welcome to <br />
                Social Media Management
              </h1>
              <h5 class="font-weight-normal text-muted-transparent">
                Sukses Bisnis Online
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    item_login: {
      username: null,
      password: null,
    },
    item_register: {
      username: null,
      password: null,
      password_confirmation: null,
    },
    login: true,
    loading: false,
    errors_login: null,
    errors_register: null,
  }),
  methods: {
    async handleSubmit() {
      try {
          this.loading = true;
        if (this.login) {
            this.errors_login = null;
            await this.$store
            .dispatch("auth/memberLogin", this.item_login)
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
                this.errors_login = error.response.data.errors;
              }
            });
        } else {
            this.errors_register = null
          await this.$store
            .dispatch("auth/memberRegister", this.item_register)
            .then((response) => {
              this.$notify({
                group: "foo",
                type: "success",
                title: response.data.message,
                text: 'Silahkan lakukan login'
              });
              this.login = true
            })
            .catch((error) => {
                this.errors_register = error.response.data.errors;
            });
        }
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
