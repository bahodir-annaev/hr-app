<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <div class="collapse navbar-collapse container">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link  to="/" class="nav-link">Dashboard</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/employees" class="nav-link">Employees</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header'
}
</script>