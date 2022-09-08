export const handleHttpError = (res, mes = "Somethings Happen", code = 403) => {
    res.status(code);
    res.send({error: mes});
}