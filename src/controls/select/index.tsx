/**
 * WordPress dependencies
 */
import { SelectControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import Label from '../../components/label';
import { getValue, isDisabled, updateAttribute } from '../../utils';
import { isFunction } from 'lodash';
import { SelectControlProps } from './types';

export default function Select( props: SelectControlProps ) {
	const { control, attributes } = props;

	const { options, helpText } = control || {};

	return (
		<SelectControl
			//@ts-ignore
			label={ <Label { ...props } /> }
			help={ helpText }
			options={ isFunction( options ) ? options( attributes ) : options }
			size="__unstable-large"
			value={ getValue( props ) }
			onChange={ ( value: any ) => updateAttribute( value, props ) }
			disabled={ isDisabled( props ) }
			className={ control?.className }
			required={ control?.required }
			__nextHasNoMarginBottom
		/>
	);
}
