import { body,query } from 'express-validator';

export const addSchoolValidators = [
    body('name').trim().notEmpty().withMessage('School name is required'),
    body('address').trim().notEmpty().withMessage('Address is required'),
    body('latitude')
        .notEmpty().withMessage('Latitude is required')
        .isFloat({ min: -90, max: 90 }).withMessage('Latitude must be valid'),
    body('longitude')
        .notEmpty().withMessage('Longitude is required')
        .isFloat({ min: -180, max: 180 }).withMessage('Longitude must be valid'),
];

export const listSchoolsValidators = [
    query('latitude')
        .notEmpty().withMessage('Latitude is required')
        .isFloat({ min: -90, max: 90 }).withMessage('Latitude must be valid'),
    query('longitude')
        .notEmpty().withMessage('Longitude is required')
        .isFloat({ min: -180, max: 180 }).withMessage('Longitude must be valid'),
    query('limit').optional()
        .isInt({ min: 1, max: 1000 })
];

