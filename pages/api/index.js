export default async (req, res) => {
	try {
		const { email, message } = req.body;
		res.status(200).json({ name: "John Doe" });
	} catch (err) {
		res.status(500).json({ err });
	}
};
