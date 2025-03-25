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
import { isFunction } from 'lodash';

export default function Select( props: SelectControlProps ) {
	const { control, attributes } = props;

	const { options } = control || {};

	return (
		<SelectControl
			label={ <Label { ...props } /> }
			options={ isFunction( options ) ? options( attributes ) : options }
			size="__unstable-large"
			value={ getValue( props ) }
			onChange={ ( value: any ) => updateAttribute( value, props ) }
			disabled={ isDisabled( props ) }
			className={ control?.className }
		/>
	);
}
