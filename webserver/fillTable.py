from sqlalchemy import *
from sqlalchemy.pool import NullPool
import csv

ri = open("recipeingredients.csv", 'rt')
i = open("ingredients.csv", 'rt')
r = open("recipes.csv", 'rt')

reader1 = csv.reader(ri)
reader2 = csv.reader(i)
reader3 = csv.reader(r)

for row in reader1:
	print row
	statement = text("""INSERT INTO recipeingredients VALUES(:reid, :quantity, :info)""")
	engine.execute(statement, reid=info[0], quantity=info[1], info=info[2])


for row in reader2:
	info = row.split(",")
	statement = text("""INSERT INTO ingredients VALUES(:iid, :name, :type)""")
	engine.execute(statement, iid=info[0], name=info[1], type=info[2])

for row in reader3:
	info = row.split(",")
	statement = text("""INSERT INTO recipes VALUES(:name, :rid, :directions)""")
	engine.execute(statement, iid=info[0], name=info[1], type=info[2])
