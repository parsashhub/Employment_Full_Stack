echo "started"

node scripts/createUsers.js

node scripts/jobCategoryseeder.js

node scripts/jobContractsSeeder.js

node scripts/advertisementSeeder.js

echo "finished"
