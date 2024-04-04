import {contacts} from "./data.js";

const {createApp} = Vue;
                                                                                                
createApp({
    data() {
      
        return {
            contacts,
            newMessage:'',
            // saluto:'',
            data:new Date().toLocaleTimeString(),
            bgmessage:false,
            bgmessage2:false,
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
            this.messages.push(prova);
        },
        sendMessage() {
                
            if (this.newMessage.trim() !== '') {
                this.newMessage = '';
                this.bgmessage = true;
                setTimeout(() => {
                    this.bgmessage2 = true;
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


