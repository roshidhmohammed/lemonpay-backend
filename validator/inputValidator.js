const {body, param, header } = require("express-validator")

 const validateSignUp = [
    body('email')
    .notEmpty()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('Invalid email address.'),

  body('password')
    .notEmpty()
    .withMessage('Password is required.')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
    .withMessage('Password must contain uppercase, lowercase, number, and special character.'),

  body('confirmPassword')
    .notEmpty()
    .withMessage('Confirm Password is required.')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
]

 const validateSignIn = [
    body('email')
    .notEmpty()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('Invalid email address.'),

  body('password')
    .notEmpty()
    .withMessage('Password is required.')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
    .withMessage('Password must contain uppercase, lowercase, number, and special character.')
]

const validateAddTask = [
    body('taskName')
      .notEmpty()
      .withMessage('Task name is required.')
      .isString()
      .withMessage('Task name must be a string.')
      .isLength({ min: 1 })
      .withMessage('Task name must be at least 2 characters.'),
  
    body('description')
      .notEmpty()
      .withMessage('Description is required.')
      .isString()
      .withMessage('Description must be a string.'),
  
    body('date')
      .notEmpty()
      .withMessage('Date and time are required.')
      .isISO8601()
      .withMessage('Date must be a valid ISO8601 date.') // optional: depends on how you send the date
  ];

  const validateEditTask = [
    param('id')
      .isMongoId()
      .withMessage('Invalid task ID.'),
  
    body('taskName')
      .notEmpty()
      .withMessage('Task name is required.')
      .isString()
      .withMessage('Task name must be a string.')
      .isLength({ min: 1 })
      .withMessage('Task name must be at least 2 characters.'),
  
    body('description')
      .notEmpty()
      .withMessage('Description is required.')
      .isString()
      .withMessage('Description must be a string.'),
  
    body('dueDate')
      .notEmpty()
      .withMessage('Due date is required.')
      .isISO8601()
      .withMessage('Due date must be a valid date.')
  ];

  const validateDeleteTask = [
    param('id')
    .notEmpty()
    .withMessage('Task ID is required.')
    .isMongoId()
    .withMessage('Invalid Task ID.'),
  ]

  const validateAuthenticationHeader = [
    header('Authorization')
    .exists({ checkFalsy: true })
    .withMessage('Authorization header is missing.')
    .custom((value) => {
      if (!value.startsWith('Bearer ')) {
        throw new Error('Authorization must start with Bearer');
      }
      const token = value.split(' ')[1];
      if (!token) {
        throw new Error('Token not provided');
      }
      return true;
    }),

  ];
module.exports = {
    validateSignUp,
    validateSignIn,
    validateAddTask,
    validateEditTask,
    validateDeleteTask,
    validateAuthenticationHeader
}