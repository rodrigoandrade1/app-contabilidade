<template>
    <div>
      <ag-charts-vue :options="options"></ag-charts-vue>
    </div>
</template>
<script>
import { AgChartsVue } from 'ag-charts-vue3'
import axios from 'axios'
export default {
  data () {
    return {
      options: null,
      receitasJan: 0,
      receitasFev: 0,
      receitasMar: 0,
      receitasAbr: 0,
      receitasMai: 0,
      receitasJun: 0,
      receitasJul: 0,
      receitasAgo: 0,
      receitasSet: 0,
      receitasOut: 0,
      receitasNov: 0,
      receitasDez: 0,
      despesasJan: 0,
      despesasFev: 0,
      despesasMar: 0,
      despesasAbr: 0,
      despesasMai: 0,
      despesasJun: 0,
      despesasJul: 0,
      despesasAgo: 0,
      despesasSet: 0,
      despesasOut: 0,
      despesasNov: 0,
      despesasDez: 0
    }
  },
  components: {
    AgChartsVue
  },
  mounted () {
    this.getReceitas()
    this.getDespesas()
  },
  created () {
    this.options = {
      autoSize: true,
      data: this.getData(),
      theme: {
        palette: {
          fills: [
            '#4be609',
            '#e60926'
          ],
          strokes: [
            '#16697a',
            '#16697a'
          ]
        },
        overrides: {
          area: {
            series: {
              marker: { enabled: true },
              highlightStyle: {
                series: {
                  dimOpacity: 0.2
                }
              }
            }
          }
        }
      },
      title: {
        text: 'Movimentação total de receitas e despesas',
        fontSize: 15
      },
      series: [
        { type: 'area', xKey: 'date', stacked: true, yKey: 'Receitas' },
        { type: 'area', xKey: 'date', stacked: true, yKey: 'Despesas' }
      ],
      axes: [
        {
          type: 'time',
          position: 'bottom',
          label: {
            format: '%b'
          }
        },
        {
          type: 'number',
          position: 'left',
          label: {
            formatter: (params) => {
              return params.value
            }
          }
        }
      ],
      legend: {
        position: 'bottom'
      }
    }
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
        this.receitasJan = 0
        this.receitasFev = 0
        this.receitasMar = 0

        this.receitas.forEach(e => {
          const receitaDespesa = new Date(e.date)
          console.log(receitaDespesa.getMonth())
          if (receitaDespesa.getMonth() === 0) {
            this.receitasJan += e.value
          } else if (receitaDespesa.getMonth() === 1) {
            this.receitasFev += e.value
          } else if (receitaDespesa.getMonth() === 2) {
            this.receitasMar += e.value
          } else if (receitaDespesa.getMonth() === 3) {
            this.receitasAbr += e.value
          } else if (receitaDespesa.getMonth() === 4) {
            this.receitasMai += e.value
          } else if (receitaDespesa.getMonth() === 5) {
            this.receitasJun += e.value
          } else if (receitaDespesa.getMonth() === 6) {
            this.receitasJul += e.value
          } else if (receitaDespesa.getMonth() === 7) {
            this.receitasAgo += e.value
          } else if (receitaDespesa.getMonth() === 8) {
            this.receitasSet += e.value
          } else if (receitaDespesa.getMonth() === 9) {
            this.receitasOut += e.value
          } else if (receitaDespesa.getMonth() === 10) {
            this.receitasNov += e.value
          } else if (receitaDespesa.getMonth() === 11) {
            this.receitasDez += e.value
          }
          this.options.data = this.getData()
        })
      } catch (e) {
        console.error(e)
      }
    },
    updateChart () {
      this.getReceitas()
      this.getDespesas()
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

        this.despesas.forEach(e => {
          const receitaDespesa = new Date(e.date)
          if (receitaDespesa.getMonth() === 0) {
            this.despesasJan += e.value
          } else if (receitaDespesa.getMonth() === 1) {
            this.despesasFev += e.value
          } else if (receitaDespesa.getMonth() === 2) {
            this.despesasMar += e.value
          } else if (receitaDespesa.getMonth() === 3) {
            this.despesasAbr += e.value
          } else if (receitaDespesa.getMonth() === 4) {
            this.despesasMai += e.value
          } else if (receitaDespesa.getMonth() === 5) {
            this.despesasJun += e.value
          } else if (receitaDespesa.getMonth() === 6) {
            this.despesasJul += e.value
          } else if (receitaDespesa.getMonth() === 7) {
            this.despesasAgo += e.value
          } else if (receitaDespesa.getMonth() === 8) {
            this.despesasSet += e.value
          } else if (receitaDespesa.getMonth() === 9) {
            this.despesasOut += e.value
          } else if (receitaDespesa.getMonth() === 10) {
            this.despesasNov += e.value
          } else if (receitaDespesa.getMonth() === 11) {
            this.despesasDez += e.value
          }
          this.options.data = this.getData()
        })
      } catch (e) {
        console.error(e)
      }
    },
    getData () {
      return [
        {
          date: new Date(2022, 0, 1),
          Receitas: this.receitasJan,
          Despesas: this.despesasJan
        },
        {
          date: new Date(2022, 1, 1),
          Receitas: this.receitasFev,
          Despesas: this.despesasFev
        },
        {
          date: new Date(2022, 2, 1),
          Receitas: this.receitasMar,
          Despesas: this.despesasMar
        },
        {
          date: new Date(2022, 3, 1),
          Receitas: this.receitasAbr,
          Despesas: this.despesasAbr
        },
        {
          date: new Date(2022, 4, 1),
          Receitas: this.receitasMai,
          Despesas: this.despesasMai
        },
        {
          date: new Date(2022, 5, 1),
          Receitas: this.receitasJun,
          Despesas: this.despesasJun
        },
        {
          date: new Date(2022, 6, 1),
          Receitas: this.receitasJul,
          Despesas: this.despesasJul
        },
        {
          date: new Date(2022, 7, 1),
          Receitas: this.receitasAgo,
          Despesas: this.despesasAgo
        },
        {
          date: new Date(2022, 8, 1),
          Receitas: this.receitasSet,
          Despesas: this.despesasSet
        },
        {
          date: new Date(2022, 9, 1),
          Receitas: this.receitasOut,
          Despesas: this.despesasOut
        },
        {
          date: new Date(2022, 10, 1),
          Receitas: this.receitasNov,
          Despesas: this.despesasNov
        },
        {
          date: new Date(2022, 11, 1),
          Receitas: this.receitasDez,
          Despesas: this.despesasDez
        }
      ]
    }
  },
  beforeMount () {
  }
}
</script>
