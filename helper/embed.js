const createEmbed = (Title, Description, FieldList) => {
  const embed = {
    color: 0x0099ff,
    title: Title,
    description: Description,
    fields: FieldList,
    image: {
      url: '',
    },
    timestamp: new Date(),
    footer: {
      text: 'Butterful by Programmerryoki',
    },
  };

  return embed;
};

const createField = (Title, Value, inline) => {
  const field = {
    name: Title,
    value: Value,
    inline: inline,
  }
  return field;
}

module.exports = {
  createEmbed,
  createField
};