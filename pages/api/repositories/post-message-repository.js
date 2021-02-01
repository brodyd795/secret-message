import escape from 'sql-template-strings';

import {conn} from './transaction-wrapper-repository';

export default async ({
    isSelfDestructChecked,
    guid,
    hmacHash,
    hmacKey,
    encryptedMessage
}) => conn().query(
    escape`INSERT INTO messages (message, hmacHash, hmacKey, guid, selfDestruct) values (${encryptedMessage}, ${hmacHash}, ${hmacKey}, ${guid}, ${isSelfDestructChecked})`
);
