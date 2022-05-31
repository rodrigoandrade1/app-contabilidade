<template>
  <div class="container ">
    <div class="row ">
      <div class="col-12 offset-lg-4 col-lg-4" style="margin-top: 8em">
        <div class="card ">
          <div class="card-header palette-2 text-white">
            Criar nova conta
          </div>
          <div class="card-body">
            <form @submit="register">
              <label for="username" class="form-label">Nome de usuário</label>
              <input type="text" v-model="username" class="form-control mb-3" id="username" required>

              <label for="business" class="form-label">Nome da empresa</label>
              <input type="text" v-model="business" class="form-control mb-3" id="business" required>

              <label for="email" class="form-label">Email</label>
              <input type="email" v-model="email" id="email" class="form-control mb-3" required>

              <label for="password" class="form-label">Senha</label>
              <input type="password" v-model="password" id="password" class="form-control mb-3" required>

              <label for="confirmpassword" class="form-label">Confirmar senha</label>
              <input type="password" v-model="confirmpassword" id="confirmpassword" class="form-control mb-3" required>

              <router-link to="login">Já tenho uma conta</router-link>

              <div class="d-flex justify-content-end">
                <button class="btn btn-primary" type="submit"><i class="fa-solid fa-user-plus"></i> Criar conta</button>
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
  name: 'RegisterView',
  data () {
    return {
      business: null,
      email: null,
      username: null,
      password: null,
      confirmpassword: null,
      alertText: null,
      alertClass: null
    }
  },
  methods: {
    async register (e) {
      e.preventDefault()
      const data = {
        business: this.business,
        email: this.email,
        username: this.username,
        password: this.password,
        confirmpassword: this.confirmpassword
      }

      axios.post('https://contabilidade-unit.herokuapp.com/auth/register', data)
        .then((response) => {
          this.$store.commit('authenticate', { token: response.data.token, userId: response.data.userId })
          this.alertText = response.data.msg
          this.alertClass = 'alert alert-success'
          this.$toast.open({ message: response.data.msg })

          setTimeout(() => {
            this.$router.push('/')
          }, 2000)
        })
        .catch((err) => {
          if (err.response) {
            this.alertText = err.response.data.error
            this.alertClass = 'alert alert-danger'
            this.$toast.open({ message: err.response.data.error, type: 'info' })

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
