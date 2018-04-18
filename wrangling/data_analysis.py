
import pandas as pd

##
fertility_rate = pd.read_csv("../data/kokonaishedelmallisyys_2000_2016.csv", encoding='utf8', sep=';')
births = pd.read_csv("../data/syntyneet_lapset_1987_2016.csv", encoding='utf8', sep=';')

#print(fertility_rate.head())
#print(births.head())
#print(births.columns.values)

births2016col = '2016 Sukupuolet yhteensä Elävänä syntyneet, lkm'
births2015col = '2015 Sukupuolet yhteensä Elävänä syntyneet, lkm'
births = births.loc[births['Äidin ikä'] == "Ikäluokat yhteensä"]
births15and16 = births[['Alue', births2015col, births2016col]]
print(births15and16.head())

births15and16['change'] = ((births15and16[births2016col]-births15and16[births2015col])/births15and16[births2016col])*100
births15and16['change'].round(2)
births15and16 = births15and16.sort_values(['change'], ascending=True)
print(births15and16.head())

births15and16 = births15and16.sort_values([births2015col], ascending=False)
print(births15and16.head())