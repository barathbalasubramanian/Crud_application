
<template>
    <div class="Login">
        <router-link to="/home"><button>Login</button></router-link>
    </div>
    <router-view/>
</template>

<script>

export default {
  name: 'LoginView'

}
</script>

<style scoped>

    
    .Login {
      padding :0;
      background-color: #202020;
      display: flex;
      align-items: center;
      justify-content: center;
      height:98vh;
      overflow: hidden;
    }
    button {
      text-decoration: none;
      padding: 10px 16px;
      margin: auto;
      color:white;
      background-color: #202020;
      border: none;
      font-size: 20px;
      font-family: cursive;
    }
    button:hover {
      border: none;
      border-radius: 5px;
      outline: none;
      color: crimson;
      transform: scale(1);

    }
</style>