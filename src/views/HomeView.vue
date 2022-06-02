<template>
  <div>
    <header-layout/>
    <div class="container">
      <div class="row g-2">
        <div class="col-12 col-lg-6 order-1">
          <div class="row g-2">
            <div class="col-12 col-lg-12">
              <div class="card shadow">
                <div class="card-header palette-2 text-white">
                  Receitas/Despesas do ano
                </div>
                <div class="card-body">
                  <div class="chart-wrapper d-flex justify-content-center align-items-center pb-2">
                    <barChart style="width: 100%" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-6 order-2">
          <div class="card shadow">
            <div class="card-header palette-2 text-white">
              Estatísticas
            </div>
            <div class="card-body d-flex justify-content-around align-items-center" style="min-height: 340px">
              <div>
                <div class="fw-bold">Receitas hoje</div>
                <div class="text-success">
                <i class="fa-solid fa-plus text-success"></i>
                R$ {{receitasHoje}}
                </div>
                <hr>
                <div class="mt-3 fw-bold">Despesas hoje</div>
                <div class="text-danger">
                <i class="fa-solid fa-minus text-danger"></i>
                R$ {{despesasHoje}}</div>
              </div>
              <div>
                <div class="fw-bold">Receitas mês</div>
                <div class="text-success">
                <i class="fa-solid fa-plus text-success"></i>
                R$ {{receitasMes}}
                </div>
                <hr>
                <div class="mt-3 fw-bold">Despesas mês</div>
                <div class="text-danger">
                <i class="fa-solid fa-minus text-danger"></i>
                R$ {{despesasMes}}</div>
              </div>
              <div>
                <div class="fw-bold">Receitas totais</div>
                <div class="text-success">
                <i class="fa-solid fa-plus text-success"></i>
                R$ {{receitasTotal}}
                </div>
                <hr>
                <div class="mt-3 fw-bold">Despesas totais</div>
                <div class="text-danger">
                <i class="fa-solid fa-minus text-danger"></i>
                R$ {{despesasTotal}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-6">
          <div class="card shadow" style="max-height: 400px;overflow-y: auto;">
            <div class="card-header palette-2 text-white d-flex justify-content-between sticky-top">
              <div>
                <i class="fa-solid fa-calendar-days"></i> Receitas
              </div>
              <button class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#novaReceita">+ Nova receita</button>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item" v-for="receita in receitas.slice().reverse()" :key="receita._id">
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
            <!-- <nav aria-label="Page navigation example">
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
            </nav> -->
          </div>
        </div>

        <modalReceita/>

        <div class="col-12 col-lg-6" >
          <div class="card shadow" style="max-height: 400px;overflow-y: auto;">
            <div class="card-header palette-2 text-white d-flex justify-content-between sticky-top">
              <div>
                <i class="fa-solid fa-circle-minus"></i>
              Despesas
              </div>
              <button class="btn-danger btn btn-sm" data-bs-toggle="modal" data-bs-target="#novaDespesa">- Nova despesa</button>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item" v-for="despesa in despesas.slice().reverse()" :key="despesa._id">
                <i class="fa-solid fa-minus text-danger"></i>

                <span class="text-minus fw-bold text-danger">
                  R${{despesa.value}}</span> |

                  {{despesa.category}} |

                  {{getFormatedData(despesa.date)}}

                  <div class="ms-3">
                    <span class="fw-bold" style="font-size: .8em">{{despesa.description}}</span>
                  </div>
              </li>
              <li class="list-group-item" v-if="despesas.length == 0">Nenhuma despesa encontrada!</li>
            </ul>
            <!-- <nav aria-label="Page navigation example">
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
            </nav> -->
          </div>
        </div>

        <modal-despesa/>

      </div>
    </div>
  </div>
</template>

<script>
import barChart from '../components/charts/barChart.vue'
import modalReceita from '@/components/modalReceita.vue'
import modalDespesa from '@/components/modalDespesa.vue'
import headerLayout from '@/components/layouts/headerLayout.vue'

import axios from 'axios'

export default {
  name: 'HomeView',
  components: {
    barChart,
    headerLayout,
    modalReceita,
    modalDespesa
  },
  data () {
    return {
      receitas: [],
      despesas: [],
      receitasTotal: 0,
      despesasTotal: 0,
      receitasHoje: 0,
      despesasHoje: 0,
      receitasMes: 0,
      despesasMes: 0
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
        this.receitasTotal = 0
        this.receitasHoje = 0
        this.receitasMes = 0
        const dataAtual = new Date()

        this.receitas.forEach(e => {
          this.receitasTotal += e.value
          const dataReceita = new Date(e.date)
          if ((dataReceita.getDate() === dataAtual.getDate()) && (dataReceita.getMonth() === dataAtual.getMonth()) && (dataReceita.getFullYear() === dataAtual.getFullYear())) {
            this.receitasHoje += e.value
          }

          if ((dataReceita.getMonth() === dataAtual.getMonth()) && (dataReceita.getFullYear() === dataAtual.getFullYear())) {
            this.receitasMes += e.value
          }
        })
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
        this.despesasTotal = 0
        this.despesasHoje = 0
        this.despesasMes = 0
        const dataAtual = new Date()

        this.despesas.forEach(e => {
          this.despesasTotal += e.value
          const dataDespesa = new Date(e.date)
          if ((dataDespesa.getDate() === dataAtual.getDate()) && (dataDespesa.getMonth() === dataAtual.getMonth()) && (dataDespesa.getFullYear() === dataAtual.getFullYear())) {
            this.despesasHoje += e.value
          }
          if ((dataDespesa.getMonth() === dataAtual.getMonth()) && (dataDespesa.getFullYear() === dataAtual.getFullYear())) {
            this.despesasMes += e.value
          }
        })
      } catch (e) {
        console.error(e)
      }
    },
    getFormatedData (date) {
      const data = new Date(date)
      return (data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear() + ' - ' + (('0' + data.getHours()).slice(-2)) + ':' + (('0' + data.getMinutes()).slice(-2)))
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
