/**
 * External dependencies
 */
import { Notice as WpNotice } from '@wordpress/components';
import { NoticeControlProps } from './types';

export default function Notice( { control }: NoticeControlProps ): JSX.Element {
	const { status, notice, isDismissible, onRemove, className } = control;

	return (
		<WpNotice
			status={ status }
			isDismissible={ isDismissible }
			onRemove={ onRemove }
			className={ 'components-base-control ' + ( className ?? '' ) }
		>
			{ notice }
		</WpNotice>
	);
}
