<template>
  <div class="modal fade" id="novaDespesa" tabindex="-1" aria-labelledby="novaDespesaModal" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-danger text-light">
          <h5 class="modal-title" id="exampleModalLabel"><i class="fa-solid fa-minus"></i> Nova despesa</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
        </div>
        <form @submit="novaDespesa">
          <div class="modal-body">

            <label for="valorDespesa">Valor da despesa</label>
            <input type="number" step="0.01" min="0" class="form-control mb-3" id="valorDespesa" v-model="valorDespesa" >

            <label for="descricaoDespesa">Descrição</label>
            <input type="text" class="form-control mb-3" id="descricaoDespesa" v-model="descricaoDespesa" >

            <label for="categoriaDespesa">Categoria</label>
            <select class="form-select mb-3" name="" id="categoriaDespesa" v-model="categoriaDespesa" >
              <option v-for="category in categories" :key="category.id" :value="category.title">{{category.title}}</option>
              <option value="Outros">Outros</option>
            </select>

            <label for="dataDespesa">Data</label>
            <input type="datetime-local" class="form-control mb-3" id="dataDespesa" v-model="dataDespesa" >

            <div v-if="alertText" :class="alertClass" role="alert">
              {{alertText}}
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="closemodalD">Cancelar</button>
            <button type="submit" class="btn btn-danger"><i class="fa-solid fa-minus"></i> Confirmar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'modalDespesa',
  data () {
    return {
      valorDespesa: null,
      descricaoDespesa: null,
      categoriaDespesa: null,
      dataDespesa: null,
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
    async novaDespesa (e) {
      e.preventDefault()

      if (this.dataDespesa != null) {
        this.jsonDate = new Date(this.dataDespesa)
      } else {
        this.jsonDate = new Date(Date.now())
      }

      const data = {
        value: this.valorDespesa,
        description: this.descricaoDespesa,
        category: this.categoriaDespesa,
        date: this.jsonDate,
        type: 'Despesa'
      }

      const token = this.$store.getters.token
      const headers = {
        headers: { Authorization: `Bearer ${token}` }
      }

      axios.post('https://contabilidade-unit.herokuapp.com/transaction/create', data, headers)
        .then((response) => {
          document.getElementById('closemodalD').click()
          this.alertText = null
          this.valorDespesa = null
          this.descricaoDespesa = null
          this.categoriaDespesa = null
          this.dataDespesa = null
          this.$parent.getDespesas()
          this.$toast.open({ message: 'Nova despesa adicionada com sucesso!', type: 'info' })
          this.$parent.updateChart()
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
