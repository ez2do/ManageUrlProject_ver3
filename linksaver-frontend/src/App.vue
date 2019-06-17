<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>



export default {
  name: 'app',

  components: {

  },
  mounted() {
    //  if( !localStorage.token){
    //    if( this.$router.currentRoute.path !== '/signup') {
    //      //this.$router.push('?');
    //      this.$router.push('/login');
    //
    //      //location.reload();
    //    }
    //  }
    // console.log(this.$router.currentRoute.path);
  }
}
</script>

<style>

</style>
