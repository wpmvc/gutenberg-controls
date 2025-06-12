/**
 * External dependencies
 */
//@ts-ignore
import { HeightControl } from '@wordpress/block-editor';
import styled from 'styled-components';

/**
 * Internal dependencies
 */
import { CommonControlProps } from '../types/control';
import Label from '../components/label';
import { getValue, isDisabled, updateAttribute } from '../utils';

const StyledHeightControl = styled( HeightControl )< {
	isDisabled: string;
} >`
	${ ( props ) =>
		'true' === props.isDisabled &&
		`
		pointer-events: none;
		opacity: 0.5;
	` }
`;

export default function Height( props: CommonControlProps ): JSX.Element {
	const { control } = props;

	return (
		<StyledHeightControl
			label={ <Label { ...props } /> }
			value={ getValue( props ) }
			onChange={ ( value: any ) => updateAttribute( value, props ) }
			isDisabled={ isDisabled( props ) ? 'true' : 'false' }
			className={ control?.className }
			required={ control?.required }
		/>
	);
}
