/**
 * WordPress dependencies
 */
//@ts-ignore
import { ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { isFunction } from 'lodash';

/**
 * Internal dependencies
 */
import styled from 'styled-components';
import { ControlProps } from '../types/control';
import Label from '../components/label';
import { getValue, updateAttribute } from '../utils';

// Styled ToggleControl component
const StyledToggleControl = styled( ToggleControl )`
	.components-toggle-control__label {
		order: -1;
	}
`;

export default function Switch( props: ControlProps ) {
	const { control } = props;

	const isDisabled = isFunction( control?.is_disabled )
		? control.is_disabled()
		: control?.is_disabled;

	return (
		<StyledToggleControl
			label={
				<Label { ...props } control={ control }>
					{ control.label }
				</Label>
			}
			checked={ getValue( props ) }
			onChange={ ( value: any ) => updateAttribute( value, props ) }
			className={ control?.cssClass }
			disabled={ isDisabled }
		/>
	);
}
