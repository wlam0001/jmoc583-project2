 var loadFile = function(event) {
   var picture = document.getElementById('picture');
   picture.src = URL.createObjectURL(event.target.files[0]);
 };
