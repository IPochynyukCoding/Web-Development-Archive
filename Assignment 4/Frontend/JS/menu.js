/*Credits to Andrew Pougher on JSFiddle for creating the simple jQuery filter. 
Link to Andrew Pougher's JSFiddle page: https://jsfiddle.net/apougher/4ch51z2z/ */

//Hide undesirable results by removing articles not fitting the checkbox's criteria.
$('input[type="checkbox"]').click(function() {
    if ($('input[type="checkbox"]:checked').length > 0) {
      $('.diet').hide();
//Show desirable results by displaying articles fitting the checkbox's criteria.
      $('input[type="checkbox"]:checked').each(function() {
        $('article[data-group*=' + this.value + ']').fadeIn();
      });
//Return back to normal when no checkboxes are selected.
    } else {
      $('.menu-items > article').fadeIn();
    }
  });