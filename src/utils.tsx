/**
 * External dependencies
 */
import { has } from 'lodash';
import { ControlProps } from './types/control';

export function isResponsive( controlProps: ControlProps ): boolean {
	const { control } = controlProps;
	return has( control, 'isResponsive' ) && control.isResponsive === true;
}

export function getValue(
	controlProps: ControlProps,
	defaultValue: any = undefined
): any {
	const { attr_key, attributes, device } = controlProps;
	// @ts-ignore
	return isResponsive( controlProps )
		? attributes[ attr_key ]?.[ device ] ?? defaultValue
		: attributes[ attr_key ];
}

export function updateAttribute(
	value: any,
	controlProps: ControlProps
): void {
	if ( isDisabled( controlProps ) ) {
		return;
	}

	const { attr_key, setAttributes, attributes, device } = controlProps;

	setAttributes( {
		[ attr_key ]: isResponsive( controlProps )
			? { ...attributes[ attr_key ], [ device as string ]: value }
			: value,
	} );
}

export function isDisabled( {
	control,
	attributes,
	isProAvailable,
}: ControlProps ): boolean {
	if ( !! control.isPro && ! isProAvailable ) {
		return true;
	}

	if ( typeof control.isDisabled === 'function' ) {
		return control.isDisabled( attributes );
	}

	return !! control.isDisabled;
}
