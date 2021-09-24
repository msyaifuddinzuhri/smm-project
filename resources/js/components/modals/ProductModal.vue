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
        <div v-if="modalIndex == 2">
            <div class="modal-body">
                <h5 class="m-0">Apakah kamu yakin ingin menghapus data ini?</h5>
            </div>
            <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" @click="close">
              Close
            </button>
            <button @click="deleteProduct" type="button" class="text-white btn btn-danger">
              Hapus
            </button>
            </div>
        </div>
        <form @submit.prevent="handleSubmit" ref="form" v-else>
          <div class="modal-body">
            <div class="form-group">
              <label for="name">Nama</label>
              <input
                type="text"
                class="form-control"
                tabindex="1"
                v-model="item.name"
                required
                autofocus
              />
               <small
                  class="text-danger"
                  v-if="errors && errors.name"
                  >{{ errors.name[0] }}</small
                >
            </div>
            <div class="form-group">
              <label for="price">Harga</label>
              <input
                type="number"
                class="form-control"
                tabindex="1"
                v-model="item.price"
                required
                autofocus
              />
               <small
                  class="text-danger"
                  v-if="errors && errors.price"
                  >{{ errors.price[0] }}</small
                >
            </div>
            <div class="form-group">
              <label for="stock">Stok</label>
              <input
                type="number"
                class="form-control"
                tabindex="1"
                v-model="item.stock"
                required
                autofocus
              />
               <small
                  class="text-danger"
                  v-if="errors && errors.stock"
                  >{{ errors.stock[0] }}</small
                >
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
  props: ["data", "modalIndex"],
  data: () => ({
    loading: false,
    errors: null,
    item: {
      name: "",
      price: 0,
      stock: 0,
    },
  }),
  computed: {
    title() {
      if (this.data) {
        this.item = {
          name: this.data.name,
          price: this.data.price,
          stock: this.data.stock,
        };
      }
      return this.modalIndex === -1 ? "Tambah Data" : "Edit Data";
    },
  },
  methods: {
    close() {
      this.loading = false;
      this.$emit("close");
    },
    async handleSubmit() {
      try {
        this.errors = null;
        this.loading = true;
        let payload = this.item;

        if (this.modalIndex === -1) {
          await this.$store
            .dispatch("product/storeProduct", payload)
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
        } else {
          payload["id"] = this.data.id;
          await this.$store
            .dispatch("product/updateProduct", payload)
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
    async deleteProduct() {
      try {
        this.errors = null;
          await this.$store
            .dispatch("product/deleteProduct", this.data.id)
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
                  title: "Login gagal",
                  text: error.response.data.message,
                });
              } else {
                this.errors = error.response.data.errors;
              }
            });
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
