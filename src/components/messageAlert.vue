<template>
  <div v-if="alertText" :class="alertClass" role="alert">
    {{alertText}}
  </div>
</template>

<script>
export default {
  name: 'messageAlert',
  props: ['alertText', 'alertClass']
}
</script>

<style scoped>

</style>
