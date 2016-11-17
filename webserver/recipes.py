from sqlalchemy import *
from sqlalchemy.pool import NullPool
import csv

DATABASEURI = "postgresql://jnb2135:26mxk@104.196.175.120/postgres"
engine = create_engine(DATABASEURI)
'''reid = 30
quantity = "cup"
info = "test"
statement = ("""INSERT INTO recipeingredients VALUES ("""+str(reid)+""",'"""+quantity+"""','"""+info+"""');""")
print statement
engine.execute(statement)'''


ri = open("recipeingredients.csv", 'rt')
i = open("ingredients.csv", 'rt')
r = open("recipes.csv", 'rt')
co = open("contains.csv", 'rt')
u = open("utilizes.csv", 'rt')

reader1 = csv.reader(ri)
reader2 = csv.reader(i)
reader3 = csv.reader(r)
reader4 = csv.reader(co)
reader5 = csv.reader(u)

#for row in reader1:
#	if row[0].isdigit():
#		statement = ("""INSERT INTO recipeingredients VALUES ("""+row[0]+""",'"""+row[1].replace("'","")+"""','"""+row[2].replace("'","")+"""');""")
#		engine.execute(statement)


#for row in reader2:
#	if row[0].isdigit():
#		statement = ("""INSERT INTO ingredients VALUES ("""+row[0]+""",'"""+row[1].replace("'","")+"""','"""+row[2].replace("'","")+"""');""")
#		engine.execute(statement)

#for row in reader3:
#	if row[1].isdigit():
#		statement = ("""INSERT INTO recipes VALUES ('"""+row[0].replace("'","")+"""','"""+row[1]+"""','"""+row[2].replace("'","")+"""');""")
#		engine.execute(statement)

#for row in reader4:
#	if row[0].isdigit():
#		statement = ("""INSERT INTO contains  VALUES ('"""+row[0]+"""','"""+row[1]+"""');""")
#		engine.execute(statement)

for row in reader5:
	if row[0].isdigit():
		statement = ("""INSERT INTO utilizes  VALUES ('"""+row[0]+"""','"""+row[1]+"""');""")
		engine.execute(statement)


