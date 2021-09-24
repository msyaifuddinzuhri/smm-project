<template>
  <section class="section">
    <div class="section-header">
      <p class="m-0">Dashboard / Data Produk</p>
    </div>
    <div class="section-body">
        <product-table></product-table>
    </div>
  </section>
</template>

<script>
import ProductTable from '../components/tables/ProductTable.vue'
export default {
    components: {
        ProductTable
    }
};
</script>
