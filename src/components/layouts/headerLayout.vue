<template>
<div>
  <div class="container my-4">
    <div class="d-flex justify-content-between align-items-center rounded p-3 palette-1">
      <div>
        <span class="logo text-white me-5 d-none d-lg-inline"> {{ data.business }} </span>
        <router-link to="/" class="btn-outline-light btn me-2">Início</router-link>
        <router-link to="/ajuda" class="btn-outline-light btn me-2">Ajuda</router-link>
        <router-link to="/configuracoes" class="btn-outline-light btn me-2 d-lg-none"><i class="fa-solid fa-gears"></i></router-link>
        <router-link to="/configuracoes" class="btn-outline-light btn me-2 d-none d-lg-inline-block">Configurações</router-link>
      </div>
      <div>
        <div class="dropdown">
          <button class="btn btn-outline-light dropdown-toggle" data-bs-toggle="dropdown"><i class="fa-solid fa-user text-white"></i> {{data.username}}</button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a class="dropdown-item" href="" @click="logout">Sair</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div>
  </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'headerLayout',
  data () {
    return {
      data: []
    }
  },
  created () {
    this.getUserData()
  },
  methods: {
    logout (e) {
      e.preventDefault()
      this.$store.commit('logout')
      this.$router.push('/login')
      this.$toast.open({ message: 'Você saiu da sua conta!', type: 'info' })
    },
    async getUserData () {
      const token = this.$store.getters.token
      const headers = {
        headers: { Authorization: `Bearer ${token}` }
      }

      try {
        const res = await axios.get('https://contabilidade-unit.herokuapp.com/user/', headers)
        this.data = res.data.msg
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style>

</style>
