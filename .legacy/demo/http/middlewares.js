const bodyParser = (req, res, next) => {
    if (
        req.method !== "GET" &&
        req.headers["content-type"] === "application/json"
    ) {
        let chunks = "";
        req.on("data", function (chunk) {
            chunks += chunk;
        });

        req.on("end", () => {
            req.body = JSON.parse(chunks);
            next();
        });
    } else {
        next();
    }
};

module.exports = {
    bodyParser
};