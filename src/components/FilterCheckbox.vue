<template>
  <div class="card mb-4">
    <div class="card-body">
      <h5 class="cart-title" style="text-transform: capitalize">{{filterName}}</h5>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item" v-for="item in items" v-bind:key="item.id">
        <label>
          <input type="checkbox" :value="item.id" :id="`${filterName}_${item.id}`" v-on:change='emitChange' v-model='selectedItems'>
          {{item.name}}
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'FilterCheckbox',
  data(){
    return {
      selectedItems: []
    }
  },
  props: ['items', 'filterName'],
  methods: {
    emitChange(){
      this.$emit('FilterChanged', this.filterName, this.selectedItems)
    }
  }
}
</script>