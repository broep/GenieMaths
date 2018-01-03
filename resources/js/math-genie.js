var MathGenie = {};

$(document).ready(() => {

  var $game = $('#game');
  var numbers = [];
  var mathFunction = "";
  var num, mfunction, sort = "Ordered";

  $('.btn.function').on('click', event => {
    mfunction = $(event.currentTarget).html();
    console.log(mfunction);
    $(event.currentTarget).siblings().removeClass('active');// clear active class from all siblings
    $(event.currentTarget).addClass('active'); // make the current target active

  });

  $('.btn.a').on('click', event => {
    $(event.currentTarget).toggleClass('active');
    num = parseInt($(event.currentTarget).html());
    console.log(num);
    // Limit to only one number selection
    $(event.currentTarget).siblings().removeClass('active');// clear active class from all siblings
    $(event.currentTarget).addClass('active'); // make the current target active

// Sarted this bit of code to allow more than one number to be selected
/*
    if ($(event.currentTarget).hasClass("active")) {
      // This means is now active so add the value to the variable
      console.log(num);
      numbers.push(num);
    } else {
      // Check to see if the value is present in the array and remove it
      numbers.splice($.inArray(num, numbers),1);
    }
    console.log(numbers); */
  });

  $('.btn.sort').on('click', event => {
    $(event.currentTarget).toggleClass('active');
    sort = $(event.currentTarget).html();
    console.log(sort);
    $(event.currentTarget).siblings().removeClass('active');// clear active class from all siblings
    $(event.currentTarget).addClass('active'); // make the current target active

  });

  $('.btn.clear').on('click', event => {
    $('.btn').removeClass('active');
  });

  $('.btn.start').on('click', event => {
    var problemValues = MathGenie.generateValues(num, mfunction, sort);
    console.log(problemValues);
    var answers = MathGenie.generateAnswers(num, mfunction, problemValues);
    console.log(answers);
    MathGenie.renderProblems(num, problemValues, answers, mfunction, $game);
  })



});

// Return an ordered or random list containing numbers between 1 and 12

MathGenie.generateValues = function (number, sign, sort) {
  var problems = [];
  var problemValues = [];

  for (var value = 1; value <= 12; value++) {
    problems.push(value);
  }

  if (sort === "Ordered") {
    problemValues = problems;
  } else {
    while (problems.length > 0) {
      var randomIndex = Math.floor(Math.random() * problems.length);
      var randomValue = problems.splice(randomIndex, 1)[0];
      problemValues.push(randomValue);
    }
  }

  return problemValues;
};

// Return the list of answers to coincide with the list of values

MathGenie.generateAnswers = function (number, sign, problemValues) {
  var answers = [];
  for (var value = 0; value <= 11; value++) {
    answers[value] = number * problemValues[value];
  };
  return answers;
};

MathGenie.renderProblems = function(number, problems, answers, sign, $game) {

  $game.empty();
  //$game.data('flippedCards', []); /*Keep track of flipped cards*/
 console.log('in the renderProblems function')
  for (var valueIndex = 0; valueIndex < problems.length; valueIndex++) {
    var value = problems[valueIndex];
    var answer = answers[valueIndex];
    var data = {
      number: number,
      value: value,
      answer: answer,
      sign: sign
    };
    console.log(data);

    var $problemElement = $('<div class="problem col-xs-12"></div>');
    $problemElement.data(data);
    var prob = $problemElement.data('number') + " " + $problemElement.data('sign') + " " +
      $problemElement.data('value') + " = ";
    $problemElement.text(prob);
    $problemElement.html(prob + '<input type="number" name="" value="">' + '<span class = "answer hidden">' + answer + '</span>');

    $game.append($problemElement );

    $('.problem input').on('focusout', event => {
      $(event.currentTarget).next('.answer').removeClass('hidden');


    });

  };


};
