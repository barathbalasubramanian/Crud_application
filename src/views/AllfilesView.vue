

<template>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <div class="tab">
      <div class="nofiles" v-if="this.last_name .length < 1"> </div>
      <div >
        <table class="table" v-if="this.last_name.length > 0">
          <thead>
            <tr>
              <th>S.NO</th>
              <th>NAME</th>
              <th>GO TO</th>
            </tr>
          </thead>
          <tbody v-for="(name,index) in this.last_name" :key="index" >
            <tr v-if="index < 5 && this.firstdiv == true"> 
              <td>{{index+1}}</td>
              <td>{{name}}</td>
              <td class="link"><a :href="`${this.last_url[index]}`"><img :src="`${this.last_url[index]}`" alt="NOT VISIBLE"></a></td>
            </tr>
            <tr v-if="index > 4 && index < 10 && this.seconddiv == true"> 
              <td>{{index+1}}</td>
              <td>{{name}}</td>
              <td class="link"><a :href="`${this.last_url[index]}`"><img :src="`${this.last_url[index]}`" alt="NOT VISIBLE"></a></td>
            </tr>
            <tr v-if="index > 9 && index < this.last_name.length && this.thirddiv == true"> 
              <td>{{index+1}}</td>
              <td>{{name}}</td>
              <td class="link"><a :href="`${this.last_url[index]}`"><img :src="`${this.last_url[index]}`" alt="NOT VISIBLE"></a></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="this.last_name.length > 0" class="up_next">
        <div class="upload" v-if="this.firstdiv == true"><router-link to="/upload">Upload</router-link> </div>
        <div v-if="this.firstdiv == false"><button @click="previouspage()"><span class="material-symbols-outlined">keyboard_double_arrow_left</span></button></div>
        <div class="page"><span >Page</span>{{this.currentpage}}</div>
        <div><button @click="nextpage()"><span class="material-symbols-outlined">double_arrow</span></button></div>
      </div>
    </div>
</template>

<script>
import { getStorage, ref,  listAll ,getDownloadURL} from "firebase/storage";

export default {
    name:'AllfilesView',
    data() {
      return {
      path: [],
      last_name:[],
      last_url:[],
      firstdiv : true,
      seconddiv : false,
      thirddiv : false,
      nextpageno : 0,
      previouspageno : 0,
      currentpage : 1
      }
    },
    mounted : function() { this.pageTokenExample()   } ,
    methods : {
        async pageTokenExample(){
            const storage = getStorage();
            const listhef = ref(storage, 'public/');

            // list all the files 
            listAll(listhef)
            .then((res) => {
              res.items.forEach((itemRef) => {
                this.path.unshift(Object.values(itemRef['_location'])[1])
                let img = Object.values(this.path)
                const starsRef = ref(storage,img[0] )
                    // getting url
                    getDownloadURL(starsRef)
                    .then((url) => {
                      this.last_name.push(img[0])
                      this.last_url.push(url)
                    })
              });

              }).catch((err) => {
                alert('ERROR', err)
              });
    },
    
    // retriving currentpage data
    nextpage() {
      this.currentpage += 1
      document.querySelector('.page').innerHTML = 'Page' + this.currentpage

      if ( this.currentpage == 2){
      this.firstdiv = false
      this.seconddiv = true 
      }
      if (this.currentpage == 3) {
        this.thirddiv = true
        this.seconddiv = false
      }
    },
    // retriving currentpage data
    previouspage() {
      this.currentpage -= 1
      document.querySelector('.page').innerHTML = 'Page' + this.currentpage

      if (this.currentpage == 1) {
          this.firstdiv = true
          this.seconddiv = false }
      if (this.currentpage == 2) {
          this.seconddiv = true
          this.thirddiv = false }
    }
    },
}


</script>

<style scoped>

  .tab {
    display: flex;
    flex-direction: column;
    flex: 0 0 50%;
    margin: 0 40% 0 10%;
  }
  .names,.urls {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }
  .name,.path {
    display: flex;
    padding: .3em;
    border: 1px solid green;
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

  a {
    text-decoration: none;
    color:green

  }
  .up_next {
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 2em;
  }
  .btn {
    margin-bottom: 2px;
  }
  @media only screen and (max-width: 1000px) {
    .tab {
      margin: 5em 5em 0 5em;
      flex: 0 0 50%;
    }
  }
  @media only screen and (max-width: 400px) {
    .tab {
      flex: 0 0 75%;
    }
    
  }
  .link {
    overflow: hidden;
  }
  img {
    width: 100px;
    height: 100px;
  }

</style>
