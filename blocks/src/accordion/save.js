/**
 * WordPress dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';

/**
 * Save component (frontend rendering)
 */
export default function save({ attributes }) {
	const { items, openFirst, closeOthers } = attributes;
	const blockProps = useBlockProps.save({
		className: 'conversion-blocks-accordion',
		...(closeOthers && { 'data-close-others': 'true' }),
	});

	return (
		<div {...blockProps}>
			<div className="conversion-blocks-accordion-items">
				{items.map((item, index) => (
					<details key={index} className="conversion-blocks-accordion-item" open={openFirst && index === 0}>
						<summary className="conversion-blocks-accordion-header">
							<RichText.Content
								tagName="span"
								value={item.question}
								className="conversion-blocks-accordion-question"
							/>
							<span className="conversion-blocks-accordion-icon" aria-hidden="true">▼</span>
						</summary>
						<div className="conversion-blocks-accordion-content">
							<RichText.Content
								tagName="div"
								value={item.answer}
							/>
						</div>
					</details>
				))}
			</div>
		</div>
	);
}
