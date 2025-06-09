/**
 * WordPress dependencies
 */
//@ts-ignore
import { memo } from 'react';
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
import { getValue, isDisabled, memoCallback, updateAttribute } from '../utils';

// Styled ToggleControl component
const StyledToggleControl = styled( ToggleControl )`
	// .components-toggle-control__label {
	// 	order: -1;
	// }
`;

const Switch = memo( ( props: ControlProps ) => {
	const { control } = props;
	return (
		<StyledToggleControl
			label={ <Label { ...props } /> }
			checked={ getValue( props ) }
			onChange={ ( value: any ) => updateAttribute( value, props ) }
			disabled={ isDisabled( props ) }
			className={ control?.className }
			required={ control?.required }
			__nextHasNoMarginBottom
		/>
	);
}, memoCallback );

export default Switch;
