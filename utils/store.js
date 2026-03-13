const { tutorials, diaries } = require('../miniprogram/data/content.js');

function getTutorialById(id) {
  return tutorials.find((item) => item.id === id);
}

function getDiaryById(id) {
  return diaries.find((item) => item.id === id);
}

module.exports = {
  tutorials,
  diaries,
  getTutorialById,
  getDiaryById
};
