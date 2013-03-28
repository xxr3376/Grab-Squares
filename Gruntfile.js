module.exports = function(grunt) {
  'use strict';
  // Project configuration.
  grunt.initConfig({
    watch: {
	   coffee: {
			files: ['js/*.coffee'],
			tasks: ['coffee']
		},
		less : {
			files: ['css/*.less'],
			tasks: ['less']
		}
	},
  coffee: {
	compile: {
		files: {
			'js/grab_squares.js' : 'js/grab_squares.coffee'
			}
		}
	},
	less: {
		compile: {
			options: {
				compress : true
			},
			files: {
				"css/style.css" : "css/style.less"
			}
		}
	},
    connect: {
      server: {
        options: {
          port: 9999,
          hostname: '0.0.0.0',
          base: '.'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib');

  grunt.registerTask('default',  ['less', 'coffee', 'connect', 'watch']);

};
