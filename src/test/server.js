let express = require('express');

let app = express();

app.get('api/user', (rep, res) => {
    res.json({
        name: '这是结果'
    });
});
app.listen(3000);
