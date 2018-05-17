 var library;
$('#noResult').hide();
 $(document).ready(function () {
     
     var tittle;
     var description;
     var detalle;
     var lang;
     var cover;
     var divError;
     $("#inpu").focus();

     var container = document.getElementById("library");

     $.getJSON("https://api.myjson.com/bins/udbm5", function (data) {
         $('#loading').hide();
         library = data.books;
         createFlippers(library);

         var qsRegex;

         // init Isotope
         var $grid = $("#library").isotope({
             itemSelector: '.flip-container',
             layoutMode: 'fitRows',
             filter: function () {
                 return qsRegex ? $(this).text().match(qsRegex) : true;


             }
         });

         // use value of search field to filter
         var $quicksearch = $('.quicksearch').keyup(debounce(function () {
             qsRegex = new RegExp($quicksearch.val(), 'gi');
             $grid.isotope();

             if (!$grid.data('isotope').filteredItems.length) {
                 $('#noResult').show();
             } else {
                 $('#noResult').hide();
             }
         }, 200));

         // debounce so filtering doesn't happen every millisecond
         function debounce(fn, threshold) {
             var timeout;
             return function debounced() {
                 if (timeout) {
                     clearTimeout(timeout);
                 }

                 function delayed() {
                     fn();
                     timeout = null;
                 }
                 timeout = setTimeout(delayed, threshold || 100);
             }
         }



     });



     function createFlippers(library) {
         var imgCover;
         var divContainer;
         var divFlipper;
         var front;
         var back;
         var h2;
         var p;
         var btn;
         var t;
         var a;
         for (var i = 0; i < library.length; i++) {

             tittle = library[i].titulo;
             description = library[i].descripcion;
             detalle = library[i].detalle;
             lang = library[i].idioma;
             cover = library[i].portada;



             divContainer = document.createElement("div");
             divContainer.setAttribute("class", "flip-container");

             divFlipper = document.createElement("div");
             divFlipper.setAttribute("class", "flipper");
             front = document.createElement("div");
             front.setAttribute("class", "front");
             a = document.createElement("a");
             a.setAttribute("href", detalle);
             a.setAttribute("data-fancybox", "data-caption");
             imgCover = document.createElement("img");
             imgCover.setAttribute("src", cover);
             imgCover.setAttribute("class", "coverImg");
             imgCover.setAttribute("class", "img-responsive");
             front.appendChild(imgCover);
             back = document.createElement("div");
             back.setAttribute("class", "back");
             h2 = document.createElement("h3")
             h2.innerHTML = tittle;
             p = document.createElement("p")
             p.innerHTML = description;
             btn = document.createElement("button"); // Create a <button> element
             btn.setAttribute("class", "btn")
             t = document.createTextNode("More info"); // Create a text node
             a.appendChild(t); // Append the text to <button>
             btn.append(a);


             //             <p class="imglist">
             //  <a href="https://source.unsplash.com/0JYgd2QuMfw/1500x1000" data-fancybox data-caption="This image has a caption">
             //      <img src="https://source.unsplash.com/0JYgd2QuMfw/240x160" />
             //  </a>


             divContainer.appendChild(divFlipper);
             divFlipper.appendChild(front);
             divFlipper.appendChild(back);
             container.appendChild(divContainer);
             back.appendChild(h2);
             h2.after(p);

             (p).after(btn);
         }


     };

     function noResults() {
         if ($("div").hasClass("hidden")) {
             divError = document.createElement("div");
             divError.innerHTML = "no result";
             container.append(divError);
         }
     };



 });
