/**
 * WordPress dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';

/**
 * Save component (frontend rendering)
 */
export default function save({ attributes }) {
	const { text, url, openInNewTab, style, size, alignment } = attributes;
	
	const blockProps = useBlockProps.save({
		className: `conversion-blocks-button-wrapper conversion-blocks-align-${alignment}`,
	});

	const linkProps = {
		href: url || '#',
		className: `conversion-blocks-button conversion-blocks-button-${style} conversion-blocks-button-${size}`,
		...(openInNewTab && { target: '_blank', rel: 'noopener noreferrer' }),
	};

	return (
		<div {...blockProps}>
			<a {...linkProps}>
				<RichText.Content tagName="span" value={text} />
			</a>
		</div>
	);
}
