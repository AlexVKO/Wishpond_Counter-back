//= require jquery
//= require bootstrap-sprockets

//= require count_number_ajax

document.addEventListener("DOMContentLoaded", function(event) {

  // DOM
  var $counterBtn   = document.getElementById('add-counter-btn'),
      $deleteAllBtn = document.getElementById('destroy-all-btn'),
      $table        = document.getElementById('count-number_table'),
      $row          = document.getElementById('count-number_row'),
      $dummyRow     = document.getElementById('dummy-row');


  function init() {
    // Get data and start counter
    CountNumberAjax()
    .index()
    .then(function(numbers) {
      _populateTable(numbers)
      _startCounter();
    })

    // ------ LISTNERS DEFINITIONS
    $deleteAllBtn.addEventListener("click", _deleteAll);
    $counterBtn.addEventListener("click", function($event) {
      var currentCountNumber = $event.toElement.innerHTML.trim();
      _save(currentCountNumber)
    });
  }

  function _startCounter() {
    var currentCountNumber;

    setInterval(function(){
      if(currentCountNumber > 1) {
        currentCountNumber = currentCountNumber - 1;
      } else {
        currentCountNumber = 10;
      }
      $counterBtn.innerHTML = currentCountNumber;
    }, 1000);
  }

  function _deleteAll() {
    CountNumberAjax()
      .destroyAll()
      .then( _removeAllTableRows );
  }

  function _save(value) {
    CountNumberAjax()
      .create(value)
      .then(function(countNumber) {
        row  = _buildRow(countNumber["id"], countNumber["value"]);
        $table.appendChild(row);
      });
  }

  function _removeAllTableRows() {
    while ($table.childNodes.length > 1) {
        $table.removeChild($table.lastChild);
    }
    // ps: Except the dummy row
  }

  /**
  * @param  { [Hash] } CountNumbers
  */
  function _populateTable(countNumbers) {
    var row;
    for (i = 0; i < countNumbers.length; i++) {
      row  = _buildRow(countNumbers[i]["id"], countNumbers[i]["value"]);
      $table.appendChild(row);
    }
  }

  /**
  * Create a row based on Dummy row from html
  * @param  {String | Integer} countNumberID
  * @param  {String | Integer} countNumberValue
  * @return {Element} Returns a new row element
  */
  function _buildRow(countNumberID, countNumberValue) {
    // Row elemens
    var $row       = $dummyRow.cloneNode(true),
        $column    = $row.querySelector('td'),
        $label     = $column.querySelector('.value-label'),
        $deleteBtn = $column.querySelector('.delete-btn');

    // Remove id of dummy clone for semantic
    $row.removeAttribute("id");

    // Add number value on row label
    $label.appendChild(document.createTextNode(countNumberValue));

    $deleteBtn.addEventListener("click",function() {
      // Delete from dabase and remove this row
      CountNumberAjax()
        .destroy(countNumberID)
        .then(function() {
          $row.remove();
        });
    });

    return $row
  }

  init();
});