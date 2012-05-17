var RedBlackTree;

RedBlackTree.VERSION = 1.0;

RedBlackTree = (function() {
  var min, next, previous, remove, _minNode;

  RedBlackTree.name = 'RedBlackTree';

  function RedBlackTree() {
    this._root = null;
    this._cursor = null;
    this._ancestors = [];
  }

  RedBlackTree.prototype._findNode = function(value, saveAncestors) {
    var relation, result;
    if (saveAncestors === null) {
      saveAncestors = false;
    }
    result = this._root;
    if (saveAncestors) {
      this._ancestors = [];
    }
    while (result !== null) {
      relation = value.compare(result._value);
      if (relation !== 0) {
        if (saveAncestors) {
          this._ancestors.push(result);
        }
        if (relation < 0) {
          result = result._left;
        } else {
          result = result._right;
        }
      } else {
        break;
      }
    }
    return result;
  };

  RedBlackTree.prototype._maxNode = function(node, saveAncestors) {
    if (node === null) {
      node = this._root;
    }
    if (saveAncestors === null) {
      saveAncestors = false;
    }
    if (node !== null) {
      while (node._right !== null) {
        if (saveAncestors) {
          this._ancestors.push(node);
        }
        node = node._right;
      }
    }
    return node;
  };

  _minNode = function(node, saveAncestors) {
    if (node === null) {
      node = this._root;
    }
    if (saveAncestors === null) {
      saveAncestors = false;
    }
    if (node !== null) {
      while (node._left !== null) {
        if (saveAncestors) {
          this._ancestors.push(node);
        }
        node = node._left;
      }
    }
    return node;
  };

  RedBlackTree.prototype._nextNode = function(node) {
    var ancestors, parent;
    if (node !== null) {
      if (node._right !== null) {
        this._ancestors.push(node);
        node = this._minNode(node._right, true);
      } else {
        ancestors = this._ancestors;
        parent = ancestors.pop();
        while (parent !== null && parent._right === node) {
          node = parent;
          parent = ancestors.pop();
        }
        node = parent;
      }
    } else {
      this._ancestors = [];
      node = this._minNode(this._root, true);
    }
    return node;
  };

  RedBlackTree.prototype._previousNode = function(node) {
    var ancestors, parent;
    if (node !== null) {
      if (node._left !== null) {
        this._ancestors.push(node);
        node = this._maxNode(node._left, true);
      } else {
        ancestors = this._ancestors;
        parent = ancestors.pop();
        while (parent !== null && parent._left === node) {
          node = parent;
          parent = ancestors.pop();
        }
        node = parent;
      }
    } else {
      this._ancestors = [];
      node = this._maxNode(this._root, true);
    }
    return node;
  };

  RedBlackTree.prototype.add = function(value) {
    result;

    var addResult, result;
    if (this._root === null) {
      result = this._root = new RedBlackNode(value);
    } else {
      addResult = this._root.add(value);
      this._root = addResult[0];
      result = addResult[1];
    }
    return result;
  };

  RedBlackTree.prototype.find = function(value) {
    var node;
    node = this._findNode(value);
    if (node !== null) {
      return node._value;
    } else {
      return null;
    }
  };

  RedBlackTree.prototype.findNext = function(value) {
    var current;
    current = this._findNode(value, true);
    current = this._nextNode(current);
    if (current !== null) {
      return current._value;
    } else {
      return null;
    }
  };

  RedBlackTree.prototype.findPrevious = function(value) {
    var current;
    current = this._findNode(value, true);
    current = this._previousNode(current);
    if (current !== null) {
      return current._value;
    } else {
      return null;
    }
  };

  RedBlackTree.prototype.max = function() {
    var result;
    result = this._maxNode();
    if (result !== null) {
      return result._value;
    } else {
      return null;
    }
  };

  min = function() {
    var result;
    result = this._minNode();
    if (result !== null) {
      return result._value;
    } else {
      return null;
    }
  };

  next = function() {
    this._cursor = this._nextNode(this._cursor);
    if (this._cursor) {
      return this._cursor._value;
    } else {
      return null;
    }
  };

  previous = function() {
    this._cursor = this._previousNode(this._cursor);
    if (this._cursor) {
      return this._cursor._value;
    } else {
      return null;
    }
  };

  remove = function(value) {
    result;

    var remResult, result;
    if (this._root !== null) {
      remResult = this._root.remove(value);
      this._root = remResult[0];
      result = remResult[1];
    } else {
      result = null;
    }
    return result;
  };

  RedBlackTree.prototype.traverse = function(func) {
    if (this._root !== null) {
      return this._root.traverse(func);
    }
  };

  RedBlackTree.prototype.toString = function() {
    var current, i, indent, indentText, line, lines, node, stack, _i;
    lines = [];
    if (this._root !== null) {
      indentText = "  ";
      stack = [[this._root, 0, "^"]];
      while (stack.length > 0) {
        current = stack.pop();
        node = current[0];
        indent = current[1];
        line = "";
        for (i = _i = 0; 0 <= indent ? _i <= indent : _i >= indent; i = 0 <= indent ? ++_i : --_i) {
          line += indentText;
        }
        line += current[2] + "(" + node.toString() + ")";
        lines.push(line);
        if (node._right !== null) {
          stack.push([node._right, indent + 1, "R"]);
        }
        if (node._left !== null) {
          stack.push([node._left, indent + 1, "L"]);
        }
      }
    }
    return lines.join("\n");
  };

  return RedBlackTree;

})();
