import { memo, lazy, Suspense } from 'react';

// const MessengerPanel = lazy(() => import('src/app/main/apps/messenger/messengerPanel/MessengerPanel'));
// const NotificationPanel = lazy(() => import('src/app/main/apps/notifications/NotificationPanel'));

/**
 * The right side layout 1.
 */
function RightSideLayout1() {
	return (
		<Suspense>
			{/*<MessengerPanel />*/}
			{/*<NotificationPanel />*/}
		</Suspense>
	);
}

export default memo(RightSideLayout1);
