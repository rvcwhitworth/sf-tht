var sqlite3 = require('sqlite3').verbose()
var DATABASE_FILENAME = process.env.DATABASE_FILENAME || './db/api.db'

function openConnection() {
  return new Promise((resolve, reject) => {
    var db = new sqlite3.Database(DATABASE_FILENAME, err => {
      if (err) {
        reject(err.message)
      }
      resolve(db)
    })
  })
}

function closeConnection(db) {
  db.close(err => {
    if (err) {
      console.error(err.message)
    }
  })
}

function getUserId(username, db) {
  return new Promise((resolve, reject) => {
    var statement = `SELECT id FROM users WHERE username = ?`
    db.get(statement, [username], (err, result) => {
      if (err) {
        reject(err)
      } else if (!result) {
        reject('No user found with that username')
      } else {
        resolve(result.id)
      }
    })
  })
}

async function getAccessibleIndices(username) {
  try {
    var db = await openConnection()
    var userId = await getUserId(username, db)
    var statement = `
    SELECT index_name FROM indices as i INNER JOIN 
    user_index_access as uia ON (uia.index_id = i.id) 
    WHERE access = 'true' AND uia.user_id = ?;
  `
    return new Promise((resolve, reject) => {
      db.all(statement, [userId], (err, results) => {
        if (err) {
          reject(err)
        } else {
          resolve(results.map(result => result.index_name))
        }
        closeConnection(db)
      })
    })
  } catch (err) {
    throw err
  }
}

module.exports = {
  getAccessibleIndices
}
