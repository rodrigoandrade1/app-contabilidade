<template>
 <button @click="deselectRows">deselect rows</button>
 <ag-grid-vue
   class="ag-theme-alpine"
   style="height: 400px"
   :columnDefs="columnDefs.value"
   :rowData="rowData.value"
   :defaultColDef="defaultColDef"
   rowSelection="multiple"
   animateRows="true"
   @cell-clicked="cellWasClicked"
   @grid-ready="onGridReady"
 >
 </ag-grid-vue>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue3' // the AG Grid Vue Component
import { reactive, onMounted, ref } from 'vue'
import axios from 'axios'

import 'ag-grid-community/dist/styles/ag-grid.css' // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css' // Optional theme CSS

export default {
  name: 'App',
  components: {
    AgGridVue
  },
  setup () {
    const gridApi = ref(null) // Optional - for accessing Grid's API

    // Obtain API from grid's onGridReady event
    const onGridReady = (params) => {
      gridApi.value = params.api
    }

    let rowData = reactive({}) // Set rowData to Array of Objects, one Object per Row

    // Each Column Definition results in one Column.
    const columnDefs = reactive({
      value: [{ field: 'make' }, { field: 'model' }, { field: 'price' }]
    })

    // DefaultColDef sets props common to all Columns
    const defaultColDef = {
      sortable: true,
      filter: true
    }

    // Example load data from sever
    onMounted(async () => {
    //   fetch('https://www.ag-grid.com/example-assets/row-data.json')
    //     .then((result) => result.json())
    //     .then((remoteRowData) => (rowData.value = remoteRowData))
      const token = this.$store.getters.token
      const headers = {
        headers: { Authorization: `Bearer ${token}` }
      }

      try {
        const res = await axios.get('https://contabilidade-unit.herokuapp.com/transaction/receitas', headers)
        this.receitas = res.data.transactions
        rowData = rowData.value
      } catch (e) {
        console.error(e)
      }
    })

    return {
      onGridReady,
      columnDefs,
      rowData,
      defaultColDef,
      cellWasClicked: (event) => { // Example of consuming Grid Event
        console.log('cell was clicked', event)
      },
      deselectRows: e => {
        gridApi.value.deselectAll()
      }
    }
  }
}
</script>

<style lang="scss"></style>
