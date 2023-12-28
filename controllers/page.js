export const renderDefault  = async (req, res) => {
    res.send('default');
};

export const renderProfile = async (req, res) => {
    let { name } = req.params;
    console.log(name);
    if (name) {
        let data = {
            id: name,
            pw: "123123",
            addr: "seoul",
            level: "junior",
            amount: 30
        };

        res.json(data)
    } else {
        res.send('그런건 없다');
    }
};
