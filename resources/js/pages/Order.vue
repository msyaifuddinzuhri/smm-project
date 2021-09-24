<template>
  <section class="section">
    <div class="section-header">
      <p class="m-0">Dashboard / Data Riwayat Order</p>
    </div>
    <div class="section-body">
        <order-table></order-table>
    </div>
  </section>
</template>

<script>
import OrderTable from '../components/tables/OrderTable.vue'
export default {
    components: {
        OrderTable
    }
};
</script>
