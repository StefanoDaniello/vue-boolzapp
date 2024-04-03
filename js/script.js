import {contacts} from "./data.js";

const {createApp} = Vue;
                                                                                                
createApp({
    data() {
      
        return {
            contacts,
            newMessage:'',
            saluto:'',
            data:new Date().toLocaleTimeString(),
            bgmessage:false,
            bgmessage2:false,
            messages:[],
            utenteactive:null,
            searchText: '',
        }
    },
    methods: {
        sendMessage() {

            if (this.newMessage.trim() !== '') {
              this.messages.push(this.newMessage);
              this.bgmessage = true;
              this.newMessage = '';
              this.data= new Date().toLocaleTimeString();
            }
            setTimeout(() => {
                this.bgmessage2 = true;
                this.saluto='ciao';
                this.data= new Date().toLocaleTimeString();
            }, 4000);
        },
        sendMessage2(){

        },
        active(id) {
            this.utenteactive = id;
        }
        
    },
    mounted() {
        if (this.utenteactive === null) {
            this.utenteactive = this.contacts[0].id;
        }
    },
    computed: {
        findUser() {
            return this.contacts.filter(contact => {
              return contact.name.toLowerCase().includes(this.searchText.toLowerCase());
            });
        }
    }
}).mount('#app')


