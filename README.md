# Conversion Blocks

Beautiful Gutenberg blocks that convert visitors into customers.

## Blocks

- **Pricing Table** - Beautiful pricing displays with multiple plans
- **Accordion / FAQ** - Organize content in expandable sections
- **Feature Grid** - Showcase features in a responsive grid with icons
- **Button** - Call-to-action buttons with hover effects

## Development

### Prerequisites

- Node.js 18+
- npm or pnpm
- WordPress 6.0+
- PHP 7.4+

### Build Blocks

```bash
# Install dependencies
npm install
# or
pnpm install

# Build for production
npm run build

# Development with watch
npm run start
```

### Plugin Structure

```
conversion-blocks/
├── blocks/               # Block source files
│   ├── pricing-table/
│   ├── accordion/
│   └── button/
├── src/                 # PHP source
│   ├── Main.php
│   ├── Blocks/
│   ├── Admin/
│   └── Assets/
├── assets/              # Compiled assets
└── conversion-blocks.php    # Main plugin file
```

### Install in WordPress

1. Build the blocks: `npm run build`
2. Generate autoloader: `composer install --no-dev`
3. Zip the plugin (excluding `node_modules`, `src/` except compiled)
4. Upload to WordPress via Plugins > Add New > Upload
5. Activate the plugin

### Testing

The plugin follows WordPress.org Plugin Check standards. Run checks with:

```bash
wp plugin check conversion-blocks
```

## Architecture

Based on the Scanfully architecture:

- **Singleton Pattern** - Main class with single instance
- **Namespaced** - All classes under `ConversionBlocks\` namespace
- **PSR-4 Autoloading** - Composer autoloader
- **Controller Pattern** - Separate controllers for Blocks, Admin, Assets
- **Security First** - ABSPATH checks, output escaping, input sanitization

## License

GPL v3 or later

## Support

- [Support Forum](https://wordpress.org/support/plugin/conversion-blocks/)
- [GitHub Issues](https://github.com/barrykooij/conversion-blocks/issues)
