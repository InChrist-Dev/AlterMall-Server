exports.getDefault  = async (req, res) => {
    res.send('default');
};

exports.getItems = async (req, res) => {

    if (req.params) {
        res.send(req.query);
    } else {
        res.send({page: 1});
    }
};
