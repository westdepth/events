new Vue({
  el: '#app',
  data: {
    loadingdiv:true,
    loadingrelay:true,
    message: 'Hello Vue.js!',
    isdiv:true,
    allrelay:{},
    alldiv:{}
  },
  methods: {
    swithdiv: function(){
      this.isdiv = !this.isdiv;
    },
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
      if(this.isdiv){
        getDiv();
        getRelay();
      }else {
        getRelay();
        getDiv();
      }
    },
    getDiv: function(){
      this.loadingdiv=true;
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
            self.alldiv = JSON.parse(JSON.stringify(this.response));
            for(var shumoku in self.alldiv){
              console.log(shumoku);
              for(var kumi in self.alldiv[shumoku]){
                console.log(""+kumi+"組");
                console.log(self.alldiv[shumoku][kumi]);
                for(var lane in self.alldiv[shumoku][kumi]){
                  var kojin = self.alldiv[shumoku][kumi][lane];
                  console.log(kojin.name);
                  kojin.lap100=self.getTimeDiff(kojin.sp100,kojin.sp50);
                  kojin.lap200=self.getTimeDiff(kojin.sp200,kojin.sp150);
                  kojin.lap150=self.getTimeDiff(kojin.sp150,kojin.sp100);
                  if(kojin.univ!="" && kojin.grad!="" && kojin.grad!="0"){
                    kojin.univgrad="("+kojin.univ+":"+kojin.grad+")";
                  }else if (kojin.univ!="" || (kojin.grad!="" && kojin.grad!="0")) {
                    kojin.univgrad="("+kojin.univ+kojin.grad+")";
                  }else {
                    kojin.univgrad="(-)";
                  }
                  if(kojin.name==""){
                    kojin.name="名無しさん";
                  }
                  console.log(kojin.lap100);
                }
              }
            }
            self.loadingdiv=false;
            console.log(this.alldiv);
          }
        }
      }
      xmlHttpRequest.open('GET', 'https://script.googleusercontent.com/macros/echo?user_content_key=QWM1gjVOHexAw57l4InpI1LEVgphIkVItPbzUT5R00Nz6sOJ0DJdP05O--URLl5iIyGpjcVF1CmRXEyhf_Zpbyj13ot6XbONm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnMM_m-PkPO14CPt9j2-Ns5MXsMcyTVS2R6qjJeeSma99A6fnhnYWS0v3m5YP8pexOgbU2IR2KBMQ&lib=Mr5SKryE30Nu39veDFTfkPj5oFVHBR1QH',true);
      xmlHttpRequest.responseType = 'json';
      xmlHttpRequest.send(null);
    },
    getRelay: function(){
      this.loadingrelay=true;
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
            self.allrelay = JSON.parse(JSON.stringify(this.response));
            for(var shumoku in self.allrelay){
              console.log(shumoku);
              for(var kumi in self.allrelay[shumoku]){
                console.log(""+kumi+"組");
                console.log(self.allrelay[shumoku][kumi]);
                for(var lane in self.allrelay[shumoku][kumi]){
                  var kojin = self.allrelay[shumoku][kumi][lane];
                  console.log(kojin.name);
                  kojin.lap100=self.getTimeDiff(kojin.sp100,kojin.sp50);
                  kojin.lap200=self.getTimeDiff(kojin.sp200,kojin.sp150);
                  kojin.lap150=self.getTimeDiff(kojin.sp150,kojin.sp100);
                  if(kojin.univ!="" && kojin.grad!="" && kojin.grad!="0"){
                    kojin.univgrad="("+kojin.univ+":"+kojin.grad+")";
                  }else if (kojin.univ!="" || (kojin.grad!="" && kojin.grad!="0")) {
                    kojin.univgrad="("+kojin.univ+kojin.grad+")";
                  }else {
                    kojin.univgrad="(-)";
                  }
                  if(kojin.name==""){
                    kojin.name="名無しチーム";
                  }
                  console.log(kojin.lap100);
                }
              }
            }
            self.loadingrelay=false;
            console.log(this.allrelay);
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
  },
  computed:{
    loading: function(){
      return (this.isdiv) ? this.loadingdiv : this.loadingrelay;
    },
    all: function(){
      return (this.isdiv) ? this.alldiv : this.allrelay;
    },
    disp: function(){
      return (this.isdiv) ? "個人" : "リレー";
    },
    undisp: function(){
      return (this.isdiv) ? "リレー" : "個人";
    }
  }
});
