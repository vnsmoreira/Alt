export const formatTitle = item => {
  const isThereSpaceBeforeTitle = title => title[0] == ' ';
  const removeSpaceBeforeTitle = title => title.substring(1);

  const isAuthorNameInTitle = item.title.indexOf(item.author.name) > -1;
  const removeAuthorNameFromTitle = title => {
    return title.replace(`${item.author.name}`, '').replace(' - ', ' ').replace(',', '');
  };

  let formattedTitle = isAuthorNameInTitle ? removeAuthorNameFromTitle(item.title) : item.title;

  if (isThereSpaceBeforeTitle(formattedTitle)) {
    formattedTitle = removeSpaceBeforeTitle(formattedTitle);
  }

  return formattedTitle;
};
