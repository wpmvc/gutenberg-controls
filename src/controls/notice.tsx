/**
 * External dependencies
 */
//@ts-ignore
import { Notice as WpNotice } from '@wordpress/components';
import { Control, ControlProps } from '../types/control';

interface NoticeControl extends Control {
	notice: string;
	status: 'error' | 'warning' | 'success' | 'info';
	isDismissible?: boolean;
	onRemove: () => void;
}

interface NoticeControlProps extends ControlProps {
	control: NoticeControl;
}

export default function Notice( { control }: NoticeControlProps ): JSX.Element {
	const { status, notice, isDismissible, onRemove, className } = control;

	return (
		<WpNotice
			status={ status }
			isDismissible={ isDismissible }
			onRemove={ onRemove }
			className={ className }
		>
			{ notice }
		</WpNotice>
	);
}
