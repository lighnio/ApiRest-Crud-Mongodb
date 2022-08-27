import { Router } from "express";

const router = Router();

// GET
router.get('/', (req, res) => {
    const data = ["hola", "mundo"]
    res.send({data});
})

export default router;