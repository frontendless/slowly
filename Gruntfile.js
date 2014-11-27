module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      html: {
        files: [{
            expand: true,
            dot: true,
            cwd: 'app/templates',
            dest: 'dist/templates',
            src: [
                '*.html'
            ]
        }]
      }
    },
    useminPrepare: {
      html: 'dist/templates/layout.html'
    },
    usemin: {
      html: 'dist/templates/layout.html',
    },
    uncss: {
      dist: {
        options: {
          htmlroot: 'public'
        },
        files: {
          'dist/css/optimized.css': ['app/templates/layout.html', 'app/templates/home.html', 'app/templates/login.html', 'app/templates/details.html', 'public/partials/modal.html']
        }
      }
    },
    watch: {
      html: {
          files: ['app/templates/*'],
          tasks: ['default']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-uncss');

  grunt.registerTask('default',[
    'copy:html',
    'useminPrepare',
    'concat',
    'uglify',
    'cssmin',
    'usemin'
  ]);

};