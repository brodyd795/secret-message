import viewRepository from '../repositories/view-repository';
import {withTransactionWrapper} from '../repositories/transaction-wrapper-repository';

const viewService = async (args) => {
	return viewRepository({
		...args,
	});;
};

export default async args => {
	return withTransactionWrapper(viewService, args);
};
