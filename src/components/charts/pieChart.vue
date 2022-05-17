<template>
  <div class="w-75">
    <div class="row">
      <div class="col-11 col-lg-11 col-xl-12">
        <vue3-chart-js v-bind="{ ...pieChart }"/>
      </div>
    </div>
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
