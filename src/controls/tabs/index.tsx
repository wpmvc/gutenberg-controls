/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { PrivateControls } from '..';
import { TabsControlProps } from './types';
import { StyledTabPanel } from './styled';

export default function Tabs( props: TabsControlProps ): JSX.Element {
	const { control } = props;
	const [ selectedTab, setSelectedTab ] = useState< string >( '' );

	const renderTabContent = ( tabName: string ) => {
		return (
			<PrivateControls
				{ ...props }
				controls={ control.items[ tabName ].controls }
			/>
		);
	};

	const tabs = Object.keys( control.items ).map( ( key ) => ( {
		name: key,
		title: (
			<span className="tab-title">
				{ control.items[ key ]?.icon }
				{ control.items[ key ].label }
			</span>
		),
	} ) );

	const selectedTabIndex = tabs.findIndex(
		( tab ) => tab.name === selectedTab
	);

	return (
		<StyledTabPanel
			className={ `control-tabs control-tabs--${ selectedTab }` }
			//@ts-ignore
			tabs={ tabs }
			onSelect={ setSelectedTab }
			tabsLength={ tabs.length }
			selectedTabIndex={ selectedTabIndex }
		>
			{ ( tab ) => renderTabContent( tab.name ) }
		</StyledTabPanel>
	);
}
