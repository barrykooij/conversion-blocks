<?php
/**
 * Assets Controller
 *
 * @package ConversionBlocks\Assets
 */

namespace ConversionBlocks\Assets;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

/**
 * Handles frontend and editor assets
 */
class Controller {

	/**
	 * Setup assets
	 *
	 * @return void
	 */
	public static function setup(): void {
		add_action( 'enqueue_block_assets', [ __CLASS__, 'enqueue_block_assets' ] );
		add_action( 'enqueue_block_editor_assets', [ __CLASS__, 'enqueue_block_editor_assets' ] );
	}

	/**
	 * Enqueue block assets (frontend + editor)
	 *
	 * @return void
	 */
	public static function enqueue_block_assets(): void {
		// Enqueue frontend styles
		wp_enqueue_style(
			'conversion-blocks-blocks',
			CONVERSION_BLOCKS_PLUGIN_URL . 'assets/css/blocks.css',
			[],
			CONVERSION_BLOCKS_VERSION
		);

		// Enqueue frontend scripts if needed
		wp_enqueue_script(
			'conversion-blocks-blocks',
			CONVERSION_BLOCKS_PLUGIN_URL . 'assets/js/blocks.js',
			[],
			CONVERSION_BLOCKS_VERSION,
			[
				'in_footer' => true,
				'strategy'  => 'defer',
			]
		);
	}

	/**
	 * Enqueue editor-only assets
	 *
	 * @return void
	 */
	public static function enqueue_block_editor_assets(): void {
		wp_enqueue_media();
	}
}
