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
            idutentea:1
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
    },
    computed: {
    }
}).mount('#app')