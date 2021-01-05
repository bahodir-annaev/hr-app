<template>
  <div class="modal modal-active show">
      <div class="alert alert-danger" v-if="error.show">
        {{error.message}}
        <button type="button" @click="this.error.show = false" class="close"><span >&times;</span></button>
      </div>
			<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h4 class="modal-title">
								Edit Employee
							</h4>
              <button type="button" @click="closeCallback(false)" class="close"><span >&times;</span></button>
						</div>
						<div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="fullname">Full name</label>
                  <input type="text" class="form-control" placeholder="Full name" v-model="name" id="fullname"/>
                </div>

                <div class="form-group">
                  <label for="department">Department</label>
                  <select class="form-control" v-model="departmentId" id="department">
                    <option disabled value="">Department</option>
                    <option v-for="dep in deps" v-bind:key="dep.id" v-bind:value="dep.id">{{dep.name}}</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="position">Position</label>
                  <input type="text" class="form-control" placeholder="Position" v-model="position" id="position"/>
                </div>

                <div class="form-group">
                  <div>Gender</div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="genderRadio" id="genderMale" value="male" v-model="sex">
                    <label class="form-check-label" for="genderMale">
                      Male
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="genderRadio" id="genderFemale" value="female" v-model="sex">
                    <label class="form-check-label" for="genderFemale">
                      Female
                    </label>
                  </div>
                </div>

                <div class="form-group">
                  <label for="dateOfBirth">Date of birth</label>
                  <input type="date" class="form-control" placeholder="Date of birth" v-model="date_of_birth" id="dateOfBirth"/>
                </div>

              </form>
            </div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default" @click="closeCallback(false)">Close</button>
							<button type="button" class="btn btn-primary" @click="save">Save changes</button>
						</div>
				</div>
			</div>
		</div>
    <div class="modal-backdrop fade show"></div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'EmployeeEdit',
  props: {
    employee: Object,
    closeCallback: Function
  },
  data(){
    let data = {
      id: undefined,
      name: undefined,
      position: undefined,
      department: undefined,
      sex: 'female',
      date_of_birth: undefined,
      deps: [],
      error: {
        show: false,
        message: ''
      }
    }

    data = Object.assign({}, data, this.employee);

    return data;
  },
  created(){
    axios.get(`http://localhost:3000/departments`)
    .then(response => this.deps = response.data)
  },
  methods: {
    save() {
      if(typeof this.id === 'undefined'){
        axios.post(`http://localhost:3000/employees`, {
          id: new Date().getTime(),
          name: this.name,
          position: this.position,
          departmentId: this.department,
          sex: this.sex,
          date_of_birth: this.date_of_birth
        })
        .then(() => this.closeCallback(true))
        .catch(error => this.showMessage(error.message))
      }
      else{
        axios.put(`http://localhost:3000/employees/${this.id}`, {
          id: this.id,
          name: this.name,
          position: this.position,
          departmentId: this.departmentId,
          sex: this.sex,
          date_of_birth: this.date_of_birth
        })
        .then(() => this.closeCallback(true))
        .catch(error => this.showMessage(error.message))
      }
    },
    showMessage(message){
      this.error.show = true;
      this.error.message = message;
    }
  }
}
</script>

<style scoped>
  .modal-active{
    display: block;
  }
</style>