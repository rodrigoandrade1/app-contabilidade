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
            <input type="number" class="form-control mb-3" id="valorReceita" v-model="valorReceita" >

            <label for="descricaoReceita">Descrição</label>
            <input type="text" class="form-control mb-3" id="descricaoReceita" v-model="descricaoReceita" >

            <label for="categoriaReceita">Categoria</label>
            <select class="form-select mb-3" name="" id="categoriaReceita" v-model="categoriaReceita" >
                <option select>Selecione uma categoria</option>
                <option value="Veiculos">Veiculos</option>
                <option value="Funcionários">Funcionários</option>
            </select>

            <label for="dataReceita">Data</label>
            <input type="date" class="form-control mb-3" id="dataReceita" v-model="dataReceita" >

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
      alertClass: null
    }
  },
  methods: {
    async novaReceita (e) {
      e.preventDefault()

      const data = {
        value: this.valorReceita,
        description: this.descricaoReceita,
        category: this.categoriaReceita,
        type: 'Receita'
      }

      const token = this.$store.getters.token
      const headers = {
        headers: { Authorization: `Bearer ${token}` }
      }

      axios.post('http://localhost:3000/transaction/create', data, headers)
        .then((response) => {
          document.getElementById('closemodal').click()
          this.alertText = null
          this.valorReceita = null
          this.descricaoReceita = null
          this.categoriaReceita = null
          this.$parent.getReceitas()
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
