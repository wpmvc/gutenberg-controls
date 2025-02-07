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
import { getValue, updateAttribute } from '../utils';

const StyledBlockEditorControl = styled.div`
	margin-bottom: 24px;
`;

export default function Height( props: ControlProps ): JSX.Element {
	const { control } = props;
	return (
		<StyledBlockEditorControl>
			<HeightControl
				label={
					<Label { ...props } control={ control }>
						{ control.label }
					</Label>
				}
				value={ getValue( props ) }
				onChange={ ( value: any ) => updateAttribute( value, props ) }
			/>
		</StyledBlockEditorControl>
	);
}
