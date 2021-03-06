/*
* desarrollowebnodejs Gruntfile
*
* Desarrollo Web NodeJS • Quito Ecuador
*
* Copyright (c) 2017 Desarrollo Web NodeJS • Quito Ecuador
* Bajo licencia MIT (https://github.com/DesarrolloWebNodeJS/desarrollowebnodejs.github.io/blob/master/LICENCIA)
* Para contacto y soporte: https://desarrollowebnodejs.github.io
*/

module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);
	grunt.initConfig({
		leerJson: grunt.file.readJSON('package.json'),
		estandarte: '/*\n' +
		'* <%= leerJson.name %> version: <%= leerJson.version %>\n' +
		'*\n' +
		'* <%= leerJson.description %>\n' +
		'*\n' +
		'* Copyright (c) 2017 Desarrollo Web NodeJS • Quito Ecuador \n' +
		'* Bajo licencia MIT (https://github.com/DesarrolloWebNodeJS/desarrollowebnodejs.github.io/blob/master/LICENCIA)\n' + 
		'* Contacto / Soporte: <%= leerJson.homepage %>\n' +                    
		'*/\n\n',
		watch: {
			scripts: {
			    files: 'js/*',
			    tasks: ['uglify', 'desarrollo'],
		  },
		},
		uglify: {
			main: {
				options: {
					banner: '<%= estandarte %>',
					preserveComments: 'some'
				},
				files: {
					'act/js/vr1.min.js': ['js/jvr1.js']
				}
			}
		},
		copy: {
			activos: {
				files: [
				{
					expand: true, 
					flatten: true,
					src: ['bower_components/font-awesome/fonts/*'], 
					dest: 'act/fonts', 
					filter: 'isFile'
				},
				{
					expand: true,
					flatten: true,
					src: ["bower_components/font-awesome/css/font-awesome.min.css",
					"bower_components/animate.css/animate.min.css"],
					dest: "act/css/" 
				},
				{
					expand: true,
					flatten: true,
					src: ["bower_components/jquery/dist/jquery.min.js",
					"bower_components/jquery/dist/jquery.min.map",
					"bower_components/tether/dist/js/tether.min.js",
					"bower_components/jquery.easing/jquery.easing.min.js",
					"bower_components/moment/min/moment-with-locales.min.js"],
					dest: "act/js/" 
				}
			]
			}
		},
		browserSync: {
			dev: {
				bsFiles: {
					src : [
						'_site/**/*.*',
						'act/**/*.*'					]
				},
				options: {
                    online: false,
                    background: true,
					notify: false,
					watchTask: true,
					server: '_site/',
					port: 3005,
					ui: {
    					port: 4005
					}
				}
			}
		},
		exec: {
			build: {
				cmd: 'bundle exec jekyll build -w -I'
			},
			server: {
				cmd: 'bundle exec jekyll serve'
			},
			deploy: {
				cmd: 'rsync --progress -a --delete -e "ssh -q" _site/ myuser@host:mydir/'
			}
		}
	});
	grunt.registerTask("construir_bienes", ['uglify']);
	grunt.registerTask("distribuir_activos", ['copy:activos', 'construir_bienes']);
	grunt.registerTask("deploy", ['distribuir_activos', 'exec:server']);
	grunt.registerTask("desarrollo", ['browserSync', 'exec:build']);
	grunt.registerTask('default', ['desarrollo']);
};
