export const ShortTextValidation = (config: Record<string, any>) => {
  const validation: any[][] = [['string'], ['trim']];

  switch (config.format) {
    case 'email':
      validation.push([
        'email',
        'Please enter the email in the format: mail@domain.com',
      ]);
      break;

    case 'emailWithName':
      validation.push([
        'matches',
        /(?:"?([^"]*)"?\s)?(?:<?(.+@[^>]+)>?)/, // https://stackoverflow.com/a/14011481
        {
          message:
            'Please enter the email in the format: Name <mail@domain.com>',
          excludeEmptyString: true,
        },
      ]);
      break;

    case 'phone':
      validation.push([
        'matches',
        /^(?=(?:\D*\d\D*){8,14}$)[- \d()+]*/, // https://stackoverflow.com/a/28228199
        {
          message: 'Please enter a valid phone number',
          excludeEmptyString: true,
        },
      ]);
      break;

    case 'number':
      validation[0] = ['number'];
      // https://github.com/jquense/yup/issues/298#issuecomment-559017330
      validation.push([
        'transform',
        (value: any) => {
          if ((typeof value === 'string' && value === '') || isNaN(value))
            return null;
          return value;
        },
      ]);
      validation.push(['nullable']);
      break;

    case 'url':
      validation.push([
        'url',
        'Please enter the URL in the format: https://example.com',
      ]);
      break;

    case 'twitter':
      validation.push([
        'matches',
        /^@?(\w){1,15}$/, //https://stackoverflow.com/a/8650024
        {
          message: 'Please enter the Twitter account in the format: @username',
          excludeEmptyString: true,
        },
      ]);
      break;

    case 'linkedin':
      validation.push([
        'matches',
        /^https?:\/\/([a-z]+.)?linkedin\.com\/in\/[a-zA-z\d-]+/,
        {
          message:
            'Please enter the LinkedIn URL in the format: https://linkedin.com/in/your-name',
          excludeEmptyString: true,
        },
      ]);
      break;

    default:
      break;
  }

  if (typeof config.maxCharacters === 'number')
    validation.push([
      'max',
      config.maxCharacters,
      'You have reached the character limit',
    ]);

  return validation;
};

export default ShortTextValidation;
