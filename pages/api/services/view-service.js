import viewRepository from '../repositories/view-repository';
import {withTransactionWrapper} from '../repositories/transaction-wrapper-repository';

const viewService = async (args) => viewRepository({
    ...args
});

export default async (args) => withTransactionWrapper(viewService, args);
