<template>
  <section class="section">
    <div class="section-header">
      <p class="m-0">Dashboard</p>
    </div>
    <div class="section-body">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <h3 class="m-0 text-dark">Selamat datang, {{$store.state.auth.user.username}}!</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </section>
</template>

<script>
export default {
};
</script>
