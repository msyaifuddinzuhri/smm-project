<template>
  <div class="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button type="button" class="close" @click="close">
            <span>&times;</span>
          </button>
        </div>
        <form @submit.prevent="handleSubmit" ref="form">
          <div class="modal-body">
            <p v-if="data">
              Member: <span class="font-weight-bold">{{ data.username }}</span>
            </p>
            <div class="form-group">
              <label for="balance">Saldo</label>
              <input
                type="number"
                class="form-control"
                tabindex="1"
                v-model="item.balance"
                required
                autofocus
              />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="close">
              Close
            </button>
            <button
              v-if="loading"
              type="button"
              class="text-white btn btn-secondary"
              disabled
            >
              <div class="spinner-border spinner-border-sm" role="status">
                <span class="sr-only">Loading...</span>
              </div>
              Loading...
            </button>
            <button v-else type="submit" class="text-white btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data: () => ({
    loading: false,
    errors: null,
    item: {
      id: null,
      balance: 0,
    },
  }),
  computed: {
    title() {
      if (this.data) {
        this.item = {
          id: this.data.id,
          balance: this.data.balance,
        };
      }
      return "Update saldo";
    },
  },
  methods: {
    close() {
         this.loading = false
      this.$emit("close");
    },
    async handleSubmit() {
      try {
        this.errors = null;
        this.loading = true;

        await this.$store
          .dispatch("member/updateBalance", this.item)
          .then((response) => {
            this.$notify({
              group: "foo",
              type: "success",
              title: response.data.message,
            });
            this.close();
                location.reload();
          })
          .catch((error) => {
            if (Array.isArray(error.response.data.errors)) {
              this.$notify({
                group: "foo",
                type: "error",
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

<style scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  display: block;
  overflow: hidden;
  outline: 0;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
