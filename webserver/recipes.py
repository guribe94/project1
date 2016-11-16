import requests
from sqlalchemy import *
from sqlalchemy.pool import NullPool
import csv

ri = open("recipeingredients.csv", 'wt')
i = open("ingredients.csv", 'wt')
r = open("recipes.csv", 'wt')

writer1 = csv.writer(ri)
writer2 = csv.writer(i)
writer3 = csv.writer(r)

writer1.writerow(['reid','quantity','info'])
writer2.writerow(['iid','name','type'])
writer3.writerow(['name','rid','directions'])


response = requests.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=false&number=100",
  	headers={
    	"X-Mashape-Key": "k3i1BgqpUymshOgQu5TFPBC1HMM4p1uolUijsnVf9e4eEFFrVQ",
    	"Accept": "application/json"
 	}
)

r = response.json()

count=1
count2=1
check = 0
ingredients = []
for i in range(0,len(r['recipes'])):
	recipeingredients = []
	
	if r['recipes'][i]['instructions'] is not None and '<' not in r['recipes'][i]['instructions']:
		if r['recipes'][i]['instructions'][0] != " ":
			check=1
			writer3.writerow([r['recipes'][i]['title'].encode('utf-8'),count2,r['recipes'][i]['instructions'].encode('utf-8')])
	
	if check == 1:
		for element in r['recipes'][i]['extendedIngredients']:
			if element['name'] not in ingredients:
				ingredients.append(element['name'])
				t=element['aisle']
				#statement = text("""INSERT INTO recipeingredients VALUES(:iid, :name, :type)""")
				#engine.execute(statement, iid=len(ingredients), name=element['name'], type=t)
				writer2.writerow([len(ingredients), element['name'], t])


			unit = element['unit']
		
			if element['unit'] == '':
				unit = "servings"

			writer1.writerow([count ,str(element['amount']) + ' ' + unit, element['name']])
			#statement = text("""INSERT INTO recipeingredients VALUES(:reid, :quantity, :info)""")
			#engine.execute(statement, reid=count, quantity=recipe[0], info=recipe[1])
			count+=1
		
		count2+=1

	check=0
	
	
