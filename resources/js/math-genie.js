var MathGenie = {};

$(document).ready(() => {

  var $game = $('#game');
  var numbers = [];
  var mathFunction = "";
  var num = 2;
  var mfunction = "+";
  var sort = "Ordered";

  $('.btn.function').on('click', event => {
    mfunction = $(event.currentTarget).html();
    $('.summary').html(mfunction + " " + num + " " + sort);
    console.log(mfunction);
    $(event.currentTarget).siblings().removeClass('active');// clear active class from all siblings
    $(event.currentTarget).addClass('active'); // make the current target active
  });

  $('.btn.a').on('click', event => {
    $(event.currentTarget).toggleClass('active'); 
    num = parseInt($(event.currentTarget).html());
    console.log(num);
    $('.summary').html(mfunction + " " + num + " " + sort);
    // Limit to only one number selection
    $(event.currentTarget).siblings().removeClass('active');// clear active class from all siblings
    //$(event.currentTarget).addClass('active'); // make the current target active

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
    $('.summary').html(mfunction + " " + num + " " + sort);
    $(event.currentTarget).siblings().removeClass('active');// clear active class from all siblings
    $(event.currentTarget).addClass('active'); // make the current target active

  });

  $('.btn.clear').on('click', event => {
    $('.btn').removeClass('active');
  });

  $('.btn.start').on('click', event => {
    var table = MathGenie.generateTable(num, mfunction, sort);
    console.log(table);
    MathGenie.renderTable(table, mfunction, $game)
  })

});


// Return the list of answers to coincide with the list of values

MathGenie.generateTable = function (number, sign, sort) {
  var orderedTable = [];
  var table = [];

  switch(sign) {
    case '+':
        for (var value = 0; value <= 12; value++) {
          var x = number;
          var y = value;
          var answer = x+y;
          var problem = [x, y, answer]
          table.push(problem);
        }
        break;
    case '-':
        for (var value = 0; value <= 12; value++) {
          var x = number + value;
          var y = number;
          var answer = x-y;
          var problem = [x, y, answer]
          table.push(problem);
        }
        break;
    case 'x':
        for (var value = 0; value <= 12; value++) {
          var x = number;
          var y = value;
          var answer = x*y;
          var problem = [x, y, answer]
          table.push(problem);
        }
        break;

    case '÷':
        for (var value = 0; value <= 12; value++) {
          var x = number * value;
          var y = number;
          var answer = x/y;
          var problem = [x, y, answer]
          table.push(problem);
        }
        break;
    default:
        break;
  }

  if (sort === "Ordered") {
    orderedTable = table;
  } else {
    while (table.length > 0) {
      var randomIndex = Math.floor(Math.random() * table.length);
      var randomValue = table.splice(randomIndex, 1)[0];
      orderedTable.push(randomValue);
    }
  }
  return orderedTable;
}


MathGenie.renderTable = function (table, sign, $game) {
  $game.empty();
  for (var valueIndex = 0; valueIndex < table.length; valueIndex++) {
    var x = table[valueIndex][0];
    var y = table[valueIndex][1];
    var answer = table[valueIndex][2];
    var data = {
      x: x,
      sign: sign,
      y: y,
      answer: answer
    };
    console.log(data);
    /*<div class="form-group row">
      <label for="problem1" class="col-sm-1 col-form-label">6 x 2 =</label>
      <div class="col-sm-2">
        <input type="number" class="form-control" id="problem1" placeholder="answer">
      </div>
    </div> */

    var $tableElement = $('<div class="form-group row"></div>');
    $tableElement.data(data);
    var problem = $tableElement.data('x') + " " + $tableElement.data('sign') + " " 
      + $tableElement.data('y') + " = " + '<span class="problem' +valueIndex + ' hidden">' + $tableElement.data('answer') + "</span>";
    var $labelElement = $('<label for="problem' + valueIndex + '" class="col-xs-4 col-sm-2 col-md-2 col-form-label">' + problem + '</label>');
    var $answerDiv = $('<div class="col-xs-4 col-sm-2 col-md-2"></div');
    var $answerInput = $('<input type="number" class="problem form-control" id="problem' + valueIndex + '" placeholder="answer">');
    
    $answerDiv.html($answerInput);
    $tableElement.html($labelElement);
    $tableElement.append($answerDiv);

    $game.append($tableElement);



    /* var $tableElement = $('<div class="problem col-xs-12"></div>');
    $tableElement.data(data);
    var prob = $tableElement.data('x') + " " + $tableElement.data('sign') + " " +
      $tableElement.data('y') + " = ";
    $tableElement.text(prob);
    $tableElement.html(prob + '<input type="number" name="" value="">' + '<span class = "answer hidden">' + $tableElement.data('answer') + '</span>');

    $game.append($tableElement );*/
    /*$('.problem input').on('focusout', event => {
      $(event.currentTarget).next('.answer').removeClass('hidden');
    });*/

  };

  $('.problem.form-control').on('focusout', event => {
    console.log(event.currentTarget);
    var id = '.' + event.currentTarget.id;
    console.log(id); 
    var i = id.substring(8);
    console.log(i);
    console.log(table[i][2]);

    $(id).removeClass('hidden');
    if (parseInt($(event.currentTarget).val()) === table[i][2]) {
      $(event.currentTarget).addClass('correct');
      $(event.currentTarget).removeClass('incorrect');
    } else {
      $(event.currentTarget).addClass('correct');
      $(event.currentTarget).removeClass('incorrect');
    }

  });
}
