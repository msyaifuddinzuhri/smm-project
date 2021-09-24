<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <h4>Data Member</h4>
        </div>
        <ProductModal
          v-if="isModalVisible"
          @close="closeModal"
          :data="dataProduct"
          :modalIndex="modalIndex"
        ></ProductModal>
        <div class="card-body p-0">
          <div class="container">
            <div class="row ">
              <div class="col-12 mb-1">
                <button
                  @click="isModalVisible = true"
                  type="button"
                  class="btn btn-primary text-white"
                >
                  Tambah
                </button>
              </div>
              <div class="col-12">
          <v-data-table
            :page.sync="page"
            :items-per-page="itemsPerPage"
            hide-default-footer
            @page-count="pageCount = $event"
            :headers="headers"
            :items="products"
            :search="search"
            class="border"
          >
            <template #item.index="{ item, value }">
              {{ products.indexOf(item) + 1 }}
            </template>
            <template #item.price="{ item, value }">
                    {{ formatCurrency(value) }}
                  </template>
            <template v-slot:item.actions="{ item, index }">
              <button
                @click="showModal(item, 1)"
                type="button"
                class="btn btn-info text-white"
              >
                Edit
              </button>
              <button
                @click="showModal(item, 2)"
                type="button"
                class="btn btn-danger text-white"
              >
                Hapus
              </button>
            </template>
          </v-data-table>
          <div class="text-center pt-2">
            <v-pagination
              :length="pageCount"
              v-model="page"
              dark
              prev-icon="fas fa-angle-left"
              next-icon="fas fa-angle-right"
            ></v-pagination>
          </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductModal from "../modals/ProductModal.vue";
export default {
  async created() {
    this.getProducts();
  },
  data: () => ({
    dataProduct: null,
    isModalVisible: false,
    modalIndex: -1,
    search: "",
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
    headers: [
      { text: "#", value: "index" },
      { text: "Nama", value: "name" },
      { text: "Harga", value: "price" },
      { text: "Stok", value: "stock" },
      { text: "Aksi", value: "actions" },
    ],
  }),
  components: {
    ProductModal,
  },
  computed: {
    products() {
      return this.$store.state.product.products;
    },
  },
  methods: {
    formatCurrency(num) {
      return parseFloat(num)
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    },
    async getProducts() {
      await this.$store.dispatch("product/getAllProducts");
    },
    showModal(product, index) {
      this.dataProduct = product;
      this.modalIndex = index;
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>
