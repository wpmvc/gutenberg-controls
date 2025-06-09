/**
 * WordPress dependencies
 */
import { CheckboxControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { CommonControlProps } from '../types/control';
import Label from '../components/label';
import { getValue, isDisabled, updateAttribute } from '../utils';
import styled from 'styled-components';

const StyledCheckboxControl = styled( CheckboxControl )< {
	isDisabled: string;
} >`
	${ ( props ) =>
		'true' === props.isDisabled &&
		`
		pointer-events: none;
		opacity: 0.5;
	` }
`;

export default function Checkbox( props: CommonControlProps ): JSX.Element {
	const { control } = props;

	return (
		<StyledCheckboxControl
			//@ts-ignore
			label={ <Label { ...props } /> }
			isDisabled={ isDisabled( props ) ? 'true' : 'false' }
			checked={ getValue( props ) }
			onChange={ ( value: boolean ) => updateAttribute( value, props ) }
			className={ control?.className }
			required={ control?.required }
		/>
	);
}
