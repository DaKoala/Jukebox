function Song(){
  this.name = " ";
  this.sound = " ";//audio file
  this.constructor = function (name, sound){
    this.name = name;
    this.sound = sound;
  };
  this.Play() = function(){
    var audio = new Audio(this.sound);
    audio.play();
  };
}
var 
