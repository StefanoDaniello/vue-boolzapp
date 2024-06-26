import {contacts} from "./data.js";
import Picker from './emoji-picker.js';
const {createApp} = Vue;
                    
const dt = luxon.DateTime;
createApp({
    data() {
      
        return {
            contacts,
            newMessage:'',
            data: dt.now().setLocale('it').toFormat('dd/MM/yyyy HH:mm:ss'),
            messages:[],
            utenteactive:null,
            searchText: '',
            showMenuIndex: null,
            showEmoji: false,
            darkMode: false,
            dropdown: false,
            dropdown2: false,
            name:'',
            surname:'',
            selectedValue:null,
            errore: false,

        }
    },
    methods: {
        createMessage( msg,status){
            const utenteActiveIndex = this.contacts.findIndex(contact => contact.id === this.utenteactive);
           
            if(utenteActiveIndex !== -1){
                let prova ={
                    message: msg,
                    date: dt.now().setLocale('it').toFormat('dd/MM/yyyy HH:mm:ss'),
                    status: status,
                    favorite: false 
                }
                this.contacts[utenteActiveIndex].messages.push(prova);
                this.$nextTick(() => {
                    this.$refs.messages[this.$refs.messages.length - 1].scrollIntoView({ beaviur: 'smooth' });
                })
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
            this.dropdown = null;
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
        },
        toggleMode() {
            this.darkMode = !this.darkMode;
        },
        removeMessage(id){
            const contactIndex = this.contacts.findIndex(contact => contact.id === id);
            if(contactIndex !== -1){
                this.contacts[contactIndex].messages = [];
            }
        },
        removeChat(id) {
            const contactIndex = this.contacts.findIndex(contact => contact.id === id);
            if (contactIndex !== -1) {
                this.contacts.splice(contactIndex, 1);
                if (id === this.utenteactive) {
                    if (this.contacts.length > 0) {
                        this.utenteactive = this.contacts[0].id;
                    } else {
                        this.utenteactive = null;
                    }
                }
                // Forza l'aggiornamento della vista
                this.contacts = [...this.contacts];
                console.log(this.contacts)
            }
        },
        addContact(){
            if(this.name === '' || this.selectedValue === null){
                this.errore = true;
            }
            if(this.name.trim() !== '' && this.selectedValue !== null){
                const somma = this.contacts.length > 0 ? this.contacts[this.contacts.length - 1].id : 0;
                
                this.contacts.push({
                    id: somma + 1,
                    name: this.name + ' ' + this.surname,
                    avatar:this. selectedValue,
                    visible: true,
                    messages: []
                })
                this.name = '';
                this.surname = '';
                this.dropdown2 = null;
                this.errore = false;
            }
        }
    },
    mounted(){
        // console.log(this.$refs.messages[this.$refs.messages.length-1])
    },
    computed: {

        activeContact() {
            if (this.utenteactive !== null) {
                return this.contacts.find(contact => contact.id === this.utenteactive);
            }else {
                // let x = 0
                // array[x]
                return this.utenteactive = 0;
            }
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


