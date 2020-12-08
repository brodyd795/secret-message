import viewService from '../services/view-service';

export default async (req, res) => {
    try {
        const {id} = req.query;

        const results = await viewService({id});

        res.status(200).json(results);
    } catch (error) {
        console.log('error', error);
        res.status(500).json({error});
    }
};
