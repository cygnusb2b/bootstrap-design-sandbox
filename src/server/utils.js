const path = require('path');
const fs = require('fs');
const inflected = require('inflected');
const Promise = require('bluebird');

Promise.promisifyAll(fs);

const projectRoot = path.resolve(__dirname, '../../projects');
const getProjectRoot = () => projectRoot;

const getFileInfos = (rootDir, files) => Promise.all(files.map(file => getFileInfo(rootDir, file)));

const getFileInfo = async (rootDir, file) => {
  const filepath = path.resolve(rootDir, file);
  const stats = await fs.statAsync(filepath);
  return { file, stats };
};

const getDirectories = (items) => {
  const dotfiles = ['.', '..'];
  return items.filter(item => !dotfiles.includes(item.file) && item.stats.isDirectory());
};

const createFileTitle = file => inflected.titleize(file);

const getProjects = async () => {
  const files = await fs.readdirAsync(projectRoot);
  const infos = await getFileInfos(projectRoot, files);
  const items = await getDirectories(infos);
  return items.map(item => ({
    path: item.file,
    name: createFileTitle(item.file),
    created: item.stats.ctimeMs
  }));
};

const getProjectItems = async (projectPath) => {
  const pageLoc = path.resolve(projectRoot, projectPath, 'pages');
  const files = await fs.readdirAsync(pageLoc);
  const infos = await getFileInfos(pageLoc, files);

  const { basename, extname } = path;

  return infos.filter(({ file }) => extname(file) === '.html').map(info => ({
    name: createFileTitle(basename(info.file, '.html')),
    file: info.file,
    path: basename(info.file, '.html'),
    modified: info.stats.mtimeMs,
  }));
};

module.exports = {
  getProjectRoot,
  getProjects,
  getProjectItems,
  createFileTitle,
};
