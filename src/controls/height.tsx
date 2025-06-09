/**
 * External dependencies
 */
//@ts-ignore
import { HeightControl } from '@wordpress/block-editor';
import styled from 'styled-components';

/**
 * Internal dependencies
 */
import { ControlProps } from '../types/control';
import Label from '../components/label';
import { getValue, isDisabled, updateAttribute } from '../utils';

const StyledBlockEditorControl = styled.div`
	margin-bottom: 24px;
`;

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

export default function Height( props: ControlProps ): JSX.Element {
	const { control } = props;
	return (
		<StyledBlockEditorControl>
			<StyledHeightControl
				label={ <Label { ...props } /> }
				value={ getValue( props ) }
				onChange={ ( value: any ) => updateAttribute( value, props ) }
				isDisabled={ isDisabled( props ) ? 'true' : 'false' }
				className={ control?.className }
				required={ control?.required }
			/>
		</StyledBlockEditorControl>
	);
}
