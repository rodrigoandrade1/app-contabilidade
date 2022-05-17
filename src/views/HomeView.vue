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
                  <div class="chart-wrapper d-flex justify-content-center align-items-center" style="max-height: 180px; min-height: 180px">
                    <barChart/>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-5">
              <div class="card shadow">
                <div class="card-header palette-2 text-white text-nowrap" >
                  <span style="font-size: .93em">Despesas por categorias</span>
                </div>
                <div class="card-body">
                  <div class="chart-wrapper d-flex justify-content-center align-items-center" style="max-height: 180px; min-height: 180px">
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
            <div class="card-body d-flex justify-content-around align-items-center" style="min-height: 212px">
              <div>
                <div class="fw-bold">Receitas hoje</div>
                <div class="text-success">
                <i class="fa-solid fa-plus text-success"></i>
                R$ 19,700.00
                </div>
                <hr>
                <div class="mt-3 fw-bold">Despesas hoje</div>
                <div class="text-danger">
                <i class="fa-solid fa-minus text-danger"></i>
                R$ 2,950.00</div>
              </div>
              <div>
                <div class="fw-bold">Receita últimos 30 dias</div>
                <div class="text-success">
                <i class="fa-solid fa-plus text-success"></i>
                R$ 19,700.00
                </div>

                <hr>

                <div class="mt-3 fw-bold">Despesa últimos 30 dias</div>
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

                <span class="text-success fw-bold">
                  R${{receita.value}}</span> |

                  {{receita.category}} |

                  {{getFormatedData(receita.date)}}

                  <div class="ms-3">
                    <span class="fw-bold" style="font-size: .8em">{{receita.description}}</span>
                  </div>

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
              {{despesa.description}} <span class="fw-bold">|</span> {{despesa.category}} <span class="fw-bold">|</span> {{getFormatedData(despesa.date)}} <span class="fw-bold">|</span> <span class="text-danger fw-bold">R${{despesa.value}}</span>
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
        const res = await axios.get('https://contabilidade-unit.herokuapp.com/transaction/receitas', headers)
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
        const res = await axios.get('https://contabilidade-unit.herokuapp.com/transaction/despesas', headers)
        this.despesas = res.data.transactions
      } catch (e) {
        console.error(e)
      }
    },
    getFormatedData (date) {
      const data = new Date(date)
      return (data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear() + ' - ' + data.getHours() + ':' + data.getMinutes())
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
