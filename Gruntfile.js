module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({

    connect: {
      server: {
        options: {
          hostname: 'localhost',
          open: true,
          keepalive: true
        }
      }
    }
    
  });

  grunt.registerTask('default', ['connect']);
};