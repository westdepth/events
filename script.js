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
    getData: function(){
      this.loading=true;
      var self = this
      var xmlHttpRequest = new XMLHttpRequest();
      xmlHttpRequest.onreadystatechange = function()
      {
        console.log("1")
        if(this.readyState==4 && this.status==200)
        {
          console.log("2")
          if(this.response)
          {


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
