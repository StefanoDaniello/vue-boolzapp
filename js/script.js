import {contacts} from "./data.js";

const {createApp} = Vue;
                                                                                                
createApp({
    data() {
      
        return {
            contacts,
            newMessage:'',
            data:new Date().toLocaleTimeString(),
            messages:[],
            utenteactive:1,
            searchText: '',
            showMenuIndex: null,
            selectedMessage:0,
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
        },
        toggleMenu(chatId, msgIndex) {
            const utenteActiveIndex = this.contacts.findIndex(contact => contact.id === chatId);
            if (utenteActiveIndex !== -1) {
                this.selectedMessage = this.contacts[utenteActiveIndex].messages[msgIndex];
                if(this.selectedMessage === this.showMenuIndex) {
                    this.showMenuIndex = null;
                }
                else {
                    this.showMenuIndex = this.selectedMessage;
                }
                console.log(this.selectedMessage);
            }
            // if (this.showMenuIndex === msgIndex) {
            //     this.showMenuIndex = null;
            // } else {
            //     this.showMenuIndex = msgIndex;
            // }
        },
        deleteMessage(chatId, msgIndex) {
            // Trova l'indice del contatto corrente
            const contactIndex = this.contacts.findIndex(contact => contact.id === chatId);
            if (contactIndex !== -1) {
                    this.contacts[contactIndex].messages.splice(msgIndex, 1);
                }
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


