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
	SelectControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Editor component
 */
export default function Edit({ attributes, setAttributes }) {
	const { plans, buttonWidth } = attributes;
	const blockProps = useBlockProps({
		className: `conversion-blocks-pricing-table conversion-blocks-button-width-${buttonWidth || 'fit'}`,
	});

	const updatePlan = (index, key, value) => {
		const newPlans = [...plans];
		newPlans[index][key] = value;
		setAttributes({ plans: newPlans });
	};

	const updateFeature = (planIndex, featureIndex, value) => {
		const newPlans = [...plans];
		newPlans[planIndex].features[featureIndex] = value;
		setAttributes({ plans: newPlans });
	};

	const addFeature = (planIndex) => {
		const newPlans = [...plans];
		newPlans[planIndex].features.push('New feature');
		setAttributes({ plans: newPlans });
	};

	const removeFeature = (planIndex, featureIndex) => {
		const newPlans = [...plans];
		newPlans[planIndex].features.splice(featureIndex, 1);
		setAttributes({ plans: newPlans });
	};

	const addPlan = () => {
		const newPlans = [...plans, {
			name: 'New Plan',
			price: '$0',
			period: '/month',
			features: ['Feature 1', 'Feature 2'],
			buttonText: 'Get Started',
			buttonUrl: '',
			highlighted: false,
		}];
		setAttributes({ plans: newPlans });
	};

	const removePlan = (index) => {
		const newPlans = [...plans];
		newPlans.splice(index, 1);
		setAttributes({ plans: newPlans });
	};

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Conversion Blocks Pricing Table', 'conversion-blocks')}>
					<p>{__('Edit your pricing plans in the block editor.', 'conversion-blocks')}</p>
					<SelectControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={__('Button Width', 'conversion-blocks')}
						value={buttonWidth || 'fit'}
						options={[
							{ label: __('Fit to content', 'conversion-blocks'), value: 'fit' },
							{ label: __('Full width', 'conversion-blocks'), value: 'full' },
						]}
						onChange={(value) => setAttributes({ buttonWidth: value })}
					/>
					<Button
						variant="primary"
						onClick={addPlan}
					>
						{__('Add Plan', 'conversion-blocks')}
					</Button>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="conversion-blocks-pricing-grid">
					{plans.map((plan, planIndex) => (
						<div
							key={planIndex}
							className={`conversion-blocks-pricing-plan ${plan.highlighted ? 'conversion-blocks-is-highlighted' : ''}`}
						>
							{plans.length > 1 && (
								<Button
								variant="tertiary"
								isDestructive
								size="small"
									onClick={() => removePlan(planIndex)}
									className="conversion-blocks-remove-plan"
								>
									{__('Remove', 'conversion-blocks')}
								</Button>
							)}

							<div className="conversion-blocks-plan-header">
								<RichText
									tagName="h3"
									value={plan.name}
									onChange={(value) => updatePlan(planIndex, 'name', value)}
									placeholder={__('Plan Name', 'conversion-blocks')}
									className="conversion-blocks-plan-name"
								/>
								
								<div className="conversion-blocks-plan-price">
									<RichText
										tagName="span"
										value={plan.price}
										onChange={(value) => updatePlan(planIndex, 'price', value)}
										placeholder={__('$0', 'conversion-blocks')}
										className="conversion-blocks-price-amount"
									/>
									<RichText
										tagName="span"
										value={plan.period}
										onChange={(value) => updatePlan(planIndex, 'period', value)}
										placeholder={__('/month', 'conversion-blocks')}
										className="conversion-blocks-price-period"
									/>
								</div>
							</div>

							<div className="conversion-blocks-plan-features">
								{plan.features.map((feature, featureIndex) => (
									<div key={featureIndex} className="conversion-blocks-plan-feature-item">
										<RichText
											tagName="div"
											value={feature}
											onChange={(value) => updateFeature(planIndex, featureIndex, value)}
											placeholder={__('Feature', 'conversion-blocks')}
										/>
										<Button
										size="small"
											isDestructive
											onClick={() => removeFeature(planIndex, featureIndex)}
										>
											✕
										</Button>
									</div>
								))}
								<Button
									variant="secondary"
									size="small"
									onClick={() => addFeature(planIndex)}
								>
									{__('Add Feature', 'conversion-blocks')}
								</Button>
							</div>

							<div className="conversion-blocks-plan-button">
								<TextControl
									__nextHasNoMarginBottom
									__next40pxDefaultSize
									label={__('Button Text', 'conversion-blocks')}
									value={plan.buttonText}
									onChange={(value) => updatePlan(planIndex, 'buttonText', value)}
								/>
								<TextControl
									__nextHasNoMarginBottom
									__next40pxDefaultSize
									label={__('Button URL', 'conversion-blocks')}
									value={plan.buttonUrl}
									onChange={(value) => updatePlan(planIndex, 'buttonUrl', value)}
									placeholder="https://"
								/>
							</div>

							<ToggleControl
								__nextHasNoMarginBottom
								label={__('Highlight this plan', 'conversion-blocks')}
								checked={plan.highlighted}
								onChange={(value) => updatePlan(planIndex, 'highlighted', value)}
							/>
						</div>
					))}
				</div>
			</div>
		</Fragment>
	);
}
