// Public

/**
  Make ajax requests to countNumber resources
  - @return {Hash} with resource actions
*/
function CountNumberAjax() {
  return {
    /**
      - @return a promisse with an array of objects
    */
    index:   function()   {
      return _ajax('GET', '/count_numbers');
    },

    /**
      - @param {Integer} countNumber - the new countNumber object without
      - @return a promisse with the new object just created
    */
    create:  function(countNumber) {
      return _ajax('POST', '/count_numbers?count_number=' + countNumber);
    },

    /**
      - @param {Integer | String} id
      - @return a promisse with empty content
    */
    destroy: function(id) {
      return _ajax('DELETE', '/count_numbers/' + id);
    },

    /**
      - @return a promisse with empty content
    */
    destroyAll: function()   {
      return _ajax('DELETE', '/count_numbers/destroy_all');
    }
  }
}

// Private
function _ajax(verb, url, data) {
  var xhr = new XMLHttpRequest();
      xhr.open(verb, url);

  return new Promise(
    function(resolve, reject) {
      xhr.onload = function() {
        console.log(verb, url)
        console.log(xhr)

        if ([200, 201].indexOf(xhr.status) >= 0) {
          var res = JSON.parse(xhr.responseText);
          resolve(res);
        } else if(xhr.status === 204) {
          resolve();
        } else {
          var res = JSON.parse(xhr.responseText);
          reject(res);
        }
      };
      xhr.send(encodeURI(data || ""));
    }
  );
}