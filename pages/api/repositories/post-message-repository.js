import escape from 'sql-template-strings';

import {conn} from './transaction-wrapper-repository';

export default async ({email, message, guid, isSelfDestructChecked}) => {
	return conn().query(
		escape`INSERT INTO storage (email, message, guid, selfDestruct) values (${email}, ${message}, ${guid}, ${isSelfDestructChecked})`
	);
};
