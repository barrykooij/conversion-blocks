<?php
/**
 * Conversion Blocks WordPress Plugin
 *
 * @package   ConversionBlocks
 * @copyright Copyright (C) 2026, LV2 - wpplugins@lv2.nl
 * @license   http://www.gnu.org/licenses/gpl-3.0.html GNU General Public License, version 3 or higher
 *
 * @wordpress-plugin
 * Plugin Name: Conversion Blocks
 * Version:     1.0.0
 * Plugin URI:  https://wordpress.org/plugins/conversion-blocks/
 * Description: Beautiful Gutenberg blocks that convert visitors into customers. Premium blocks for pricing tables, accordions, and more.
 * Author:      LV2
 * Author URI:  https://lv2.nl
 * Text Domain: conversion-blocks
 * Domain Path: /languages/
 * License:     GPL v3
 * Requires at least: 6.0
 * Requires PHP: 7.4
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

// Define constants early so they are available to activation hooks
define( 'CONVERSION_BLOCKS_VERSION', '1.0.0' );
define( 'CONVERSION_BLOCKS_PLUGIN_FILE', __FILE__ );
define( 'CONVERSION_BLOCKS_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'CONVERSION_BLOCKS_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

// Load composer autoloader
if ( file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
	require __DIR__ . '/vendor/autoload.php';
}

/**
 * Singleton accessor for the main plugin class
 *
 * @return \ConversionBlocks\Main
 */
function ConversionBlocks(): \ConversionBlocks\Main {
	return \ConversionBlocks\Main::get();
}

// Boot the plugin
add_action( 'plugins_loaded', function () {
	// Setup the plugin
	ConversionBlocks()->setup();
}, 20 );

// Activation hook
register_activation_hook( __FILE__, function () {
	// Set default options on activation
	if ( ! get_option( 'conversion_blocks_version' ) ) {
		update_option( 'conversion_blocks_version', CONVERSION_BLOCKS_VERSION );
		update_option( 'conversion_blocks_activated_at', time() );
	}
} );

// Deactivation hook
register_deactivation_hook( __FILE__, function () {
	// Cleanup if needed
} );
