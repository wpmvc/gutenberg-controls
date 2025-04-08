/**
 * Internal dependencies
 */
import { Item } from './types';

/**
 * Gets the maximum ID from an array of items
 */
export function getMaxId( attribute: Item[] ) {
	return attribute.reduce(
		( max: number, item: Item ) => ( item.id > max ? item.id : max ),
		0
	);
}

/**
 * Splits controls into header and body controls
 */
export function splitControls(
	controls: Record< string, any >,
	showControlInHeader?: boolean
) {
	const [ firstKey, ...restKeys ] = Object.keys( controls );
	return showControlInHeader
		? {
				headerControls: { [ firstKey ]: controls[ firstKey ] },
				bodyControls: Object.fromEntries(
					Object.entries( controls ).slice( 1 )
				),
		  }
		: { headerControls: {}, bodyControls: controls };
}
