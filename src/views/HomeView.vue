<template>
  <div class="container">
    <div class="row g-3">
      <div class="col-12 col-lg-6">
        <div class="row gx-2">
          <div class="col-6">
            <div class="card shadow">
              <div class="card-header bg-secondary text-white">
                Receitas desse mês
              </div>
              <div class="card-body">
                R$26.100,00
                <canvas id="receitas">
                  <!-- <doughnut-ready-chart/> -->
                </canvas>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="card shadow">
              <div class="card-header bg-secondary text-white">
                Despesas desse mês
              </div>
              <div class="card-body">
                R$4,200.00
                <canvas id="despesas"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-6">
        <div class="card shadow" style="padding-bottom: 19px">
          <div class="card-header bg-secondary text-white">
            Estatísticas
          </div>
          <div class="card-body">
            <div class="fw-bold">Mês Anterior</div>
            <div class="text-success">
            <i class="fa-solid fa-plus text-success"></i>
            R$ 19,700.00
            </div>
            <div class="text-danger">
            <i class="fa-solid fa-minus text-danger"></i>
            R$ 8,950.00</div>

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
      <div class="col-12 col-lg-6">
        <div class="card shadow">
          <div class="card-header bg-info text-white">
            <i class="fa-solid fa-calendar-days"></i> Receitas
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
            <i class="fa-solid fa-plus text-success"></i>
            Bateria do carro <span class="fw-bold">|</span> Veículos <span class="fw-bold">|</span> 12/05/2022 <span class="fw-bold">|</span> <span class="text-success fw-bold">R$250,30</span>
            </li>
            <li class="list-group-item">
            <i class="fa-solid fa-plus text-success"></i>
            Bateria do carro <span class="fw-bold">|</span> Veículos <span class="fw-bold">|</span> 12/05/2022 <span class="fw-bold">|</span> <span class="text-success fw-bold">R$250,30</span>
            </li>
            <li class="list-group-item">
            <i class="fa-solid fa-plus text-success"></i>
            Bateria do carro <span class="fw-bold">|</span> Veículos <span class="fw-bold">|</span> 12/05/2022 <span class="fw-bold">|</span> <span class="text-success fw-bold">R$250,30</span>
            </li>
            <li class="list-group-item">
            <i class="fa-solid fa-plus text-success"></i>
            Bateria do carro <span class="fw-bold">|</span> Veículos <span class="fw-bold">|</span> 12/05/2022 <span class="fw-bold">|</span> <span class="text-success fw-bold">R$250,30</span>
            </li>
            <li class="list-group-item">
            <i class="fa-solid fa-plus text-success"></i>
            Bateria do carro <span class="fw-bold">|</span> Veículos <span class="fw-bold">|</span> 12/05/2022 <span class="fw-bold">|</span> <span class="text-success fw-bold">R$250,30</span>
            </li>
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
      <div class="col-12 col-lg-6">
        <div class="card shadow">
          <div class="card-header bg-warning">
            <i class="fa-solid fa-circle-minus text-danger"></i>
            Despesas
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
            <i class="fa-solid fa-minus text-danger"></i>
            Bateria do carro <span class="fw-bold">|</span> Veículos <span class="fw-bold">|</span> 12/05/2022 <span class="fw-bold">|</span> <span class="text-danger fw-bold">R$250,30</span>
            </li>
            <li class="list-group-item">
            <i class="fa-solid fa-minus text-danger"></i>
            Bateria do carro <span class="fw-bold">|</span> Veículos <span class="fw-bold">|</span> 12/05/2022 <span class="fw-bold">|</span> <span class="text-danger fw-bold">R$250,30</span>
            </li>
            <li class="list-group-item">
            <i class="fa-solid fa-minus text-danger"></i>
            Bateria do carro <span class="fw-bold">|</span> Veículos <span class="fw-bold">|</span> 12/05/2022 <span class="fw-bold">|</span> <span class="text-danger fw-bold">R$250,30</span>
            </li>
            <li class="list-group-item">
            <i class="fa-solid fa-minus text-danger"></i>
            Bateria do carro <span class="fw-bold">|</span> Veículos <span class="fw-bold">|</span> 12/05/2022 <span class="fw-bold">|</span> <span class="text-danger fw-bold">R$250,30</span>
            </li>
            <li class="list-group-item">
            <i class="fa-solid fa-minus text-danger"></i>
            Bateria do carro <span class="fw-bold">|</span> Veículos <span class="fw-bold">|</span> 12/05/2022 <span class="fw-bold">|</span> <span class="text-danger fw-bold">R$250,30</span>
            </li>
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
    </div>
  </div>
</template>

<script>
// import DoughnutReadyChart from '@/components/charts/DoughnutReadyChart'

export default {
  name: 'HomeView',
  components: {
    // DoughnutReadyChart
  }
}
</script>
