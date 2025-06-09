/**
 * External dependencies
 */
//@ts-ignore
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Label from '../components/label';
import { CommonControlProps } from '../types/control';
import { isDisabled } from '../utils';
import styled from 'styled-components';

const StyledBoxControl = styled( BoxControl )< {
	isDisabled: string;
} >`
	${ ( props ) =>
		'true' === props.isDisabled &&
		`
		pointer-events: none;
		opacity: 0.5;
	` }
`;

export default function Dimension( props: CommonControlProps ): JSX.Element {
	const { attrKey, control, attributes, setAttributes } = props;
	const [ values, setValues ] = useState< any >( attributes[ attrKey ] );

	const handleChange = ( value: any ) => {
		setValues( value );
		setAttributes( { [ attrKey ]: value } );
	};

	return (
		<StyledBoxControl
			//@ts-ignore
			label={ <Label { ...props } /> }
			values={ values }
			onChange={ handleChange }
			isDisabled={ isDisabled( props ) ? 'true' : 'false' }
			className={ control?.className }
		/>
	);
}
