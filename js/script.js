import {contacts} from "./data.js";

const {createApp} = Vue;
                                                                                                
createApp({
    data() {
      
        return {
            contacts,
            newMessage:'',
            // saluto:'',
            data:new Date().toLocaleTimeString(),
            messages:[],
            utenteactive:1,
            searchText: '',
        }
    },
    methods: {
        createMessage( msg,status){
            let prova ={
                message: msg,
                date: new Date().toLocaleTimeString(),
                status: status
            }
            this.utenteactive.messages.push(prova);
        },
        sendMessage() {
                
            if (this.newMessage.trim() !== '') {
                this.newMessage = '';
                setTimeout(() => {
                    this.createMessage('ok', 'received');
                }, 4000);
            }
          
        },
        active(id) {
            this.utenteactive = id;
        }
        
    },
    computed: {
        activeContact() {
            return this.contacts.find(contact => contact.id === this.utenteactive);
        },
        findUser() {
            return this.contacts.filter(contact => {
              return contact.name.toLowerCase().includes(this.searchText.toLowerCase());
            });
        }
    }
}).mount('#app')


