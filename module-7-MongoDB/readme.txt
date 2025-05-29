// - Команды для запуска MongoDb в Docker:
docker run --name my-mongo -d -p 27017:27017 --rm mongo:4.4.1
docker exec -it my-mongo mongo
docker stop my-mongo

// - GUI Compass
https://www.mongodb.com/try/download/compass

// Подключение NodeJS к MongoDB
https://mongoosejs.com/

// - Примеры команд в интерактивной среде MongoDb
> help
	db.help()                    help on db methods
	db.mycoll.help()             help on collection methods
	sh.help()                    sharding helpers
	rs.help()                    replica set helpers
	help admin                   administrative help
	help connect                 connecting to a db help
	help keys                    key shortcuts
	help misc                    misc things to know
	help mr                      mapreduce

	show dbs                     show database names
	show collections             show collections in current database
	show users                   show users in current database
	show profile                 show most recent system.profile entries with time >= 1ms
	show logs                    show the accessible logger names
	show log [name]              prints out the last segment of log in memory, 'global' is default
	use <db_name>                set current database
	db.mycoll.find()             list objects in collection mycoll
	db.mycoll.find( { a : 1 } )  list objects in mycoll where a == 1
	it                           result of the last line evaluated; use to further iterate
	DBQuery.shellBatchSize = x   set default number of items to display on shell
	exit                         quit the mongo shell

> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB

> use todos
switched to db todos

> db.items.insertOne({title: "LearnNode", completed: false})
{
	"acknowledged" : true,
	"insertedId" : ObjectId("6837fdf91942adbfe306142e")
}

> show collections
items

> db.items.find( { completed: false } )
{ "_id" : ObjectId("6837fdf91942adbfe306142e"), "title" : "LearnNode", "completed" : false }

