/**
 * WordPress dependencies
 */
import {
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	Button,
	PanelBody,
	ToggleControl,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Editor component
 */
export default function Edit({ attributes, setAttributes }) {
	const { items, openFirst, closeOthers } = attributes;
	const blockProps = useBlockProps({
		className: 'conversion-blocks-accordion',
	});

	const updateItem = (index, key, value) => {
		const newItems = items.map((item, i) => {
			if (i === index) {
				return { ...item, [key]: value };
			}
			return item;
		});
		setAttributes({ items: newItems });
	};

	const addItem = () => {
		const newItems = [...items, {
			question: 'New Question',
			answer: 'Your answer here...',
		}];
		setAttributes({ items: newItems });
	};

	const removeItem = (index) => {
		const newItems = [...items];
		newItems.splice(index, 1);
		setAttributes({ items: newItems });
	};

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Conversion Blocks FAQ Settings', 'conversion-blocks')}>
					<ToggleControl
						__nextHasNoMarginBottom
						label={__('Open first item by default', 'conversion-blocks')}
						checked={openFirst}
						onChange={(value) => setAttributes({ openFirst: value })}
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label={__('Close other items when one is opened', 'conversion-blocks')}
						checked={closeOthers}
						onChange={(value) => setAttributes({ closeOthers: value })}
					/>
					<Button
						variant="primary"
						onClick={addItem}
					>
						{__('Add FAQ Item', 'conversion-blocks')}
					</Button>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="conversion-blocks-accordion-items">
					{items.map((item, index) => (
						<div key={index} className="conversion-blocks-accordion-item">
							<div className="conversion-blocks-accordion-header">
								<RichText
									tagName="div"
									value={item.question}
									onChange={(value) => updateItem(index, 'question', value)}
									placeholder={__('Question...', 'conversion-blocks')}
									className="conversion-blocks-accordion-question"
								/>
								{items.length > 1 && (
									<Button
										isDestructive
										size="small"
										onClick={() => removeItem(index)}
									>
										{__('Remove', 'conversion-blocks')}
									</Button>
								)}
							</div>
							<div className="conversion-blocks-accordion-content">
								<RichText
									tagName="div"
									value={item.answer}
									onChange={(value) => updateItem(index, 'answer', value)}
									placeholder={__('Answer...', 'conversion-blocks')}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</Fragment>
	);
}
