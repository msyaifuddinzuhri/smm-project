<template>
  <section class="section">
    <div class="section-header">
      <p class="m-0">Dashboard / Produk</p>
    </div>
    <div class="section-body">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header"><h5>Produk Tersedia</h5></div>
            <div class="card-body">
                <h5 class="mb-5">SALDO : Rp {{formatCurrency($store.state.auth.user.balance)}}</h5>
              <div class="row">
                <product-card v-for="product in products" :key="product.id" :data="product"></product-card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ProductCard from "../../components/ProductCard.vue";
export default {
  async created() {
    this.getProducts();
  },
  components: { ProductCard },
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
      await this.$store.dispatch("product/getProducts");
    },
  },
};
</script>
