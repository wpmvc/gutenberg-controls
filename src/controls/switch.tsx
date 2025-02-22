/**
 * WordPress dependencies
 */
//@ts-ignore
import { ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import styled from 'styled-components';

/**
 * Internal dependencies
 */
import { ControlProps } from '../types/control';
import Label from '../components/label';
import { getValue, isDisabled, updateAttribute } from '../utils';

// Styled ToggleControl component
const StyledToggleControl = styled( ToggleControl )`
	.components-toggle-control__label {
		order: -1;
	}
`;

export default function Switch( props: ControlProps ) {
	const { control } = props;

	return (
		<StyledToggleControl
			label={ <Label { ...props } /> }
			checked={ getValue( props ) }
			onChange={ ( value: any ) => updateAttribute( value, props ) }
			disabled={ isDisabled( props ) }
			className={ control?.className }
		/>
	);
}
