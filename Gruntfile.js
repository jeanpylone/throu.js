"use strict";

module.exports = function(grunt) {
  grunt.initConfig({
    jsbeautifier:{
      src: {
        src:['throu.js']
      }
    },
    jshint: {
      all: [
        "Gruntfile.js", "throu.js", "test/**/*.js"
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    connect:{
      test:{
        options:{
          base:'dist/run',
          port:'9901',
          keepalive:true
        }
      }
    },
    copy:{
      testrun:{
        files:[
          {src:'throu.js', dest:'dist/run/'},
          {cwd:'test', src:'index.html', expand:true, dest:'dist/run/'},
          {cwd:'data', src:'sample*.json', expand:true, dest:'dist/run/'}
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-jsbeautifier');

  grunt.registerTask('mtest', ['copy:testrun', 'connect:test']);
};