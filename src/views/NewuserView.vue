
<template>
    <div class="newuser">
        <div class='container'>
            <div>
                <h1>NEW USER</h1>
                <p>use the below form to create a new account</p>
            </div>
            <div>
                <div><router-link to="/allusers" ><button class="allusersbtn">All users</button></router-link></div><router-view/>
                <form @submit.prevent = 'onsubmit'>
                    <label >NAME</label><br>
                    <input type="text" name="username" pattern="[a-zA-Z]{3,}" min="3" v-model="form.name" required><br>
                    <label >EMAIL</label><br>
                    <input type="email" name="email" id="email_box" v-model="form.email" required><br>
                    <label >PASSWORD</label><br>
                    <input type="password" name="f_pass" id="f_pass" v-model='form.pass1' pattern=".{8,}"  required><br>
                    <label >CONFRIM PASSWORD</label><br>
                    <input type="password" name="c_pass" id="c_pass" v-model='form.pass2' pattern=".{8,}"  required><br>
                    <div class='gender'>
                        <label >GENDER</label>
                        <input type="radio" name="gender" v-model='male' required >Male<input type="radio" name="gender" v-model='female' required>Female<br>
                    </div>
                    <div class='status'>
                        <label>STATUS</label>
                        <input type="radio" name="status" v-model="active" required>Active<input type="radio" name="status" v-model='inactive' required>Inactive<br>
                    </div>
                    <button class="save" type='submit'>SAVE</button><br>
                </form> 
            </div>
        </div>
    </div>
</template>


<script>
import { createuser } from '@/firebase'

export default {
    name: 'NewuserView',
    data() {
        return {
            form:{name:'',email:'',pass1:'',pass2:''},
            male: false,
            female: false,
            active:false,
            inactive:false
        }
    },
    
    methods: {
        async onsubmit() {
            if (this.male == "on") {
                this.form['gender'] = 'male'
            } else {
                this.form['gender'] = 'female'
            }
            if (this.active == "on") {
                this.form['status'] = 'Active'
            } else {
                this.form['status'] = 'Inactive'
            }
            const data = await createuser( { ...this.form } )
           
                this.form['name'] = ''
                this.form['email'] = ''
                this.form['pass1'] = ''
                this.form['pass2'] = ''
                this.male = false
                this.female = false
                this.active = false
                this.inactive = false
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
        padding: 30px 30px;
        height: auto;
        display: flex;
        flex: 0 0 50%;
        flex-direction: column;
        row-gap: 20px;
        margin-top: 3em;
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
    button {
        cursor: pointer;
    }
    @media only screen and (max-width:730px) {
           p { 
            display: flex;
            align-items: center;
            text-align: center;
           }
           .container {
            margin-top: 15%;
            flex:0 0 75%
           }
    }
</style>