module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // Minify, copy and add a banner to specified js file:
    uglify: {
      options: {
        banner: '/** <%= pkg.name %> v<%= pkg.version %> build <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/app.js',
        dest: 'build/app.js'
      }
    },
    // concatenate all vendor js files to build 
    concat: {
      options: {},
      dist: {
        src: [
              'bower_components/jquery/dist/jquery.min.js',
              'bower_components/bootstrap/dist/js/bootstrap.min.js',
              'bower_components/angular/angular.min.js'
             ],
        dest: 'build/vendor.js'
      }
    },
    // Check all js files with jshint:
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js'],
      options: {
        // options to override JSHint defaults
        globals: {
          angular: true,
          module: true,
          document: true
        }
      }
    },
    // Copy specified files to build folder:
    copy: {
      css: {
        files: [{
          expand: true,
          flatten: true,
          src: ['bower_components/bootstrap/dist/css/bootstrap.min.css',
                'src/**/*.css'],
          dest: 'build/css/'
        }]
      },      
      html: {
        files: [{
          expand: true,
          flatten: true,
          src: ['src/**/*.html'],
          dest: 'build/'
        }],
        options: {
          process: function (content, srcpath) {
            // Remove all html comments
            content = content.replace(/<!--[\s\S]*?-->\s*\n*/g, "");
            //Remove bower_component script elements
            content = content.replace(/<script.*\/bower_components\/.*script>\s*\n*/g, "");
            // Change bootstrap css file path
            content = content.replace(/..\/bower_components\/bootstrap\/dist\//g, "");
            // Add vendor.js before first script tag
            content = content.replace(/<script/, '<script src="vendor.js"></script>\n<script');
            return content;
          }
        }
      }
    }
  });

  // Load the plugins that provide the grunt tasks
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default tasks
  grunt.registerTask('default', ['jshint', 'uglify', 'concat', 'copy']);

};