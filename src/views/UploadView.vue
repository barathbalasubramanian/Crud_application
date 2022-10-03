<template>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <div id="upload">
        <router-link to='/allfiles'><div>All files</div></router-link><router-view/>
        <label>UPLOAD A FILE</label>
        <form @change="uploadlistener(e)">
            <input type="file" name="filename" id='inputfile' @change="uploadlistener">
            <button type="submit" class="submit">Upload</button>
        </form>
        <div v-if="this.upload == 'on'">
            <button class="btn" @click="paused()" v-if="this.pause == false"><span class="material-symbols-outlined">pause</span></button>
            <button class="btn" @click="play()" v-else><span class="material-symbols-outlined">play_arrow</span></button>
        </div>        
        <span id="percent" ></span>

    </div>
</template>

<script>

import { getStorage , ref as storageRef,uploadBytesResumable ,getDownloadURL } from 'firebase/storage'

export default {
    name:'UploadView',
    data(){
        return{
            upload:'off',
            pause : false,
            uploadTask:null
        }
    },
    methods: 
    {
        uploadlistener(e) 
        {
            this.upload = 'on'
            const storage = getStorage()

            // getting currentfile name
            let fileName = document.querySelector('#inputfile').files[0].name

            // storing in firbase 
            const storageref = storageRef(storage , 'public/' + fileName)
            this.uploadTask = uploadBytesResumable( storageref, e.target.files[0])

            // handing problems during upload
            uploadBytesResumable(storageref, this.uploadTask).then((snapshot) => {
                console.log('Uploaded a blob or file!'); 
                }).catch(err => { console.log(err) } )

            this.uploadTask.on('state_changed',  (snapshot) => {

                    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    document.querySelector('#percent').innerHTML = `${ Math.floor( progress) + '%'}`
                    
                    document.querySelector('#percent').style.width = Math.floor( progress) + '%'
                    document.querySelector('.submit').innerHTML = 'Uploading...'
                    document.querySelector('#percent').classList.add('percentactive')
                    if (Math.floor(progress) == 100) 
                    {   this.upload = 'off' 
                        document.querySelector('.submit').innerHTML = 'Uploaded'
                        document.querySelector('#percent').classList.remove('percentactive')
                        document.querySelector('#percent').innerHTML = null
                    }
                  },
                  () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(this.uploadTask.snapshot.ref).then((downloadURL) => {
                      console.log('File available at', downloadURL);
                    });
                  }
                );
        
        },
        paused() {
            this.pause = true
            this.uploadTask.pause()
            
        },
        play() {
            this.pause = false
            this.uploadTask.resume()
            
        }
    }

        
}
</script>

<style scoped>

    #upload{
        display: flex;
        margin: 5em 35% 5em 30%;
        justify-content: center;
        align-items: start;
        flex-direction: column;
        row-gap: 20px;
        /* border: 2px solid red; */
    }
    .percentactive {
        background-color: rgb(66, 179, 66);
        padding: .2em .3em ;
        height: 1em;
        text-align: center;
        transition: 1s;
    }
    span {
        border-radius: 10px;
    }
    .btn{
        border-radius: 50%;
        border: none;
        outline: none;
        text-decoration: none;
    }
    a{
        text-decoration: none;
        text-transform: uppercase;
    }
    form button {
        margin-top: 20px;
    }
    @media only screen and (max-width:1000px) {
        #upload{
            margin:15%
        }        
    }
    @media only screen and (max-width:500px) {
        #upload{
            margin:15%
        }        
    }
</style>
