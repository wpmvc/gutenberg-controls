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
import { getValue, isDisabled, updateAttribute } from '../utils';

const StyledBlockEditorControl = styled.div`
	margin-bottom: 24px;
`;

export default function Number( props: ControlProps ): JSX.Element {
	const { control } = props;
	return (
		<StyledBlockEditorControl>
			<NumberControl
				label={ <Label { ...props } /> }
				size="__unstable-large"
				step={ 1 }
				value={ getValue( props ) }
				onChange={ ( value: string | undefined ) =>
					updateAttribute(
						value ? parseFloat( value ) : undefined,
						props
					)
				}
				disabled={ isDisabled( props ) }
				className={ control?.className }
			/>
		</StyledBlockEditorControl>
	);
}
