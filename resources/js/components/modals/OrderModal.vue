<template>
  <div class="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Beli</h5>
          <button type="button" class="close" @click="close">
            <span>&times;</span>
          </button>
        </div>
        <form @submit.prevent="handleSubmit" ref="form">
          <div class="modal-body">
            <div class="d-flex align-items-center">
              <img src="/assets/img/social-media.png" width="25" alt="" />
              <h4 class="text-dark ml-2 mb-0">{{ data.name }}</h4>
            </div>
            <div class="d-flex align-items-center my-2">
              <p class="mb-0 mr-2">Stok :</p>
              <span class="badge badge-danger">{{ data.stock }}</span>
            </div>
            <div class="form-group">
              <label for="qty">Jumlah Produk</label>
              <input
                type="number"
                class="form-control"
                tabindex="1"
                v-model="item.qty"
                required
                autofocus
                min="1"
                :max="data.stock"
              />
            </div>
            <div class="row">
              <div class="col-lg-6 col-12">
                <h5 class="mb-0">Harga Produk</h5>
              </div>
              <div class="col-lg-6 col-12">
                <h5 class="mb-0">Rp {{ formatCurrency(data.price) }}</h5>
              </div>
              <hr />
              <div class="col-lg-6 col-12">
                <h4 class="mb-0">TOTAL</h4>
              </div>
              <div class="col-lg-6 col-12">
                <h4 class="mb-0">Rp {{ formatCurrency(total) }}</h4>
              </div>
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
            <button v-else type="submit" class="text-white btn btn-primary">
              Submit
            </button>
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
      qty: 1,
    },
  }),
  computed: {
    total() {
      return this.data.price * this.item.qty;
    },
  },
  watch: {
    "item.qty"(val) {
      this.qty = val;
    },
  },
  methods: {
    close() {
      this.loading = false;
      this.item.qty = 1;
      this.$emit("close");
    },
    formatCurrency(num) {
      return parseFloat(num)
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    },
    async handleSubmit() {
      try {
        this.errors = null;
        this.loading = true;
        let totalAkhir = this.data.price * this.item.qty

        if (this.item.qty < 1) {
          this.$notify({
            group: "foo",
            type: "error",
            title: "Order gagal",
            text: 'Jumlah produk minimal 1',
          });
        } else if(this.qty > this.data.stock) {
            this.$notify({
              group: "foo",
              type: "error",
              title: "Order gagal",
              text: 'Jumlah produk melebihi stok',
            });
        } else if(this.$store.state.auth.user.balance < totalAkhir) {
            this.$notify({
              group: "foo",
              type: "error",
              title: "Order gagal",
              text: 'Saldo tidak cukup',
            });
        } else {
            let payload = this.item;
            payload['product_id'] = this.data.id
            payload['total'] = totalAkhir
            payload['price'] = this.data.price
            payload['member_id'] = this.$store.state.auth.user.id
          await this.$store
            .dispatch("order/memberOrder", payload)
            .then((response) => {
              this.$notify({
                group: "foo",
                type: "success",
                title: response.data.message,
              });
              this.close();
              this.$store.commit('auth/setUserBalance', payload['total']);
              location.reload()
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
