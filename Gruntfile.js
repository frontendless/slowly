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

  grunt.registerTask('default',[
    'copy:html',
    'useminPrepare',
    'concat',
    'uglify',
    'cssmin',
    'usemin'
  ]);

};