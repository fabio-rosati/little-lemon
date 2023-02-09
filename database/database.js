import * as SQLite from 'expo-sqlite';
import { escape } from '../utils';

const db = SQLite.openDatabase('little_lemon_capstone');
const table = 'menuitems'

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `create table if not exists ${table} (id integer primary key not null, name text, description text, image text, category text, price double);`
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
      tx.executeSql(`SELECT * FROM ${table}`, [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}

export function saveMenuItems(menuItems) {
  db.transaction((tx) => {
    tx.executeSql(
      `INSERT into ${table} (id, name, description, image, category, price) values ${
        menuItems.map((item) => 
        `(${item.id}, '${escape(item.name)}', '${escape(item.description)}', '${escape(item.image)}', '${escape(item.category)}', ${item.price})`
        ).join(', ')
      }`
    );
  });
}

export async function filterByQueryAndCategories(query, activeCategories) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM ${table}
        WHERE name LIKE '%${query}%'
        AND category IN (
          ${activeCategories.map((category) => `'${category}'`).join(', ')}
        )`,
        
        [], (_, { rows }) => {resolve(rows._array);});
    });    
  });
}