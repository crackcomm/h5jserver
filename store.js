
var actions = module.exports = {};

function storeAction(action) {
  var _action = actions[action.id] = {
    id: action.id,
    function: action.function
  };
  
  if (action.next) {
    _action.next = action.next.id;
    storeAction(action.next);
  }
}

function getAction(id) {
  var action = actions[id];
  var _action = {
    id: id,
    function: action.function
  };

  if (action.next) {
    _action.next = getAction(action.next);
  }

  return _action;
}
