/**
 * WordPress dependencies
 */
//@ts-ignore
import { SelectControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { SelectControlProps } from '../types/control';
import Label from '../components/label';
import { getValue, updateAttribute } from '../utils';

export default function Select( props: SelectControlProps ) {
	const { control } = props;

	const { label, options } = control || {};

	return (
		<SelectControl
			label={
				<Label { ...props } control={ control }>
					{ label }
				</Label>
			}
			options={ options }
			size="__unstable-large"
			value={ getValue( props ) }
			onChange={ ( value: any ) => updateAttribute( value, props ) }
		/>
	);
}
