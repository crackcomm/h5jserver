
function Store() {
  this.actions = {};
}

Store.prototype.add = function(action) {
  var _action = this.actions[action.id] = {
    id: action.id,
    function: action.function
  };
  
  if (action.next) {
    _action.next = action.next.id;
    this.add(action.next);
  }
};

Store.prototype.get = function(id) {
  var action = this.actions[id];
  var _action = {
    id: id,
    function: action.function
  };

  if (action.next) {
    _action.next = this.get(action.next);
  }

  return _action;
};

module.exports = new Store();
