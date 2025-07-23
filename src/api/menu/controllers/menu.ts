import fs from 'fs';
import path from 'path';

module.exports = {
  async list(ctx) {
    const apiPath = path.join(__dirname, '../../../api');
    const items = [];

    fs.readdirSync(apiPath).forEach(folder => {
      const contentTypePath = path.join(apiPath, folder, 'content-types', folder, 'schema.json');
      if (fs.existsSync(contentTypePath)) {
        const schema = JSON.parse(fs.readFileSync(contentTypePath, 'utf8'));
        items.push({
          name: schema.info.displayName || folder,
          path: `/${schema.info.pluralName || folder}`
        });
      }
    });

    ctx.send({ menu: items });
  }
};