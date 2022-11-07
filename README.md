First install the packages **npm install**

Change the database configuration from **config.js**

API List for 

1. **http://localhost:3000/api/v1/stations?at=2022-11-07T20:18:32**
2. **http://localhost:3000/api/v1/stations/3006?at=2022-11-07T20:18:32**

For cron Job **http://localhost:3000/api/v1/cron**

Database name **bycle** and schema is
``` sql
CREATE TABLE `cron_responses` (
  `id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `indigo_response` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`indigo_response`)),
  `weather_response` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`weather_response`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

```

To run the project **npm run dev**