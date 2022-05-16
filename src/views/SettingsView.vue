<template>
  <div>
    <header-layout/>
    <div class="container">
      <div class="row">
        <div class="col-4">
          <div class="card">
            <div class="card-header palette-2 text-white">
              Configurações da empresa
            </div>
            <div class="card-body">
              <label for="name" class="form-label">Nome da empresa</label>
              <input type="text" class="form-control mb-3" id="name">

              <div class="d-flex justify-content-end">
                <button class="btn btn-primary btn-sm">Alterar</button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="card">
            <div class="card-header palette-2 text-white">
              Nova categoria
            </div>
            <div class="card-body">
              <label for="name" class="form-label">Nome da categoria</label>
              <input type="text" class="form-control mb-3" id="name">
              <div class="d-flex justify-content-end">
                <button class="btn btn-primary btn-sm">Adicionar categoria</button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="card">
            <div class="card-header palette-2 text-white">
              Alterar senha
            </div>
            <div class="card-body">
              <label for="name" class="form-label">Senha atual</label>
              <input type="text" class="form-control mb-3" id="name">

              <label for="name" class="form-label">Nova senha</label>
              <input type="text" class="form-control mb-3" id="name">

              <div class="d-flex justify-content-end">
                <button class="btn btn-primary btn-sm">Confirmar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerLayout from '@/components/layouts/headerLayout.vue'

export default {
  name: 'SettingsView',
  components: {
    headerLayout
  }
}
</script>

<style>

</style>
