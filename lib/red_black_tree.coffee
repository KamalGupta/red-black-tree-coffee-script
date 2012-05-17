
RedBlackTree.VERSION = 1.0

class RedBlackTree
  constructor: () ->
    @_root      = null
    @_cursor    = null
    @_ancestors = []

  _findNode: (value, saveAncestors) ->
    saveAncestors = false if ( saveAncestors == null )

    result = @_root

    if ( saveAncestors )
        @_ancestors = []

    while ( result != null )
      relation = value.compare(result._value)

      if ( relation != 0 )
        if ( saveAncestors )
          @_ancestors.push(result)
        if ( relation < 0 )
          result = result._left
        else
          result = result._right

      else
          break

    result

  _maxNode: (node, saveAncestors) ->
    node = @_root if ( node == null )
    saveAncestors = false if ( saveAncestors == null )

    if ( node != null )
      while ( node._right != null )
        if ( saveAncestors )
          @_ancestors.push(node)

        node = node._right

    node

  _minNode = (node, saveAncestors) ->
    node = @_root if ( node == null )
    saveAncestors = false if ( saveAncestors == null )

    if ( node != null )
      while ( node._left != null )
        if ( saveAncestors )
          @_ancestors.push(node)
        node = node._left

    node

  _nextNode: (node) ->
    if ( node != null )
      if ( node._right != null )
        @_ancestors.push(node)
        node = @_minNode(node._right, true)
      else
        ancestors = @_ancestors
        parent = ancestors.pop()

        while ( parent isnt null && parent._right is node )
          node = parent
          parent = ancestors.pop()

        node = parent
    else
      @_ancestors = []
      node = @_minNode(@_root, true)

    node

  _previousNode: (node) ->
    if ( node != null )
      if ( node._left != null )
        @_ancestors.push(node)
        node = @_maxNode(node._left, true)
      else
        ancestors = @_ancestors
        parent = ancestors.pop()

        while ( parent != null && parent._left is node )
            node = parent
            parent = ancestors.pop()

        node = parent
    else
      @_ancestors = []
      node = @_maxNode(@_root, true)

    node

  add: (value) ->
    result

    if ( @_root == null )
      result = @_root = new RedBlackNode(value)
    else
      addResult = @_root.add(value)

      @_root = addResult[0]
      result = addResult[1]

    result

  find: (value) ->
    node = @_findNode(value)

    if node != null then node._value else null

  findNext: (value) ->
    current = @_findNode(value, true)

    current = @_nextNode(current)

    if current != null then current._value else null

  findPrevious: (value) ->
    current = @_findNode(value, true)

    current = @_previousNode(current)

    if current != null then current._value else null

  max: () ->
    result = @_maxNode()

    if result != null then result._value else null

  min = () ->
    result = @_minNode()

    if result != null then result._value else null

  next = () ->
    @_cursor = @_nextNode(@_cursor)

    if @_cursor then @_cursor._value else null

  previous = () ->
    @_cursor = @_previousNode(@_cursor)

    if @_cursor then @_cursor._value else null

  remove = (value) ->
    result

    if ( @_root != null )
      remResult = @_root.remove(value)

      @_root = remResult[0]
      result = remResult[1]
    else
      result = null

    result

  traverse: (func) ->
    if ( @_root != null )
      @_root.traverse(func)

  toString: () ->
    lines = []

    if ( @_root != null )
      indentText = "  "
      stack = [[@_root, 0, "^"]]

      while ( stack.length > 0 )
        current = stack.pop()
        node    = current[0]
        indent  = current[1]
        line    = ""

        for i in [0..indent]
          line += indentText

        line += current[2] + "(" + node.toString() + ")"
        lines.push(line)

        stack.push([node._right, indent+1, "R"]) if ( node._right != null )
        stack.push([node._left,  indent+1, "L"]) if ( node._left  != null )

    return lines.join("\n")
