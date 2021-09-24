<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <h4>Data Riwayat Order</h4>
        </div>
        <div class="card-body p-0">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <v-data-table
                  :page.sync="page"
                  :items-per-page="itemsPerPage"
                  hide-default-footer
                  @page-count="pageCount = $event"
                  :headers="headers"
                  :items="orders"
                  :search="search"
                  class="border"
                >
                  <template #item.index="{ item, value }">
                    {{ orders.indexOf(item) + 1 }}
                  </template>
                  <template #item.price="{ item, value }">
                    {{ formatCurrency(value) }}
                  </template>
                  <template #item.total="{ item, value }">
                    {{ formatCurrency(value) }}
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
export default {
  async created() {
    this.getOrders();
  },
  data: () => ({
    dataMember: null,
    isModalVisible: false,
    search: "",
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
    headers: [
      { text: "#", value: "index" },
      { text: "Nama Member", value: "member.username" },
      { text: "Nama Produk", value: "product.name" },
      { text: "Harga Produk", value: "price" },
      { text: "Jumlah", value: "qty" },
      { text: "Total", value: "total" },
    ],
  }),
  computed: {
    orders() {
      return this.$store.state.order.orders;
    },
  },
  methods: {
    formatCurrency(num) {
      return parseFloat(num)
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    },
    async getOrders() {
      await this.$store.dispatch("order/getAllOrders");
    },
  },
};
</script>
