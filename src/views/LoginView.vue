<template>
  <div class="container ">
    <div class="row ">
      <div class="col-12 offset-lg-4 col-lg-5 mt-5">
        <div class="card ">
          <div class="card-header palette-2 text-white">
            Fazer login
          </div>
          <div class="card-body">
            <form @submit="login">

              <label for="username" class="form-label">Nome de usuário</label>
              <input type="text" class="form-control mb-3" v-model="username" required>

              <label for="password" class="form-label">Senha</label>
              <input type="password" class="form-control mb-3" v-model="password" required>

              <router-link to="registrar">Criar uma conta</router-link>

              <div class="d-flex justify-content-end">
                <button class="btn btn-primary" type="submit"><i class="fa-solid fa-right-to-bracket"></i> Fazer login</button>
              </div>

              <div v-if="alertText" :class="alertClass + ' mt-3'" role="alert">
                {{alertText}}
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LoginView',
  data () {
    return {
      username: null,
      password: null,
      alertClass: null,
      alertText: null
    }
  },
  methods: {
    async login (e) {
      e.preventDefault()
      const data = {
        username: this.username,
        password: this.password
      }

      axios.post('http://localhost:3000/auth/login', data)
        .then((response) => {
          console.log(response)
          this.$store.commit('authenticate', { token: response.data.token, userId: response.data.userId })
          this.alertText = response.data.msg
          this.alertClass = 'alert alert-success'
          setTimeout(() => {
            this.$router.push('/')
          }, 2000)
        })
        .catch((err) => {
          if (err.response) {
            this.alertText = err.response.data.error
            this.alertClass = 'alert alert-danger'

            setTimeout(() => {
              this.alertText = null
            }, 3000)
          } else {
            console.log(err)
          }
        })
    }
  }
}
</script>

<style>

</style>
