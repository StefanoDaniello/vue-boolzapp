import {contacts} from "./data.js";
import Picker from './emoji-picker.js';
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
            showEmoji: false,
            darkMode: false,
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
                    favorite: false 
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
            this.showEmoji=false
        },
        active(id) {
            this.showMenuIndex = null;
            this.utenteactive = id;
        },
        toggleMenu(msgIndex) {
            if (this.showMenuIndex === msgIndex) {
                this.showMenuIndex = null;
            } else {
                this.showMenuIndex = msgIndex;
            }
        },
        deleteMessage(chatId, msgIndex) {
            const contactIndex = this.contacts.findIndex(contact => contact.id === chatId);
            if (contactIndex !== -1) {
                this.contacts[contactIndex].messages.splice(msgIndex, 1);
            }
        },
        favoriteMessage(msgIndex) {
            const activeContactIndex = this.contacts.findIndex(contact => contact.id === this.utenteactive);
            if (activeContactIndex !== -1) {
                // Inverti lo stato del messaggio preferito
                this.contacts[activeContactIndex].messages[msgIndex].favorite = !this.contacts[activeContactIndex].messages[msgIndex].favorite;
            }
        },
        getContactIndex(id){
            const i = this.contacts.findIndex(el=> el.id === id);
            const lastmessages =this.contacts[i].messages.length -1;
            if(lastmessages >= 0){
                return this.contacts[i].messages[lastmessages];
            }else{
                return '';
            }
        },
        getLastMessages(id) {
            if(this.getContactIndex(id)){
                return this.getContactIndex(id).message;
            }else{
                return '';
            }
        },
        getLastAccess(id){
            if(this.getContactIndex(id)){
                return this.getContactIndex(id).date;
            }else{
                return '';
            }
        },
        onSelectEmoji(emoji) {
            console.log(emoji)
            this.newMessage += emoji.i;
            /*
                 result
              { 
                  i: "😚", 
                  n: ["kissing face"], 
                  r: "1f61a", // with skin tone
                  t: "neutral", // skin tone
                  u: "1f61a" // without tone
              }
              */
        },
        toggleMode() {
            this.darkMode = !this.darkMode;
        },
    },
    computed: {
        activeContact() {
            return this.contacts.find(contact => contact.id === this.utenteactive);
        },
        findUser() {
            return this.contacts.filter(contact => {
              return contact.name.toLowerCase().includes(this.searchText.toLowerCase());
            });
        },
        lastAccess() {
            const index = this.activeContact.messages.length -1;
            if(index >= 0){
                return this.activeContact.messages[index].date;
            }else{
                return '';
            }
        },
        countFavoriteMessages() {
            const activeContactIndex = this.contacts.findIndex(contact => contact.id === this.utenteactive);
            if (activeContactIndex !== -1) {
                return this.contacts[activeContactIndex].messages.filter(message => message.favorite).length;
            }
            return '';
        }
    }
}).component('Picker', Picker).mount('#app');


