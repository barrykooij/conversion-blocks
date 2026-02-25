/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Styles
 */
import './editor.css';
import './style.css';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import Edit from './edit';
import save from './save';

/**
 * Register the Accordion block
 */
registerBlockType(metadata.name, {
	...metadata,
	edit: Edit,
	save,
});
