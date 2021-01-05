<template>
  <div class="row">
    <div class="col-12"><h4 class="page-title">Dashboard</h4></div>
  </div>
  <div class="row mb-4 justify-content-md-center">
    <div class="col-md-4 col-xs-12">
      <metric-card title='Total' :count='countAll' icon='icon' />
    </div>
  </div>

  <div class="row mb-4">
    <div class="col-md-4 col-xs-12">
      <metric-card title='Females' :count='countFemales' icon='icon' />
    </div>
    <div class="col-md-4 col-xs-12">
      <metric-card title='Males' :count='countMales' icon='icon' />
    </div>
    <div class="col-md-4 col-xs-12">
      <metric-card title='Avegare Age' :count='averageAge' icon='icon' />
    </div>
  </div>
  <div class="row">
    <div class="col-md-4 col-xs-12">
      <metric-card title='Accounting' :count='countHR' icon='icon' />
    </div>
    <div class="col-md-4 col-xs-12">
      <metric-card title='IT' :count='countIT' icon='icon' />
    </div>
    <div class="col-md-4 col-xs-12">
      <metric-card title='Marketing' :count='countMarketing' icon='icon' />
    </div>
  </div>

</template>

<script>
import MetricCard from '../components/MetricCard'
import axios from 'axios'

export default {
  name: 'Dashboard',
  components: {
    MetricCard
  },
  data(){
    return {
      countFemales: 0,
      countMales: 0,
      averageAge: 0,
      countHR: 0,
      countIT: 0,
      countMarketing: 0,
      countAll: 0,
    }
  },
  created(){
    axios.get(`http://localhost:3000/employees?sex=female`)
    .then(response => this.countFemales = response.data.length)

    axios.get(`http://localhost:3000/employees?sex=male`)
    .then(response => this.countMales = response.data.length)

    axios.get(`http://localhost:3000/employees?departmentId=1`)
    .then(response => this.countHR = response.data.length)

    axios.get(`http://localhost:3000/employees?departmentId=2`)
    .then(response => this.countIT = response.data.length)

    axios.get(`http://localhost:3000/employees?departmentId=3`)
    .then(response => this.countMarketing = response.data.length)

    axios.get(`http://localhost:3000/employees`)
    .then(response => {
      const ages = response.data.map(employee => Math.floor( (new Date() - new Date(employee.date_of_birth)) / (365 * 24 * 3600 * 1000) ))
      this.averageAge = Math.floor(ages.reduce((sum, age) => { return sum + age }, 0) / ages.length)
      this.countAll = ages.length;
    })
  }
}
</script>