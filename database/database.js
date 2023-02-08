import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('little_lemon');

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'create table if not exists menuitems (id integer primary key not null, uuid text, title text, price text, category text);'
        );
      },
      reject,
      resolve
    );
  });
}

export async function getMenuItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM menuitems', [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}

export function saveMenuItems(menuItems) {
  db.transaction((tx) => {
    tx.executeSql(
      `INSERT into menuitems (uuid, name, price, description, image, category) values ${
        menuItems.map((item) => 
          `('${item.id}', '${item.name}', '${item.price}', '${item.description}', '${item.image}', '${item.category}')`
        ).join(', ')
      }`
    );
  });
}

export async function filterByQueryAndCategories(query, activeCategories) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM menuitems
        WHERE name LIKE '%${query}%'
        AND category IN (
          ${activeCategories.map((category) => `'${category}'`).join(', ')}
        )`,
        
        [], (_, { rows }) => {resolve(rows._array);});
    });    
  });
}