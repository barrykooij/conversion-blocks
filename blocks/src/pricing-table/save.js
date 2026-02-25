/**
 * WordPress dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';

/**
 * Save component (frontend rendering)
 */
export default function save({ attributes }) {
	const { plans, buttonWidth } = attributes;
	const blockProps = useBlockProps.save({
		className: `conversion-blocks-pricing-table conversion-blocks-button-width-${buttonWidth || 'fit'}`,
	});

	return (
		<div {...blockProps}>
			<div className="conversion-blocks-pricing-grid">
				{plans.map((plan, index) => (
					<div
						key={index}
						className={`conversion-blocks-pricing-plan ${plan.highlighted ? 'conversion-blocks-is-highlighted' : ''}`}
					>
						{plan.highlighted && (
							<span className="conversion-blocks-plan-badge">Popular</span>
						)}
						
						<div className="conversion-blocks-plan-header">
							<RichText.Content
								tagName="h3"
								value={plan.name}
								className="conversion-blocks-plan-name"
							/>
							
							<div className="conversion-blocks-plan-price">
								<RichText.Content
									tagName="span"
									value={plan.price}
									className="conversion-blocks-price-amount"
								/>
								<RichText.Content
									tagName="span"
									value={plan.period}
									className="conversion-blocks-price-period"
								/>
							</div>
						</div>

						<ul className="conversion-blocks-plan-features">
							{plan.features.map((feature, featureIndex) => (
								<li key={featureIndex}>
									<span className="conversion-blocks-plan-check-icon">✓</span>
									<RichText.Content
										tagName="span"
										value={feature}
									/>
								</li>
							))}
						</ul>

						<div className="conversion-blocks-plan-button">
							<a
								href={plan.buttonUrl || '#'}
								className={`conversion-blocks-plan-btn ${plan.highlighted ? 'conversion-blocks-is-highlighted' : ''}`}
							>
								{plan.buttonText}
							</a>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
