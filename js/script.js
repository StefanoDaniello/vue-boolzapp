import {contacts} from "./data.js";

const {createApp} = Vue;
                                                                                                
createApp({
    data() {
      
        return {
            contacts,
            newMessage:'',
            prova:false,
            messages:[]

        }
    },
    methods: {
        sendMessage() {

            if (this.newMessage.trim() !== '') {
              this.messages.push(this.newMessage);
              this.prova = true
              this.newMessage = '';
            }
        },
    },
    computed: {
    }
}).mount('#app')