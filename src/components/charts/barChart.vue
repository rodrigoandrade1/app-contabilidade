<template>
  <div class="w-100">
    <div class="row">
      <div class="col-11 col-lg-11 col-xl-12">
        <vue3-chart-js v-bind="{ ...barChart }" />
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
    const barChart = {
      type: 'bar',
      options: {
        min: 0,
        max: 100,
        responsive: true,
        plugins: {
          legend: {
            position: 'none'
          }
        },
        scales: {
          y: {
            min: -100,
            max: 100,
            ticks: {
              callback: function (value) {
                return `${value}`
              }
            }
          }
        }
      },
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr'],
        datasets: [
          {
            label: '',
            backgroundColor: ['#1abc9c', '#f1c40f', '#2980b9', '#34495e'],
            data: [40, 20, 50, 10]
          },
          {
            label: '',
            backgroundColor: ['#2ecc71', '#e67e22', '#9b59b6', '#bdc3c7'],
            data: [-40, -20, -10, -10]
          }
        ]
      }
    }

    return {
      barChart
    }
  }
}
</script>
