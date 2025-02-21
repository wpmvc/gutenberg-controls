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
import { getValue, updateAttribute } from '../utils';
import Label from '../components/label';

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

export default function Text( props: ControlProps ) {
	const { control } = props;
	const { label, helpText } = control || {};

	return (
		<InputControl
			// isInvalid={ !!control?.isInvalid }
			label={
				<Label { ...props } control={ control }>
					{ label }
				</Label>
			}
			help={ helpText }
			size="__unstable-large"
			value={ getValue( props ) }
			onChange={ ( value: any ) => updateAttribute( value, props ) }
		/>
	);
}
