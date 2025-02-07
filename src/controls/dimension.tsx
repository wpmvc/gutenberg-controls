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
import { ControlProps } from '../types/control';

export default function Dimension( props: ControlProps ): JSX.Element {
	const { attr_key, control, attributes, setAttributes } = props;
	const [ values, setValues ] = useState< any >( attributes[ attr_key ] );

	const handleChange = ( value: any ) => {
		setValues( value );
		setAttributes( { [ attr_key ]: value } );
	};

	return (
		<BoxControl
			label={
				<Label { ...props } control={ control }>
					{ control.label }
				</Label>
			}
			values={ values }
			onChange={ handleChange }
		/>
	);
}
