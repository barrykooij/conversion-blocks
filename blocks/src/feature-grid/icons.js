/**
 * Heroicons helper for the Feature Grid block.
 *
 * Icons by Tailwind Labs — https://heroicons.com (MIT License).
 * The raw SVG source files are self-hosted in assets/icons/heroicons/.
 */
import { heroicons, ICON_NAMES } from './heroicons-data';

export { ICON_NAMES };

/**
 * Renders a Heroicon by name and style.
 *
 * @param {Object}  props
 * @param {string}  props.name      Icon name (e.g. "bolt", "shield-check").
 * @param {string}  props.iconStyle "outline" or "solid".
 * @param {string}  props.className CSS class for the <svg> element.
 * @return {JSX.Element}            SVG element or fallback text.
 */
export function FeatureIcon( { name, iconStyle = 'outline', className } ) {
	const icon = heroicons[ name ];

	if ( ! icon ) {
		// Fallback for legacy emoji icons or unknown names.
		return (
			<span className={ className } role="img" aria-hidden="true">
				{ name }
			</span>
		);
	}

	const svgInner = icon[ iconStyle ] || icon.outline;
	const isOutline = iconStyle === 'outline';

	return (
		<svg
			className={ className }
			viewBox="0 0 24 24"
			fill={ isOutline ? 'none' : 'currentColor' }
			stroke={ isOutline ? 'currentColor' : 'none' }
			strokeWidth={ isOutline ? '1.5' : undefined }
			strokeLinecap={ isOutline ? 'round' : undefined }
			strokeLinejoin={ isOutline ? 'round' : undefined }
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			dangerouslySetInnerHTML={ { __html: svgInner } }
		/>
	);
}

/**
 * Get the label for an icon by name.
 */
export function getIconLabel( name ) {
	return heroicons[ name ]?.label || name;
}
