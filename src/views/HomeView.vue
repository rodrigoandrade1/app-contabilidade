<template>
  <div>
    <header-layout/>
    <div class="container">
      <div class="row g-2">
        <div class="col-12 col-lg-6">
          <div class="row gx-2">
            <div class="col-7">
              <div class="card shadow">
                <div class="card-header palette-2 text-white">
                  Receitas desse mês
                </div>
                <div class="card-body">
                  <div class="chart-wrapper d-flex justify-content-center">
                    <barChart/>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-5">
              <div class="card shadow">
                <div class="card-header palette-2 text-white">
                  Despesas por categorias
                </div>
                <div class="card-body">
                  <div class="chart-wrapper d-flex justify-content-center">
                    <pieChart/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-6">
          <div class="card shadow">
            <div class="card-header palette-2 text-white">
              Estatísticas
            </div>
            <div class="card-body d-flex justify-content-around">
              <div>
                <div class="fw-bold">Saldo total</div>
                <div class="text-success">
                <i class="fa-solid fa-plus text-success"></i>
                R$ 19,700.00
                </div>
                <div class="text-danger">
                <i class="fa-solid fa-minus text-danger"></i>
                R$ 8,950.00</div>

                <hr>

                <div class="mt-3 fw-bold">Próximo mês</div>
                <div class="text-success">
                <i class="fa-solid fa-plus text-success"></i>
                R$ 15,700.00</div>
                <div class="text-danger">
                <i class="fa-solid fa-minus text-danger"></i>
                R$ 2,950.00</div>
              </div>
              <div>
                <div class="fw-bold">Mês Anterior</div>
                <div class="text-success">
                <i class="fa-solid fa-plus text-success"></i>
                R$ 19,700.00
                </div>
                <div class="text-danger">
                <i class="fa-solid fa-minus text-danger"></i>
                R$ 8,950.00</div>

                <hr>

                <div class="mt-3 fw-bold">Próximo mês</div>
                <div class="text-success">
                <i class="fa-solid fa-plus text-success"></i>
                R$ 15,700.00</div>
                <div class="text-danger">
                <i class="fa-solid fa-minus text-danger"></i>
                R$ 2,950.00</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-6">
          <div class="card shadow">
            <div class="card-header palette-2 text-white d-flex justify-content-between">
              <div>
                <i class="fa-solid fa-calendar-days"></i> Receitas
              </div>
              <button class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#novaReceita">+ Nova receita</button>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item" v-for="receita in receitas" :key="receita._id">
                <i class="fa-solid fa-plus text-success"></i>
                  {{receita.description}} <span class="fw-bold">|</span> {{receita.category}} <span class="fw-bold">|</span> {{receita.date}} <span class="fw-bold">|</span> <span class="text-success fw-bold">R${{receita.value}}</span>
              </li>
              <li class="list-group-item" v-if="receitas.length == 0">Nenhuma receita encontrada!</li>
            </ul>
            <nav aria-label="Page navigation example">
              <ul class="pagination justify-content-center mt-3 me-3">
                <li class="page-item disabled">
                  <a class="page-link"><i class="fa-solid fa-arrow-left"></i></a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                  <a class="page-link" href="#"><i class="fa-solid fa-arrow-right"></i></a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <modalReceita/>

        <div class="col-12 col-lg-6">
          <div class="card shadow">
            <div class="card-header palette-2 text-white d-flex justify-content-between">
              <div>
                <i class="fa-solid fa-circle-minus"></i>
              Despesas
              </div>
              <button class="btn-danger btn btn-sm" data-bs-toggle="modal" data-bs-target="#novaDespesa">- Nova despesa</button>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item" v-for="despesa in despesas" :key="despesa._id">
              <i class="fa-solid fa-minus text-danger"></i>
              {{despesa.description}} <span class="fw-bold">|</span> {{despesa.category}} <span class="fw-bold">|</span> {{despesa.date}} <span class="fw-bold">|</span> <span class="text-danger fw-bold">{{despesa.value}}</span>
              </li>
              <li class="list-group-item" v-if="despesas.length == 0">Nenhuma despesa encontrada!</li>
            </ul>
            <nav aria-label="Page navigation example">
              <ul class="pagination justify-content-center mt-3 me-3">
                <li class="page-item disabled">
                  <a class="page-link"><i class="fa-solid fa-arrow-left"></i></a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                  <a class="page-link" href="#"><i class="fa-solid fa-arrow-right"></i></a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <modal-despesa/>

      </div>
    </div>
  </div>
</template>

<script>
import barChart from '../components/charts/barChart.vue'
import pieChart from '../components/charts/pieChart.vue'
import modalReceita from '@/components/modalReceita.vue'
import modalDespesa from '@/components/modalDespesa.vue'
import headerLayout from '@/components/layouts/headerLayout.vue'

import axios from 'axios'

export default {
  name: 'HomeView',
  components: {
    barChart,
    pieChart,
    headerLayout,
    modalReceita,
    modalDespesa
  },
  data () {
    return {
      receitas: [],
      despesas: []
    }
  },
  created () {
    this.getReceitas()
    this.getDespesas()
  },
  methods: {
    async getReceitas () {
      const token = this.$store.getters.token
      const headers = {
        headers: { Authorization: `Bearer ${token}` }
      }

      try {
        const res = await axios.get('http://localhost:3000/transaction/receitas', headers)
        this.receitas = res.data.transactions
      } catch (e) {
        console.error(e)
      }
    },
    async getDespesas () {
      const token = this.$store.getters.token
      const headers = {
        headers: { Authorization: `Bearer ${token}` }
      }

      try {
        const res = await axios.get('http://localhost:3000/transaction/despesas', headers)
        this.despesas = res.data.transactions
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style>
body{
  background-color: #ede7e3 !important;
}

.palette-1{
  background-color: #16697a !important;
}

.palette-2{
  background-color: #489fb5 !important;
}

.palette-3{
  background-color: #82c0cc !important;
}

.palette-4{
  background-color: #ede7e3 !important;
}

.palette-5{
  background-color: #ffa62b !important;
}

</style>
