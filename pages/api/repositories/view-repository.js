import escape from 'sql-template-strings';

import {conn} from './transaction-wrapper-repository';

export default async ({id}) => {
	const rows = await conn().query(
		escape`SELECT message, if(date_add(timestamp, interval 15 minute) < now() and selfDestruct = 1, 1, 0) as shouldSelfDestruct, hmacKey, hmacHash FROM messages WHERE guid=${id}`
    );

    if (!rows.length) {
        return {
            message: "This message can no longer be viewed." // don't try to decrypt
        };
    }
    
    await conn().query(
        escape`DELETE FROM messages WHERE guid=${id}`
    );

    const {message, shouldSelfDestruct, hmacKey, hmacHash} = rows[0];

    if (shouldSelfDestruct) {
        return {
            message: "Message was self-destructed." // don't try to decrypt
        };
    }

    return { // decrypt
        message,
        hmacKey,
        hmacHash
    };
};
