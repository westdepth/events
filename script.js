new Vue({
  el: '#app',
  data: {
    loading:true,
    message: 'Hello Vue.js!',
    all : {}
  },
  methods: {
    clicked: function() {
      this.message = "Hello GAS!"
    },
    getTimeDiff: function(timestr1,timestr2){
      if(timestr1==""){
          return "";
      }else{
          var msec = (parseInt(timestr1.substr(0,1))*6000+parseInt(timestr1.substr(2,2))*100+parseInt(timestr1.substr(5,2)))- (parseInt(timestr2.substr(0,1))*6000+parseInt(timestr2.substr(2,2))*100+parseInt(timestr2.substr(5,2)));
          return "(" + Math.floor(msec/6000) + ":" + Math.floor((msec-Math.floor(msec/6000)*6000)/100) +"."+(msec-Math.floor(msec/100)*100)+")";
      }
    },
    getData: function(){
      this.loading=true;
      var self = this
      var xmlHttpRequest = new XMLHttpRequest();
      xmlHttpRequest.onreadystatechange = function()
      {
        //console.log("1")
        if(this.readyState==4 && this.status==200)
        {
          //console.log("2")
          if(this.response)
          {
            for(var shumoku in this.response){
              console.log(shumoku);
              for(var kumi in this.response[shumoku]){
                console.log(""+kumi+"組");
                for(var lane in this.response[shumoku][kumi]){
                  console.log(this.response[shumoku][kumi][lane].name);
                  this.response[shumoku][kumi][lane].lap100=self.getTimeDiff(this.response[shumoku][kumi][lane].sp100,this.response[shumoku][kumi][lane].sp50);
                  this.response[shumoku][kumi][lane].lap200=self.getTimeDiff(this.response[shumoku][kumi][lane].sp200,this.response[shumoku][kumi][lane].sp150);
                  this.response[shumoku][kumi][lane].lap150=self.getTimeDiff(this.response[shumoku][kumi][lane].sp150,this.response[shumoku][kumi][lane].sp100);
                  console.log(this.response[shumoku][kumi][lane].lap100);
                }
              }
            }

            self.all = this.response
            self.loading=false;
            console.log(this.response);
          }
        }
      }
      xmlHttpRequest.open('GET', 'https://script.googleusercontent.com/macros/echo?user_content_key=QWM1gjVOHexAw57l4InpI1LEVgphIkVItPbzUT5R00Nz6sOJ0DJdP05O--URLl5iIyGpjcVF1CmRXEyhf_Zpbyj13ot6XbONm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnMM_m-PkPO14CPt9j2-Ns5MXsMcyTVS2R6qjJeeSma99A6fnhnYWS0v3m5YP8pexOgbU2IR2KBMQ&lib=Mr5SKryE30Nu39veDFTfkPj5oFVHBR1QH',true);
      xmlHttpRequest.responseType = 'json';
      xmlHttpRequest.send(null);
    }
  },
  created: function(){
    this.getData();
  }
});
