<template>
  <section class="section">
    <div class="section-header">
      <p class="m-0">Dashboard / Data Member</p>
    </div>
    <div class="section-body">
        <member-table></member-table>
    </div>
  </section>
</template>

<script>
import MemberTable from '../components/tables/MemberTable.vue'
export default {
    components: {
        MemberTable
    }
};
</script>
