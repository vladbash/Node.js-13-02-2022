const fs = require('fs');
const path = require('path');

class ItemDataProvider {
    constructor() {
        this._dataFilePath = path.join(__dirname, '..', '..', 'data', 'items.json');
        this._cache = null;
    }

    async getItems() {
        if (this._cache) return this._cache;
        try {
            fs.accessSync(this._dataFilePath)
        } catch {
            this._cache = [];
            return this._cache;
        }
        const file$ = fs.createReadStream(
            this._dataFilePath,
            { encoding: 'utf8' }
        );

        const data = await new Promise((res, rej) => {
            let result = '';
            file$.on('data', data => {
                result += data;
            });

            file$.on('end', () => {
                res(result);
            });
            
            file$.on('error', rej);
        });

        this._cache = JSON.parse(data);
        return this._cache;
    }

    async getItem(itemId) {
        if (!this._cache) {
            this._cache = await this.getItems();
        }
        itemId = +itemId;
        return this._cache.find(({ id }) => id === itemId);
    }

    async setItem(item) {
        if (!this._cache) {
            this._cache = await this.getItems();
        }
        if (item.id) {
            this._cache = this._cache.map(e => {
                return e.id === item.id ? item : e;
            });
        } else {
            item = {
                id: Date.now(),
                // id: this._cache.length + 1,
                // id: Math.random()
                ...item
            };
            this._cache.push(item);
        }
        const file$ = fs.createWriteStream(
            this._dataFilePath,
            { encoding: 'utf8' }
        );

        file$.end(JSON.stringify(this._cache));
        return item;
    }

    async deleteItem(itemId) {
        if (!this._cache) {
            this._cache = await this.getItems();
        }
        itemId = +itemId;
        this._cache = this._cache.filter(({ id }) => id !== itemId);
        const file$ = fs.createWriteStream(
            this._dataFilePath,
            { encoding: 'utf8' }
        );

        file$.end(JSON.stringify(this._cache));
    }
}

const itemsProvider = new ItemDataProvider();
module.exports = itemsProvider;