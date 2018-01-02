$(document).ready(() => {

  var $game = $('#game');


  $('.btn').on('click', event => {
    $(event.currentTarget).toggleClass('active');

  });

});
MathGenie.generateValues = function () {
  var sequentialValues = [];

  for (var value = 1; value <= 12; value++) {
    sequentialValues.push(value);
    sequentialValues.push(value);
  }

  var problemValues = [];

  while (sequentialValues.length > 0) {
    var randomIndex = Math.floor(Math.random() * sequentialValues.length);
    var randomValue = sequentialValues.splice(randomIndex, 1)[0];
    cardValues.push(randomValue);
  }

  return cardValues;
};
