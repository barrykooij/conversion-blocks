<?php
/**
 * Blocks Controller
 *
 * @package ConversionBlocks\Blocks
 */

namespace ConversionBlocks\Blocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

/**
 * Handles block registration and management
 */
class Controller {

	/**
	 * Available free blocks
	 *
	 * @var array
	 */
	private static array $blocks = [
		'pricing-table',
		'accordion',
		'button',
		'feature-grid',
	];

	/**
	 * Setup blocks
	 *
	 * @return void
	 */
	public static function setup(): void {
		add_action( 'init', [ __CLASS__, 'register_blocks' ] );
		add_action( 'enqueue_block_editor_assets', [ __CLASS__, 'enqueue_editor_assets' ] );
	}

	/**
	 * Register all blocks
	 *
	 * @return void
	 */
	public static function register_blocks(): void {
		// Register block category
		add_filter( 'block_categories_all', [ __CLASS__, 'register_block_category' ] );

		// Register each block
		foreach ( self::$blocks as $block ) {
			$block_path = CONVERSION_BLOCKS_PLUGIN_DIR . 'blocks/dist/' . $block;
			
			if ( file_exists( $block_path . '/block.json' ) ) {
				register_block_type( $block_path );
			}
		}
	}

	/**
	 * Register Conversion Blocks block category
	 *
	 * @param array $categories Existing block categories.
	 * @return array Modified block categories.
	 */
	public static function register_block_category( array $categories ): array {
		return array_merge(
			[
				[
					'slug'  => 'conversion-blocks',
					'title' => __( 'ConversionBlocks', 'conversion-blocks' ),
					'icon'  => 'star-filled',
				],
			],
			$categories
		);
	}

	/**
	 * Enqueue editor assets
	 *
	 * @return void
	 */
	public static function enqueue_editor_assets(): void {
		// Enqueue editor styles
		wp_enqueue_style(
			'conversion-blocks-editor',
			CONVERSION_BLOCKS_PLUGIN_URL . 'assets/css/editor.css',
			[],
			CONVERSION_BLOCKS_VERSION
		);

	}

	/**
	 * Get list of all available blocks
	 *
	 * @return array
	 */
	public static function get_all_blocks(): array {
		return self::$blocks;
	}
}
