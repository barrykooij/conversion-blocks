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
	ButtonGroup,
	Dropdown,
	PanelBody,
	RangeControl,
	SearchControl,
	SelectControl,
} from '@wordpress/components';
import { Fragment, useMemo, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { FeatureIcon, getIconLabel, ICON_NAMES } from './icons';

/**
 * Picker tabs: outline icons, solid icons, or custom image.
 */
const PICKER_TAB_OUTLINE = 'outline';
const PICKER_TAB_SOLID   = 'solid';
const PICKER_TAB_IMAGE   = 'image';

/**
 * Icon / image picker popover content.
 */
function IconPickerContent( { currentIcon, currentIconStyle, currentImageUrl, onSelectIcon, onSelectImage, onClose } ) {
	const [ search, setSearch ] = useState( '' );

	// Default to the image tab when there's already a custom image, otherwise
	// match the feature's current icon style.
	const initialTab = currentImageUrl
		? PICKER_TAB_IMAGE
		: ( currentIconStyle || PICKER_TAB_OUTLINE );
	const [ activeTab, setActiveTab ] = useState( initialTab );

	const filtered = useMemo( () => {
		if ( ! search ) {
			return ICON_NAMES;
		}
		const q = search.toLowerCase();
		return ICON_NAMES.filter( ( name ) => {
			const label = getIconLabel( name ).toLowerCase();
			return name.includes( q ) || label.includes( q );
		} );
	}, [ search ] );

	const isIconTab = activeTab === PICKER_TAB_OUTLINE || activeTab === PICKER_TAB_SOLID;

	return (
		<div className="conversion-blocks-feature-icon-picker-content">
			<div className="conversion-blocks-feature-icon-picker-header">
				{ isIconTab && (
					<SearchControl
						value={ search }
						onChange={ setSearch }
						placeholder={ __( 'Search icons…', 'conversion-blocks' ) }
						__nextHasNoMarginBottom
					/>
				) }
				<ButtonGroup className="conversion-blocks-feature-icon-source-switcher">
					<Button
						variant={ activeTab === PICKER_TAB_OUTLINE ? 'primary' : 'secondary' }
						size="small"
						onClick={ () => setActiveTab( PICKER_TAB_OUTLINE ) }
					>
						{ __( 'Outline', 'conversion-blocks' ) }
					</Button>
					<Button
						variant={ activeTab === PICKER_TAB_SOLID ? 'primary' : 'secondary' }
						size="small"
						onClick={ () => setActiveTab( PICKER_TAB_SOLID ) }
					>
						{ __( 'Solid', 'conversion-blocks' ) }
					</Button>
					<Button
						variant={ activeTab === PICKER_TAB_IMAGE ? 'primary' : 'secondary' }
						size="small"
						onClick={ () => setActiveTab( PICKER_TAB_IMAGE ) }
					>
						{ __( 'Image', 'conversion-blocks' ) }
					</Button>
				</ButtonGroup>
			</div>

			{ isIconTab && (
				<div className="conversion-blocks-feature-icon-picker-grid">
					{ filtered.length === 0 && (
						<p className="conversion-blocks-feature-icon-picker-empty">
							{ __( 'No icons found.', 'conversion-blocks' ) }
						</p>
					) }
					{ filtered.map( ( iconName ) => (
						<button
							key={ iconName }
							type="button"
							onClick={ () => {
								onSelectIcon( iconName, activeTab );
								onClose();
							} }
							className={ `conversion-blocks-feature-icon-picker-option ${
								currentIcon === iconName && currentIconStyle === activeTab && ! currentImageUrl
									? 'conversion-blocks-is-active'
									: ''
							}` }
							title={ getIconLabel( iconName ) }
						>
							<FeatureIcon
								name={ iconName }
								iconStyle={ activeTab }
								className="conversion-blocks-feature-icon-svg-small"
							/>
						</button>
					) ) }
				</div>
			) }

			{ activeTab === PICKER_TAB_IMAGE && (
				<div className="conversion-blocks-feature-icon-picker-image-tab">
					{ currentImageUrl && (
						<div className="conversion-blocks-feature-icon-picker-image-preview">
							<img src={ currentImageUrl } alt="" />
							<Button
								variant="secondary"
								isDestructive
								size="small"
								onClick={ () => {
									onSelectImage( '', 0 );
									onClose();
								} }
								className="conversion-blocks-feature-icon-picker-image-remove"
							>
								{ __( 'Remove Image', 'conversion-blocks' ) }
							</Button>
						</div>
					) }
					<Button
						variant="secondary"
						onClick={ () => {
							onClose();
							const frame = window.wp.media( {
								title: __( 'Choose Image', 'conversion-blocks' ),
								library: { type: 'image' },
								multiple: false,
								button: { text: __( 'Select', 'conversion-blocks' ) },
							} );
							frame.on( 'select', () => {
								const attachment = frame.state().get( 'selection' ).first().toJSON();
								onSelectImage( attachment.url, attachment.id );
							} );
							frame.open();
						} }
						className="conversion-blocks-feature-icon-picker-image-upload"
					>
						{ currentImageUrl
							? __( 'Replace Image', 'conversion-blocks' )
							: __( 'Choose Image', 'conversion-blocks' ) }
					</Button>
				</div>
			) }
		</div>
	);
}

/**
 * Editor component for the Feature Grid block
 */
export default function Edit( { attributes, setAttributes } ) {
	const { features, columns, iconSize, alignment } = attributes;
	const blockProps = useBlockProps( {
		className: `conversion-blocks-feature-grid conversion-blocks-columns-${ columns } conversion-blocks-icon-${ iconSize } conversion-blocks-align-${ alignment }`,
	} );

	const updateFeature = ( index, key, value ) => {
		const newFeatures = [ ...features ];
		newFeatures[ index ] = { ...newFeatures[ index ], [ key ]: value };
		setAttributes( { features: newFeatures } );
	};

	const updateFeatureMulti = ( index, updates ) => {
		const newFeatures = [ ...features ];
		newFeatures[ index ] = { ...newFeatures[ index ], ...updates };
		setAttributes( { features: newFeatures } );
	};

	const addFeature = () => {
		const newFeatures = [
			...features,
			{
				icon: 'star',
				iconStyle: 'outline',
				imageUrl: '',
				imageId: 0,
				title: 'New Feature',
				description: 'Describe this feature and how it helps your customers.',
			},
		];
		setAttributes( { features: newFeatures } );
	};

	const removeFeature = ( index ) => {
		const newFeatures = [ ...features ];
		newFeatures.splice( index, 1 );
		setAttributes( { features: newFeatures } );
	};

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __( 'Conversion Blocks Feature Grid', 'conversion-blocks' ) }>
					<RangeControl
						__nextHasNoMarginBottom
						label={ __( 'Columns', 'conversion-blocks' ) }
						value={ columns }
						onChange={ ( value ) =>
							setAttributes( { columns: value } )
						}
						min={ 1 }
						max={ 4 }
					/>
					<SelectControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __( 'Icon Size', 'conversion-blocks' ) }
						value={ iconSize }
						options={ [
							{
								label: __( 'Small', 'conversion-blocks' ),
								value: 'small',
							},
							{
								label: __( 'Medium', 'conversion-blocks' ),
								value: 'medium',
							},
							{
								label: __( 'Large', 'conversion-blocks' ),
								value: 'large',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { iconSize: value } )
						}
					/>
					<SelectControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __( 'Text Alignment', 'conversion-blocks' ) }
						value={ alignment }
						options={ [
							{
								label: __( 'Left', 'conversion-blocks' ),
								value: 'left',
							},
							{
								label: __( 'Center', 'conversion-blocks' ),
								value: 'center',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { alignment: value } )
						}
					/>
					<Button variant="primary" onClick={ addFeature }>
						{ __( 'Add Feature Block', 'conversion-blocks' ) }
					</Button>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="conversion-blocks-feature-items">
					{ features.map( ( feature, index ) => (
						<div key={ index } className="conversion-blocks-feature-item">
							{ features.length > 1 && (
								<Button
									variant="tertiary"
									isDestructive
									size="small"
									onClick={ () => removeFeature( index ) }
									className="conversion-blocks-remove-feature"
								>
									{ __( 'Remove', 'conversion-blocks' ) }
								</Button>
							) }

							<div className="conversion-blocks-feature-icon-wrapper">
								<Dropdown
									className="conversion-blocks-feature-icon-picker-dropdown"
									contentClassName="conversion-blocks-feature-icon-picker-popover"
									popoverProps={ { placement: 'bottom-start' } }
									renderToggle={ ( { isOpen, onToggle } ) => (
										<button
											type="button"
											onClick={ onToggle }
											aria-expanded={ isOpen }
											className="conversion-blocks-feature-icon-picker-toggle"
										>
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
										</button>
									) }
									renderContent={ ( { onClose } ) => (
										<IconPickerContent
											currentIcon={ feature.icon }
											currentIconStyle={ feature.iconStyle || 'outline' }
											currentImageUrl={ feature.imageUrl || '' }
											onSelectIcon={ ( iconName, style ) =>
												updateFeatureMulti( index, {
													icon: iconName,
													iconStyle: style,
													imageUrl: '',
													imageId: 0,
												} )
											}
											onSelectImage={ ( url, id ) =>
												updateFeatureMulti( index, {
													imageUrl: url,
													imageId: id,
												} )
											}
											onClose={ onClose }
										/>
									) }
								/>
							</div>

							<RichText
								tagName="h3"
								value={ feature.title }
								onChange={ ( value ) =>
									updateFeature( index, 'title', value )
								}
								placeholder={ __(
									'Feature Title',
									'conversion-blocks'
								) }
								className="conversion-blocks-feature-title"
							/>

							<RichText
								tagName="p"
								value={ feature.description }
								onChange={ ( value ) =>
									updateFeature(
										index,
										'description',
										value
									)
								}
								placeholder={ __(
									'Feature description...',
									'conversion-blocks'
								) }
								className="conversion-blocks-feature-description"
							/>
						</div>
					) ) }
				</div>
			</div>
		</Fragment>
	);
}
