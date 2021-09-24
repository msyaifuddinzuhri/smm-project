<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <h4>Data Member</h4>
        </div>
        <MemberModal
          v-if="isModalVisible"
          @close="closeModal"
          :data="dataMember"
        ></MemberModal>
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
                  :items="members"
                  :search="search"
                  class="border"
                >
                  <template #item.index="{ item, value }">
                    {{ members.indexOf(item) + 1 }}
                  </template>
                  <template #item.balance="{ item, value }">
                    {{ formatCurrency(value) }}
                  </template>
                  <template v-slot:item.actions="{ item, index }">
                    <button
                      @click="showModal(item)"
                      type="button"
                      class="btn btn-primary text-white"
                    >
                      Tambah / Edit Saldo
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
import MemberModal from "../modals/MemberModal.vue";
export default {
  async created() {
    this.getMembers();
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
      { text: "Nama", value: "username" },
      { text: "Saldo", value: "balance" },
      { text: "Aksi", value: "actions" },
    ],
  }),
  components: {
    MemberModal,
  },
  computed: {
    members() {
      return this.$store.state.member.members;
    },
  },
  methods: {
    formatCurrency(num) {
      return parseFloat(num)
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    },
    async getMembers() {
      await this.$store.dispatch("member/getAllMembers");
    },
    showModal(member) {
      this.dataMember = member;
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>
