/**
 * WordPress dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { FeatureIcon } from './icons';

/**
 * Save component (frontend rendering)
 */
export default function save( { attributes } ) {
	const { features, columns, iconSize, alignment } = attributes;
	const blockProps = useBlockProps.save( {
		className: `conversion-blocks-feature-grid conversion-blocks-columns-${ columns } conversion-blocks-icon-${ iconSize } conversion-blocks-align-${ alignment }`,
	} );

	return (
		<div { ...blockProps }>
			<div className="conversion-blocks-feature-items">
				{ features.map( ( feature, index ) => (
					<div key={ index } className="conversion-blocks-feature-item">
						<div className="conversion-blocks-feature-icon">
							{ feature.imageUrl ? (
								<img
									src={ feature.imageUrl }
									alt=""
									className="conversion-blocks-feature-icon-img"
								/>
							) : (
								<FeatureIcon
									name={ feature.icon }
									iconStyle={ feature.iconStyle || 'outline' }
									className="conversion-blocks-feature-icon-svg"
								/>
							) }
						</div>

						<RichText.Content
							tagName="h3"
							value={ feature.title }
							className="conversion-blocks-feature-title"
						/>

						<RichText.Content
							tagName="p"
							value={ feature.description }
							className="conversion-blocks-feature-description"
						/>
					</div>
				) ) }
			</div>
		</div>
	);
}
