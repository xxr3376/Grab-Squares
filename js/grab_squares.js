(function() {
  var GrabSquares;

  GrabSquares = (function() {
    function GrabSquares(id, size) {
      var board, i, j, _i, _j, _k, _l, _m, _n, _ref, _ref1, _ref2, _ref3, _ref4, _ref5,
        _this = this;

      this.size = size;
      if (!this.size) {
        this.size = 3;
      }
      this.widget = $('#' + id);
      this.widget.addClass('xxrgame');
      this.main = $('<div>');
      this.main.addClass('board').css({
        'width': (this.size - 1) * 50,
        'height': (this.size - 1) * 50,
        'padding': 4
      }).appendTo(this.widget);
      board = $('<div class="score"><div class="player">P1:<span class="Nplayer1">0</span></div><div class="player">P2:<span class="Nplayer2">0</span></div><div class="current">CURRENT</div><div class="reset">RESET</div></div>');
      board.css('left', this.size * 50 - 20);
      board.css('top', 50);
      this.widget.append(board);
      this.currentPlayer = 'p1';
      this.main.addClass(this.currentPlayer);
      this.widget.find('.current').addClass(this.currentPlayer);
      this.map = (function() {
        var _i, _ref, _results;

        _results = [];
        for (i = _i = 0, _ref = this.size; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          _results.push((function() {
            var _j, _ref1, _results1;

            _results1 = [];
            for (j = _j = 0, _ref1 = this.size; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; j = 0 <= _ref1 ? ++_j : --_j) {
              _results1.push(0);
            }
            return _results1;
          }).call(this));
        }
        return _results;
      }).call(this);
      for (i = _i = 0, _ref = this.size; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        for (j = _j = 0, _ref1 = this.size; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; j = 0 <= _ref1 ? ++_j : --_j) {
          $('<div>').attr({
            "class": 'node'
          }).css({
            left: j * 50,
            top: i * 50
          }).appendTo(this.main);
        }
      }
      for (i = _k = 0, _ref2 = this.size - 1; 0 <= _ref2 ? _k < _ref2 : _k > _ref2; i = 0 <= _ref2 ? ++_k : --_k) {
        for (j = _l = 0, _ref3 = this.size; 0 <= _ref3 ? _l < _ref3 : _l > _ref3; j = 0 <= _ref3 ? ++_l : --_l) {
          $('<div>').attr({
            "class": 'edge vertical',
            id: "v-" + i + "-" + j
          }).css({
            left: j * 50,
            top: i * 50
          }).appendTo(this.main);
          $('<div>').attr({
            "class": 'edge horizonal',
            id: "h-" + j + "-" + i
          }).css({
            left: i * 50,
            top: j * 50
          }).appendTo(this.main);
        }
      }
      for (i = _m = 0, _ref4 = this.size - 1; 0 <= _ref4 ? _m < _ref4 : _m > _ref4; i = 0 <= _ref4 ? ++_m : --_m) {
        for (j = _n = 0, _ref5 = this.size - 1; 0 <= _ref5 ? _n < _ref5 : _n > _ref5; j = 0 <= _ref5 ? ++_n : --_n) {
          $('<div>').attr({
            "class": 'grid',
            id: "g-" + i + "-" + j
          }).css({
            left: j * 50,
            top: i * 50
          }).appendTo(this.main);
        }
      }
      this.main.find('.edge').click(function(e) {
        var args, self;

        self = $(e.target);
        if (!self.hasClass('pushedp1') && !self.hasClass('pushedp2')) {
          self.addClass('pushed' + _this.currentPlayer);
          args = self.attr('id').split('-');
          _this.checkEdge.apply(_this, args);
          return _this.switchPlayer();
        }
      });
      this.widget.find('.reset').click(function() {
        _this.widget.children().remove();
        return new GameLogic(_this.widget.attr('id'), _this.size);
      });
    }

    GrabSquares.prototype.anotherPlayer = function() {
      if (this.currentPlayer === 'p1') {
        return 'p2';
      }
      return 'p1';
    };

    GrabSquares.prototype.switchPlayer = function() {
      this.main.removeClass(this.currentPlayer);
      this.widget.find('.current').removeClass(this.currentPlayer);
      this.currentPlayer = this.anotherPlayer();
      this.main.addClass(this.currentPlayer);
      return this.widget.find('.current').addClass(this.currentPlayer);
    };

    GrabSquares.prototype.updateScore = function() {
      this.widget.find('.Nplayer1').text((this.main.find('.grid.p1').length));
      return this.widget.find('.Nplayer2').text((this.main.find('.grid.p2').length));
    };

    GrabSquares.prototype.checkEdge = function(type, ii, jj) {
      var changed, square1, square2, x, y, _i, _len, _ref, _ref1;

      square1 = type === 'v' ? [jj - 1, ii] : [jj, ii - 1];
      square2 = [jj, ii];
      changed = false;
      _ref = [square1, square2];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        _ref1 = _ref[_i], x = _ref1[0], y = _ref1[1];
        if ((0 <= x && x < this.size) && (0 <= y && y < this.size)) {
          if (++this.map[y][x] === 4) {
            $('#g-' + y + '-' + x).addClass(this.currentPlayer);
            changed = true;
          }
        }
      }
      if (changed) {
        this.switchPlayer();
      }
      return this.updateScore();
    };

    return GrabSquares;

  })();

  $(function() {
    return new GrabSquares('gamepart', 10);
  });

}).call(this);
