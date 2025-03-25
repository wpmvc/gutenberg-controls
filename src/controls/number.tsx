/**
 * WordPress dependencies
 */
//@ts-ignore
import { __experimentalNumberControl as NumberControl } from '@wordpress/components';
import styled from 'styled-components';

/**
 * Internal dependencies
 */
import { Control, ControlProps } from '../types/control';
import Label from '../components/label';
import { getValue, isDisabled, updateAttribute } from '../utils';

const StyledBlockEditorControl = styled.div`
	margin-bottom: 24px;
`;

type NumberControl = Control & {
	precision?: boolean;
};

type NumberControlProps = ControlProps & {
	control: NumberControl;
};

export default function Number( props: NumberControlProps ): JSX.Element {
	const { control } = props;

	const handleChange = ( value: any ) => {
		if ( control.precision ) {
			updateAttribute( value ? parseFloat( value ) : undefined, props );
			return;
		}

		const integerValue = parseInt( value, 10 );

		if ( ! isNaN( integerValue ) ) {
			updateAttribute( integerValue, props );
		}
	};

	return (
		<StyledBlockEditorControl>
			<NumberControl
				label={ <Label { ...props } /> }
				size="__unstable-large"
				step={ 1 }
				value={ getValue( props ) }
				onChange={ handleChange }
				disabled={ isDisabled( props ) }
				className={ control?.className }
			/>
		</StyledBlockEditorControl>
	);
}
