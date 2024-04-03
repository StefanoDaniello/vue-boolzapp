import {contacts} from "./data.js";

const {createApp} = Vue;
                                                                                                
createApp({
    data() {
        return {
            contacts,
            newMessage:''
        }
    },
    methods: {
        
    },
    computed: {
    }
}).mount('#app')