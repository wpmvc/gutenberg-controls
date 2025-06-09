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
	const { attrKey, attributes, device } = controlProps;
	// @ts-ignore
	if ( isResponsive( controlProps ) ) {
		if ( device !== undefined && device !== null ) {
			return attributes[ attrKey ]?.[ device ] ?? defaultValue;
		}
		return defaultValue;
	}
	return attributes[ attrKey ];
}

export function updateAttribute(
	value: any,
	controlProps: ControlProps
): void {
	if ( isDisabled( controlProps ) ) {
		return;
	}

	const { attrKey, setAttributes, attributes, device, control } =
		controlProps;

	setAttributes( {
		[ attrKey ]: isResponsive( controlProps )
			? { ...attributes[ attrKey ], [ device as string ]: value }
			: value,
	} );

	//@ts-ignore
	if ( control?.onChange ) {
		//@ts-ignore
		control.onChange( controlProps );
	}
}

export function isDisabled( controlProps: ControlProps ): boolean {
	const { control, attributes, isProAvailable } = controlProps;

	//@ts-ignore
	if ( !! control.isPro && ! isProAvailable ) {
		return true;
	}

	//@ts-ignore
	if ( typeof control.isDisabled === 'function' ) {
		//@ts-ignore
		return control.isDisabled( controlProps );
	}

	//@ts-ignore
	return !! control.isDisabled;
}

export function memoCallback(
	prevProps: ControlProps,
	nextProps: ControlProps
): boolean {
	return (
		prevProps.attributes[ prevProps.attrKey ] ===
			nextProps.attributes[ nextProps.attrKey ] &&
		prevProps.device === nextProps.device &&
		isDisabled( prevProps ) === isDisabled( nextProps )
	);
}
