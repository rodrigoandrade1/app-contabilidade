<template>
  <div class="modal fade" id="novaReceita" tabindex="-1" aria-labelledby="novaReceitaModal" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-success text-light">
          <h5 class="modal-title" id="exampleModalLabel"><i class="fa-solid fa-plus"></i> Nova receita</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
        </div>
        <form @submit="novaReceita">
          <div class="modal-body">

            <label for="valorReceita">Valor da receita</label>
            <input type="number" step="0.01" min="0" class="form-control mb-3" id="valorReceita" v-model="valorReceita" >

            <label for="descricaoReceita">Descrição</label>
            <input type="text" class="form-control mb-3" id="descricaoReceita" v-model="descricaoReceita" >

            <label for="categoriaReceita">Categoria</label>
            <select class="form-select mb-3" name="" id="categoriaReceita" v-model="categoriaReceita" >
              <option v-for="category in categories" :key="category.id" :value="category.title">{{category.title}}</option>
              <option value="Outros">Outros</option>
            </select>

            <label for="dataReceita">Data</label>
            <input type="datetime-local" class="form-control mb-3" id="dataReceita" v-model="dataReceita" >

            <div v-if="alertText" :class="alertClass" role="alert">
              {{alertText}}
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="closemodal">Cancelar</button>
            <button type="submit" class="btn btn-success"><i class="fa-solid fa-plus"></i> Confirmar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'modalReceita',
  data () {
    return {
      valorReceita: null,
      descricaoReceita: null,
      categoriaReceita: null,
      dataReceita: null,
      alertText: null,
      alertClass: null,
      categories: []
    }
  },
  created () {
    this.getCategories()
  },
  methods: {
    async getCategories () {
      const token = this.$store.getters.token
      const headers = {
        headers: { Authorization: `Bearer ${token}` }
      }

      try {
        const res = await axios.get('https://contabilidade-unit.herokuapp.com/category', headers)
        this.categories = res.data.categories
      } catch (e) {
        console.error(e)
      }
    },
    async novaReceita (e) {
      e.preventDefault()

      if (this.dataReceita != null) {
        this.jsonDate = new Date(this.dataReceita)
      } else {
        this.jsonDate = new Date(Date.now())
      }

      const data = {
        value: this.valorReceita,
        description: this.descricaoReceita,
        category: this.categoriaReceita,
        date: this.jsonDate,
        type: 'Receita'
      }

      const token = this.$store.getters.token
      const headers = {
        headers: { Authorization: `Bearer ${token}` }
      }

      axios.post('https://contabilidade-unit.herokuapp.com/transaction/create', data, headers)
        .then((response) => {
          document.getElementById('closemodal').click()
          this.alertText = null
          this.valorReceita = null
          this.descricaoReceita = null
          this.categoriaReceita = null
          this.dataReceita = null
          this.$parent.getReceitas()
          this.$toast.open({ message: 'Nova receita adicionada com sucesso!' })
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
