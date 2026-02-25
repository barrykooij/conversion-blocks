const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );
const CopyPlugin = require( 'copy-webpack-plugin' );

module.exports = {
	...defaultConfig,
	performance: {
		// The feature-grid block bundles ~324 Heroicons inline (~287 KiB).
		// This is editor-only JS (not loaded on the frontend), so raising the
		// asset-size threshold avoids noisy warnings during every build.
		maxAssetSize: 350 * 1024,
		maxEntrypointSize: 350 * 1024,
	},
	entry: {
		'accordion/index': path.resolve( __dirname, 'blocks/src/accordion/index.js' ),
		'accordion/view': path.resolve( __dirname, 'blocks/src/accordion/view.js' ),
		'button/index': path.resolve( __dirname, 'blocks/src/button/index.js' ),
		'feature-grid/index': path.resolve( __dirname, 'blocks/src/feature-grid/index.js' ),
		'pricing-table/index': path.resolve( __dirname, 'blocks/src/pricing-table/index.js' ),
	},
	output: {
		...defaultConfig.output,
		path: path.resolve( __dirname, 'blocks/dist' ),
	},
	plugins: [
		...( defaultConfig.plugins || [] ).filter(
			( plugin ) => plugin.constructor.name !== 'CopyPlugin'
		),
		new CopyPlugin( {
			patterns: [
				{
					from: 'blocks/src/*/block.json',
					to( { absoluteFilename } ) {
						const parts = absoluteFilename.split( '/blocks/src/' );
						const blockName = parts[ 1 ].split( '/' )[ 0 ];
						return path.resolve( __dirname, `blocks/dist/${ blockName }/block.json` );
					},
				},
			],
		} ),
	],
};
