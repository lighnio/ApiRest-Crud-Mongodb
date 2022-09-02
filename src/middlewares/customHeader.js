export const customHeader = (req, res, next) => {
    try {
        const api_key = req.headers.api_key;

        api_key == "cv01"? next() : (res.status(403), res.send({error: "INVALID API KEY"}));
    } catch (e) {
        res.status(403);
        res.send({error: "Ocurrio algo en el custom_header"})
    }
}