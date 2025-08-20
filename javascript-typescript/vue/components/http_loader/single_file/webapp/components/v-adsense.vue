"use strict";

require("vue");



let exports = module.exports = {};

   
<template>
     <div> 
            <ins class="adsbygoogle" style="display:block" 
            :data-ad-slot="dataAdSlot" 
            :data-ad-client="adClient" 
            data-ad-format="auto"></ins> 
        </div>
</template>
 
<script>
module.exports = {
     props: ['separator'],
    template: '#v-adsense',
    data: function () {
        return {
            dataAdSlot: "dataAdSlot",
            adClient: "adClient"
        };
    },
    created: function () { },
    mounted: function () {
        (adsbygoogle = window["adsbygoogle"] || []).push({});
    },
    updated: function () { },
    destroyed: function () { },
    methods: {}
}
</script>
 
<style> 
</style>