<?php
/**
 * Main Plugin Class
 *
 * @package ConversionBlocks
 */

namespace ConversionBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

/**
 * The main class - where everything starts
 */
class Main {

	/**
	 * Singleton instance
	 *
	 * @var ?Main
	 */
	private static ?Main $instance = null;

	/**
	 * Get singleton instance
	 *
	 * @return Main
	 */
	public static function get(): Main {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Private constructor to prevent direct instantiation
	 */
	private function __construct() {
		// Prevent direct instantiation
	}

	/**
	 * Setup the plugin
	 *
	 * @return void
	 */
	public function setup(): void {
		// Register blocks
		Blocks\Controller::setup();

		// Register admin pages
		Admin\Controller::setup();

		// Register assets
		Assets\Controller::setup();
	}

}
