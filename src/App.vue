<template>
  <header-layout/>
  <router-view/>
</template>

<script>
import headerLayout from './components/layouts/headerLayout'

export default {
  name: 'App',
  components: {
    headerLayout
  }
}
</script>

<style>
</style>
