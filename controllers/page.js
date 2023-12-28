export const renderDefault  = async (req, res) => {
    res.send('default');
};

export const renderProfile = async (req, res) => {
    let { name } = req.params;
    console.log(name);
    if (name) {
        let data = [
            {name: name},
            {live: 'seoul'},
            {age: 99},
            {level: "top"},
        ];

        res.send(data)
    } else {
        res.send('그런건 없다');
    }
};
