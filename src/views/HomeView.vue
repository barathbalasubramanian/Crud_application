<template>

  <div class="home">
    <router-link to="/allusers">All users</router-link> 
    <router-link to="/newuser">New user</router-link>  
  </div>
  <router-view/>

</template>

<script>

export default {
  name: 'HomeView'

}
</script>

<style scoped>

  a{
    color: #202020;
    text-decoration: none;
    padding: 5px 10px;
    font-size: 20px;
    font-size: 20px;
    font-family: cursive;
  }
  .home{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    column-gap: 20px;
    text-decoration: none;
    height: 100vh;
  }
  a:hover {
      border: none;
      outline: none;
      color: blue;
      transform: scale(1);
      border-radius: 5px;
    }
</style>
