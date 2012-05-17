var RedBlackNode;

RedBlackNode.VERSION = 1.0;

RedBlackNode = (function() {

  RedBlackNode.name = 'RedBlackNode';

  function RedBlackNode(value) {
    this._left = null;
    this._right = null;
    this._value = value;
    this._height = 1;
  }

  RedBlackNode.prototype.add = function(value) {
    var addResult, newNode, relation, result;
    relation = value.compare(this._value);
    addResult = void 0;
    result = void 0;
    newNode = void 0;
    if (relation !== 0) {
      if (relation < 0) {
        if (this._left != null) {
          addResult = this._left.add(value);
          this._left = addResult[0];
          newNode = addResult[1];
        } else {
          newNode = this._left = new RedBlackNode(value);
        }
      } else if (relation > 0) {
        if (this._right != null) {
          addResult = this._right.add(value);
          this._right = addResult[0];
          newNode = addResult[1];
        } else {
          newNode = this._right = new RedBlackNode(value);
        }
      }
      result = [this.balanceTree(), newNode];
    } else {
      result = [this, this];
    }
    return result;
  };

  RedBlackNode.prototype.balanceTree = function() {
    var leftHeight, result, rightHeight;
    leftHeight = ((this._left != null) ? this._left._height : 0);
    rightHeight = ((this._right != null) ? this._right._height : 0);
    result = void 0;
    if (leftHeight > rightHeight + 1) {
      result = this.swingRight();
    } else if (rightHeight > leftHeight + 1) {
      result = this.swingLeft();
    } else {
      this.setHeight();
      result = this;
    }
    return result;
  };

  RedBlackNode.prototype.join = function(that) {
    var result, top;
    result = void 0;
    if (that == null) {
      result = this;
    } else {
      top = void 0;
      if (this._height > that._height) {
        top = this;
        top._right = that.join(top._right);
      } else {
        top = that;
        top._left = this.join(top._left);
      }
      result = top.balanceTree();
    }
    return result;
  };

  RedBlackNode.prototype.moveLeft = function() {
    var right, rightLeft;
    right = this._right;
    rightLeft = right._left;
    this._right = rightLeft;
    right._left = this;
    this.setHeight();
    right.setHeight();
    return right;
  };

  RedBlackNode.prototype.moveRight = function() {
    var left, leftRight;
    left = this._left;
    leftRight = left._right;
    this._left = leftRight;
    left._right = this;
    this.setHeight();
    left.setHeight();
    return left;
  };

  RedBlackNode.prototype.remove = function(value) {
    var relation, remNode, remResult, result;
    relation = value.compare(this._value);
    remResult = void 0;
    result = void 0;
    remNode = void 0;
    if (relation !== 0) {
      if (relation < 0) {
        if (this._left != null) {
          remResult = this._left.remove(value);
          this._left = remResult[0];
          remNode = remResult[1];
        } else {
          remNode = null;
        }
      } else {
        if (this._right != null) {
          remResult = this._right.remove(value);
          this._right = remResult[0];
          remNode = remResult[1];
        } else {
          remNode = null;
        }
      }
      result = this;
    } else {
      remNode = this;
      if (this._left == null) {
        result = this._right;
      } else if (this._right == null) {
        result = this._left;
      } else {
        result = this._left.join(this._right);
        this._left = null;
        this._right = null;
      }
    }
    if (remNode != null) {
      if (result != null) {
        return [result.balanceTree(), remNode];
      } else {
        return [result, remNode];
      }
    } else {
      return [this, null];
    }
  };

  RedBlackNode.prototype.setHeight = function() {
    var leftHeight, rightHeight;
    leftHeight = ((this._left != null) ? this._left._height : 0);
    rightHeight = ((this._right != null) ? this._right._height : 0);
    return this._height = (leftHeight < rightHeight ? rightHeight + 1 : leftHeight + 1);
  };

  RedBlackNode.prototype.swingLeft = function() {
    var left, leftHeight, right, rightLeft, rightLeftHeight, rightRight, rightRightHeight;
    right = this._right;
    rightLeft = right._left;
    rightRight = right._right;
    left = this._left;
    leftHeight = ((left != null) ? left._height : 0);
    rightLeftHeight = ((rightLeft != null) ? rightLeft._height : 0);
    rightRightHeight = ((rightRight != null) ? rightRight._height : 0);
    if (rightLeftHeight > rightRightHeight) {
      this._right = right.moveRight();
    }
    return this.moveLeft();
  };

  RedBlackNode.prototype.swingRight = function() {
    var left, leftLeft, leftLeftHeight, leftRight, leftRightHeight, right, rightHeight;
    left = this._left;
    leftRight = left._right;
    leftLeft = left._left;
    right = this._right;
    rightHeight = ((right != null) ? right._height : 0);
    leftRightHeight = ((leftRight != null) ? leftRight._height : 0);
    leftLeftHeight = ((leftLeft != null) ? leftLeft._height : 0);
    if (leftRightHeight > leftLeftHeight) {
      this._left = left.moveLeft();
    }
    return this.moveRight();
  };

  RedBlackNode.prototype.traverse = function(func) {
    if (this._left != null) {
      this._left.traverse(func);
    }
    func(this);
    if (this._right != null) {
      return this._right.traverse(func);
    }
  };

  RedBlackNode.prototype.toString = function() {
    return this._value.toString();
  };

  return RedBlackNode;

})();
