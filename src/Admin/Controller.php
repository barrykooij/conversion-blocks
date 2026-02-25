<?php
/**
 * Admin Controller
 *
 * @package ConversionBlocks\Admin
 */

namespace ConversionBlocks\Admin;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

/**
 * Handles admin functionality
 */
class Controller {

	/**
	 * Setup admin functionality
	 *
	 * @return void
	 */
	public static function setup(): void {
		add_filter( 'plugin_action_links_' . plugin_basename( CONVERSION_BLOCKS_PLUGIN_FILE ), [ __CLASS__, 'add_action_links' ] );
	}

	/**
	 * Add action links to plugin list
	 *
	 * @param array $links Existing action links.
	 * @return array Modified action links.
	 */
	public static function add_action_links( array $links ): array {
		return $links;
	}
}
