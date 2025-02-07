/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
//@ts-ignore
import { useViewportMatch } from '@wordpress/compose';
import {
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
	Dropdown,
	//@ts-ignore
} from '@wordpress/components';

/**
 * External dependencies
 */
import { isEqual } from 'lodash';

/**
 * Internal dependencies
 */
import Popover from './popover';
import Indicator from './indicator';

function useToolsPanelDropdownMenuProps() {
	const isMobile = useViewportMatch( 'medium', '<' );
	return ! isMobile
		? {
				popoverProps: {
					placement: 'right-start',
					// For non-mobile, inner sidebar width (248px) - button width (24px) - border (1px) + padding (16px) + spacing (20px)
					offset: 36,
				},
		  }
		: {};
}

const popoverProps = {
	placement: 'left-start',
	offset: 36,
	shift: true,
};

export default function Colors( {
	attr_key,
	metaData,
	control,
	attributes,
	setAttributes,
}: any ) {
	const panelId = attr_key;
	const resetAll = () => {
		setAttributes( {
			[ attr_key ]: metaData.attributes[ attr_key ].default,
		} );
	};

	const hasValue = ( elementName: any ) => {
		const elementColors = attributes[ attr_key ]?.[ elementName ] ?? {};
		const elementDefaultColors =
			metaData.attributes[ attr_key ]?.default?.[ elementName ] ?? {};

		return ! isEqual( elementColors, elementDefaultColors );
	};

	const onDeselect = ( elementName: any ) => {
		const elementDefaultColors =
			metaData.attributes[ attr_key ]?.default?.[ elementName ] ?? {};

		setAttributes( {
			[ attr_key ]: {
				...attributes[ attr_key ],
				[ elementName ]: elementDefaultColors,
			},
		} );
	};

	return (
		<ToolsPanel
			label={ control.label }
			resetAll={ resetAll }
			panelId={ panelId }
			hasInnerWrapper
			headingLevel={ 2 }
			className="color-block-support-panel"
			__experimentalFirstVisibleItemClass="first"
			__experimentalLastVisibleItemClass="last"
			dropdownMenuProps={ useToolsPanelDropdownMenuProps() }
			style={ {
				...( control?.insidePanel
					? {
							paddingLeft: 0,
							paddingRight: 0,
							paddingTop: 0,
							border: 0,
					  }
					: {} ),
			} }
		>
			<div className="color-block-support-panel__inner-wrapper">
				{ Object.keys( control.items ).map( ( name ) => {
					const element = control.items[ name ];
					element.name = name;
					const elementColors =
						attributes[ attr_key ]?.[ element.name ] ?? {};
					const { label } = element;

					return (
						<ToolsPanelItem
							key={ name }
							hasValue={ () => hasValue( name ) }
							panelId={ panelId }
							label={ label }
							onDeselect={ () => onDeselect( name ) }
							className="block-editor-tools-panel-color-gradient-settings__item"
							isShownByDefault={ element.showByDefault }
						>
							<Dropdown
								popoverProps={ popoverProps }
								className="block-editor-tools-panel-color-gradient-settings__dropdown"
								renderToggle={ ( {
									isOpen,
									onToggle,
								}: any ) => {
									return (
										<Indicator
											isOpen={ isOpen }
											onToggle={ onToggle }
											label={ label }
											elementColors={ elementColors }
										/>
									);
								} }
								renderContent={ () => {
									return (
										<Popover
											element={ element }
											attr_key={ attr_key }
											attributes={ attributes }
											setAttributes={ setAttributes }
											elementColors={ elementColors }
										/>
									);
								} }
							/>
						</ToolsPanelItem>
					);
				} ) }
			</div>
		</ToolsPanel>
	);
}
