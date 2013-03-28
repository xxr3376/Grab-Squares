class GameLogic
	constructor: (id, @size) ->
		if not @size
			@size = 3
		@widget = $('#' + id)
		@widget.addClass 'xxrgame'
		@main = $ '<div>'
		@main.addClass('board')
			.css
				'width'  : (@size-1) * 50
				'height' : (@size-1) * 50
				'padding' : 4
			.appendTo @widget
		board = $ '''<div class="score"><div class="player">P1:<span class="Nplayer1">0</span></div><div class="player">P2:<span class="Nplayer2">0</span></div><div class="current">CURRENT</div><div class="reset">RESET</div></div>'''
		board.css 'left', @size * 50 - 20
		board.css 'top', 50
		@widget.append board
		@currentPlayer = 'p1'
		@main.addClass @currentPlayer
		@widget.find('.current').addClass @currentPlayer
		@map = (0 for j in [0...@size] for i in [0...@size])
		#point
		for i in [0...@size]
			for j in [0...@size]
				#dot
				$('<div>')
					.attr
						class: 'node'
					.css
						left : j*50
						top  : i*50
					.appendTo @main
		for i in [0...@size-1]
			for j in [0...@size]
				# row
				$('<div>')
					.attr
						class: 'edge vertical'
						id : "v-#{i}-#{j}"
					.css
						left: j * 50
						top: i * 50
					.appendTo @main

				# column
				$('<div>')
					.attr
						class: 'edge horizonal'
						id : "h-#{j}-#{i}"
					.css
						left: i * 50
						top: j * 50
					.appendTo @main
		#grid
		for i in [0...@size-1]
			for j in [0...@size-1]
				$('<div>')
					.attr
						class : 'grid'
						id : "g-#{i}-#{j}"
					.css
						left : j * 50
						top : i * 50
					.appendTo @main

		@main.find('.edge').click (e) =>
			self = $ e.target
			if not self.hasClass('pushedp1') and not self.hasClass('pushedp2')
				self.addClass 'pushed' + @currentPlayer
				args = self.attr('id').split('-')
				@checkEdge args...
				@switchPlayer()
		@widget.find('.reset').click =>
			@widget.children().remove()
			new GameLogic(@widget.attr('id'), @size)

	anotherPlayer:() ->
		if @currentPlayer is 'p1'
			return 'p2'
		return 'p1'
	switchPlayer:() ->
		@main.removeClass @currentPlayer
		@widget.find('.current').removeClass @currentPlayer
		@currentPlayer = @anotherPlayer()
		@main.addClass @currentPlayer
		@widget.find('.current').addClass @currentPlayer
	updateScore:() ->
		@widget.find('.Nplayer1').text (@main.find('.grid.p1').length)
		@widget.find('.Nplayer2').text (@main.find('.grid.p2').length)
	checkEdge: (type, ii, jj) ->
		square1 = if type is 'v' then [jj - 1, ii] else [jj, ii - 1]
		square2 = [jj, ii]
		changed = false
		for [x, y] in [square1, square2]
			if 0 <= x < @size and 0 <= y < @size
				if ++@map[y][x] is 4
					$('#g-' + y + '-' + x).addClass(@currentPlayer)
					changed = true
		if changed
			@switchPlayer()
		@updateScore()

$ ->
	a = new GameLogic('gamepart', 10)
