import { check, validationResult } from 'express-validator';
import {validateResults} from '../utils/handlerValidator.js'

export const validatorCreateItem = [
    check("name")
    .exists()
    .notEmpty(),
    // .isLength({min: 5, max: 90})
    check("album")
    .exists()
    .notEmpty(),
    check("cover")
    .exists()
    .notEmpty(),
    check("artist")
    .exists()
    .notEmpty(),
    check("artist.name")
    .exists()
    .notEmpty(),
    check("artist.nationality")
    .exists()
    .notEmpty(),
    check("duration")
    .exists()
    .notEmpty(),
    check("duration.start")
    .exists()
    .notEmpty(),
    check("duration.end")
    .exists()
    .notEmpty(),
    check("url")
    .exists()
    .notEmpty(),
    (req, res, next) => validateResults(req, res, next)
];

export const validatorGetItem = [
    check("id")
    .exists()
    .notEmpty(),
    (req, res, next) => validateResults(req, res, next)
];

export const validatorUpdateItem = [
    check("name")
    .exists()
    .notEmpty(),
    // .isLength({min: 5, max: 90})
    check("album")
    .exists()
    .notEmpty(),
    check("cover")
    .exists()
    .notEmpty(),
    check("artist")
    .exists()
    .notEmpty(),
    check("artist.name")
    .exists()
    .notEmpty(),
    check("artist.nationality")
    .exists()
    .notEmpty(),
    check("duration")
    .exists()
    .notEmpty(),
    check("duration.start")
    .exists()
    .notEmpty(),
    check("duration.end")
    .exists()
    .notEmpty(),
    check("mediaId")
    .exists()
    .notEmpty(),
    (req, res, next) => validateResults(req, res, next)
];
