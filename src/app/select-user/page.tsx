import { Suspense } from 'react';
import SelectUser from './select-user-page';

export function Page() {
    return (
        <Suspense>
            <SelectUser />
        </Suspense>
    );
}
