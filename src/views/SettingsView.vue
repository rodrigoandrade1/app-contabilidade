<template>
  <div>
    <header-layout/>
    <div class="container">
      <div class="row g-3">
        <div class="col-12 col-lg-4">
          <div class="card">
            <div class="card-header palette-2 text-white">
              Configurações da empresa
            </div>
            <div class="card-body">
              <form @submit="updateBusiness">
                <label for="name" class="form-label">Nome da empresa</label>
                <input type="text" v-model="business" class="form-control mb-3" id="name">

                <div class="d-flex justify-content-end">
                  <button class="btn btn-primary btn-sm" type="submit">Alterar</button>
                </div>

                <div v-if="businessAlertText" :class="businessAlertClass + ' mt-2' " role="alert">
                  {{businessAlertText}}
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-4">
          <div class="card">
            <div class="card-header palette-2 text-white">
              Nova categoria
            </div>
            <div class="card-body">
              <form @submit="createCategory">
                <label for="title" class="form-label">Nome da categoria</label>
                <input type="text" v-model="title" class="form-control mb-3" id="title">
                <div class="d-flex justify-content-end">
                  <button class="btn btn-primary btn-sm">Adicionar categoria</button>
                </div>
              </form>
              <div v-if="categoryAlertText" :class="categoryAlertClass + ' mt-2' " role="alert">
                {{categoryAlertText}}
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-4">
          <div class="card">
            <div class="card-header palette-2 text-white">
              Alterar senha
            </div>
            <div class="card-body">
              <form @submit="updateBusiness">
                <label for="name" class="form-label">Senha atual</label>
                <input type="text" class="form-control mb-3" id="name" v-model="senhaAtual">

                <label for="name" class="form-label">Nova senha</label>
                <input type="text" class="form-control mb-3" id="name" v-model="novaSenha">

                <div class="d-flex justify-content-end">
                  <button class="btn btn-primary btn-sm" type="submit">Confirmar</button>
                </div>

                <div v-if="businessAlertText" :class="businessAlertClass + ' mt-2' " role="alert">
                {{businessAlertText}}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerLayout from '@/components/layouts/headerLayout.vue'
import axios from 'axios'

export default {
  name: 'SettingsView',
  components: {
    headerLayout
  },
  data () {
    return {
      data: [],
      title: null,
      categoryAlertText: null,
      categoryAlertClass: null,
      businessAlertText: null,
      businessAlertClass: null,
      business: null
    }
  },
  created () {
    this.getUserData()
  },
  methods: {
    async getUserData () {
      const token = this.$store.getters.token
      const headers = {
        headers: { Authorization: `Bearer ${token}` }
      }

      try {
        const res = await axios.get('https://contabilidade-unit.herokuapp.com/user/', headers)
        this.data = res.data.msg
        this.business = this.data.business
      } catch (e) {
        console.error(e)
      }
    },
    async updateBusiness (e) {
      e.preventDefault()

      const data = {
        business: this.business
      }

      const token = this.$store.getters.token
      const headers = {
        headers: { Authorization: `Bearer ${token}` }
      }

      axios.put('https://contabilidade-unit.herokuapp.com/auth/business', data, headers)
        .then((response) => {
          this.categoryAlertText = response.data.msg
          this.categoryAlertClass = 'alert alert-success'

          setTimeout(() => {
            this.categoryAlertText = null
          }, 3000)
        })
        .catch((err) => {
          if (err.response) {
            this.categoryAlertText = err.response.data.error
            this.categoryAlertClass = 'alert alert-danger'

            setTimeout(() => {
              this.categoryAlertText = null
            }, 3000)
          } else {
            console.log(err)
          }
        })
    },
    async createCategory (e) {
      e.preventDefault()

      const data = {
        title: this.title
      }

      const token = this.$store.getters.token
      const headers = {
        headers: { Authorization: `Bearer ${token}` }
      }

      axios.post('https://contabilidade-unit.herokuapp.com/category/create', data, headers)
        .then((response) => {
          this.title = null
          this.categoryAlertText = response.data.msg
          this.categoryAlertClass = 'alert alert-success'

          setTimeout(() => {
            this.categoryAlertText = null
          }, 3000)
        })
        .catch((err) => {
          if (err.response) {
            this.categoryAlertText = err.response.data.error
            this.categoryAlertClass = 'alert alert-danger'

            setTimeout(() => {
              this.categoryAlertText = null
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
