<template>
  <div class="card" v-if="ready">
    <div class="card-body">
      <div class="card-title"><h3>{{employee.name}}</h3></div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Department: {{employee.department}}</li>
        <li class="list-group-item">Position: {{employee.position}}</li>
        <li class="list-group-item">Sex: {{employee.sex}}</li>
        <li class="list-group-item">Date of birth: {{employee.date_of_birth}}</li>
      </ul>
    </div>
    <div class="card-footer">
      <button class="btn btn-primary" @click="openEditor = true">Edit</button>
      <button class="btn btn-danger ml-2" @click="openEditor = true">Delete</button>
    </div>
  </div>
  <employee-edit :employee="employee" :close-callback="closeEditor" v-if="openEditor"></employee-edit>
</template>

<script>
import axios from 'axios'
import EmployeeEdit from '../components/EmployeeEdit'

export default {
  name: 'Employee',
  data() {
    return {
      employee: undefined,
      ready: false,
      openEditor: false
    }
  },
  components: {
    EmployeeEdit
  },
  created() {
    this.loadData()
  },
  methods: {
    closeEditor(reload){
      this.openEditor = false;
      reload ? this.loadData() : null;
    },
    loadData(){
      axios.get(`http://localhost:3000/employees/${this.$route.params.id}`)
      .then(response => {
        this.employee = response.data
        // axios.get(`http://localhost:3000/departments/${this.employee.departmentId}`)
        // .then(response => this.employee.department = response.data.name)
        this.ready = true
      })
    }
  }
}
</script>