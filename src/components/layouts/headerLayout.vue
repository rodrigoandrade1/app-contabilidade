<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-5">
      <div class="container">
        <a class="navbar-brand" href="#">Nome</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Inicio</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Configurações</a>
            </li>
          </ul>
          <a class="navbar-text text-decoration-none" href="#">
            <i class="fa-solid fa-user"></i>
             Minha conta
          </a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'headerLayout'
}
</script>

<style>

</style>
