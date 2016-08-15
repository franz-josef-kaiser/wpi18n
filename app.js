/* global module, process, require, __dirname */
'use strict';

var Hapi    = require( 'hapi' ),
    Promise = require( 'bluebird' ),
    Joi     = require( 'joi' ),
    Zip     = require( 'jszip' );

var server   = new Hapi.Server(),
    handlers = {};

server.connection( {
	host : '0.0.0.0',
	port : process.env.PORT || 5000
} );

server.route( {
	method : 'GET',
	path   : '/{scope}/packages.json',
	config : {
		handler  : function( request, reply ) {
console.info( request.payload );

			reply( {
				packages : {
					"lang/plugin" : {
						name    : "test/name",
						version : "1.0.0",
						dist    : {
							url  : request.connection.info.protocol
								+ '://' + request.info.host + request.url.path,
							type : "zip"
						}
					},
					"lang/theme" : {}
				}
			} )
				.header(
					'Content-disposition',
					'attachment; filename=packages.json'
				)
				.type( 'application/json' );
		},
		validate : {
			params : {
				scope : Joi.string()
					.regex( /^(core|plugin|theme)$/ )
					.insensitive()
					.optional()
					.description( 'Type of package: Core, Plugin, Theme' )
			},
			query  : {
				v : Joi.number()
					.integer()
					.min( 0 )
					.default( 0 )
					.optional()
					.description( 'Version Number for the requested package' )
			}
		}
	}
} );

server.start( function() {
	console.info( server.info, 4 );
} );