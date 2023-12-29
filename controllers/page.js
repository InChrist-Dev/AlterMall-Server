export const renderDefault  = async (req, res) => {
    res.send('default');
};

export const getItems = async (req, res) => {

    if (req.params) {
        res.send(req.query);
    } else {
        res.send({page: 1});
    }
};

export const getItemsPage = async (req, res) => {
    let { result } = req.params
    res.send(result)
}
