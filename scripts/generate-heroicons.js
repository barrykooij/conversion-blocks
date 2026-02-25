/**
 * Generate Heroicons data for the Feature Grid block.
 *
 * This script:
 * 1. Copies all optimized 24px SVG source files into assets/icons/heroicons/
 * 2. Generates a JS data module (blocks/feature-grid/heroicons-data.js) that
 *    contains the inner SVG markup for every icon in both outline and solid styles.
 *
 * Run: node scripts/generate-heroicons.js
 */

const fs = require( 'fs' );
const path = require( 'path' );

const PLUGIN_ROOT = path.resolve( __dirname, '..' );
const HEROICONS_SRC = path.join( PLUGIN_ROOT, 'node_modules/heroicons/24' );
const ASSETS_DEST = path.join( PLUGIN_ROOT, 'assets/icons/heroicons' );
const DATA_DEST = path.join( PLUGIN_ROOT, 'blocks/feature-grid/heroicons-data.js' );

const STYLES = [ 'outline', 'solid' ];

/**
 * Extract the inner content from an SVG file (everything between <svg> tags).
 */
function extractSvgInner( svgContent ) {
	const match = svgContent.match( /<svg[^>]*>([\s\S]*?)<\/svg>/ );
	if ( ! match ) {
		return '';
	}
	return match[ 1 ].trim().replace( /\n\s*/g, '' );
}

/**
 * Convert a filename like "arrow-down-circle.svg" to a readable label "Arrow Down Circle".
 */
function fileNameToLabel( filename ) {
	return filename
		.replace( '.svg', '' )
		.split( '-' )
		.map( ( word ) => word.charAt( 0 ).toUpperCase() + word.slice( 1 ) )
		.join( ' ' );
}

function run() {
	const data = {};

	for ( const style of STYLES ) {
		const srcDir = path.join( HEROICONS_SRC, style );
		const destDir = path.join( ASSETS_DEST, style );

		// Ensure destination exists
		fs.mkdirSync( destDir, { recursive: true } );

		const files = fs.readdirSync( srcDir ).filter( ( f ) => f.endsWith( '.svg' ) ).sort();

		console.log( `Processing ${ files.length } ${ style } icons...` );

		for ( const file of files ) {
			const name = file.replace( '.svg', '' );
			const svgContent = fs.readFileSync( path.join( srcDir, file ), 'utf8' );

			// Copy source SVG to plugin assets
			fs.copyFileSync( path.join( srcDir, file ), path.join( destDir, file ) );

			// Extract inner SVG markup
			const inner = extractSvgInner( svgContent );

			if ( ! data[ name ] ) {
				data[ name ] = {
					label: fileNameToLabel( file ),
				};
			}
			data[ name ][ style ] = inner;
		}
	}

	const iconNames = Object.keys( data ).sort();

	// Generate JS data module
	const lines = [
		'/**',
		' * Auto-generated Heroicons data — DO NOT EDIT MANUALLY.',
		' *',
		' * Source: Heroicons by Tailwind Labs (https://heroicons.com)',
		' * License: MIT (https://github.com/tailwindlabs/heroicons/blob/master/LICENSE)',
		` * Generated: ${ new Date().toISOString().split( 'T' )[ 0 ] }`,
		` * Icons: ${ iconNames.length } icons × 2 styles (outline, solid)`,
		' */',
		'',
		'/* eslint-disable */',
		'',
		'export const heroicons = {',
	];

	for ( const name of iconNames ) {
		const icon = data[ name ];
		const escapedLabel = icon.label.replace( /'/g, "\\'" );
		const escapedOutline = ( icon.outline || '' ).replace( /\\/g, '\\\\' ).replace( /'/g, "\\'" );
		const escapedSolid = ( icon.solid || '' ).replace( /\\/g, '\\\\' ).replace( /'/g, "\\'" );

		lines.push( `\t'${ name }': {` );
		lines.push( `\t\tlabel: '${ escapedLabel }',` );
		lines.push( `\t\toutline: '${ escapedOutline }',` );
		lines.push( `\t\tsolid: '${ escapedSolid }',` );
		lines.push( '\t},' );
	}

	lines.push( '};' );
	lines.push( '' );
	lines.push( `export const ICON_NAMES = ${ JSON.stringify( iconNames ) };` );
	lines.push( '' );

	fs.writeFileSync( DATA_DEST, lines.join( '\n' ), 'utf8' );

	console.log( `\nDone! Generated ${ iconNames.length } icons.` );
	console.log( `  SVG sources → ${ path.relative( PLUGIN_ROOT, ASSETS_DEST ) }/` );
	console.log( `  JS data     → ${ path.relative( PLUGIN_ROOT, DATA_DEST ) }` );
}

run();
