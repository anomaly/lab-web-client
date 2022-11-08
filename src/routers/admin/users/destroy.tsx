import { redirect } from 'react-router-dom';
import { deleteUser } from 'api/user/user';
import { QueryClient } from 'react-query';

import { getGetUsersWithLimitsQueryKey } from 'api/user/user';

export const action =
    (queryClient : QueryClient) =>
    async({ params }: any)  => {
    await deleteUser(params.id);
    queryClient.invalidateQueries(getGetUsersWithLimitsQueryKey());
    return redirect('../');
}