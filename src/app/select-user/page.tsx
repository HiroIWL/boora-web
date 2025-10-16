'use server';

import { Suspense } from 'react';
import SelectUser from './select-user-page';

export default async function Page() {
    return (
        <Suspense>
            <SelectUser />
        </Suspense>
    );
}
