<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <div class="allusers">
    <div class="adduser"><router-link to='/newuser'><button class="btn">Adduser</button></router-link></div><router-view></router-view>
    <h1>Allusers</h1>
    <form action="/" >
      <table class="table">
        <thead class="t_heading">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for = '(data,index) in users' :key='index'>
            <td>{{ index+1   }}</td>
            <td>{{ data.name   }}</td>
            <td>{{ data.email  }}</td>
            <td>{{ data.gender }}</td>
            <td>{{ data.status }}</td>
            <td>
              <a class='update'>
                <router-link :to='`/newuser/${userid[index]}`'><span class="material-symbols-outlined">edit</span></router-link>
              </a>
              <a class='delete'>
                <span class="material-symbols-outlined" v-if='users.length>1' @click='del(userid[index],index+1)'>close</span>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  </div>
</template>

<script>
import { db } from '@/firebase'
import { collection , getDocs } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";

export default {
  name: 'AlluserView',
  data() {
    return {
      users : [] ,
      userid : []
    }
  },
  mounted: function() {
    this.useloaduser()
  },
  methods : {
    del(id,index) {
      const docRef = doc(db, "data", id.toString());
      this.userid.splice(index-1,1)
      this.users.splice(index-1,1)
      deleteDoc(docRef)
      .then(() => {
      alert("deleted successfully.")
      })
      .catch(error => {
      console.log(error);
      })
    },
    
    async useloaduser()  
    {
      const querySnapshot = await getDocs(collection(db, "data"));
      querySnapshot.forEach((doc) => {
      this.userid.push(Object(doc.id))
      this.users.push(Object(doc.data()))

});
    }
    

}
}
</script>

<style>
.material-symbols-outlined {
  font-variation-settings:
  'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 48
}

*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: cursive;
}
a{
  text-decoration: none;

}

.allusers {
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  justify-content: center;
  align-items:center;
  margin-top: 3em;
  flex: 0 0 50%;
  overflow: auto; 
  overflow: scroll !important;
}

.table td ,.table th {
  padding: 1em;
  text-align: center;
  border-top:1px solid #200202 ;
}

.table td a{
  padding: .3em .1em;
  font-size: 1.1em;
  margin: 0.2em;
}

.table tbody tr:hover {
  background-color: #00b157;
}

.delete,.update {
  cursor : pointer
}

.btn {
    border: none;
    outline: none;
    background: white;
    padding-bottom: 20px;
    color: #090a09;
    font-size: 17px;
}
.btn:hover {
        color: red;
        border: none;
        outline: none;
    }
.adduser {
    display: flex;
    position:absolute;
    text-align: start;
    top: 8%;
    left: 27%;
    color: red;
}
button {
        cursor: pointer;
    }

    @media only screen and (max-width:900px) {
      .adduser{
        display: flex;
        position: absolute;
        text-align: start;
        top: 8%;
        left: 7%
      }
    }
    @media only screen and (max-width:900px) {
      .table td ,.table th {
        padding: 0.3em;
        }
      .allusers {
        display: flex;
        flex: 0 0 90%;
        overflow: auto;
      }
    }
</style>

