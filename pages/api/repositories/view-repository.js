import escape from 'sql-template-strings';

import {ErrorMessages} from '../../../enums/error-messages';

import {conn} from './transaction-wrapper-repository';

export default async ({id}) => {
    const rows = await conn().query(
        escape`SELECT message, if(date_add(timestamp, interval 15 minute) < now() and selfDestruct = 1, 1, 0) as shouldSelfDestruct, timestamp, selfDestruct FROM storage WHERE guid=${id}`
    );

    if (!rows.length) {
        return {
            message: ErrorMessages.ALREADY_VIEWED
        };
    }

    const {message, shouldSelfDestruct} = rows[0];

    await conn().query(
        escape`DELETE FROM storage WHERE guid=${id}`
    );

    if (shouldSelfDestruct) {
        return {
            message: ErrorMessages.SELF_DESTRUCTED
        };
    }

    return {
        message
    };
};
