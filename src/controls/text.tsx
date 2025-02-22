/**
 * WordPress dependencies
 */
//@ts-ignore
import { __experimentalInputControl as InputControl } from '@wordpress/components';

/**
 * External dependencies
 */
// import styled, { css } from 'styled-components';

/**
 * Internal dependencies
 */
import { ControlProps } from '../types/control';
import { getValue, isDisabled, updateAttribute } from '../utils';
import Label from '../components/label';
import styled from 'styled-components';

// const StyledInput = styled( InputControl )< { isInvalid: boolean } >`
// 	${ ( { isInvalid } ) =>
// 		isInvalid &&
// 		css`
// 			.components-input-control__backdrop {
// 				border-color: red !important;
// 			}

// 			.components-base-control__help {
// 				color: red !important;
// 			}
// 		` }
// `;

const StyledInputControl = styled( InputControl )< {
	isDisabled: string;
} >`
	${ ( props ) =>
		'true' === props.isDisabled &&
		`
		pointer-events: none;
		opacity: 0.5;
	` }
`;

export default function Text( props: ControlProps ) {
	const { control } = props;
	const { helpText } = control || {};

	return (
		<StyledInputControl
			label={ <Label { ...props } /> }
			help={ helpText }
			size="__unstable-large"
			value={ getValue( props ) }
			onChange={ ( value: any ) => updateAttribute( value, props ) }
			isDisabled={ isDisabled( props ) ? 'true' : 'false' }
			className={ control?.className }
		/>
	);
}
