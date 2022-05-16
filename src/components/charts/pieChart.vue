<template>
  <div style="height:177px;width:170px;">
    <vue3-chart-js v-bind="{ ...pieChart }"/>
  </div>
</template>

<script>
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'

export default {
  name: 'App',
  components: {
    Vue3ChartJs
  },
  setup () {
    const pieChart = {
      type: 'pie',
      data: {
        labels: ['Veículos', 'Funcionários'],
        datasets: [
          {
            backgroundColor: ['#41B883', '#DD1B16'],
            data: [40, 20]
          }
        ]
      }
    }

    return {
      pieChart
    }
  }
}
</script>
