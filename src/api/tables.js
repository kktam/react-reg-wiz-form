/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

import BigQuery from '@google-cloud/bigquery'

// The project ID to use, e.g. "your-project-id"
const projectId = "kacloud-1176";
  
// The ID of the dataset of the table into which data should be inserted, e.g. "my_dataset"
const datasetId = "shops";

// The ID of the table into which data should be inserted, e.g. "my_table"
const tableId = "users";

const insert = function insert(rows) {
  return insertRowsAsStream(datasetId, tableId, rows, projectId);
}

function insertRowsAsStream (datasetId, tableId, rows, projectId) {
  // [START bigquery_insert_stream]
  // Imports the Google Cloud client library

  // Instantiates a client
  const bigquery = BigQuery({
    projectId: projectId
  });

  // Inserts data into a table
  bigquery
    .dataset(datasetId)
    .table(tableId)
    .insert(rows)
    .then((insertErrors) => {
      console.log('Inserted:');
      rows.forEach((row) => console.log(row));

      if (insertErrors && insertErrors.length > 0) {
        console.log('Insert errors:');
        insertErrors.forEach((err) => console.error(err));
      }
    })
    .catch((err) => {
      console.error('ERROR:', err);
    });
  // [END bigquery_insert_stream]
}

export default insert
