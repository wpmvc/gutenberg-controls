import { BaseControl, BaseControlProps, Control } from '../../types/control';

export type NoticeControlType = BaseControl & {
	type: 'notice';
	notice: string;
	status: 'warning' | 'success' | 'error' | 'info';
	isDismissible?: boolean;
	onRemove: () => void;
	addMarginBottom?: boolean;
};

export type NoticeControlProps = BaseControlProps & {
	control: NoticeControlType;
};
