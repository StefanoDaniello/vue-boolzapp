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
            }
            setTimeout(() => {
                this.bgmessage2 = true;
                this.saluto='ciao';
            }, 1000);
        },
        active(id) {
            this.utenteactive= id;
        },
    },
    computed: {
        findUser() {
            return this.contacts.filter(contact => {
              return contact.name.toLowerCase().includes(this.searchText.toLowerCase());
            });
        }
    }
}).mount('#app')


