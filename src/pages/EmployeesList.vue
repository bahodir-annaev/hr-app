<template>
  <div class="row">
    <div class="col-12">
      <button class="btn btn-primary float-right" style="margin-top:20px;" @click="openEditor = true">Add Employee</button>
      <h4 class="page-title">Employees List</h4>
    </div>
    
  </div>
  <div class="row">
    <div class="col-3">
      <filter-checkbox v-for='(item, key) in filters' :key='key' :filter-name='key' v-bind:items="item.data" @filterChanged='updateFilter' />
    </div>
    <div class="col-9">
      <table class="table">
          <thead>
            <tr>
              <th scope="col">Full name</th>
              <th scope="col">Department</th>
              <th scope="col">Position</th>
              <th scope="col">Date of birth</th>
              <th scope="col">Sex</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="e in employees" v-bind:key="e.id">
              <th scope="row"><router-link :to="`/employees/${e.id}`">{{e.name}}</router-link></th>
              <td>{{e.departmentName}}</td>
              <td>{{e.position}}</td>
              <td>{{e.date_of_birth}}</td>
              <td>{{e.sex}}</td>
            </tr>
          </tbody>
      </table>
      <div class="text-center">
        <div v-for="p in range(pagination.maxPages)" 
              :key="p" 
              @click.stop='changePage(p + 1)' 
              class="btn" 
              :class='[(p + 1) == pagination.currentPage ? "btn-primary" : "btn-light"]'>
          {{p + 1}}
        </div>
      </div>
    </div>
  </div>
  <employee-edit :employee="{}" :close-callback="closeEditor" v-if="openEditor"></employee-edit>
</template>

<script>
import axios from 'axios'
import EmployeeEdit from '../components/EmployeeEdit'
import FilterCheckbox from '../components/FilterCheckbox'

export default {
  name: 'EmployeesList',
  data() {
    return {
      employees: [],
      openEditor: false,
      filters: {
        sex:{ 
          data: [{id:'male', name: 'Male'},{id: 'female', name: 'Female'}],
          selected: []
        },
        departmentId: {
          data: [],
          selected: []
        }
      },
      pagination: {
        currentPage: 1,
        maxPages: 1,
        limit: 10
      }

    }
  },
  components: {
    EmployeeEdit,
    FilterCheckbox
  },
  created(){
    this.loadData()
    axios.get('http://localhost:3000/departments')
    .then(response => {
      this.filters.departmentId.data = response.data;
      this.loadData()
    })
  },
  methods: {
    loadData(){
      const paramString = this.getParamString();
      axios.get(`http://localhost:3000/employees?_page=${this.pagination.currentPage}&_limit=${this.pagination.limit}&${paramString}`)
      .then(response => {
        this.employees = response.data;
        this.employees.forEach(employee => {
          employee.departmentName = this.filters.departmentId.data.find(item => item.id == employee.departmentId).name;
        })
        this.pagination.maxPages = Math.ceil(parseInt(response.headers['x-total-count']) / this.pagination.limit);
      })
    },
    closeEditor(reload){
      this.openEditor = false;
      reload ? this.loadData() : null;
    },
    updateFilter(filterName, items){
      this.filters[filterName].selected = items;
      this.pagination.currentPage = 1;
      this.loadData();
    },
    changePage(newPage){
      if (newPage == this.pagination.currentPage) return;
      this.pagination.currentPage = newPage;
      this.loadData();
    },
    getParamString(){
      let paramString = Object.keys(this.filters).reduce((acc, key) => {
        return acc + (this.filters[key].selected.length ? this.filters[key].selected.reduce( (subacc, id) => `${subacc}${key}=${id}&`, '') : '')
      }, '')
      return paramString; 
    },
    range: n => [...Array(n).keys()]
  }
}
</script>

<style>
  .page-title{
    line-height: 75px;
  }
</style>