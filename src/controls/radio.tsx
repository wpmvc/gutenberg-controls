/**
 * WordPress dependencies
 */
//@ts-ignore
import { RadioControl } from '@wordpress/components';
import { getValue, isDisabled, memoCallback, updateAttribute } from '../utils';
import Label from '../components/label';
import { SelectControlProps } from '../types/control';
import styled from 'styled-components';
import { memo } from 'react';

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

const Radio = memo( ( props: SelectControlProps ) => {
	const { control } = props;
	const { options } = control || {};

	return (
		<StyleRadioControl
			label={ <Label { ...props } /> }
			options={ options }
			selected={ getValue( props ) }
			onChange={ ( value: string ) => updateAttribute( value, props ) }
			isDisabled={ isDisabled( props ) ? 'true' : 'false' }
			className={ control?.className }
		/>
	);
}, memoCallback );

export default Radio;
