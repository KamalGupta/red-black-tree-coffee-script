RedBlackNode.VERSION = 1.0

class RedBlackNode
  constructor: (value) ->
    @_left = null
    @_right = null
    @_value = value
    @_height = 1

  add: (value) ->
    relation = value.compare(@_value)
    addResult = undefined
    result = undefined
    newNode = undefined
    unless relation is 0
      if relation < 0
        if @_left?
          addResult = @_left.add(value)
          @_left = addResult[0]
          newNode = addResult[1]
        else
          newNode = @_left = new RedBlackNode(value)
      else if relation > 0
        if @_right?
          addResult = @_right.add(value)
          @_right = addResult[0]
          newNode = addResult[1]
        else
          newNode = @_right = new RedBlackNode(value)
      result = [ @balanceTree(), newNode ]
    else
      result = [ this, this ]
    result

  balanceTree: ->
    leftHeight = (if (@_left?) then @_left._height else 0)
    rightHeight = (if (@_right?) then @_right._height else 0)
    result = undefined
    if leftHeight > rightHeight + 1
      result = @swingRight()
    else if rightHeight > leftHeight + 1
      result = @swingLeft()
    else
      @setHeight()
      result = this
    result

  join: (that) ->
    result = undefined
    unless that?
      result = this
    else
      top = undefined
      if @_height > that._height
        top = this
        top._right = that.join(top._right)
      else
        top = that
        top._left = @join(top._left)
      result = top.balanceTree()
    result

  moveLeft: ->
    right = @_right
    rightLeft = right._left
    @_right = rightLeft
    right._left = this
    @setHeight()
    right.setHeight()
    right

  moveRight: ->
    left = @_left
    leftRight = left._right
    @_left = leftRight
    left._right = this
    @setHeight()
    left.setHeight()
    left

  remove: (value) ->
    relation = value.compare(@_value)
    remResult = undefined
    result = undefined
    remNode = undefined
    unless relation is 0
      if relation < 0
        if @_left?
          remResult = @_left.remove(value)
          @_left = remResult[0]
          remNode = remResult[1]
        else
          remNode = null
      else
        if @_right?
          remResult = @_right.remove(value)
          @_right = remResult[0]
          remNode = remResult[1]
        else
          remNode = null
      result = this
    else
      remNode = this
      unless @_left?
        result = @_right
      else unless @_right?
        result = @_left
      else
        result = @_left.join(@_right)
        @_left = null
        @_right = null
    if remNode?
      if result?
        [ result.balanceTree(), remNode ]
      else
        [ result, remNode ]
    else
      [ this, null ]

  setHeight: ->
    leftHeight = (if (@_left?) then @_left._height else 0)
    rightHeight = (if (@_right?) then @_right._height else 0)
    @_height = (if (leftHeight < rightHeight) then rightHeight + 1 else leftHeight + 1)

  swingLeft: ->
    right = @_right
    rightLeft = right._left
    rightRight = right._right
    left = @_left
    leftHeight = (if (left?) then left._height else 0)
    rightLeftHeight = (if (rightLeft?) then rightLeft._height else 0)
    rightRightHeight = (if (rightRight?) then rightRight._height else 0)
    @_right = right.moveRight()  if rightLeftHeight > rightRightHeight
    @moveLeft()

  swingRight: ->
    left = @_left
    leftRight = left._right
    leftLeft = left._left
    right = @_right
    rightHeight = (if (right?) then right._height else 0)
    leftRightHeight = (if (leftRight?) then leftRight._height else 0)
    leftLeftHeight = (if (leftLeft?) then leftLeft._height else 0)
    @_left = left.moveLeft()  if leftRightHeight > leftLeftHeight
    @moveRight()

  traverse: (func) ->
    @_left.traverse func  if @_left?
    func this
    @_right.traverse func  if @_right?

  toString: ->
    @_value.toString()
