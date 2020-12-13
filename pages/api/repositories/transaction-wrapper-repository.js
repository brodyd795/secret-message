import mysql from 'serverless-mysql';

let connection,
	isMidTransaction = false;

export const conn = () => {
	if (connection !== undefined) {
		return connection;
	}

	const config = {
		host: process.env.DB_HOST,
		database: process.env.DB_NAME,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD
	};
	
	connection = mysql({
		config
	});

	return connection;
};

export const withTransactionWrapper = async (queries, args) => {
	if (!isMidTransaction) {
		isMidTransaction = true;

		try {
			await conn().query('BEGIN');

			const results = await queries(args);

			await conn().query('COMMIT');

			return results;
		} catch (error) {
			await conn().query('ROLLBACK');
			console.log('error', error)

			return new Error(error);
		} finally {
			await conn().end();
			isMidTransaction = false;
		}
	}

	return queries(args);
};