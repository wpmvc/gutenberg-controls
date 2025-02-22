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
import { getValue, isDisabled, updateAttribute } from '../utils';

export default function Select( props: SelectControlProps ) {
	const { control } = props;

	const { options } = control || {};

	return (
		<SelectControl
			label={ <Label { ...props } /> }
			options={ options }
			size="__unstable-large"
			value={ getValue( props ) }
			onChange={ ( value: any ) => updateAttribute( value, props ) }
			disabled={ isDisabled( props ) }
			className={ control?.className }
		/>
	);
}
