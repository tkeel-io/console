const inquirer = require('inquirer');

const { getImageInfos } = require('./images');

module.exports = async function push() {
  const message = 'Select images';
  const infos = getImageInfos();

  if (infos.length === 0) {
    throw new Error('No tKeel Images');
  }

  const choices = infos.map((info) => {
    const { Repository, Tag } = info;
    const name = `${Repository}:${Tag}`;
    const value = { ...info, name };

    return { name, value };
  });

  const questions = [
    {
      type: 'checkbox',
      name: 'data',
      message,
      choices,
      validate(value) {
        if (value.length === 0) {
          return `Please ${message}`;
        }
        return true;
      },
      pageSize: 10,
      loop: false,
    },
  ];

  const { data } = await inquirer.prompt(questions);

  return data;
};
