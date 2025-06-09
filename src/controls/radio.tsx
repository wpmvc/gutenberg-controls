/**
 * WordPress dependencies
 */
//@ts-ignore
import { RadioControl } from '@wordpress/components';
import { getValue, isDisabled, memoCallback, updateAttribute } from '../utils';
import Label from '../components/label';
import { RadioControlProps } from '../types/control';
import styled from 'styled-components';
import { memo } from 'react';
import { isFunction } from 'lodash';

const StyleRadioControl = styled( RadioControl )< {
	isDisabled: string;
} >`
	${ ( props ) =>
		'true' === props.isDisabled &&
		`
		pointer-events: none;
		opacity: 0.5;
	` }
`;

const Radio = memo( ( props: RadioControlProps ) => {
	const { control, attributes } = props;
	const { options } = control || {};

	return (
		<StyleRadioControl
			label={ <Label { ...props } /> }
			options={ isFunction( options ) ? options( attributes ) : options }
			selected={ getValue( props ) }
			onChange={ ( value: string ) => updateAttribute( value, props ) }
			isDisabled={ isDisabled( props ) ? 'true' : 'false' }
			className={ control?.className }
			required={ control?.required }
		/>
	);
}, memoCallback );

export default Radio;
