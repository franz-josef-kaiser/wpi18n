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
	path   : '/{scope?}',
	config : {
		handler  : function( request, reply ) {
			reply( {
				params : request.params,
				query  : request.query
			} )
				.header( 'Content-Type', 'application/json' );
			/*reply( { foo : 'bar' } )
			 .header( 'Content-Type', 'application/json' );*/
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