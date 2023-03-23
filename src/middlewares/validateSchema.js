export default function validateSchema(schema) {
   return (req, res, next) => {
      const validation = schema.validate(req.body, { abortEarly: false });

      if (validation.error) {
         if (validation.error.details[0].type === "string.uriCustomScheme") {
            return res.status(422).send(validation.error.message);
         } else {
            return res.status(400).send(validation.error.message);
         }
      }

      next();
   };
}
