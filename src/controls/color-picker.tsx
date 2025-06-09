import { ColorPicker, Dropdown, Button } from '@wordpress/components';
//@ts-ignore
import { useViewportMatch } from '@wordpress/compose';
import { CommonControlProps } from '../types/control';

export default function PickColor( {
	attr_key,
	control,
	attributes,
	setAttributes,
	placement,
	offset,
}: CommonControlProps ): JSX.Element {
	function dropdownProps() {
		const isMobile = useViewportMatch( 'medium', '<' );
		return ! isMobile
			? {
					placement: placement ? placement : 'left-start',
					offset: offset ? offset : 259,
			  }
			: {};
	}

	return (
		<div className="formgent-control-color-picker">
			<span className="formgent-control-label">{ control.label }</span>

			<Dropdown
				className="formgent-control-color-picker-dropdown"
				contentClassName="formgent-control-color-picker-dropdown-content"
				popoverProps={ dropdownProps() }
				renderToggle={ ( { isOpen, onToggle }: any ) => (
					<Button
						onClick={ onToggle }
						aria-expanded={ isOpen }
						className="formgent-control-color-picker-trigger"
					>
						<span className="formgent-control-color-picker-value">
							{ attributes[ attr_key ] }
						</span>
						<span
							className="formgent-control-color-picker-color"
							style={ { background: attributes[ attr_key ] } }
						></span>
					</Button>
				) }
				renderContent={ () => (
					<div className="formgent-control-color-picker-input">
						<ColorPicker
							color={ attributes[ attr_key ] }
							onChange={ ( value: string ) => {
								setAttributes( { [ attr_key ]: value } );
							} }
						/>
					</div>
				) }
			/>
		</div>
	);
}
