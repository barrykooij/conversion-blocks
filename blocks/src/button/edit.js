/**
 * WordPress dependencies
 */
import {
	AlignmentControl,
	BlockControls,
	InspectorControls,
	RichText,
	URLInput,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	ToggleControl,
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { link } from '@wordpress/icons';

/**
 * Editor component
 */
export default function Edit({ attributes, setAttributes }) {
	const { text, url, openInNewTab, style, size, alignment } = attributes;
	
	const blockProps = useBlockProps({
		className: `conversion-blocks-button-wrapper conversion-blocks-align-${alignment}`,
	});

	return (
		<Fragment>
			<BlockControls>
				<AlignmentControl
					value={alignment}
					onChange={(newAlignment) => setAttributes({ alignment: newAlignment || 'left' })}
				/>
				<ToolbarGroup>
					<ToolbarButton
						icon={link}
						title={__('Link', 'conversion-blocks')}
						onClick={() => {}}
					/>
				</ToolbarGroup>
			</BlockControls>

			<InspectorControls>
				<PanelBody title={__(' Conversion Blocks Button', 'conversion-blocks')}>
					<SelectControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={__('Style', 'conversion-blocks')}
						value={style}
						options={[
							{ label: __('Primary', 'conversion-blocks'), value: 'primary' },
							{ label: __('Secondary', 'conversion-blocks'), value: 'secondary' },
							{ label: __('Outline', 'conversion-blocks'), value: 'outline' },
						]}
						onChange={(value) => setAttributes({ style: value })}
					/>
					<SelectControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={__('Size', 'conversion-blocks')}
						value={size}
						options={[
							{ label: __('Small', 'conversion-blocks'), value: 'small' },
							{ label: __('Medium', 'conversion-blocks'), value: 'medium' },
							{ label: __('Large', 'conversion-blocks'), value: 'large' },
						]}
						onChange={(value) => setAttributes({ size: value })}
					/>
				</PanelBody>
				<PanelBody title={__('Link Settings', 'conversion-blocks')}>
					<URLInput
						label={__('URL', 'conversion-blocks')}
						value={url}
						onChange={(value) => setAttributes({ url: value })}
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label={__('Open in new tab', 'conversion-blocks')}
						checked={openInNewTab}
						onChange={(value) => setAttributes({ openInNewTab: value })}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<RichText
					tagName="span"
					value={text}
					onChange={(value) => setAttributes({ text: value })}
					placeholder={__('Button text...', 'conversion-blocks')}
					className={`conversion-blocks-button conversion-blocks-button-${style} conversion-blocks-button-${size}`}
					allowedFormats={[]}
				/>
			</div>
		</Fragment>
	);
}
