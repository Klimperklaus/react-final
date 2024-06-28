export function makeLanguagesUnique(arr, lang) {
  if (!arr.includes(lang)) {
    arr.push(lang);
  }
  return arr;
}

export function fixThumbNailURL(url) {
  url = url.replace("{width}", "500");
  url = url.replace("{height}", "300");
  return url;
}

export function getTotalViewerCount(data) {
  if (data) {
    let count = 0;
    data.streams.forEach((stream) => {
      count += stream.viewers;
    });
    return count;
  }
}

export function getLanguageCount(data) {
  if (data) {
    const langArr = [];
    data.streams.forEach((stream) => {
      makeLanguagesUnique(langArr, stream.language);
    });
    return langArr.length;
  }
}
