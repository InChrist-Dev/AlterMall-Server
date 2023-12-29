exports.renderDefault  = async (req, res) => {
    res.send('default');
};

exports.getItems = async (req, res) => {

    if (req.params) {
        res.send(req.query);
    } else {
        res.send({page: 1});
    }
};

exports.getItemsPage = async (req, res) => {
    let { result } = req.params
    res.send(result)
}
