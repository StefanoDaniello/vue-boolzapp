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
            const utenteActiveIndex = this.contacts.findIndex(contact => contact.id === this.utenteactive);
           
            if(utenteActiveIndex !== -1){
                let prova ={
                    message: msg,
                    date: new Date().toLocaleTimeString(),
                    status: status,
                }
                this.contacts[utenteActiveIndex].messages.push(prova);
                console.log(utenteActiveIndex)
            }
            
        },
        sendMessage() {
            if (this.newMessage.trim() !== '') {
                this.createMessage(this.newMessage, 'sent')
                this.newMessage = '';
                setTimeout(() => {
                    this.createMessage('ok', 'received');
                }, 1000);
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


