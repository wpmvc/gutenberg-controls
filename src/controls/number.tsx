/**
 * WordPress dependencies
 */
//@ts-ignore
import { __experimentalNumberControl as NumberControl } from '@wordpress/components';
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

export default function Number( props: ControlProps ): JSX.Element {
	const { control } = props;
	const { label } = control || {};

	return (
		<StyledBlockEditorControl>
			<NumberControl
				label={
					<Label { ...props } control={ control }>
						{ label }
					</Label>
				}
				size="__unstable-large"
				step={ 1 }
				value={ getValue( props ) }
				onChange={ ( value: string | undefined ) =>
					updateAttribute( value ? parseFloat(value) : undefined, props )
				}
			/>
		</StyledBlockEditorControl>
	);
}
