<template>
    <div class="newuser">
        <div class='container'>
            <div>
                <h1>UPDATE USER</h1>
                <p>use the below form to edit a your account</p>
            </div>
            <div>
                <div><router-link to="/allusers" ><button class="allusersbtn">All users</button></router-link></div><router-view/>
                <form @submit.prevent = 'update' v-if="this.currentdata.length>0">
                    <label >NAME</label><br>
                    <input class="name" type="text" name="username" pattern="[a-zA-Z]{3,}" min="3" :value="`${currentdata[0].name}`" required><br>
                    <label >EMAIL</label><br>
                    <input class="email" type="email" name="email" :value="`${currentdata[0].email}`" required><br>
                    <label >PASSWORD</label><br>
                    <input class="pass1" type="password" name="f_pass" pattern=".{8,}" :value="`${currentdata[0].pass1}`" required><br>
                    <label >CONFRIM PASSWORD</label><br>
                    <input class="pass2" type="password" name="c_pass" pattern=".{8,}" :value="`${currentdata[0].pass2}`" required><br>
                    <div class='gender'>
                        <label >GENDER</label>
                        <input class='Gender' type="radio" name="gender" v-model="male" required >Male<input type="radio" name="gender"  v-model="female" required>Female<br>
                    </div>
                    <div class='status'>
                        <label>STATUS</label>
                        <input class='Status' type="radio" name="status"  v-model="active"  required>Active<input type="radio" name="status"  v-model="inactive"  required>Inactive<br>
                    </div>
                    <button class="save" type='submit'>UPDATE</button><br>
                </form> 
            </div>
        </div>
    </div>
</template>

<script>

import { useRoute } from 'vue-router'
import { getDocs , collection, setDoc, doc } from 'firebase/firestore'
import {db} from '@/firebase'

export default {
    name:'UpdateuserView',
    data() {
        return{
            currentdata : [],
            key:[],
            form:{name:'',email:'',pass1:'',pass2:''},
            male: false,
            female: false,
            active:false,
            inactive:false,
    
        }
    },
    mounted : function() {
        this.constructor()
        
    },
    methods : {
        
        async constructor() 
        {   
            const route = useRoute()
            let user_key = route.params.user_id
            const querySnapshot = await getDocs(collection(db, "data"));
            querySnapshot.forEach((doc) => {
                if (Object((doc.id)) == user_key)
                {   
                    this.currentdata.push(Object(doc.data()))
                    this.key.push(Object(doc.id))
                }
                });
        },
        update() {
            const docRef = doc(db, "data", this.key[0].toString())
            
                this.form['name'] = document.querySelector('.name').value
                this.form['email'] = document.querySelector('.email').value
                this.form['pass1'] = document.querySelector('.pass1').value
                this.form['pass2'] = document.querySelector('.pass2').value
                if (this.male == "on") { this.form['gender'] = 'male'} else { this.form['gender'] = 'female' }
                if (this.active == "on") { this.form['status'] = 'Active' } else { this.form['status'] = 'Inactive' }
            
            if (this.form['pass1'] == this.form['pass2']) 
            {
                setDoc(docRef, this.form)
                    
                .then(docRef => {
                    document.querySelector('.name').value = ''
                    document.querySelector('.email').value = ''
                    document.querySelector('.pass1').value = ''
                    document.querySelector('.pass2').value = ''
                    this.male = false
                    this.female = false
                    this.active = false
                    this.inactive = false
                    alert("updated successfully");
                })
                .catch(error => {
                    console.log(error);
                })
                    
            }
            else { alert ("Password didn't match")}
        }
    }
}

</script>


<style scoped>
    * {
        margin: 0px;
        font-family: cursive;
    }
    .newuser {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0px;
    }
    .container {
        width: 700px;
        position: absolute;
        top: 9%;
        left: 25%;
        padding: 30px 30px;
        height: auto;
        display: flex;
        flex: 0 0 75%;
        flex-direction: column;
        row-gap: 20px;
    }
    h1,p {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
    }

    .gender , .status {
        display: flex;
        flex-direction: row;
        column-gap: 10px;
    }

    input {
        width: 100%;
        margin-bottom: 20px;
        padding: 3px 10px;
        border-radius:5px;
        border: 0.5px solid #202020;
        outline: none;
    }

    input[type='radio'] {
        width: 10%;
    }
    .save {
        width: 103%;
        padding: 10px 0;
        background-color: #00b157;
        outline: none;
        border: none;
        border-radius: 2px;

    }
    label {
        padding:0 0 5px 10px;
        color: #8a8787;;
    }
    p {
        color:#8a8787;
    }
    h1 {
        color:#161515
    }
    .allusersbtn {
        border: none;
        outline: none;
        background: white;
        padding-bottom: 20px;
        color: #090a09;
        font-size: 17px;
    }
    .allusersbtn:hover {
        color: red;
        border: none;
        outline: none;
    }
</style>