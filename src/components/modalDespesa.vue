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
            <input type="number" class="form-control mb-3" id="valorDespesa" v-model="valorDespesa" >

            <label for="descricaoDespesa">Descrição</label>
            <input type="text" class="form-control mb-3" id="descricaoDespesa" v-model="descricaoDespesa" >

            <label for="categoriaDespesa">Categoria</label>
            <select class="form-select mb-3" name="" id="categoriaDespesa" v-model="categoriaDespesa" >
                <option select>Selecione uma categoria</option>
                <option value="Veiculos">Veiculos</option>
                <option value="Funcionários">Funcionários</option>
            </select>

            <label for="dataDespesa">Data</label>
            <input type="date" class="form-control mb-3" id="dataDespesa" v-model="dataDespesa" >

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
      alertClass: null
    }
  },
  methods: {
    async novaDespesa (e) {
      e.preventDefault()

      const data = {
        value: this.valorDespesa,
        description: this.descricaoDespesa,
        category: this.categoriaDespesa,
        type: 'Despesa'
      }

      const token = this.$store.getters.token
      const headers = {
        headers: { Authorization: `Bearer ${token}` }
      }

      axios.post('http://localhost:3000/transaction/create', data, headers)
        .then((response) => {
          document.getElementById('closemodalD').click()
          this.alertText = null
          this.valorDespesa = null
          this.descricaoDespesa = null
          this.categoriaDespesa = null
          this.$parent.getDespesas()
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
