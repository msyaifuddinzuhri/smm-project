<template>
  <div class="col-lg-3 col-md-6 col-12">
    <div class="card border-top border-primary">
      <div class="card-body">
            <OrderModal
          v-if="isModalVisible"
          @close="closeModal"
          :data="dataProduct"
        ></OrderModal>
        <div class="d-flex align-items-center">
          <img src="/assets/img/social-media.png" width="25" alt="" />
          <h4 class="text-dark ml-2 mb-0">{{ data.name }}</h4>
        </div>
        <h5 class="my-3">Rp. {{ formatCurrency(data.price) }}</h5>
        <hr />
        <div class="d-flex justify-content-between align-items-center">
          <p class="m-0">
            Stok : <span class="badge badge-danger">{{ data.stock }}</span>
          </p>
          <button class="btn btn-primary" v-if="data.stock > 0" @click="showModal(data)">Beli Sekarang</button>
          <button class="btn btn-secondary" disabled v-else >Beli Sekarang</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import OrderModal from './modals/OrderModal.vue'
export default {
  props: ["data"],
  components: {
      OrderModal
  },
  data: () => ({
        isModalVisible: false,
        dataProduct: null,
  }),
  methods: {
    formatCurrency(num) {
      return parseFloat(num)
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    },
     showModal(product) {
      this.dataProduct = product;
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>
