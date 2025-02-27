/**
 * External dependencies
 */
//@ts-ignore
import { Notice as WpNotice } from '@wordpress/components';
import { Control, ControlProps } from '../types/control';

type NoticeControl = Control & {
	notice: string;
	status: 'error' | 'warning' | 'success' | 'info';
	isDismissible?: boolean;
	onRemove: () => void;
	addMarginBottom?: boolean;
};

type NoticeControlProps = ControlProps & {
	control: NoticeControl;
};

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
