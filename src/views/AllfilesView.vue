
<template>
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
          <tbody>
            <tr v-for="(name,index) in this.last_name" :key="index"> 
              <td>{{index+1}}</td>
              <td>{{name}}</td>
              <td class="link"><a :href="`${this.last_url[index]}`">{{this.last_url[index]}}</a></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="upload" v-if="this.last_name.length > 0"><router-link to="/upload">Upload</router-link> </div>
    </div>
</template>

<script>
import { getStorage, ref,  listAll ,getDownloadURL} from "firebase/storage";

export default {
    name:'AllfilesView',
    data() {
      return {
      path: [],
      fileName: [],
      urls: [],
      last_name:[],
      last_url:[]
      }
    },
    mounted : function() { this.pageTokenExample() } ,
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

          getDownloadURL(starsRef)
          .then((url) => {
            this.last_name.push(img[0])
            this.last_url.push(url)
          })
    });

    }).catch((err) => {
      alert('ERROR', err)
    });

}
}
}

</script>

<style scoped>

  .tab {
    display: flex;
    flex-direction: column;
    flex: 0 0 50%;
    margin: 5em 8em;
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
  .upload {
    display: flex;
    justify-content: start;
    align-items: center;
    margin: 2em 0em 0 2em ;
    text-decoration: none;
  }
  .upload a {
    text-decoration: none;
    color:green

  }
  tbody{
    border: 2px solid rebeccapurple;
  }
  @media only screen and (max-width: 1000px) {
    .tab {
      margin: 5em 5em 0 5em;
      flex: 0 0 50%;
    }
  }
  @media only screen and (max-width: 400px) {
    .tab {
      margin: 5em 5em 0 5em;
      flex: 0 0 75%;
    }
    
  }
  .link {
    overflow: hidden;
  }

</style>