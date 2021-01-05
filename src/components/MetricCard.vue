<template>
  <div class="card">
    <div class="card-body" style="text-align: center; text-transform: capitalize;">
      <h5 class="card-title">{{title}}</h5>
      <!-- <span class="text display-3">
        <svg class="card-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      </span> -->
      <div class="text">
        <h1 class="card-text display-3">{{count}}</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'count', 'icon']
}
</script>

<style scoped>
  .text {
    display: inline-block;
    vertical-align: middle;
  }

  .card-icon {
    width: 4rem;
    height: 4rem;
  }

</style>